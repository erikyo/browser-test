import { getClientIP } from "../utils";

//const clientIPPromise = getClientIP(); 

const urlParametersToRemove = ['__hsfp', '__hssc', '__hstc', '__s', '_hsenc', '_openstat', 'dclid', 'fbclid', 'gclid', 'hsCtaTracking', 'mc_eid', 'mkt_tok', 'ml_subscriber', 'ml_subscriber_hash', 'msclkid', 'oly_anon_id', 'oly_enc_id', 'rb_clickid', 's_cid', 'vero_conv', 'vero_id', 'wickedid', 'yclid'];
const trackingScripts = ['Adobe', 'Adobe Audience Manager', 'Amazon adsystem', 'AppNexus', 'Bing Ads', 'Chartbeat', 'Criteo', 'DoubleClick (Google)', 'Facebook tracking', 'Google (third-party ad pixel)', 'Google Analytics', 'Google Tag Manager', 'Index Exchange', 'New Relic', 'Quantcast', 'Scorecard Research', 'Beacon', 'Taboola', 'Twitter pixel', 'Yandex Ads'];
const trackingCookies = ['Adobe', 'Adobe Audience Manager', 'Amazon adsystem', 'AppNexus', 'Bing Ads', 'Chartbeat', 'Criteo', 'DoubleClick (Google)', 'Facebook tracking', 'Google (third-party ad pixel)', 'Google Analytics', 'Google Tag Manager', 'Index Exchange', 'New Relic', 'Quantcast', 'Scorecard Research', 'Beacon', 'Taboola', 'Twitter pixel', 'Yandex Ads'];
const userLanguage = window.navigator.language || window.navigator.userLanguage;

