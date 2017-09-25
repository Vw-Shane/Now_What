$(document).ready(function() {
    $("#red").hide();
    $("#blue").hide();
    $("#green").hide();


 // Brewapi url
 var BrewURl = "http://api.brewerydb.com/v2/locations?locality=";
 // Brewdb API key
 var Brewapikey = "&key=ac5930d09beb42c41b1efe71c200663f";
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCb-kgEAfa3hZq45U5AWpx0SRe-0xpSqjU",
    authDomain: "beernow-7f112.firebaseapp.com",
    databaseURL: "https://beernow-7f112.firebaseio.com",
    projectId: "beernow-7f112",
    storageBucket: "",
    messagingSenderId: "382723496144"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
    console.log(database);


  // City submit button
      $("#submits").on("click", function(event) {
        event.preventDefault();
      
  // Input field value
        var City = $("#citySearch").val().trim();
  // the following removes any spaces
        City = City.replace(/\s/g, '+');
        console.log(City);
        database.ref().push({
        cityname: City,
      
  });
  // Var to join in city with the API url
        var Brewapi = BrewURl + City + Brewapikey;
        console.log(Brewapi);
        $.ajax({
                url: Brewapi,
                method: "GET"
            })
            .done(function(response) {
                console.log(response);
                var results = response.data;
               
  //////////GOOGLE MAP API/////////////////

  // Var for index results 
        var lat = results[0].latitude;
        var long = results[0].longitude;
        var lat2 = results[1].latitude;
        var long2 = results[1].longitude;
        var lat3 = results[2].latitude;
        var long3 = results[2].longitude;
        var lat4 = results[3].latitude;
        var long4 = results[3].longitude;
        var lat5 = results[4].latitude;
        var long5 = results[4].longitude;


  // console.log(results[0].latitude);
  // console.log(results[0].longitude);


  // Marker results 

        var mapP = results[0].brewery.name + "<br>" + results[0].streetAddress + "<br>" + "href=" + results[0].brewery.website + "</a>";
        var mapP1 = results[1].brewery.name + "<br>" + results[1].streetAddress + "<br>" + results[1].brewery.website;
        var mapP2 = results[2].brewery.name + "<br>" + results[2].streetAddress + "<br>" + results[2].brewery.website;
        var mapP3 = results[3].brewery.name + "<br>" + results[3].streetAddress + "<br>" + results[3].brewery.website;
        var mapP4 = results[4].brewery.name + "<br>" + results[4].streetAddress + "<br>" + results[4].brewery.website;
               
            
           
  // Array for locations 
        var locations = [
        [mapP, lat, long, 4],
        [mapP1, lat2, long2, 5],
        [mapP2, lat3, long3, 3],
        [mapP3, lat4, long4, 2],
        [mapP4, lat5, long5, 1],
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            enter: new google.maps.LatLng(51.530616, -0.123125),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

        var infowindow = new google.maps.InfoWindow();
              

        var marker, i;
        var markers = new Array();

           for (i = 0; i < locations.length; i++) {  
           marker = new google.maps.Marker({
           position: new google.maps.LatLng(locations[i][1], locations[i][2]),
           map: map
          });

          markers.push(marker);

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
                 }
                })(marker, i));
              }

              function AutoCenter() {
    //  Create a new viewpoint bound
                var bounds = new google.maps.LatLngBounds();
    //  Go through each...
               $.each(markers, function (index, marker) {
               bounds.extend(marker.position);
             });
    //  Fit these bounds to the map
               map.fitBounds(bounds);
               }
             AutoCenter();
   //////END OF Google MAP///////////////////////







                console.log(results);
                var add1 = results[0].streetAddress;
                var add2 = results[1].streetAddress;
                var add3 = results[2].streetAddress;

                console.log(results[0].name);

                var names1 = results[0].brewery.name;
                var names2 = results[1].brewery.name;
                var names3 = results[2].brewery.name;
                var phone1 = results[0].phone;
                var phone2 = results[1].phone;
                var phone3 = results[2].phone;
                var site1 = results[0].brewery.website;
                var site2 = results[1].brewery.website;
                var site3 = results[2].brewery.website;
                var site3 = results[2].brewery.website;




                $('#red').append(
                    "<p>" + names1 + "</p>" +
                    "<p>" + add1 + "</p>" +
                    "<p>" + phone1 + "</p>" +
                    "<a href=>" + site1 + "</a>"

                );
                $('#blue').append(
                    "<p>" + names2 + "</p>" +
                    "<p>" + add2 + "</p>" +
                    "<p>" + phone2 + "</p>" +
                    "<a href=>" + site2 + "</a>"

                );
                $('#green').append(
                    "<p>" + names3 + "</p>" +
                    "<p>" + add3 + "</p>" +
                    "<p>" + phone3 + "</p>" +
                    "<a href=>" + site3 + "</a>"

                );
                $("#red").show();
                $("#blue").show();
                $("#green").show();

      
            });

    });

});


    

