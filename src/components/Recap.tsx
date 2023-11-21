import {getBrowser, getBrowserVersion, getDevice, getDeviceType, getOS} from "../utils";

function Recap() {
    const Browser = getBrowser()
    const OS = getOS()
    const Device = getDevice()
    const BrowserVersion = getBrowserVersion()
    const DeviceType = getDeviceType()
    return  (
        <div id={'recap'}>
            <ul>
                <li><b>User Agent:</b> {window.navigator.userAgent}</li>
                <li><b>Browser:</b> {Browser}</li>
                <li><b>OS:</b> {OS}</li>
                <li><b>Device:</b> {Device}</li>
                <li><b>BrowserVersion:</b> {BrowserVersion}</li>
                <li><b>DeviceType:</b> {DeviceType}</li>
            </ul>
        </div>
    );
}

export default Recap
