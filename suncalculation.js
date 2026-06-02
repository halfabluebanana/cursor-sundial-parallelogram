//used the DOMContentLoaded Event listener because console kept showing me an error that browser is trying to assess #cursors before the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', function () {
    // default to NYC
    window.userLat = 40.7128;
    window.userLon = -74.0060;

    // fetch location once
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                window.userLat = position.coords.latitude;
                window.userLon = position.coords.longitude;
                document.getElementById("location").innerHTML = 'Latitude: ' + window.userLat + '<br>Longitude: ' + window.userLon;
            },
            () => {
                // keep defaults
                // fallback to NYC if geolocation fails
                window.userLat = 40.7128;
                window.userLon = -74.0060;
            }
        );
            } else {
                window.userLat = 40.7128;
                window.userLon = -74.0060;
            }

function displaySunInfo() {
        if (!window.userLat) return; // require location

        const date = window.simulatedDate || new Date();
        const times = SunCalc.getTimes(date, window.userLat, window.userLon);
        document.getElementById("sunrise").value = times.sunrise.toLocaleTimeString();
        document.getElementById("sunset").value = times.sunset.toLocaleTimeString();

        const sunPosition = SunCalc.getPosition(date, window.userLat, window.userLon);
        const azimuth = sunPosition.azimuth;
        const altitude = sunPosition.altitude;

        const shadowAngle = (azimuth * (180 / Math.PI) + 180) % 360; // degrees
        const shadowLength = 1 / Math.tan(altitude);

        document.getElementById('shadowAngle').value = shadowAngle.toFixed(2);
        document.getElementById('shadowLength').value = shadowLength.toFixed(2);

        updateShadowEffect(shadowAngle, shadowLength, altitude);
    }

    function updateShadowEffect(shadowAngle, shadowLength, altitude) {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;
        const scale = 50;
        const rawX = (isFinite(shadowLength) ? shadowLength : 1000) * Math.cos((shadowAngle * Math.PI) / 180) * scale;
        const rawY = (isFinite(shadowLength) ? shadowLength : 1000) * Math.sin((shadowAngle * Math.PI) / 180) * scale;
        const maxPx = 120;
        const dist = Math.sqrt(rawX * rawX + rawY * rawY);
        const clamp = dist > maxPx ? maxPx / dist : 1;
        window.targetOX = rawX * clamp;
        window.targetOY = rawY * clamp;
        const isDay = altitude > 0;
        document.body.classList.toggle('is-day', isDay);

        const intensity = isDay ? Math.max(0, Math.sin(altitude)) * 0.4 : 0;
        const bx = Math.cos(shadowAngle * Math.PI / 180) * 60;
        const by = Math.sin(shadowAngle * Math.PI / 180) * 60;
        document.body.style.boxShadow = `inset ${bx}px ${by}px 80px rgba(0,0,0,${intensity.toFixed(3)})`;
    }

    // call function to display sun info and update shadow effect every second
    setInterval(displaySunInfo, 1000);
});
