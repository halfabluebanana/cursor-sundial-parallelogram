//used the DOMContentLoaded Event listener because console kept showing me an error that browser is trying to assess #cursors before the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function () {

function displaySunInfo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            //// calculates sun position for a given date and latitude/longitude. SunCalc.getTimes = function (date, lat, lng, height)
            const times = SunCalc.getTimes(new Date(), latitude, longitude);
            const sunrise = times.sunrise.toLocaleTimeString();
            const sunset = times.sunset.toLocaleTimeString();

            document.getElementById("sunrise").value = sunrise;
            document.getElementById("sunset").value = sunset;

            // calculates sun position (azimuth and altitude) for a given date and latitude/longitude. SunCalc.getPosition = function (date, lat, lng) {
            const sunPosition = SunCalc.getPosition(new Date(), latitude, longitude);
            const azimuth = sunPosition.azimuth;
            const altitude = sunPosition.altitude;

            //Shadow Length and Shadow Angles
            const shadowAngle = (azimuth * (180 / Math.PI) + 180) % 360; //convert radians to degrees
            const shadowLength = 1 / Math.tan(altitude);

            document.getElementById('shadowAngle').value = shadowAngle.toFixed(2);
            document.getElementById('shadowLength').value = shadowLength.toFixed(2);

            //Update shadow dynamically using calculated shadow angle and length
            updateShadowEffect(shadowAngle, shadowLength);

        });
    };
}

function updateShadowEffect(shadowAngle, shadowLength) {
    const cursor = document.querySelector('.custom-cursor');
    const shadow = document.querySelector('.cursor-shadow');

    if(!cursor) return;
    const scale = 50;
    const shadowX = shadowLength * Math.cos(shadowAngle * (Math.PI / 180)) * scale;
    const shadowY = shadowLength * Math.sin(shadowAngle * (Math.PI / 180)) * scale;

    cursor.style.boxShadow = 'none';
    cursor.style.transform = `rotate(${shadowAngle}deg)`;

    if (shadow) {
        window.shadowOffsetX = shadowX;
        window.shadowOffsetY = shadowY;
        shadow.style.transform = `rotate(${shadowAngle}deg)`;
    }
}

// call function to display sun info and update shadow effect
setInterval(displaySunInfo, 1000); // this updates shadow every second

});
//calculate moon position
