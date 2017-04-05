	var marker;
	var directionsDisplay;
	var directionsService;
	var map;

	function initialize() {
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6d6d6d"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#c8e08b"},{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#d6e5a7"},{"lightness":"19"},{"saturation":"29"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"color":"#d6e5a7"},{"visibility":"on"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#d6e5a7"},{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"saturation":"-4"},{"lightness":"69"},{"gamma":"1.22"},{"color":"#f7ffb6"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#c0e8e4"},{"visibility":"on"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#89b7b0"}]},{"featureType":"poi.attraction","elementType":"labels.text.fill","stylers":[{"color":"#6b6b6b"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#5eddc5"},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#9ac87b"},{"saturation":"13"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"color":"#00ffc4"},{"visibility":"on"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#33cee8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#6bb1c2"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#67a4b2"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#82b6c2"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#93eb96"},{"saturation":"-33"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#a4fff2"}]},{"featureType":"transit.station.bus","elementType":"geometry.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#454545"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"weight":"0.50"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#757575"}]}];
		var styledMap = new google.maps.StyledMapType(styles,
			{name: "Pirate Map"});
		if (document.getElementById("latlon") != null) {
			var lat = document.getElementById("latlon").getAttribute("lat");
			var lon = document.getElementById("latlon").getAttribute("lon");
			console.log(lat);
			console.log(lon);
			var center = new google.maps.LatLng(lat, lon);

			// setting the mapOptions and how it looks
			var mapOptions = {
				zoom: 5,
				center: center,
				streetViewControl: true,
				overviewMapControl: true,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};

	  		// initialize the map on to the page
	  		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	  		map.mapTypes.set('map_style', styledMap);
	  		map.setMapTypeId('map_style');
	  		directionsDisplay.setMap(map);

		 	// setting up content for the infowindow
		 	var contentString = '<div id="content">'+
		 	'<div id="siteNotice">'+
		 	'</div>'+
		 	'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
		 	'<div id="bodyContent">'+
		 	'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
		 	'sandstone rock formation in the southern part of the '+
		 	'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
		 	'south west of the nearest large town, Alice Springs; 450&#160;km '+
		 	'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
		 	'features of the Uluru - Kata Tjuta National Park. Uluru is '+
		 	'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
		 	'Aboriginal people of the area. It has many springs, waterholes, '+
		 	'rock caves and ancient paintings. Uluru is listed as a World '+
		 	'Heritage Site.</p>'+
		 	'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
		 	'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
		 	'(last visited June 22, 2009).</p>'+
		 	'</div>'+
		 	'</div>';

			      // creatine a object for inforwindow and the content inside.
			      var infowindow = new google.maps.InfoWindow({
			      	content: contentString,
			      	maxWidth: 400
			      });

		 	// setting up the marker on the map
		 	marker = new google.maps.Marker({
		 		position: center,
		 		map: map,
		 		title: "Center of the WORLD!",
		 		draggable:true,
		 		animation: google.maps.Animation.DROP

		 	});
		     // when the marker is clicked an info window will pop up
		     google.maps.event.addListener(marker, 'click', function() {
		     	infowindow.open(map,marker);
		     });

		    // when a marker is clicked  it will bounce up an
		    google.maps.event.addListener(marker, 'click', toggleBounce);

		    if (navigator.geolocation) {
		    	navigator.geolocation.getCurrentPosition(success);

		    	function success(position) {
		    		var mylat = position.coords.latitude;
		    		var mylon = position.coords.longitude;
		    		
		    		var myLatlng = new google.maps.LatLng(mylat, mylon);
		    		
		    		var mymarker = new google.maps.Marker({
		    			position: myLatlng,
		    			title: "My Current Location"
		    		});
		    		
		    		mymarker.setMap(map);
		    		var request = {
		    			origin: myLatlng,
		    			destination: center,
		    			travelMode: google.maps.TravelMode.DRIVING
		    		};

		    		directionsService.route(request, function(response, status) {
		    			if (status == google.maps.DirectionsStatus.OK) {
		    				directionsDisplay.setDirections(response);
		    			}
		    		});

		    	}
		    } 
		    else {
		    	alert("Geo Location is not supported on your current browser!");
		    }
		  }
		  else {}

		  	
		}

			// makeing the marker bounce up and down
			function toggleBounce() {

				if (marker.getAnimation() != null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}


			function loadScript() {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAd1KC9Oo39e7sLm0kKpoimB6lWQIguArk&callback=initialize';
				document.body.appendChild(script);

			}







	// window.onload = loadScript;






		// Loads in Google maps on windows
		// google.maps.event.addDomListener(window, 'load', create, loadscript);

