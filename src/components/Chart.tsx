import {RefObject, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

/**
 * Render a security chart component.
 *
 * @param {object} props - The props object containing the `result` property.
 * @param {number|string} props.result - The result value for the security chart.
 * @return {JSX.Element} The rendered security chart component.
 */
const SecChart = (props: {result: number | string}) => {

    const chartRef = useRef(null) as RefObject< HTMLCanvasElement >;

    useEffect(() => {
        const chartResult = [props.result, 100 - props.result];

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
        };

        new Chart(
            chartRef?.current , {
                type: 'doughnut',
                data: securityData,
                options: securityOptions,
            });
    }, [props.result]);

    return (
        <div className="chart-wrapper">
            <canvas
                ref={chartRef}
            />
        </div>
    );
};

export default SecChart;
