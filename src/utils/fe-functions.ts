export function checkSecuritiesByCategories(props: ObjTest): ObjResult {
    const newDataTableResults: ObjResult = {};
  
    for (const categoryName of Object.keys(props)) {
      const categoryTests = props[categoryName];
      newDataTableResults[categoryName] = [];
  
      for (const test of categoryTests) {
        const { testName, test: check } = test;
        const result = check ? '☑️' : '📛';
  
        newDataTableResults[categoryName].push({
          id: newDataTableResults[categoryName].length,
          testName,
          value: test.value ?? !! check,
          result: typeof result !== 'object' ? result : JSON.stringify(result),
        });
      }
    }
  
    return newDataTableResults;
  }
