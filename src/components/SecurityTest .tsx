import {useEffect, useState} from 'react';
import {checkSecurity} from "../tests/";
import Table from './Table.tsx';
import Score from "./Score.tsx";
import Recap from "./Recap.tsx";
import SecChart from "./Chart.tsx";
import {roundToTwoDecimals} from "../utils";


const SecurityTest = () => {

    const [dataTableResults, setDataTableResults] = useState();
    const [testResults, setTestResults] = useState();

    useEffect( () => {
        const { newTestResults, newDataTableResults } = checkSecurity();
        setTestResults(newTestResults);
        setDataTableResults(newDataTableResults);
    }, [])

    return (
        <main className="wrapper">
            <h1>Browser Security Test Results</h1>
            {testResults ? <SecChart result={ roundToTwoDecimals(testResults) }/> : null}
            {testResults ? <Score score={roundToTwoDecimals(testResults)} /> : null}
            <Recap />
            <div  className={"data-table"}>
                {dataTableResults ? <Table dataTableResults={dataTableResults}/> : null}
            </div>
        </main>
    );
};

export default SecurityTest;
