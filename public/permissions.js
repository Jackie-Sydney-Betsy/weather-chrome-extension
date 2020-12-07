/** @format */

chrome.runtime.onInstalled.addListener (
  function (request, sender, sendResponse) {

      if (request.command === "gimmeGimme") {

          navigator.geolocation.getCurrentPosition (function (position) {
              sendResponse ( {
                  geoLocation: (
                        "latitude="    + position.coords.latitude
                      + ", longitude=" + position.coords.longitude
                  )
              } );
          } );
          return true; // Needed because the response is asynchronous
      }
  }
);
