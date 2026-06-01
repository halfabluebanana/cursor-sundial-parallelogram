//on load

window.addEventListener('load', function () {

    // declare some global variables
    let latitude = null;
    let longitude = null;
    let latlon = null;


    // check if we can get current position of user using Geolocation API

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

});

// function to handle success callback. using let to declare variables because these may be reassigned if user changes position
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const latlon = position.coords.latitude + "," + position.coords.longitude;

    //console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);
    //select for element on the page. use getElementByIDd to update content of the <p> element with id "location"
    document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

}


// prints out error message if we can't get user geolocation
function error(err) {
    console.warn('ERROR(${err.code}): ${err.message}');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('locationOutput').innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('locationOutput').innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('locationOutput').innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('locationOutput').innerHTML = "An unknown error occurred.";
            break;
    }
}


// function updateMap() {

//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     const latlon = position.coords.latitude + "," + position.coords.longitude;

//     var iframe = document.getElementById("mapFrame");
//     var mapUrl = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=20&size=640x640&maptype=satellite&sensor=false&key=AIzaSyCuFG-NOikYAj9JOBS3oD_nhuSxlu_T8v4";
//     iframe.src = mapUrl;
// }

// success();
// error();
// window.onload = updateMap;
