var mapElement = document.getElementById('vd-group-map');
var map, marker, infoWindow, markerCluster, timeout;
var markersArr = [];

// Init map function
function initMap() {
	if (mapElement) {
		map = new google.maps.Map(mapElement, {
			mapId: '5de95d706d212a5',
			center: {
				lat: 48.9117731,
				lng: 24.717129,
			},
			zoom: 16,
			disableDefaultUI: true,
			zoomControl: true,
			clickableIcons: false,
		});
		setMarkers(map, locations);
	
		// closing infoWindow by clicking the map
		google.maps.event.addListener(map, 'click', function () {
			infoWindow.close();
		});
	}
}

// Set marker on the map function
function setMarkers(map, locations) {
	map.markers = [];

	for (var locationName in locations) {
		var location = locations[locationName];
		var pos = new google.maps.LatLng(location.lat, location.lng); // get position object

		// create marker
		var marker = new google.maps.Marker({
			map: map,
			position: pos,
			category: location.category,
			title: location.object,
			icon: location.icon,
		});

		map.markers.push(marker); // add marker on Google
		markersArr.push(marker); // add marker to custom markers array

		marker.addListener('click', function () {
			var latLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

			// pan to marker on click
			return function() {
				map.panTo(latLng);
				map.setZoom(18); // zoom map
			};
		}(marker));

		addInfoWindow(marker, location); // render InfoWindow for marker
	}

	createClusters(); // create clusters
	centerMap(map); // center map
}

// Create Clusters function
function createClusters() {
	// if cluster was previously created
	if (markerCluster !== undefined) {
		markerCluster.clearMarkers(); // clear markers from cluster
		infoWindow.close();
	}

	timeout = setTimeout(function() {
		// apply clustering to the map
		markerCluster = new MarkerClusterer(map, map.markers, {
			cssClass: 'vd-gm-cluster',
			zoomOnClick: true,
			averageCenter: true,
			// gridSize: 90,
			minimumClusterSize: 2
		});
	}, 350);
}

// Add InfoWindow for markers function
function addInfoWindow(marker, body) {
	infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.setContent(`<div class="vd-gm-tooltip">
			<div class="link">
				<a href="${body.url}" target="_blank">
					<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill-rule="evenodd" d="M18.022 3.502H6.491V0H24v17.51h-3.502V5.977L2.476 24 0 21.524 18.022 3.502Z" clip-rule="evenodd"/>
					</svg>
				</a>
			</div>
			<h4 class="title">${body.object}</h4>
			<div class="location">${body.address}</div>
		</div>`);
		infoWindow.open(map, marker);
	});
}

// Build InfoWindow content function
function buildContent(location) {
	var content = document.createElement('div');

	// render marker icon
	switch (location.category) {
		case 'park':
			content.classList.add('vd-gm-marker-park');
			content.innerHTML = `
				<div class="icon">
					<img src="${location.icon}" title="${location.object}">
				</div>
				`;
			break;
		case 'university':
			content.classList.add('vd-gm-marker-university');
			content.innerHTML = `
				<div class="icon">
					<img src="${location.icon}" title="${location.object}">
				</div>
				`;
			break;
		case 'kindergarten':
			content.classList.add('vd-gm-marker-kindergarten');
			content.innerHTML = `
				<div class="icon">
					<img src="${location.icon}" title="${location.object}">
				</div>
				`;
			break;
		default:
			content.classList.add('vd-gm-marker');
			content.innerHTML = `
				<div class="icon">
					<img src="${location.icon}" title="${location.object}">
				</div>
				<h5 class="title">${location.object}</h5>
				`;
			break;
	}

	return content;
}

// Filtering markers function
function filterMarkers(category) {
	var filteredLocations;
	clearTimeout(timeout);

	// filtering markers by category
	if (category !== 'all') {
		filteredLocations = locations.filter(function (location) {
			return location.category === category;
		});
	} else {
		filteredLocations = locations;
	}

	// show/hide marker on the map 
	markersArr.forEach(function (marker) {
		if (!(marker.category === 'house' || marker.category === 'office')) {
			marker.setMap(null);
		}
	});

	// set filtered markers
	setMarkers(map, filteredLocations);
}

// Centering map (bounds) function
function centerMap(map) {
	var bounds = new google.maps.LatLngBounds();

	map.markers.forEach(function (marker) {
		bounds.extend(new google.maps.LatLng(marker.getPosition()));
	});

	if (map.markers.length === 1) {
		map.setCenter(bounds.getCenter());
		map.setZoom(16);
	} else {
		map.fitBounds(bounds);
	}
}

// Pan to marker by clicking on an Object card
var objectCards = document.querySelectorAll('.objects .object .btn-inline-arrow');

objectCards.forEach(function (object) {
	object.addEventListener('click', function (event) {
		var objectLat = event.currentTarget.dataset.lat;
		var objectLng = event.currentTarget.dataset.lng;

		for (markerKey in markersArr) {
			var markerLat = markersArr[markerKey].position.lat();
			var markerLng = markersArr[markerKey].position.lng();

			// check if it's realy google marker 
			if (markerLat == objectLat && markerLng == objectLng) {
				var latLng = new google.maps.LatLng(markerLat, markerLng);

				// if lng and lat is the same with marker
				map.panTo(latLng); // move map to marker
				map.setZoom(16); // zoom map
				window.scrollTo({
					top: document.querySelector('.objects').offsetTop + 60,
					behavior: 'smooth'
				});

				infoWindow.close();
			}
		}
	});
});

// Filtering buttons (Location section Single page project)
var filterBtns = document.querySelectorAll('.location-filters .location-filters-btn');

filterBtns.forEach(function (button) {
	button.addEventListener('click', function (event) {
		var _this = event.currentTarget;
		var category = _this.dataset.category;

		for (const btn of filterBtns) {
			btn.classList.remove('_is-active');
		}

		_this.classList.add('_is-active');
		infoWindow.close();
		filterMarkers(category);
	});
});
