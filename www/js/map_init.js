function initMap() {
  var self = this;
  app.cordovaGeolocation1.getCurrentPosition({enableHighAccuracy: false}).then(function (position) {
      self.lat  = position.coords.latitude
      self.long = position.coords.longitude
      document.getElementById('latlng').value = self.lat + ',' + self.long
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: self.lat, lng: self.long}
      });
      var geocoder = new google.maps.Geocoder;
      var infowindow = new google.maps.InfoWindow;
      geocodeLatLng(geocoder, map, infowindow);
      window.document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, infowindow);
      });
  }, function(err) {
      console.log(err)
   })
}
function geocodeLatLng(geocoder, map, infowindow) {
    var input = document.getElementById('latlng').value;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }