import {RefObject, useEffect, useRef, useState} from 'react';

import DataTable from 'react-data-table-component';
import Chart from 'chart.js/auto';
import {checkSecurity} from "../utils/browserTests.ts";

function TableSecurityTest(props) {
    const {dataTableResults} = props;

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            style: {
                maxWidth: '32px',
            }
        },
        {
            name: 'Test Name',
            selector: (row) => row.testName + "",
            sortable: true,
        },
        {
            name: 'Result',
            selector: (row) => typeof row.result !== 'object' ? row.result + " " : JSON.stringify(row.result),
            sortable: true,
            style: {
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                overflow: 'auto',
                maxWidth: '300px',

            }
        },
        {
            name: 'Status',
            selector: (row) => row.status + "",
            sortable: true,
            right: true,
            style: {
                maxWidth: '32px',
            }
        },
    ]

    return (<DataTable
            columns={columns}
            data={dataTableResults}
        />
    )
}

const SecurityTest = () => {

    const [dataTableResults, setDataTableResults] = useState();
    const [testResults, setTestResults] = useState();
    const chartRef = useRef(null) as RefObject< HTMLCanvasElement >;

    const calculateSecurityScore = (results) => {
        if (!results) {
            return 0;
        }
        const totalTests = Object.keys(results).length;
        const successfulTests = Object.values(results).filter(result => result === true).length;
        return (successfulTests / totalTests) * 100;
    }

    useEffect( () => {
        const { newTestResults, newDataTableResults } = checkSecurity();
        console.log(newDataTableResults)
        setTestResults(newTestResults);
        setDataTableResults(newDataTableResults);
    }, [])

    useEffect(() => {
        if (!testResults) {
            return;
        }

        const result = calculateSecurityScore(testResults);

        const securityData = {
            labels: ['Security', 'Insecurity'],
            datasets: [{
                data: [result, 100 - result],
                backgroundColor: ['#302b42', '#ef233c'],
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
    }, [testResults]);

    return (
        <main className="wrapper">
            <h1>Browser Security Test Results</h1>
            <h2 id="test-response" className="align-center"></h2>
            <div className="chart-wrapper">
                <canvas
                    ref={chartRef}
                />
            </div>
            <div id="results"></div>
            <div  className={"data-table"}>
                {dataTableResults ? <TableSecurityTest dataTableResults={dataTableResults}/> : null}
            </div>
        </main>
    );
};

export default SecurityTest;
