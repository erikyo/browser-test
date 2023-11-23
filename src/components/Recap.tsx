import {getBrowser, getBrowserVersion, getDevice, getOS} from "../utils";

function Recap() {
    const Browser = getBrowser()
    const OS = getOS()
    const Device = getDevice()
    const BrowserVersion = getBrowserVersion()
    return (
        <div
            id={'recap'}
            className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mb-8 mt-0 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
            <div className="bg-white border border-gray-100 rounded-lg shadow-md">
                <div className="p-9">
                    <svg className="w-12 h-12 mx-auto text-gray-400 sm:mx-0" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M172.309-100.001q-30.308 0-51.308-21t-21-51.308v-415.382q0-30.308 21-51.308t51.308-21h207.692V-800q0-24.922 17.538-42.461 17.539-17.538 42.461-17.538h80q24.922 0 42.461 17.538 17.538 17.539 17.538 42.461v140.001h207.692q30.308 0 51.308 21t21 51.308v415.382q0 30.308-21 51.308t-51.308 21H172.309Zm0-59.999h615.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-415.382q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H579.999v15.386q0 24.538-17.731 42.268-17.73 17.73-42.268 17.73h-80q-24.538 0-42.268-17.73-17.731-17.73-17.731-42.268V-600H172.309q-5.385 0-8.847 3.462-3.462 3.462-3.462 8.847v415.382q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462Zm73.845-91.539h227.692v-11.846q0-15.461-8.539-28.423-8.538-12.961-23.615-20.192-19.615-8.615-39.731-12.923-20.115-4.308-41.961-4.308t-41.961 4.308q-20.116 4.308-39.731 12.923-15.077 7.231-23.615 20.192-8.539 12.962-8.539 28.423v11.846ZM560-312.309h160V-360H560v47.691ZM360-360q22.307 0 38.077-15.769 15.769-15.769 15.769-38.077 0-22.307-15.769-38.076-15.77-15.769-38.077-15.769t-38.077 15.769q-15.769 15.769-15.769 38.076 0 22.308 15.769 38.077Q337.693-360 360-360Zm200-60h160v-47.691H560V-420ZM440-584.614h80V-800h-80v215.386ZM480-380Z"/>
                    </svg>
                    <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">User Agent</h3>
                    <p className="mt-6 text-base text-gray-600">{window.navigator.userAgent}</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-md">
                <div className="p-9">
                    <svg className="w-12 h-12 mx-auto text-gray-400 sm:mx-0" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M480-100.001q-78.769 0-148.115-29.962-69.346-29.961-120.653-81.269-51.308-51.307-81.269-120.653Q100.001-401.231 100.001-480t29.962-148.115q29.961-69.346 81.269-120.653 51.307-51.308 120.653-81.269Q401.231-859.999 480-859.999q142.923 0 248.384 91.885 105.461 91.885 126.307 228.731h-61.229q-14.769-79.924-65.615-143.193Q677-745.846 600-776.769V-760q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h76.923v120H360L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v59.999Zm362.461-15.385-133-132.231q-19.461 12.385-41.923 20-22.461 7.616-47.538 7.616-66.922 0-113.461-46.538Q460.001-313.078 460.001-380t46.538-113.461Q553.078-539.999 620-539.999t113.461 46.538Q779.999-446.922 779.999-380q0 25.461-7.808 48.115-7.808 22.654-20.577 42.115l133 132.231-42.153 42.153ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z"/>
                    </svg>
                    <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">Browser</h3>
                    <p className="mt-6 text-base text-gray-600">{Browser} {BrowserVersion}</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-md">
                <div className="p-9">
                    <svg className="w-12 h-12 mx-auto text-gray-400 sm:mx-0" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M340.001-140.001V-200h80v-80H172.309q-30.308 0-51.308-21t-21-51.307v-395.384q0-30.308 21-51.308t51.308-21h615.382q30.308 0 51.308 21t21 51.308v395.384q0 30.307-21 51.307-21 21-51.308 21H539.999v80h80v59.999H340.001ZM172.309-339.999h615.382q4.616 0 8.463-3.846 3.846-3.846 3.846-8.462v-395.384q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H172.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v395.384q0 4.616 3.846 8.462 3.847 3.846 8.463 3.846Zm-12.309 0V-760-339.999Z"/>
                    </svg>
                    <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">Operating System</h3>
                    <p className="mt-6 text-base text-gray-600">{OS} {Device}</p>
                </div>
            </div>
        </div>
    );
}

export default Recap
