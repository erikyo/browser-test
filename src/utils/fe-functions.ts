// export function checkSecuritiesByCategories(props: ObjTest): ObjResult {
//     const newDataTableResults: ObjResult = {};
  
//     for (const categoryName of Object.keys(props)) {
//       const categoryTests = props[categoryName];
//       newDataTableResults[categoryName] = [];
  
//       for (const test of categoryTests) {
//         const { testName, test: check } = test;
//         const result = check ? '☑️' : '📛';
  
//         newDataTableResults[categoryName].push({
//           id: newDataTableResults[categoryName].length,
//           testName,
//           value: test.value ?? !! check,
//           result: typeof result !== 'object' ? result : JSON.stringify(result),
//         });
//       }
//     }
  
//     return newDataTableResults;
//   }


  export function checkSecuritiesByCategories(props: ObjTest): Promise<ObjResult> | ObjResult {
    const newDataTableResults: ObjResult = {};
  
    for (const categoryName of Object.keys(props)) {
      const categoryTests = props[categoryName];
      newDataTableResults[categoryName] = [];
  
      let promiseResolved = false;
      const pendingPromises: [string, Promise<any>][] = [];
  
      for (const test of categoryTests) {
        const { testName, test: check } = test;
        const result = check ? '☑️' : '📛';
  
        const isPromise = typeof test.value === 'object' && test.value;
  
        // Handle non-promise values immediately
        if (!isPromise) {
          newDataTableResults[categoryName].push({
            id: newDataTableResults[categoryName].length,
            testName,
            value: test.value ?? !! check,
            result: typeof result !== 'object' ? result : JSON.stringify(result),
          });
        } else {
          // Track pending promises
          pendingPromises.push([testName, test.value]);
  
          // Delay processing of subsequent values until the promise resolves
          if (!promiseResolved) {
            promiseResolved = true;
  
            (async () => {
              for (const [testName, promise] of pendingPromises) {
                const resolvedResult = await promise;
  
                newDataTableResults[categoryName].push({
                  id: newDataTableResults[categoryName].length,
                  testName,
                  value: resolvedResult ?? !! check,
                  result: typeof resolvedResult !== 'object' ? resolvedResult : JSON.stringify(resolvedResult),
                });
              }
            })();
          }
        }
      }
    }
  
    return newDataTableResults;
  }