export const testObjects: ObjTest = {
    'Browser Features': [
        { testName: 'Client IP', test: '', value: getClientIP()},
        // CacheStorage
        { testName: 'CacheStorage', test: 'caches' in window, value: window.caches },
        // Cookie support
        { testName: 'Cookie (HTTP)', test: !!navigator.cookieEnabled, value: navigator.cookieEnabled },
        { testName: 'Cookie (JS)', test: 'cookieStore' in window, value: window?.cookieStore },
        // IndexedDB
        { testName: 'IndexedDB', test: 'indexedDB' in window, value: window.indexedDB },
        // LocalStorage
        { testName: 'LocalStorage', test: 'localStorage' in window, value: window.localStorage },
        // WebSQL Database
        { testName: 'WebSQL Database', test: 'openDatabase' in window, value: window?.openDatabase },
        // XMLHttpRequest
        { testName: 'XMLHttpRequest', test: 'XMLHttpRequest' in window, value: window.XMLHttpRequest },
        // ServiceWorker
        { testName: 'ServiceWorker', test: 'serviceWorker' in navigator, value: navigator.serviceWorker },
        // HTTPS support
        { testName: 'HTTPS', test: window.location.protocol !== 'https:', value: window.location.protocol === 'https:' },
        // ECH support
        { testName: 'ECH Enabled', test: 'encrypt' in window.crypto.subtle, value: window.crypto.subtle.encrypt },
        // IP address leak
        { testName: 'IP Address Leak', test: 'RTCPeerConnection' in window, value: new window.RTCPeerConnection() },
        // Alt-Svc
        { testName: 'Alt-Svc', test: 'AltSvc' in window, value: window.AltSvc },
        // Blob
        { testName: 'Blob', test: 'Blob' in window, value: window.Blob },
        // BroadcastChannel
        { testName: 'BroadcastChannel', test: 'BroadcastChannel' in window, value: new window.BroadcastChannel('test') },
        // Cache API
        { testName: 'Cache API', test: 'caches' in window, value: window.caches },
        // HSTS cache
        { testName: 'HSTS Cache', test: 'securityPolicy' in document, value: document?.securityPolicy },
        // iframe cache
        { testName: 'iframe Cache', test: 'HTMLIFrameElement' in window, value: window.HTMLIFrameElement },
        // Image cache
        { testName: 'Image Cache', test: 'createImageBitmap' in window, value: window.createImageBitmap },
        // document.referrer
        { testName: 'document.referrer', test: 'referrer' in document, value: document.referrer },
        // sessionStorage
        { testName: 'sessionStorage', test: 'sessionStorage' in window, value: window.sessionStorage },
        // window.name
        { testName: 'window.name', test: 'name' in window, value: window.name },
        // HTTPS tests
        { testName: 'Insecure website', test: location.protocol === 'http:' },
        // Upgradable address
        { testName: 'Upgradable address', test: 'upgrade' in location, value: location.upgrade },
        // Upgradable hyperlink
        { testName: 'Upgradable hyperlink', test: 'upgrade' in document.createElement('a') },
        // Upgradable image
        { testName: 'Upgradable image', test: 'upgrade' in document.createElement('img') },
        // Upgradable script
        { testName: 'Upgradable script', test: 'upgrade' in document.createElement('script') },
    ],
    'Fingerprinting resistance tests': [
        { testName: 'Media query screen height', test: 'matchMedia' in window, value: matchMedia('(min-height: 1px)').matches },
        { testName: 'Media query screen width', test: 'matchMedia' in window, value: matchMedia('(min-width: 1px)').matches },
        { testName: 'outerHeight', test: 'outerHeight' in window, value: window.outerHeight },
        { testName: 'screen.height', test: 'screen' in window && 'height' in screen, value: screen.height },
        { testName: 'screen.width', test: 'screen' in window && 'width' in screen, value: screen.width },
        { testName: 'screenX', test: 'screen' in window && 'screenX' in screen, value: window.screenX },
        { testName: 'screenY', test: 'screen' in window && 'screenY' in screen, value: window.screenY },
        { testName: 'System font detection', test: 'fonts' in document, value: document.fonts },
    ],
    'Misc Tests':
        [{ testName: 'ECH enabled', test: 'echConfig' in navigator, value: navigator.echConfig },
        { testName: 'GPC enabled first-party', test: 'globalPrivacyControl' in navigator, value: navigator.globalPrivacyControl },
        { testName: 'GPC enabled third-party', test: 'globalPrivacyControl' in navigator, value: navigator.globalPrivacyControl },
        { testName: 'IP address leak', test: 'RTCPeerConnection' in window, value: window.RTCPeerConnection },
        { testName: 'Stream isolation – Tor enabled', test: 'mozAnon' in window, value: window.mozAnon },
    ],

    'Trackers': [
        { testName: 'Remove tracking URL parameters', test: urlParametersToRemove.every(param => !(param in new URLSearchParams(window.location.search))) },
        // Tracker content blocking tests
        { testName: 'Block tracking scripts', test: trackingScripts.every(script => !document.querySelector(`script[src*="${script}"]`)) },
        // Tracking cookie protection tests
        { testName: 'Block tracking cookies', test: trackingCookies.every(cookie => !document.cookie.includes(cookie)) },
    ],
    'Cross-Session': [// Cross-session first-party tracking tests
        { testName: 'Cross-session first-party tracking', test: 'sessionStorage' in window, value: sessionStorage.getItem('firstPartyTracking') === null },
        // Cross-session third-party tracking tests
        { testName: 'Cross-session third-party tracking', test: 'localStorage' in window, value: localStorage.getItem('thirdPartyTracking') === null },
        {
            testName: 'Cross-session first-party tracking (continued)',
            test: (async () => {
                if ('sessionStorage' in window) {
                    sessionStorage.setItem('firstPartyTracking', 'true');
                    const isFirstPartyTrackingEnabled = await sessionStorage.getItem('firstPartyTracking') === 'true';
                    sessionStorage.removeItem('firstPartyTracking');
                    return isFirstPartyTrackingEnabled;
                }
                return false;
            })(),
            value: null,
        },
        {
            testName: 'Cross-session third-party tracking (continued)',
            test: (async () => {
                if ('localStorage' in window) {
                    localStorage.setItem('thirdPartyTracking', 'true');
                    const isThirdPartyTrackingEnabled = await localStorage.getItem('thirdPartyTracking') === 'true';
                    localStorage.removeItem('thirdPartyTracking');
                    return isThirdPartyTrackingEnabled;
                }
                return false;
            })(),
            value: null,
        },
    ],
    'Misc tests (continued)': [
        { testName: 'Fingerprinting resistance tests (continued)', test: 'navigator' in window && 'platform' in navigator && navigator.platform === '' },
        { testName: 'Tracking query parameter tests (continued)', test: 'URLSearchParams' in window && new URLSearchParams('?test=value').has('test') },
        { testName: 'Tracker content blocking tests (continued)', test: 'crypto' in window && 'subtle' in crypto && 'digest' in crypto.subtle },
        { testName: 'Tracking cookie protection tests (continued)', test: 'cookieStore' in window && 'get' in cookieStore },
    ],
    'Language': [
        { testName: 'User Language', test: userLanguage },
    ],
    'Other user-related information': [
        { testName: 'User Agent', test: window.navigator.userAgent },
        { testName: 'Platform', test: window.navigator.platform },
    ],
    'Cookie-related checks': [
        // Check for cookie presence
        { testName: 'Cookie Presence', test: document.cookie !== '' },
    ],
    'IndexedDB-related checks': [
        // Check for IndexedDB database access
        { testName: 'IndexedDB Database Access', test: 'indexedDB' in window, value: window.indexedDB.open !== undefined },
        // Check for IndexedDB database versioning
        { testName: 'IndexedDB Database Versioning', test: 'indexedDB' in window && window.indexedDB.open !== undefined, value: window.indexedDB.open.onupgradeneeded !== undefined },
    ],
    'LocalStorage-related checks': [
        // Check for LocalStorage usage
        { testName: 'LocalStorage Usage', test: 'localStorage' in window, value: window.localStorage.length > 0 },
        // Check for LocalStorage items access
        { testName: 'LocalStorage Items Access', test: 'localStorage' in window, value: window.localStorage.getItem !== undefined },
        // WebSQL Database-related checks
        // Check for WebSQL Database usage
        { testName: 'WebSQL Database Usage', test: ('indexedDB' in window || 'webkitIndexedDB' in window), value: window.openDatabase !== undefined },
    ],
    'XMLHttpRequest-related checks': [
        // Check for XMLHttpRequest usage
        { testName: 'XMLHttpRequest Usage', test: 'XMLHttpRequest' in window, value: window.XMLHttpRequest },
        // Check for XMLHttpRequest CORS headers
        { testName: 'XMLHttpRequest CORS Headers', test: 'XMLHttpRequest' in window && window.XMLHttpRequest.withCredentials !== undefined, value: window.XMLHttpRequest.withCredentials },
    ],
    'ServiceWorker-related checks': [
        // Check for ServiceWorker support
        { testName: 'ServiceWorker Support', test: 'serviceWorker' in navigator && navigator?.serviceWorker },
        // Check for ServiceWorker registration
        { testName: 'ServiceWorker Registration', test: 'serviceWorker' in navigator, value: 'register' in navigator.serviceWorker },
    ],
    'HTTPS-related checks': [
        // Check for HTTPS strict transport security (HSTS)
        { testName: 'HSTS', test: 'securityPolicy' in document, value: document.securityPolicy?.includes('strict-transport-security') },
        // Check for HTTPS content type options (CTO)
        { testName: 'CTO', test: document.contentType.startsWith('text/html'), value: document.contentType.includes('; charset=UTF-8') },
    ],
    'ECH-related checks': [
        // Check for ECH support (encrypted client hello)
        { testName: 'ECH Support (Continued)', test: 'crypto' in window && 'subtle' in crypto && 'encrypt' in crypto.subtle && 'decrypt' in crypto.subtle },
        // Check for ECH key exchange mechanism
        { testName: 'ECH Key Exchange', test: 'crypto' in window && 'subtle' in crypto && 'ECDH' in crypto.subtle },
    ],
    'IP address leak checks': [
        // Check for IP address leak (RTCPeerConnection)
        { testName: 'IP Address Leak (Continued)', test: 'RTCPeerConnection' in window, value: new RTCPeerConnection().createDataChannel !== undefined },
    ],
    'Alt-Svc checks': [
        // Check for Alt-Svc header content
        { testName: 'Alt-Svc Content', test: 'AltSvc' in window && document.head.outerHTML.includes('h2o'), value: document.head.outerHTML },
    ],
    'Blob checks': [
        // Check for Blob usage
        { testName: 'Blob Usage', test: 'Blob' in window && window.Blob !== undefined },
        // Check for Blob slicing
        { testName: 'Blob Slicing', test: 'Blob' in window && 'slice' in Blob.prototype },
    ],
    'BroadcastChannel checks': [
        // Check for BroadcastChannel usage
        { testName: 'BroadcastChannel Usage', test: 'BroadcastChannel' in window && window.BroadcastChannel !== undefined },
        // Check for BroadcastChannel message posting
        { testName: 'BroadcastChannel Message Posting', test: 'BroadcastChannel' in window && 'prototype' in window.BroadcastChannel && 'postMessage' in window.BroadcastChannel.prototype },
    ],
    'Cache API checks': [
        // Check for Cache API usage
        { testName: 'Cache API (Continued)', test: 'caches' in window && window.caches !== undefined },
        // Check for Cache API storage
        { testName: 'Cache API Storage', test: 'caches' in window && 'open' in caches },
    ],
    'Client Browser Support': [
        // Check for screen resolution
        { testName: 'Screen Resolution', test: window.screen.width !== undefined && window.screen.height !== undefined },
        // Check for color depth
        { testName: 'Color Depth', test: window.screen.colorDepth !== undefined },
        // Check for pixel density
        { testName: 'Pixel Density', test: window.devicePixelRatio !== undefined },
        // Check for available fonts
        { testName: 'Available Fonts', test: 'fonts' in document && document.fonts !== undefined && document.fonts.length > 0 },
        // Check for installed plugins
        { testName: 'Installed Plugins', test: navigator?.plugins !== undefined, value: navigator.plugins },
        // Check for time zone offset
        { testName: 'Time Zone Offset', test: new Date().getTimezoneOffset() !== undefined },
        // Check for user agent string
        { testName: 'User Agent String', test: navigator.userAgent !== undefined },
        // Check for browser language
        { testName: 'Browser Language', test: navigator.language !== undefined, value: navigator.language !== '' },
        // Check for browser version
        { testName: 'Browser Version', test: navigator?.appVersion !== undefined, value: navigator.appVersion !== '' },
        // Check for browser vendor
        { testName: 'Browser Vendor', test: navigator?.vendor !== undefined, value: navigator.vendor !== '' },
        // Check for browser rendering engine
        { testName: 'Browser Rendering Engine', test: navigator?.appName !== undefined, value: navigator.appName !== '' },
        // Check for CPU architecture
        { testName: 'CPU Architecture', test: navigator?.cpuClass !== undefined, value: navigator?.cpuClass !== '' },
        // Check for operating system
        { testName: 'Operating System', test: navigator?.oscpu !== undefined, value: navigator?.oscpu !== '' },
        // Check for network connection type
        { testName: 'Network Connection Type', test: 'connection' in navigator, value: navigator?.connection?.type !== undefined },
        // Check for browser cookie support
        { testName: 'Browser Cookie Support', test: navigator.cookieEnabled !== undefined },
        // Check for browser JavaScript support
        { testName: 'Browser JavaScript Support', test: navigator.javaEnabled !== undefined },
    ],
    'Client Browser properties': [
        // Check for browser geolocation support
        { testName: 'Browser Geolocation Support', test: 'geolocation' in navigator, value: navigator.geolocation !== undefined },
        // Check for browser touch screen support
        { testName: 'Browser Touch Screen Support', test: navigator.maxTouchPoints !== undefined, value: navigator.maxTouchPoints > 0 },
        // Check for browser accessibility features
        { testName: 'Browser Accessibility Features', test: 'onLine' in navigator, value: navigator.onLine !== undefined },
        // Check for browser speech recognition support
        { testName: 'Browser Speech Recognition Support', test: 'mediaDevices' in navigator, value: navigator.mediaDevices.getUserMedia !== undefined },
        // Check for browser hardware concurrency
        { testName: 'Browser Hardware Concurrency', test: navigator.hardwareConcurrency !== undefined },
        // Check for browser rendering buffer size
        { testName: 'Browser Rendering Buffer Size', test: navigator.deviceMemory !== undefined, value: navigator.deviceMemory > 0 },
        // Check for browser full screen support
        { testName: 'Browser Full Screen Support', test: 'fullscreenEnabled' in document, value: document.fullscreenEnabled !== undefined },
        // Check for browser web worker support
        { testName: 'Browser Web Worker Support', test: 'Worker' in window, value: window.Worker !== undefined },
        // Check for browser shared worker support
        { testName: 'Browser Shared Worker Support', test: 'SharedWorker' in window, value: window.SharedWorker !== undefined },
        // Check for browser web storage support
        { testName: 'Browser Web Storage Support', test: 'localStorage' in window && 'sessionStorage' in window && window.localStorage !== undefined, value: window.sessionStorage !== undefined },
        // Check for browser indexed DB support
        { testName: 'Browser Indexed DB Support', test: 'indexedDB' in window, value: window.indexedDB !== undefined },
        // Check for browser WebSQL support
        { testName: 'Browser WebSQL Support', test: 'openDatabase' in window, value: window.openDatabase !== undefined },
        // Check for browser application cache support
        { testName: 'Browser Application Cache Support', test: 'applicationCache' in window, value: window.applicationCache !== undefined },
        // Check for browser offline support
        { testName: 'Browser Offline Support', test: 'applicationCache' in window && 'addEventListener' in window.applicationCache, value: window.applicationCache?.addEventListener !== undefined },
        // Check for browser performance navigation timing support
        { testName: 'Browser Performance Navigation Timing Support', test: 'performance' in window, value: window.performance?.getEntries !== undefined },
        // Check for browser timing API support
        { testName: 'Browser Timing API Support', test: 'performance' in window && window.performance?.now !== undefined, value: window.performance?.timing !== undefined },
        // Check for browser memory API support
        { testName: 'Browser Memory API Support', test: 'performance' in window, value: window.performance?.memory !== undefined },
        // Check for browser navigation timing API support
        { testName: 'Browser Navigation Timing API Support', test: 'performance' in window, value: window.performance?.getEntriesByType('navigation') !== undefined },],
    'Device-related checks': [
        // Check for device model
        { testName: 'Device Model', test: 'userAgentData' in navigator && navigator.userAgentData?.mobile !== undefined, value: navigator?.userAgentData?.mobile.model !== undefined },
        // Check for device type
        { testName: 'Device Type', test: 'userAgentData' in navigator && navigator.userAgentData?.mobile !== undefined, value: navigator?.userAgentData?.mobile.type !== undefined },
        // Check for device brand
        { testName: 'Device Brand', test: 'userAgentData' in navigator && navigator.userAgentData?.mobile !== undefined, value: navigator?.userAgentData?.mobile.brand !== undefined },
        // Check for device platform
        { testName: 'Device Platform', test: 'userAgentData' in navigator && navigator.userAgentData?.platform !== undefined, value: navigator?.userAgentData?.platform.toLowerCase() !== 'unknown' },
        // Check for device architecture
        { testName: 'Device Architecture', test: 'userAgentData' in navigator && navigator.userAgentData?.platform !== undefined, value: navigator?.userAgentData?.platformArchitecture !== undefined },
        // Check for device OS version
        { testName: 'Device OS Version', test: 'userAgentData' in navigator && navigator.userAgentData?.platform !== undefined, value: navigator?.userAgentData?.platformVersion !== undefined },
        // Check for device battery level
        { testName: 'Device Battery Level', test: 'getBattery' in navigator, value: navigator.getBattery !== undefined },
        // Check for CPU architecture
        { testName: 'CPU Architecture', test: 'cpuClass' in navigator, value: navigator.cpuClass },
        // Check for CPU cores
        { testName: 'CPU Cores', test: 'hardwareConcurrency' in navigator, value: navigator.hardwareConcurrency },
        ],
    'Memory checks': [
        // Check for total system memory
        { testName: 'Total System Memory', test: 'deviceMemory' in navigator, value: navigator.deviceMemory },
        // Check for available system memory
        { testName: 'Available System Memory', test: 'memory' in navigator && 'available' in navigator.memory },
        ],
    'Media device checks': [
        // Check for audio input devices
        { testName: 'Audio Input Devices', test: 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices },
        // Check for audio output devices
        { testName: 'Audio Output Devices', test: 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices },
        // Check for video input devices
        { testName: 'Video Input Devices', test: 'mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices },
        // Check for screen sharing support
        { testName: 'Screen Sharing Support', test: 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices },
        // Check for device accelerometer support
        { testName: 'Device Accelerometer Support', test: 'DeviceOrientationEvent' in window && 'addEventListener' in window.DeviceOrientationEvent.prototype },
        // Check for device gyroscope support
        { testName: 'Device Gyroscope Support', test: 'DeviceOrientationEvent' in window && 'addEventListener' in window.DeviceOrientationEvent.prototype },
        // Check for device light sensor support
        { testName: 'Device Light Sensor Support', test: 'AmbientLightSensor' in window && 'addEventListener' in window.AmbientLightSensor.prototype },
        // Check for device proximity sensor support
        { testName: 'Device Proximity Sensor Support', test: 'ProximitySensor' in window && 'addEventListener' in window.ProximitySensor.prototype },],
    'WebRTC-related checks': [
        // Check for WebRTC support
        { testName: 'WebRTC Support', test: 'RTCPeerConnection' in window },
        // Check for STUN server support
        { testName: 'STUN Server Support', test: 'connection' in navigator && 'getSTUNServer' in navigator.connection, value: navigator?.connection?.getSTUNServer },
        // Check for TURN server support
        { testName: 'TURN Server Support', test: 'connection' in navigator && 'getTURNServer' in navigator.connection, value: navigator?.connection?.getTURNServer },
        // **Misc checks**
        // Check for screen orientation
        { testName: 'Screen Orientation', test: 'screen' in window && 'orientation' in window.screen && 'type' in window.screen.orientation, value: window.screen.orientation },
        // Check for default font family
        { testName: 'Default Font Family', test: 'body' in document && 'style' in document.body && 'fontFamily' in document.body.style, value: document.body.style },
        // Check for user preference for reduced motion
        { testName: 'User Preference for Reduced Motion', test: 'matchMedia' in window && 'matches' in window.matchMedia('prefers-reduced-motion') },
        { testName: 'User Preference for High Contrast', test: 'matchMedia' in window && 'matches' in window.matchMedia('prefers-contrast') },
        // Check for user preference for dark theme
        { testName: 'User Preference for Dark Theme', test: 'matchMedia' in window && 'matches' in window.matchMedia('prefers-color-scheme: dark') },
        ],

};




























