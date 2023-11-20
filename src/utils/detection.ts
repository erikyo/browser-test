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
    const ua = window.navigator.userAgent;
    const tem = ua.match(/version\/[\.\d]+/i);
    if (tem != null) {
        return tem[0].replace(/version\/[\.\d]+/i, '');
    }
    return 'Unknown';
}

export function getOSVersion() {
    const ua = window.navigator.userAgent;
    const tem = ua.match(/windows nt [\.\d]+/i);
    if (tem != null) {
        return tem[0].replace(/windows nt [\.\d]+/i, '');
    }
    return 'Unknown';
}

export function getDeviceType() {
    return [
        ["Mobile", /android|webos|iphone|ipad|ipod|blackberry|iemobile/i],
        ["Tablet", /ipad|playbook|surface/i],
        ["Desktop", /windows|mac|linux/i],
        ["Unknown", /.+/i],
    ].find(([, value]) => (value as RegExp)?.test(window.navigator.userAgent)).shift();
}
