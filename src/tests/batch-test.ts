
const testObjects: ObjTest = {
    'Browser Features': [
      { testName: 'CacheStorage', test: 'caches' in window, value: window.caches },
      { testName: 'Cookie (HTTP)', test: !!navigator.cookieEnabled, value: navigator.cookieEnabled },
      { testName: 'Cookie (JS)', test: 'cookieStore' in window, value: window?.cookieStore },
      { testName: 'IndexedDB', test: 'indexedDB' in window, value: window.indexedDB },
      { testName: 'LocalStorage', test: 'localStorage' in window, value: window.localStorage },
      { testName: 'WebSQL Database', test: 'openDatabase' in window, value: window?.openDatabase },
      { testName: 'XMLHttpRequest', test: 'XMLHttpRequest' in window, value: window.XMLHttpRequest },
      { testName: 'ServiceWorker', test: 'serviceWorker' in navigator, value: navigator.serviceWorker },
    ],
    'HTTPS and Encryption': [
      { testName: 'HTTPS', test: window.location.protocol !== 'https:', value: window.location.protocol === 'https:' },
      { testName: 'ECH Enabled', test: 'encrypt' in window.crypto.subtle, value: window.crypto.subtle.encrypt },
    ],
  };
  
  const newDataTableResults: NewTestResults[] = [];

  for (const categoryName of Object.keys(testObjects)) {
    const categoryTests = testObjects[categoryName];
  
    for (const test of categoryTests) {
      const { testName, test: check } = test;
      const result = check ? '☑️' : '📛';
  
      newDataTableResults.push({
        id: newDataTableResults.length,
        testName,
        value: test.value ?? !! check,
        result: typeof result !== 'object' ? result : JSON.stringify(result),
      });
    }
  }