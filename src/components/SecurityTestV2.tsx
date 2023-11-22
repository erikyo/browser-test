import React, {useCallback, useDeferredValue, useEffect, useState} from 'react';
import Score from "./Score.tsx";
import Recap from "./Recap.tsx";
import SecChart from "./Chart.tsx";
import {roundToTwoDecimals} from "../utils";
import {checkSecuritiesByCategories } from '../utils/fe-functions.ts';
import { testObjects } from '../tests/object-test.ts';
import checkSecurity from '../tests/index.ts';
import Tables from './Tables.tsx';

const SecurityTestV2 = () => {

    const [dataTableResults, setDataTableResults] = useState<ObjResult>();
    const [testResults, setTestResults] = useState();
    // useEffect( () => {
    //     const newDataTableResults = checkSecuritiesByCategories(testObjects);
    //     const { newTestResults } = checkSecurity();
    //     setTestResults(newTestResults);
    //     setDataTableResults(newDataTableResults);
    //     //console.log(JSON.stringify(newDataTableResults))

        
    // }, [])

    const fetchData = useCallback(async () => {
        const newDataTableResults = await checkSecuritiesByCategories(testObjects);
        setDataTableResults(newDataTableResults);
      }, [])


    useEffect( () => {
        fetchData().catch(e => console.log(e))
        const { newTestResults } = checkSecurity();
        setTestResults(newTestResults);
    }, [fetchData])

    return (
        <main className="wrapper p-8">
            <h1 className="text-5xl font-extrabold flex justify-center items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M130.769-579.385q-4.307-3.461-5.231-8.653-.923-5.193 2.77-10.885 62.769-83.462 154.796-130.846 92.027-47.385 196.358-47.385 105.445 0 198.953 45.5 93.508 45.5 155.739 130.731 5.461 6.692 3.346 12.538-2.115 5.847-7.346 9.308-5.231 3.462-11.273 3.047-6.042-.414-10.573-7.047Q751.769-662.615 664.53-704.5q-87.239-41.885-185.068-41.885-97 0-182.77 42.654-85.769 42.654-142.538 120.654-5.231 7.462-11.692 7.692-6.462.231-11.693-4ZM593.231-84.846q-100.923-26-166.154-102.384-65.231-76.383-65.231-186.77 0-48.462 35.231-80.923 35.231-32.462 83.976-32.462t83.154 32.462q34.408 32.461 34.408 80.923 0 34.953 26.304 58.784 26.304 23.831 62.077 23.831 35.773 0 61.312-24.038 25.538-24.039 25.538-58.577 0-117.954-86.771-198.285-86.772-80.33-207.231-80.33-120.459 0-206.613 80.558t-86.154 197.826q0 24.385 5.654 60.962t21.884 84.577q2.231 6.692-.115 11.769t-8.808 8.077q-6.461 3-12.038.218t-7.808-9.141q-15.769-41.308-22.654-79.039-6.884-37.73-6.884-77.192 0-131.366 95.375-220.26 95.375-88.894 227.814-88.894 133.426 0 229.272 88.894T804.615-374q0 48.356-34.157 80.755-34.157 32.399-83.227 32.399-48.693 0-84.039-32.399-35.346-32.399-35.346-80.755 0-34.538-25.635-58.577-25.635-24.038-61.211-24.038-36.206 0-62.295 23.831-26.09 23.831-26.09 58.784 0 99.301 59.039 165.843 59.038 66.542 150.038 92.542 7.112 2.278 9.902 7.596 2.791 5.317.791 11.394-2 5.317-6.462 9.548-4.461 4.23-12.692 2.23Zm-338.616-702q-4.153 2.692-10.23.961-6.077-1.73-8.539-7.423-2.461-5.692-1.615-11.038.846-5.346 6.538-8.808Q296-843.923 357-859.538q61-15.616 124-15.616 62.987 0 123.021 15.5 60.035 15.5 116.133 44.5 8.231 4.231 9.346 10.077 1.115 5.846-1.115 11.308-2.231 5.461-8.077 7.923-5.846 2.461-12-1-52.231-29.308-109.865-43.423-57.634-14.116-117.818-14.116-59.163 0-115.933 15.039-56.769 15.038-110.077 42.5ZM380.308-97.308q-56.693-60.461-88.577-125.346-31.885-64.884-31.885-151.372 0-89.436 64.883-150.397 64.882-60.962 156.307-60.962 91.426 0 156.502 60.962Q702.615-463.462 702.615-374q0 6.923-4.23 11.154-4.231 4.231-11.154 4.231-5.693 0-10.539-4.231T671.846-374q0-76.538-56.636-128.577-56.636-52.038-134.192-52.038-77.556 0-133.98 52.038-56.423 52.039-56.423 128.518 0 82.597 28.77 139.482 28.769 56.885 82.769 115.277 6 6.146 4.846 12.223-1.154 6.077-4.846 9.77-4.462 4.46-10.539 4.846-6.077.384-11.307-4.847Zm298.923-69.538q-86.693 0-151.039-58.906Q463.846-284.659 463.846-374q0-6.154 4.187-10.769 4.187-4.616 11.039-4.616 6.851 0 11.197 4.616 4.346 4.615 4.346 10.769 0 77.362 55.154 126.873 55.154 49.512 129.462 49.512 9.846 0 20.846-1t22.231-3q5.923-1.231 10.115 1.73 4.192 2.962 6.192 9.813 2 6.091-2.23 10.658-4.231 4.568-10.693 6.568-11.077 2.692-23.807 4.346-12.731 1.654-22.654 1.654Z"/></svg>
                Browser Security Test Results
            </h1>
            {testResults ? <SecChart result={roundToTwoDecimals(testResults)}/> : null}
            <Score score={roundToTwoDecimals(testResults)} />
            <Recap />
            <Tables {...dataTableResults}></Tables>
        </main>
    );
};

export default SecurityTestV2;
