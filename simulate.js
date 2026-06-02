const DURATION_SECONDS = 90; //full 24h cycle in 90 real seconds

const today = new Date();
const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    5, 10, 0
);

window.simulatedDate = new Date(startOfDay.getTime());

let startRealTime = null;

function tick(realTimeStamp) {
    if(!startRealTime) startRealTime = realTimeStamp;

    const elapsed = (realTimeStamp - startRealTime) / 1000; // in seconds
    const progress = Math.min(elapsed / DURATION_SECONDS, 1); // 0 to 1
    const simSeconds = progress * 24 * 3600; // total seconds in a day

    window.simulatedDate = new Date(startOfDay.getTime() + simSeconds * 1000);

    const timeField = document.getElementById('simTime');
    if (timeField) {
        timeField.value = window.simulatedDate.toLocaleTimeString();
    }

    if (progress < 1) {
        requestAnimationFrame(tick);
    } else {
        startRealTime = null; // reset for next cycle
        requestAnimationFrame(tick); // start next cycle
    }
}

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(tick);
});