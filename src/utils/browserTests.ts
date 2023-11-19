

export const checkSecurity = () => {
    interface NewTestResults {
        id: number;
        testName: string;
        result: string | boolean;
        status: string;
    }
    const newTestResults: { [key:string] : string | boolean } = {};
    const newDataTableResults: NewTestResults[]  = [];

    // Function to display test results
    const displayResult = (testName:string, result: string | boolean) => {
        const status = result ? '☑️' : '📛';

        // Add the result and status to the dataTableResults object
        newDataTableResults.push({
            id: newDataTableResults.length,
            testName: testName,
            result: result,
            status: status,
        });

        // Save the test result
        newTestResults[testName] = result;
    };

    // CacheStorage
    displayResult('CacheStorage', 'caches' in window && window.caches);

    // Cookie support
    displayResult('Cookie (HTTP)', navigator.cookieEnabled);
    displayResult('Cookie (JS)', 'cookieStore' in window && window.cookieStore );

    // IndexedDB
    displayResult('IndexedDB', 'indexedDB' in window && window.indexedDB );

    // LocalStorage
    displayResult('LocalStorage', 'localStorage' in window && window.localStorage );

    // WebSQL Database
    displayResult('WebSQL Database', 'openDatabase' in window && window.openDatabase );

    // XMLHttpRequest
    displayResult('XMLHttpRequest', 'XMLHttpRequest' in window && window.XMLHttpRequest );

    // ServiceWorker
    displayResult('ServiceWorker', 'serviceWorker' in navigator && navigator.serviceWorker );

    // HTTPS support
    displayResult('HTTPS', window.location.protocol !== 'https:');

    // ECH support
    displayResult('ECH Enabled', 'encrypt' in window.crypto.subtle && window.crypto.subtle.encrypt);

    // IP address leak
    displayResult('IP Address Leak', 'RTCPeerConnection' in window && new window.RTCPeerConnection());

    // Alt-Svc
    displayResult('Alt-Svc', 'AltSvc' in window && window.AltSvc);

    // Blob
    displayResult('Blob', 'Blob' in window && window.Blob);

    // BroadcastChannel
    displayResult('BroadcastChannel', 'BroadcastChannel' in window && new window.BroadcastChannel('test'));

    // Cache API
    displayResult('Cache API', 'caches' in window && window.caches);

    // HSTS cache
    displayResult('HSTS Cache', 'securityPolicy' in document && document.securityPolicy);

    // iframe cache
    displayResult('iframe Cache', 'HTMLIFrameElement' in window && window.HTMLIFrameElement);

    // Image cache
    displayResult('Image Cache', 'createImageBitmap' in window && window.createImageBitmap);

    // Navigation tests
    displayResult('Navigation tests', 'referrerPolicy' in document.createElement('a') && document.createElement('a').referrerPolicy );

    // document.referrer
    displayResult('document.referrer', 'referrer' in document && document.referrer );

    // sessionStorage
    displayResult('sessionStorage', 'sessionStorage' in window && window.sessionStorage );

    // window.name
    displayResult('window.name', 'name' in window && window.name );

    // HTTPS tests
    displayResult('Insecure website', location.protocol === 'http:');

    // Upgradable address
    displayResult('Upgradable address', 'upgrade' in location && location.upgrade );

    // Upgradable hyperlink
    displayResult('Upgradable hyperlink', 'upgrade' in document.createElement('a'));

    // Upgradable image
    displayResult('Upgradable image', 'upgrade' in document.createElement('img'));

    // Upgradable script
    displayResult('Upgradable script', 'upgrade' in document.createElement('script'));

    // Misc tests
    displayResult('ECH enabled', 'echConfig' in navigator && navigator.echConfig);
    displayResult('GPC enabled first-party', 'globalPrivacyControl' in navigator && navigator.globalPrivacyControl);
    displayResult('GPC enabled third-party', 'globalPrivacyControl' in navigator && navigator.globalPrivacyControl);
    displayResult('IP address leak', 'RTCPeerConnection' in window && window.RTCPeerConnection);
    displayResult('Stream isolation – Tor enabled', 'mozAnon' in window && window.mozAnon);

    // Fingerprinting resistance tests
    displayResult('Media query screen height', 'matchMedia' in window && matchMedia('(min-height: 1px)').matches);
    displayResult('Media query screen width', 'matchMedia' in window && matchMedia('(min-width: 1px)').matches);
    displayResult('outerHeight', 'outerHeight' in window && window.outerHeight);
    displayResult('screen.height', 'screen' in window && 'height' in screen && screen.height);
    displayResult('screen.width', 'screen' in window && 'width' in screen && screen.width);
    displayResult('screenX', 'screen' in window && 'screenX' in screen && window.screenX);
    displayResult('screenY', 'screen' in window && 'screenY' in screen && window.screenY);
    displayResult('System font detection', 'fonts' in document && document.fonts);


    // Tracking query parameter tests
    const urlParametersToRemove = ['__hsfp', '__hssc', '__hstc', '__s', '_hsenc', '_openstat', 'dclid', 'fbclid', 'gclid', 'hsCtaTracking', 'mc_eid', 'mkt_tok', 'ml_subscriber', 'ml_subscriber_hash', 'msclkid', 'oly_anon_id', 'oly_enc_id', 'rb_clickid', 's_cid', 'vero_conv', 'vero_id', 'wickedid', 'yclid'];

    displayResult('Remove tracking URL parameters', urlParametersToRemove.every(param => !(param in new URLSearchParams(window.location.search))));

    // Tracker content blocking tests
    const trackingScripts = ['Adobe', 'Adobe Audience Manager', 'Amazon adsystem', 'AppNexus', 'Bing Ads', 'Chartbeat', 'Criteo', 'DoubleClick (Google)', 'Facebook tracking', 'Google (third-party ad pixel)', 'Google Analytics', 'Google Tag Manager', 'Index Exchange', 'New Relic', 'Quantcast', 'Scorecard Research', 'Beacon', 'Taboola', 'Twitter pixel', 'Yandex Ads'];

    displayResult('Block tracking scripts', trackingScripts.every(script => !document.querySelector(`script[src*="${script}"]`)));

    // Tracking cookie protection tests
    const trackingCookies = ['Adobe', 'Adobe Audience Manager', 'Amazon adsystem', 'AppNexus', 'Bing Ads', 'Chartbeat', 'Criteo', 'DoubleClick (Google)', 'Facebook tracking', 'Google (third-party ad pixel)', 'Google Analytics', 'Google Tag Manager', 'Index Exchange', 'New Relic', 'Quantcast', 'Scorecard Research', 'Beacon', 'Taboola', 'Twitter pixel', 'Yandex Ads'];

    displayResult('Block tracking cookies', trackingCookies.every(cookie => !document.cookie.includes(cookie)));

    // Cross-session first-party tracking tests
    displayResult('Cross-session first-party tracking', 'sessionStorage' in window && sessionStorage.getItem('firstPartyTracking') === null);

    // Cross-session third-party tracking tests
    displayResult('Cross-session third-party tracking', 'localStorage' in window && localStorage.getItem('thirdPartyTracking') === null);

    // Misc tests (continued)
    displayResult('Fingerprinting resistance tests (continued)', 'navigator' in window && 'platform' in navigator && navigator.platform === '');
    displayResult('Tracking query parameter tests (continued)', 'URLSearchParams' in window && new URLSearchParams('?test=value').has('test'));
    displayResult('Tracker content blocking tests (continued)', 'crypto' in window && 'subtle' in crypto && 'digest' in crypto.subtle);
    displayResult('Tracking cookie protection tests (continued)', 'cookieStore' in window && 'get' in cookieStore);

    // Cross-session first-party tracking tests (continued)
    if ('sessionStorage' in window) {
        sessionStorage.setItem('firstPartyTracking', 'true');
        displayResult('Cross-session first-party tracking (continued)', sessionStorage.getItem('firstPartyTracking') === 'true');
        sessionStorage.removeItem('firstPartyTracking');
    }

    // Cross-session third-party tracking tests (continued)
    if ('localStorage' in window) {
        localStorage.setItem('thirdPartyTracking', 'true');
        displayResult('Cross-session third-party tracking (continued)', localStorage.getItem('thirdPartyTracking') === 'true');
        localStorage.removeItem('thirdPartyTracking');
    }

    // Language
    const userLanguage = window.navigator.language || window.navigator.userLanguage;
    displayResult('User Language', userLanguage);

    // Other user-related information
    displayResult('User Agent', window.navigator.userAgent);
    displayResult('Platform', window.navigator.platform);

    // **Cookie-related checks**

    // Check for cookie presence
    displayResult('Cookie Presence', document.cookie !== '');

    // **IndexedDB-related checks**

    // Check for IndexedDB database access
    displayResult('IndexedDB Database Access', indexedDB.open !== undefined);

    // Check for IndexedDB database versioning
    displayResult('IndexedDB Database Versioning', indexedDB.open !== undefined && indexedDB.open.onupgradeneeded !== undefined);

    // **LocalStorage-related checks**

    // Check for LocalStorage usage
    displayResult('LocalStorage Usage', localStorage.length > 0);

    // Check for LocalStorage items access
    displayResult('LocalStorage Items Access', localStorage.getItem !== undefined && localStorage.getItem);

    // **WebSQL Database-related checks**

    // Check for WebSQL Database usage
    displayResult('WebSQL Database Usage', window.indexedDB || window.webkitIndexedDB);

    // **XMLHttpRequest-related checks**

    // Check for XMLHttpRequest usage
    displayResult('XMLHttpRequest Usage', window.XMLHttpRequest);

    // Check for XMLHttpRequest CORS headers
    displayResult('XMLHttpRequest CORS Headers', window.XMLHttpRequest.withCredentials !== undefined && window.XMLHttpRequest.withCredentials);

    // **ServiceWorker-related checks**

    // Check for ServiceWorker support
    displayResult('ServiceWorker Support', navigator.serviceWorker);

    // Check for ServiceWorker registration
    displayResult('ServiceWorker Registration', navigator.serviceWorker.register);

    // **HTTPS-related checks**

    // Check for HTTPS strict transport security (HSTS)
    displayResult('HSTS', navigator.securityPolicy && navigator.securityPolicy.includes('strict-transport-security') );

    // Check for HTTPS content type options (CTO)
    displayResult('CTO', document.contentType.startsWith('text/html') && document.contentType.includes('; charset=UTF-8'));

    // **ECH-related checks**

    // Check for ECH support (encrypted client hello)
    displayResult('ECH Support (Continued)', window.crypto.subtle.encrypt !== undefined && window.crypto.subtle.decrypt !== undefined);

    // Check for ECH key exchange mechanism
    displayResult('ECH Key Exchange', 'ECDH' in window.crypto.subtle);

    // **IP address leak checks**

    // Check for IP address leak (RTCPeerConnection)
    displayResult('IP Address Leak (Continued)', new RTCPeerConnection().createDataChannel !== undefined);

    // **Alt-Svc checks**


    // Check for Alt-Svc header content
    displayResult('Alt-Svc Content', document.head.outerHTML.includes('h2o'));

    // **Blob checks**

    // Check for Blob usage
    displayResult('Blob Usage', Blob !== undefined);

    // Check for Blob slicing
    displayResult('Blob Slicing', Blob.prototype.slice !== undefined);

    // **BroadcastChannel checks**

    // Check for BroadcastChannel usage
    displayResult('BroadcastChannel Usage', BroadcastChannel !== undefined);

    // Check for BroadcastChannel message posting
    displayResult('BroadcastChannel Message Posting', BroadcastChannel.prototype.postMessage !== undefined);

    // **Cache API checks**

    // Check for Cache API usage
    displayResult('Cache API (Continued)', caches !== undefined);

    // Check for Cache API storage
    displayResult('Cache API Storage', caches.open !== undefined);


    // Check for screen resolution
    displayResult('Screen Resolution', window.screen.width !== undefined && window.screen.height !== undefined);

    // Check for color depth
    displayResult('Color Depth', window.screen.colorDepth !== undefined);

    // Check for pixel density
    displayResult('Pixel Density', window.devicePixelRatio !== undefined);

    // Check for available fonts
    displayResult('Available Fonts', document.fonts !== undefined && document.fonts.length > 0);

    // Check for installed plugins
    displayResult('Installed Plugins', navigator.plugins !== undefined && navigator.plugins.length > 0);

    // Check for time zone offset
    displayResult('Time Zone Offset', new Date().getTimezoneOffset() !== undefined);

    // Check for user agent string
    displayResult('User Agent String', navigator.userAgent !== undefined);

    // Check for browser language
    displayResult('Browser Language', navigator.language !== undefined && navigator.language !== '');

    // Check for browser version
    displayResult('Browser Version', navigator.appVersion !== undefined && navigator.appVersion !== '');

    // Check for browser vendor
    displayResult('Browser Vendor', navigator.vendor !== undefined && navigator.vendor !== '');

    // Check for browser rendering engine
    displayResult('Browser Rendering Engine', navigator.appName !== undefined && navigator.appName !== '');

    // Check for CPU architecture
    displayResult('CPU Architecture', navigator.cpuClass !== undefined && navigator.cpuClass !== '');

    // Check for operating system
    displayResult('Operating System', navigator.oscpu !== undefined && navigator.oscpu !== '');

    // Check for network connection type
    displayResult('Network Connection Type', navigator.connection !== undefined && navigator.connection.type !== undefined);

    // Check for browser cookie support
    displayResult('Browser Cookie Support', navigator.cookieEnabled !== undefined);

    // Check for browser JavaScript support
    displayResult('Browser JavaScript Support', navigator.javaEnabled !== undefined);

    // Check for browser geolocation support
    displayResult('Browser Geolocation Support', navigator.geolocation !== undefined);

    // Check for browser touch screen support
    displayResult('Browser Touch Screen Support', navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 0);

    // Check for browser accessibility features
    displayResult('Browser Accessibility Features', navigator.onLine !== undefined);

    // Check for browser speech recognition support
    displayResult('Browser Speech Recognition Support', navigator.mediaDevices.getUserMedia !== undefined);

    // Check for browser hardware concurrency
    displayResult('Browser Hardware Concurrency', navigator.hardwareConcurrency !== undefined);

    // Check for browser rendering buffer size
    displayResult('Browser Rendering Buffer Size', navigator.deviceMemory !== undefined && navigator.deviceMemory > 0);

    // Check for browser full screen support
    displayResult('Browser Full Screen Support', document.fullscreenEnabled !== undefined);

    // Check for browser web worker support
    displayResult('Browser Web Worker Support', window.Worker !== undefined);

    // Check for browser shared worker support
    displayResult('Browser Shared Worker Support', window.SharedWorker !== undefined);

    // Check for browser web storage support
    displayResult('Browser Web Storage Support', window.localStorage !== undefined && window.sessionStorage !== undefined);

    // Check for browser indexed DB support
    displayResult('Browser Indexed DB Support', window.indexedDB !== undefined);

    // Check for browser WebSQL support
    displayResult('Browser WebSQL Support', window.openDatabase !== undefined);

    // Check for browser application cache support
    displayResult('Browser Application Cache Support', window.applicationCache !== undefined);

    // Check for browser offline support
    displayResult('Browser Offline Support', window.applicationCache && window.applicationCache.addEventListener !== undefined);

    // Check for browser performance navigation timing support
    displayResult('Browser Performance Navigation Timing Support', window.performance !== undefined && window.performance.getEntries !== undefined);

    // Check for browser timing API support
    displayResult('Browser Timing API Support', window.performance.now !== undefined && window.performance.timing !== undefined);

    // Check for browser memory API support
    displayResult('Browser Memory API Support', window.performance.memory !== undefined);

    // Check for browser navigation timing API support
    displayResult('Browser Navigation Timing API Support', window.performance.getEntriesByType('navigation') !== undefined);
// **Device-related checks**

    // Check for device model
    displayResult('Device Model', navigator.userAgentData.mobile !== undefined && navigator.userAgentData.mobile.model !== undefined);

    // Check for device type
    displayResult('Device Type', navigator.userAgentData.mobile !== undefined && navigator.userAgentData.mobile.type !== undefined);

    // Check for device brand
    displayResult('Device Brand', navigator.userAgentData.mobile !== undefined && navigator.userAgentData.mobile.brand !== undefined);

    // Check for device platform
    displayResult('Device Platform', navigator.userAgentData.platform !== undefined && navigator.userAgentData.platform.toLowerCase() !== 'unknown');

    // Check for device architecture
    displayResult('Device Architecture', navigator.userAgentData.platform !== undefined && navigator.userAgentData.platformArchitecture !== undefined);

    // Check for device OS version
    displayResult('Device OS Version', navigator.userAgentData.platform !== undefined && navigator.userAgentData.platformVersion !== undefined);

    // Check for device battery level
    displayResult('Device Battery Level', navigator.getBattery !== undefined);

// Check for CPU architecture
    displayResult('CPU Architecture', navigator.cpuClass !== undefined && navigator.cpuClass);

    // Check for CPU cores
    displayResult('CPU Cores', navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency);

    // **Memory checks**

    // Check for total system memory
    displayResult('Total System Memory', navigator.deviceMemory !== undefined && navigator.deviceMemory);

    // Check for available system memory
    displayResult('Available System Memory', navigator.memory && navigator.memory.available);

    // **Media device checks**

    // Check for audio input devices
    displayResult('Audio Input Devices', navigator.mediaDevices.enumerateDevices().then(devices => devices.filter(device => device.kind === 'audioinput')));

    // Check for audio output devices
    displayResult('Audio Output Devices', navigator.mediaDevices.enumerateDevices().then(devices => devices.filter(device => device.kind === 'audiooutput')));

    // Check for video input devices
    displayResult('Video Input Devices', navigator.mediaDevices.enumerateDevices().then(devices => devices.filter(device => device.kind === 'videoinput')));

    // Check for screen sharing support
    displayResult('Screen Sharing Support', navigator.mediaDevices.getDisplayMedia !== undefined);

    // Check for device accelerometer support
    displayResult('Device Accelerometer Support', window.DeviceOrientationEvent !== undefined && window.DeviceOrientationEvent.prototype.addEventListener !== undefined);

    // Check for device gyroscope support
    displayResult('Device Gyroscope Support', window.DeviceOrientationEvent !== undefined && window.DeviceOrientationEvent.prototype.addEventListener !== undefined);

    // Check for device light sensor support
    displayResult('Device Light Sensor Support', window.AmbientLightSensor !== undefined && window.AmbientLightSensor.prototype.addEventListener !== undefined);

    // Check for device proximity sensor support
    displayResult('Device Proximity Sensor Support', window.ProximitySensor !== undefined && window.ProximitySensor.prototype.addEventListener !== undefined);

    // **WebRTC-related checks**

    // Check for WebRTC support
    displayResult('WebRTC Support', RTCPeerConnection !== undefined);

    // Check for STUN server support
    displayResult('STUN Server Support', navigator.connection.getSTUNServer !== undefined && navigator.connection.getSTUNServer );

    // Check for TURN server support
    displayResult('TURN Server Support', navigator.connection.getTURNServer !== undefined && navigator.connection.getTURNServer );

    // **Misc checks**

    // Check for screen orientation
    displayResult('Screen Orientation', window.screen.orientation !== undefined && window.screen.orientation.type !== undefined && window.screen.orientation.type);

    // Check for default font family
    displayResult('Default Font Family', document.body.style.fontFamily !== undefined && document.body.style.fontFamily !== '');

    // Check for user preference for reduced motion
    displayResult('User Preference for Reduced Motion', window.matchMedia('prefers-reduced-motion').matches !== undefined);

    // Check for user preference for high contrast
    displayResult('User Preference for High Contrast', window.matchMedia('prefers-contrast').matches !== undefined);

    // Check for user preference for dark theme
    displayResult('User Preference for Dark Theme', window.matchMedia('prefers-color-scheme: dark').matches !== undefined);

    return { newTestResults, newDataTableResults };
}
