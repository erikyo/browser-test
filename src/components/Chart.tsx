import {RefObject, useRef} from 'react';

function renderChart(chartRef: RefObject<HTMLCanvasElement>, result: number | string) {
    import('chart.js/auto').then(({default: Chart}) => {
        const chartResult = [result, 100 - result];

        const securityData = {
            labels: ['Security', 'Insecurity'],
            datasets: [{
                data: chartResult,
                backgroundColor: ['#646cff', '#ef233c'],
            }],
        };

        const securityOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Browser Security Score',
            },
        }

        new Chart(
            chartRef?.current,
            {
                type: 'doughnut',
                data: securityData,
                options: securityOptions,
            }
        );
    });
}

/**
 * Render a security chart component.
 *
 * @param {object} props - The props object containing the `result` property.
 * @param {number|string} props.result - The result value for the security chart.
 * @return {JSX.Element} The rendered security chart component.
 */
const SecChart = (props: { result: number | string }) => {
    const chartRef = useRef(null) as RefObject<HTMLCanvasElement>;
    if (props.result) renderChart(chartRef, props.result); // renderChart

    return (
        <div className="chart-wrapper">
            <canvas ref={chartRef}/>
        </div>
    );
};

export default SecChart;
