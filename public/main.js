chrome.runtime.sendMessage ( {command: "gimmeGimme"}, function (response) {
  console.log (response.geoLocation);
} );
