import React, {useEffect, useRef, useState} from 'react';
import {resultColor} from "../utils/";

interface ChartData {
    testName: string;
    result: number | string;
}


const SecChart = (props: {
    results: ChartData[]
}): JSX.Element | null => {
    const {results} = props;
    const [Chart, setChart] = useState<any | null>(null);

    useEffect(() => {
        const importChart = async () => {
            const chartJs = await import('chart.js/auto');
            setChart(chartJs);
        };

        importChart();
    }, []);

    if (!Chart) return null;

    Chart.default.register({
        id: 'customCenterText',
        beforeDraw: function (chart, args, options) {
            if (options) {
                const ctx = chart.ctx;
                const centerConfig = chart.config.plugins.customCenterText;

                const fill = centerConfig.background || 'transparent'; // Default is transparent
                const radius = (chart.width * .5) - 5; // Use chart.radius instead of chart.innerRadius
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                // Draw background circle
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.fillStyle = fill;
                ctx.fill();
                ctx.closePath();
            }
        },
        afterDraw: function (chart, args, options) {
            if (options) {
                // Get ctx from string
                const ctx = chart.ctx;

                // Get options from the center object in options
                const centerConfig = chart.config.plugins.customCenterText;
                const fontStyle = centerConfig.fontStyle || '"Segoe UI", Roboto, "Helvetica Neue", Arial';
                const txt = centerConfig.text || '#000'
                const color = centerConfig.color || '#000';
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                const maxFontSize = centerConfig.maxFontSize || 75;

                // base font
                ctx.font = fontStyle;

                // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                const stringWidth = ctx.measureText(txt).width;
                const elementWidth = (chart.innerRadius * 2);

                // Find out how much the font can grow in width.
                const widthRatio = elementWidth / stringWidth;
                const newFontSize = Math.floor(30 * widthRatio);
                const elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                let minFontSize = centerConfig.minFontSize;

                if (minFontSize === undefined) {
                    minFontSize = 20;
                }

                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                }

                // Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;

                ctx.fillText(txt, centerX, centerY);
                return;
            }
        }
    });

    function renderChart(
        chartRef: React.RefObject<HTMLCanvasElement>,
        chartData: {
            testName: string;
            result: number;
        }
    ) {
        const result = [chartData.result, 100 - chartData.result];
        const data = {
            datasets: [
                {
                    data: result,
                    backgroundColor: [resultColor(chartData.result), '#eee'],
                    borderWidth: 0,
                    legend: {
                        display: false
                    },
                    cutout: '85%',
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false
        };

        const thisChart = new Chart.default(chartRef.current, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: {
                customCenterText: {
                    text: `${result[0]}%`,
                    color: '#000',
                    background: '#eee',
                    fontStyle:
                        "600 26px 'Roboto Mono', 'Menlo', 'dejavu sans mono', 'Consolas', 'Lucida Console', monospace",
                },
            },
        });

        thisChart.resize(120, 120)
    }

    const ScoreChart = (props: {
        chartData: ChartData
    }): JSX.Element => {
        const {chartData} = props;
        const chartRef = useRef<HTMLCanvasElement | null>(null);

        useEffect(() => {
            if (chartData.result && chartRef.current) {
                renderChart(chartRef, {
                    testName: chartData.testName,
                    result: chartData.result,
                });
            }
        }, [chartData]);

        return (
            <div id={'chart-' + chartData.testName} className={"chart-container"}>
                <div className={"chart-" + chartData.testName}>
                    <canvas ref={chartRef}/>
                </div>
                <p className="text-1xl font-bold text-center score">{chartData.testName}</p>
            </div>
        );
    };

    return (
        <div className={'flex flex-wrap justify-center gap-8'}>
            {results
                ? results.map((r, i) => <ScoreChart chartData={r} key={i}/>)
                : null
            }
        </div>);
};

export default SecChart;
