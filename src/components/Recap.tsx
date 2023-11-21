import {getBrowser, getBrowserVersion, getDevice, getDeviceType, getOS} from "../utils";
import './Recap.css'

function Recap() {
    const Browser = getBrowser()
    const OS = getOS()
    const Device = getDevice()
    const BrowserVersion = getBrowserVersion()
    const DeviceType = getDeviceType()
    return  (
        <div id={'recap'}>
            <ul>
                <li><label>User Agent::</label> {window.navigator.userAgent}</li>
                <li><label>Browser:</label> {Browser}</li>
                <li><label>OS:</label> {OS}</li>
                <li><label>Device:</label> {Device}</li>
                <li><label>BrowserVersion:</label> {BrowserVersion}</li>
                <li><label>DeviceType:</label> {DeviceType}</li>
            </ul>
        </div>
    );
}

export default Recap
