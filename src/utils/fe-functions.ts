export function checkSecuritiesByCategories(
  props: ObjTest
): Promise<ObjResult> | ObjResult {
  const newDataTableResults: ObjResult = {};

  let i = 0;
  for (const categoryName of Object.keys(props)) {
    const categoryTests = props[categoryName];
    newDataTableResults[categoryName] = [];

    let promiseResolved = false;
    const pendingPromises: [string, number, Promise<any>][] = [];

    for (const test of categoryTests) {
      const { testName, test: check } = test;
      const result = check ? "☑️" : "📛";

      const isPromise = typeof test.value === "object" && test.value;

      // Handle non-promise values immediately
      if (!isPromise) {
        newDataTableResults[categoryName].push({
          id: i,
          testName,
          value: test.value ?? !!check,
          result: typeof result !== "object" ? result : JSON.stringify(result),
        });
      } else {
        // Track pending promises
        pendingPromises.push([testName, i, test.value]);

        // Delay processing of subsequent values until the promise resolves
        if (!promiseResolved) {
          promiseResolved = true;

          (async () => {
            for (const [testName, index, promise] of pendingPromises) {
              const resolvedResult = await promise;

              insertAt(newDataTableResults[categoryName], index, {
                id: index,
                testName,
                value: resolvedResult ?? !!check,
                result: result ? "☑️" : "📛",
              });
            }
          })();
        }
      }
      i++;
    }
  }
  return newDataTableResults;
}

function insertAt<T, K extends T>(
  array: T[],
  index: number,
  elementsArray: K
): T[] {
  array.splice(index, 0, elementsArray);
  return array;
}
