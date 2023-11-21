export function getBrowser() {
    return [
        ["Microsoft Edge", /edg/i],
        ["Microsoft Internet Explorer", /trident/i],
        ["Mozilla Firefox", /firefox|fxios/i],
        ["Opera", /opr\//i],
        ["UC Browser", /ucbrowser/i],
        ["Samsung Browser", /samsungbrowser/i],
        ["Google Chrome", /chrome|chromium|crios/i],
        ["Apple Safari", /safari/i],
        ["Unknown", /.+/i],
    ].find(([, value]) => (value as RegExp)?.test(window.navigator.userAgent)).shift();
}

export function getOS() {
    return [
        ["Windows", /win/i],
        ["MacOS", /mac/i],
        ["Linux", /linux/i],
        ["Unknown", /.+/i],
    ].find(([, value]) => (value as RegExp)?.test(window.navigator.userAgent)).shift();
}

export function getDevice() {
    return [
        ["Mobile", /android|webos|iphone|ipad|ipod|blackberry|iemobile/i],
        ["Tablet", /ipad|playbook|surface/i],
        ["Desktop", /windows|mac|linux/i],
        ["Unknown", /.+/i],
    ].find(([, value]) => (value as RegExp)?.test(window.navigator.userAgent)).shift();
}

export function getBrowserVersion() {
    const ua = navigator.userAgent;
    let tem: string[] | null;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return (tem).slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ') || 'Unknown';
}

export function getDeviceType() {
    return [
        ["Mobile", /android|webos|iphone|ipad|ipod|blackberry|iemobile/i],
        ["Tablet", /ipad|playbook|surface/i],
        ["Desktop", /windows|mac|linux/i],
        ["Unknown", /.+/i],
    ].find(([, value]) => (value as RegExp)?.test(window.navigator.userAgent)).shift();
}

export function getClientIP(): string | undefined {
    // Try to use WebRTC API to get local IP addresses
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    if (RTCPeerConnection) {
        const rtc = new RTCPeerConnection({ iceServers: [] });
        rtc.createDataChannel('');
        rtc.createOffer().then(offer => rtc.setLocalDescription(offer));

        rtc.onicecandidate = (event) => {
            if (event.candidate) {
                const ipMatch = event.candidate.candidate.match(/([0-9.]+)/);
                if (ipMatch) {
                    return ipMatch[1];
                }
            }
        };

        return 'Unknown';
    }

    // Fallback to unreliable methods (may not work in all cases)
    return 'Unknown';
}
