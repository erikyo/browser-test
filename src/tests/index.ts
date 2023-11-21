import {getClientIP} from "../utils";

/**
 * Security tests
 * @return {object} Test results object
 */
const checkSecurity = () => {
    const newDataTableResults: {id: number, testName: string, result: string, value: boolean | string | number | object }[] = [];
    const newTestResults = {};

    // Function to display test results
    const displayResult = (response) => {
        const {testName, test} = response as NewTestResults;
        const result: string = test ? '☑️' : '📛';

        // Add the result and status to the dataTableResults object
        newDataTableResults.push({
            id: newDataTableResults.length,
            testName: testName,
            value: response?.value ?? !! test,
            result: typeof result !== 'object' ? result : JSON.stringify(result),
        });

        // Save the test result
        newTestResults[testName] = test;
    };

    // Client IP
    const clientIP = getClientIP();
    displayResult({testName: 'Client IP', test: clientIP, value: clientIP});

    // CacheStorage
    displayResult({testName: 'CacheStorage', test: 'caches' in window, value: window.caches});

    // Cookie support
    displayResult({testName: 'Cookie (HTTP)', test: !!navigator.cookieEnabled, value: navigator.cookieEnabled});
    displayResult({testName: 'Cookie (JS)', test: 'cookieStore' in window, value: window?.cookieStore});

    // IndexedDB
    displayResult({testName: 'IndexedDB', test: 'indexedDB' in window, value: window.indexedDB});

    // LocalStorage
    displayResult({testName: 'LocalStorage', test: 'localStorage' in window, value: window.localStorage});

    // WebSQL Database
    displayResult({testName: 'WebSQL Database', test: 'openDatabase' in window, value: window?.openDatabase});

    // XMLHttpRequest
    displayResult({testName: 'XMLHttpRequest', test: 'XMLHttpRequest' in window, value: window.XMLHttpRequest});

    // ServiceWorker
    displayResult({testName: 'ServiceWorker', test: 'serviceWorker' in navigator, value: navigator.serviceWorker});

    // HTTPS support
    displayResult({testName: 'HTTPS', test: window.location.protocol !== 'https:', value: window.location.protocol === 'https:'});

    // ECH support
    displayResult({testName: 'ECH Enabled', test: 'encrypt' in window.crypto.subtle, value: window.crypto.subtle.encrypt});

// IP address leak
    displayResult({testName: 'IP Address Leak', test: 'RTCPeerConnection' in window, value: new window.RTCPeerConnection()});

// Alt-Svc
    displayResult({testName: 'Alt-Svc', test: 'AltSvc' in window, value: window.AltSvc});

// Blob
    displayResult({testName: 'Blob', test: 'Blob' in window, value: window.Blob});

// BroadcastChannel
    displayResult({testName: 'BroadcastChannel', test: 'BroadcastChannel' in window, value: new window.BroadcastChannel('test')});

// Cache API
    displayResult({testName: 'Cache API', test: 'caches' in window, value: window.caches});

// HSTS cache
    displayResult({testName: 'HSTS Cache', test: 'securityPolicy' in document, value: document?.securityPolicy});

// iframe cache
    displayResult({testName: 'iframe Cache', test: 'HTMLIFrameElement' in window, value: window.HTMLIFrameElement});

// Image cache
    displayResult({testName: 'Image Cache', test: 'createImageBitmap' in window, value: window.createImageBitmap});

// document.referrer
    displayResult({testName: 'document.referrer', test: 'referrer' in document, value: document.referrer});

// sessionStorage
    displayResult({testName: 'sessionStorage', test: 'sessionStorage' in window, value: window.sessionStorage});

// window.name
    displayResult({testName: 'window.name', test: 'name' in window, value: window.name});

// HTTPS tests
    displayResult({testName: 'Insecure website', test: location.protocol === 'http:'});

// Upgradable address
    displayResult({testName: 'Upgradable address', test: 'upgrade' in location, value: location.upgrade});

// Upgradable hyperlink
    displayResult({testName: 'Upgradable hyperlink', test: 'upgrade' in document.createElement('a')});

// Upgradable image
    displayResult({testName: 'Upgradable image', test: 'upgrade' in document.createElement('img')});

// Upgradable script
    displayResult({testName: 'Upgradable script', test: 'upgrade' in document.createElement('script')});

// Misc tests
    displayResult({testName: 'ECH enabled', test: 'echConfig' in navigator, value: navigator.echConfig});
    displayResult({testName: 'GPC enabled first-party', test: 'globalPrivacyControl' in navigator, value: navigator.globalPrivacyControl});
    displayResult({testName: 'GPC enabled third-party', test: 'globalPrivacyControl' in navigator, value: navigator.globalPrivacyControl});
    displayResult({testName: 'IP address leak', test: 'RTCPeerConnection' in window, value: window.RTCPeerConnection});
    displayResult({testName: 'Stream isolation – Tor enabled', test: 'mozAnon' in window, value: window.mozAnon});

// Fingerprinting resistance tests
    displayResult({testName: 'Media query screen height', test: 'matchMedia' in window, value: matchMedia('(min-height: 1px)').matches});
    displayResult({testName: 'Media query screen width', test: 'matchMedia' in window, value: matchMedia('(min-width: 1px)').matches});
    displayResult({testName: 'outerHeight', test: 'outerHeight' in window, value: window.outerHeight});
    displayResult({testName: 'screen.height', test: 'screen' in window && 'height' in screen, value: screen.height});
    displayResult({testName: 'screen.width', test: 'screen' in window && 'width' in screen, value: screen.width});
    displayResult({testName: 'screenX', test: 'screen' in window && 'screenX' in screen, value: window.screenX});
    displayResult({testName: 'screenY', test: 'screen' in window && 'screenY' in screen, value: window.screenY});
    displayResult({testName: 'System font detection', test: 'fonts' in document, value: document.fonts});

// Tracking query parameter tests
    const urlParametersToRemove = ['__hsfp', '__hssc', '__hstc', '__s', '_hsenc', '_openstat', 'dclid', 'fbclid', 'gclid', 'hsCtaTracking', 'mc_eid', 'mkt_tok', 'ml_subscriber', 'ml_subscriber_hash', 'msclkid', 'oly_anon_id', 'oly_enc_id', 'rb_clickid', 's_cid', 'vero_conv', 'vero_id', 'wickedid', 'yclid'];
    displayResult({testName: 'Remove tracking URL parameters', test: urlParametersToRemove.every(param => !(param in new URLSearchParams(window.location.search)))});

// Tracker content blocking tests
    const trackingScripts = ['Adobe', 'Adobe Audience Manager', 'Amazon adsystem', 'AppNexus', 'Bing Ads', 'Chartbeat', 'Criteo', 'DoubleClick (Google)', 'Facebook tracking', 'Google (third-party ad pixel)', 'Google Analytics', 'Google Tag Manager', 'Index Exchange', 'New Relic', 'Quantcast', 'Scorecard Research', 'Beacon', 'Taboola', 'Twitter pixel', 'Yandex Ads'];
    displayResult({testName: 'Block tracking scripts', test: trackingScripts.every(script => !document.querySelector(`script[src*="${script}"]`))});

// Tracking cookie protection tests
    const trackingCookies = ['Adobe', 'Adobe Audience Manager', 'Amazon adsystem', 'AppNexus', 'Bing Ads', 'Chartbeat', 'Criteo', 'DoubleClick (Google)', 'Facebook tracking', 'Google (third-party ad pixel)', 'Google Analytics', 'Google Tag Manager', 'Index Exchange', 'New Relic', 'Quantcast', 'Scorecard Research', 'Beacon', 'Taboola', 'Twitter pixel', 'Yandex Ads'];
    displayResult({testName: 'Block tracking cookies', test: trackingCookies.every(cookie => !document.cookie.includes(cookie))});

// Cross-session first-party tracking tests
    displayResult({testName: 'Cross-session first-party tracking', test: 'sessionStorage' in window, value: sessionStorage.getItem('firstPartyTracking') === null});

// Cross-session third-party tracking tests
    displayResult({testName: 'Cross-session third-party tracking', test: 'localStorage' in window, value: localStorage.getItem('thirdPartyTracking') === null});

// Misc tests (continued)
    displayResult({testName: 'Fingerprinting resistance tests (continued)', test: 'navigator' in window && 'platform' in navigator && navigator.platform === ''});
    displayResult({testName: 'Tracking query parameter tests (continued)', test: 'URLSearchParams' in window && new URLSearchParams('?test=value').has('test')});
    displayResult({testName: 'Tracker content blocking tests (continued)', test: 'crypto' in window && 'subtle' in crypto && 'digest' in crypto.subtle});
    displayResult({testName: 'Tracking cookie protection tests (continued)', test: 'cookieStore' in window && 'get' in cookieStore});

// Cross-session first-party tracking tests (continued)
    if ('sessionStorage' in window) {
        sessionStorage.setItem('firstPartyTracking', 'true');
        displayResult({testName: 'Cross-session first-party tracking (continued)', test: sessionStorage.getItem('firstPartyTracking') === 'true'});
        sessionStorage.removeItem('firstPartyTracking');
    }

// Cross-session third-party tracking tests (continued)
    if ('localStorage' in window) {
        localStorage.setItem('thirdPartyTracking', 'true');
        displayResult({testName: 'Cross-session third-party tracking (continued)', test: localStorage.getItem('thirdPartyTracking') === 'true'});
        localStorage.removeItem('thirdPartyTracking');
    }

// Language
    const userLanguage = window.navigator.language || window.navigator.userLanguage;
    displayResult({testName: 'User Language', test: userLanguage});

// Other user-related information
    displayResult({testName: 'User Agent', test: window.navigator.userAgent});
    displayResult({testName: 'Platform', test: window.navigator.platform});

    // **Cookie-related checks**

    // Check for cookie presence
    displayResult({testName: 'Cookie Presence', test: document.cookie !== ''});

// IndexedDB-related checks

// Check for IndexedDB database access
    displayResult({testName: 'IndexedDB Database Access', test: 'indexedDB' in window, value: window.indexedDB.open !== undefined});

// Check for IndexedDB database versioning
    displayResult({testName: 'IndexedDB Database Versioning', test: 'indexedDB' in window && window.indexedDB.open !== undefined, value: window.indexedDB.open.onupgradeneeded !== undefined});

// LocalStorage-related checks

// Check for LocalStorage usage
    displayResult({testName: 'LocalStorage Usage', test: 'localStorage' in window, value: window.localStorage.length > 0});

// Check for LocalStorage items access
    displayResult({testName: 'LocalStorage Items Access', test: 'localStorage' in window, value: window.localStorage.getItem !== undefined});

// WebSQL Database-related checks

// Check for WebSQL Database usage
    displayResult({testName: 'WebSQL Database Usage', test: ('indexedDB' in window || 'webkitIndexedDB' in window), value: window.openDatabase !== undefined});

// XMLHttpRequest-related checks

// Check for XMLHttpRequest usage
    displayResult({testName: 'XMLHttpRequest Usage', test: 'XMLHttpRequest' in window, value: window.XMLHttpRequest});

// Check for XMLHttpRequest CORS headers
    displayResult({testName: 'XMLHttpRequest CORS Headers', test: 'XMLHttpRequest' in window && window.XMLHttpRequest.withCredentials !== undefined, value: window.XMLHttpRequest.withCredentials});

// ServiceWorker-related checks

// Check for ServiceWorker support
    displayResult({testName: 'ServiceWorker Support', test: 'serviceWorker' in navigator && navigator?.serviceWorker});

// Check for ServiceWorker registration
    displayResult({testName: 'ServiceWorker Registration', test: 'serviceWorker' in navigator, value: 'register' in navigator.serviceWorker});

// HTTPS-related checks

// Check for HTTPS strict transport security (HSTS)
    displayResult({testName: 'HSTS', test: 'securityPolicy' in document, value: document.securityPolicy?.includes('strict-transport-security')});

// Check for HTTPS content type options (CTO)
    displayResult({testName: 'CTO', test: document.contentType.startsWith('text/html'), value: document.contentType.includes('; charset=UTF-8')});

// ECH-related checks

// Check for ECH support (encrypted client hello)
    displayResult({testName: 'ECH Support (Continued)', test: 'crypto' in window && 'subtle' in crypto && 'encrypt' in crypto.subtle && 'decrypt' in crypto.subtle});

// Check for ECH key exchange mechanism
    displayResult({testName: 'ECH Key Exchange', test: 'crypto' in window && 'subtle' in crypto && 'ECDH' in crypto.subtle});

// IP address leak checks

// Check for IP address leak (RTCPeerConnection)
    displayResult({testName: 'IP Address Leak (Continued)', test: 'RTCPeerConnection' in window, value: new RTCPeerConnection().createDataChannel !== undefined});

// Alt-Svc checks

// Check for Alt-Svc header content
    displayResult({testName: 'Alt-Svc Content', test: 'AltSvc' in window && document.head.outerHTML.includes('h2o'), value: document.head.outerHTML});

// Blob checks

// Check for Blob usage
    displayResult({testName: 'Blob Usage', test: 'Blob' in window && window.Blob !== undefined});

// Check for Blob slicing
    displayResult({testName: 'Blob Slicing', test: 'Blob' in window && 'slice' in Blob.prototype});

// BroadcastChannel checks

// Check for BroadcastChannel usage
    displayResult({testName: 'BroadcastChannel Usage', test: 'BroadcastChannel' in window && window.BroadcastChannel !== undefined});

// Check for BroadcastChannel message posting
    displayResult({testName: 'BroadcastChannel Message Posting', test: 'BroadcastChannel' in window && 'prototype' in window.BroadcastChannel && 'postMessage' in window.BroadcastChannel.prototype});

// Cache API checks

// Check for Cache API usage
    displayResult({testName: 'Cache API (Continued)', test: 'caches' in window && window.caches !== undefined});

// Check for Cache API storage
    displayResult({testName: 'Cache API Storage', test: 'caches' in window && 'open' in caches});


// Check for screen resolution
    displayResult({testName: 'Screen Resolution', test: window.screen.width !== undefined && window.screen.height !== undefined});

// Check for color depth
    displayResult({testName: 'Color Depth', test: window.screen.colorDepth !== undefined});

// Check for pixel density
    displayResult({testName: 'Pixel Density', test: window.devicePixelRatio !== undefined});

// Check for available fonts
    displayResult({testName: 'Available Fonts', test: 'fonts' in document && document.fonts !== undefined && document.fonts.length > 0});

// Check for installed plugins
    displayResult({testName: 'Installed Plugins', test: navigator?.plugins !== undefined, value: navigator.plugins});

// Check for time zone offset
    displayResult({testName: 'Time Zone Offset', test: new Date().getTimezoneOffset() !== undefined});

// Check for user agent string
    displayResult({testName: 'User Agent String', test: navigator.userAgent !== undefined});

// Check for browser language
    displayResult({testName: 'Browser Language', test: navigator.language !== undefined, value: navigator.language !== ''});

// Check for browser version
    displayResult({testName: 'Browser Version', test: navigator?.appVersion !== undefined, value: navigator.appVersion !== ''});

// Check for browser vendor
    displayResult({testName: 'Browser Vendor', test: navigator?.vendor !== undefined, value: navigator.vendor !== ''});

// Check for browser rendering engine
    displayResult({testName: 'Browser Rendering Engine', test: navigator?.appName !== undefined, value: navigator.appName !== ''});

// Check for CPU architecture
    displayResult({testName: 'CPU Architecture', test: navigator?.cpuClass !== undefined, value: navigator?.cpuClass !== ''});

// Check for operating system
    displayResult({testName: 'Operating System', test: navigator?.oscpu !== undefined, value: navigator?.oscpu !== ''});

// Check for network connection type
    displayResult({testName: 'Network Connection Type', test: 'connection' in navigator, value: navigator?.connection?.type !== undefined});

// Check for browser cookie support
    displayResult({testName: 'Browser Cookie Support', test: navigator.cookieEnabled !== undefined});

// Check for browser JavaScript support
    displayResult({testName: 'Browser JavaScript Support', test: navigator.javaEnabled !== undefined});


// Check for browser geolocation support
    displayResult({testName: 'Browser Geolocation Support', test: 'geolocation' in navigator, value: navigator.geolocation !== undefined});

// Check for browser touch screen support
    displayResult({testName: 'Browser Touch Screen Support', test: navigator.maxTouchPoints !== undefined, value: navigator.maxTouchPoints > 0});

// Check for browser accessibility features
    displayResult({testName: 'Browser Accessibility Features', test: 'onLine' in navigator, value: navigator.onLine !== undefined});

// Check for browser speech recognition support
    displayResult({testName: 'Browser Speech Recognition Support', test: 'mediaDevices' in navigator, value: navigator.mediaDevices.getUserMedia !== undefined});

// Check for browser hardware concurrency
    displayResult({testName: 'Browser Hardware Concurrency', test: navigator.hardwareConcurrency !== undefined});

// Check for browser rendering buffer size
    displayResult({testName: 'Browser Rendering Buffer Size', test: navigator.deviceMemory !== undefined, value: navigator.deviceMemory > 0});

// Check for browser full screen support
    displayResult({testName: 'Browser Full Screen Support', test: 'fullscreenEnabled' in document, value: document.fullscreenEnabled !== undefined});

// Check for browser web worker support
    displayResult({testName: 'Browser Web Worker Support', test: 'Worker' in window, value: window.Worker !== undefined});

// Check for browser shared worker support
    displayResult({testName: 'Browser Shared Worker Support', test: 'SharedWorker' in window, value: window.SharedWorker !== undefined});

// Check for browser web storage support
    displayResult({testName: 'Browser Web Storage Support', test: 'localStorage' in window && 'sessionStorage' in window && window.localStorage !== undefined, value: window.sessionStorage !== undefined});

// Check for browser indexed DB support
    displayResult({testName: 'Browser Indexed DB Support', test: 'indexedDB' in window, value: window.indexedDB !== undefined});

// Check for browser WebSQL support
    displayResult({testName: 'Browser WebSQL Support', test: 'openDatabase' in window, value: window.openDatabase !== undefined});

// Check for browser application cache support
    displayResult({testName: 'Browser Application Cache Support', test: 'applicationCache' in window, value: window.applicationCache !== undefined});

// Check for browser offline support
    displayResult({testName: 'Browser Offline Support', test: 'applicationCache' in window && 'addEventListener' in window.applicationCache, value: window.applicationCache?.addEventListener !== undefined});

    // Check for browser performance navigation timing support
    displayResult({testName: 'Browser Performance Navigation Timing Support', test: 'performance' in window, value: window.performance?.getEntries !== undefined});

// Check for browser timing API support
    displayResult({testName: 'Browser Timing API Support', test: 'performance' in window && window.performance?.now !== undefined, value: window.performance?.timing !== undefined});

// Check for browser memory API support
    displayResult({testName: 'Browser Memory API Support', test: 'performance' in window, value: window.performance?.memory !== undefined});

// Check for browser navigation timing API support
    displayResult({testName: 'Browser Navigation Timing API Support', test: 'performance' in window, value: window.performance?.getEntriesByType('navigation') !== undefined});

// **Device-related checks**

// Check for device model
    displayResult({testName: 'Device Model', test: 'userAgentData' in navigator && navigator.userAgentData?.mobile !== undefined, value: navigator?.userAgentData?.mobile.model !== undefined});

// Check for device type
    displayResult({testName: 'Device Type', test: 'userAgentData' in navigator && navigator.userAgentData?.mobile !== undefined, value: navigator?.userAgentData?.mobile.type !== undefined});

// Check for device brand
    displayResult({testName: 'Device Brand', test: 'userAgentData' in navigator && navigator.userAgentData?.mobile !== undefined, value: navigator?.userAgentData?.mobile.brand !== undefined});

// Check for device platform
    displayResult({testName: 'Device Platform', test: 'userAgentData' in navigator && navigator.userAgentData?.platform !== undefined, value: navigator?.userAgentData?.platform.toLowerCase() !== 'unknown'});

// Check for device architecture
    displayResult({testName: 'Device Architecture', test: 'userAgentData' in navigator && navigator.userAgentData?.platform !== undefined, value: navigator?.userAgentData?.platformArchitecture !== undefined});

// Check for device OS version
    displayResult({testName: 'Device OS Version', test: 'userAgentData' in navigator && navigator.userAgentData?.platform !== undefined, value: navigator?.userAgentData?.platformVersion !== undefined});

// Check for device battery level
    displayResult({testName: 'Device Battery Level', test: 'getBattery' in navigator, value: navigator.getBattery !== undefined});

// Check for CPU architecture
    displayResult({testName: 'CPU Architecture', test: 'cpuClass' in navigator, value: navigator.cpuClass});

// Check for CPU cores
    displayResult({testName: 'CPU Cores', test: 'hardwareConcurrency' in navigator, value: navigator.hardwareConcurrency});

// **Memory checks**

// Check for total system memory
    displayResult({testName: 'Total System Memory', test: 'deviceMemory' in navigator, value: navigator.deviceMemory});

// Check for available system memory
    displayResult({testName: 'Available System Memory', test: 'memory' in navigator && 'available' in navigator.memory});

// **Media device checks**

// Check for audio input devices
    displayResult({testName: 'Audio Input Devices', test: 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices});

// Check for audio output devices
    displayResult({testName: 'Audio Output Devices', test: 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices});

// Check for video input devices
    displayResult({testName: 'Video Input Devices', test: 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices});

// Check for screen sharing support
    displayResult({testName: 'Screen Sharing Support', test: 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices});

// Check for device accelerometer support
    displayResult({testName: 'Device Accelerometer Support', test: 'DeviceOrientationEvent' in window &&'addEventListener' in window.DeviceOrientationEvent.prototype});

// Check for device gyroscope support
    displayResult({testName: 'Device Gyroscope Support', test: 'DeviceOrientationEvent' in window && 'addEventListener' in window.DeviceOrientationEvent.prototype});

// Check for device light sensor support
    displayResult({testName: 'Device Light Sensor Support', test: 'AmbientLightSensor' in window && 'addEventListener' in window.AmbientLightSensor.prototype});

// Check for device proximity sensor support
    displayResult({testName: 'Device Proximity Sensor Support', test: 'ProximitySensor' in window && 'addEventListener' in window.ProximitySensor.prototype});

// **WebRTC-related checks**

// Check for WebRTC support
    displayResult({testName: 'WebRTC Support', test: 'RTCPeerConnection' in window});

// Check for STUN server support
    displayResult({testName: 'STUN Server Support', test: 'connection' in navigator && 'getSTUNServer' in navigator.connection, value: navigator?.connection?.getSTUNServer});

// Check for TURN server support
    displayResult({testName: 'TURN Server Support', test: 'connection' in navigator && 'getTURNServer' in navigator.connection, value: navigator?.connection?.getTURNServer});

// **Misc checks**

// Check for screen orientation
    displayResult({testName: 'Screen Orientation', test: 'screen' in window && 'orientation' in window.screen && 'type' in window.screen.orientation, value: window.screen.orientation });

// Check for default font family
    displayResult({testName: 'Default Font Family', test: 'body' in document && 'style' in document.body && 'fontFamily' in document.body.style, value: document.body.style });

// Check for user preference for reduced motion
    displayResult({testName: 'User Preference for Reduced Motion', test: 'matchMedia' in window && 'matches' in window.matchMedia('prefers-reduced-motion')});

    displayResult({testName: 'User Preference for High Contrast', test: 'matchMedia' in window && 'matches' in window.matchMedia('prefers-contrast')});

// Check for user preference for dark theme
    displayResult({testName: 'User Preference for Dark Theme', test: 'matchMedia' in window && 'matches' in window.matchMedia('prefers-color-scheme: dark')});

    return {newTestResults, newDataTableResults}

}

export default checkSecurity;
