// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);
// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// Add a marker to the map
var marker = L.marker([51.505, -0.09]).addTo(map);
// Bind a popup to the marker
marker.bindPopup('<br>Hello world!</br><br>I am a popup.</br>').openPopup();
// Add a circle to the map
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
// Bind a popup to the circle
circle.bindPopup('I am a circle.');
// Add a polygon to the map
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);
// Bind a popup to the polygon
polygon.bindPopup('I am a polygon.');
// Add a tile layer from Mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN', {maxZoom: 18,attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors',id: 'mapbox/streets-v11'}).addTo(map);
//add cards to be displayed with details when a location is clicked relating to the properties data which are available there to be rented
var properties = [
    {lat: 51.505, lng: -0.09, title: 'Property 1', description: 'Description for Property 1'},
    {lat: 51.508, lng: -0.11, title: 'Property 2', description: 'Description for Property 2'},
    {lat: 51.509, lng: -0.08, title: 'Property 3', description: 'Description for Property 3'}
];updateMapWithProperties(properties);
function updateMapWithProperties(properties) {
    properties.forEach(function(property) {
        var marker = L.marker([property.lat, property.lng]).addTo(map);
        marker.bindPopup('<b>' + property.title + '</b><br>' + property.description).openPopup();
    });
}
// Add a 360 view control to the map
var view360 = L.control.view360({
    position: 'topright',
    title: '360 View',
    url: 'https://example.com/360-view/{z}/{x}/{y}.jpg' // Replace with your 360 view URL
}).addTo(map);
// Add a scale control to the map
L.control.scale().addTo(map);
// Add a fullscreen control to the map
L.control.fullscreen({
    position: 'topright',
    title: {
        'false': 'View Fullscreen',
        'true': 'Exit Fullscreen'
    }
}).addTo(map);
// add a trigger funcation that opens a modal with more details about the property when clicked
function openPropertyDetails(property) {
    var modal = document.getElementById('propertyModal');
    modal.querySelector('.modal-title').innerText = property.title;
    modal.querySelector('.modal-body').innerText = property.description;
    modal.style.display = 'block';
}
// Close the modal when the user clicks on <span> (x)
document.querySelector('.close').onclick = function() {
    document.getElementById('propertyModal').style.display = 'none';
};
// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    var modal = document.getElementById('propertyModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
// Add a modal for property details
var modalHTML = `
<div id="propertyModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2 class="modal-title"></h2>
        <div class="modal-body"></div>
    </div>
</div>
`;
// Append the modal HTML to the body
document.body.insertAdjacentHTML('beforeend', modalHTML);
// Add CSS for the modal
var modalCSS = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
`;
// Append the CSS to the head
var style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(modalCSS));
document.head.appendChild(style);
// Add a button to toggle the 360 view
var toggle360Button = L.easyButton({
    states: [{
        stateName: 'toggle-360',
        icon: 'fa fa-globe',
        title: 'Toggle 360 View',
        onClick: function(btn, map) {
            if (view360.isActive()) {
                view360.disable();
                btn.state('toggle-360');
            } else {
                view360.enable();
                btn.state('toggle-360-active');
            }
        }
    }]
}).addTo(map);
// Add a button to toggle the fullscreen mode
var toggleFullscreenButton = L.easyButton({
    states: [{
        stateName: 'toggle-fullscreen',
        icon: 'fa fa-arrows-alt',
        title: 'Toggle Fullscreen',
        onClick: function(btn, map) {
            if (map.isFullscreen()) {
                map.exitFullscreen();
                btn.state('toggle-fullscreen');
            } else {
                map.requestFullscreen();
                btn.state('toggle-fullscreen-active');
            }
        }
    }]
}).addTo(map);
// Add a button to toggle the scale control
var toggleScaleButton = L.easyButton({
    states: [{
        stateName: 'toggle-scale',
        icon: 'fa fa-ruler',
        title: 'Toggle Scale',
        onClick: function(btn, map) {
            var scaleControl = map.scaleControl;
            if (scaleControl) {
                map.removeControl(scaleControl);
                btn.state('toggle-scale');
            } else {
                L.control.scale().addTo(map);
                btn.state('toggle-scale-active');
            }
        }
    }]
}).addTo(map);
// Add a button to toggle the 360 view control
var toggleView360Button = L.easyButton({
    states: [{
        stateName: 'toggle-view360',
        icon: 'fa fa-eye',
        title: 'Toggle 360 View Control',
        onClick: function(btn, map) {
            if (view360) {
                map.removeControl(view360);
                view360 = null;
                btn.state('toggle-view360');
            } else {
                view360 = L.control.view360({
                    position: 'topright',
                    title: '360 View',
                    url: 'https://example.com/360-view/{z}/{x}/{y}.jpg' // Replace with your 360 view URL
                }).addTo(map);
                btn.state('toggle-view360-active');
            }
        }
    }]
}).addTo(map);
// Add a button to toggle the property details modal
var togglePropertyDetailsButton = L.easyButton({
    states: [{
        stateName: 'toggle-property-details',
        icon: 'fa fa-info-circle',
        title: 'Toggle Property Details',
        onClick: function(btn, map) {
            var modal = document.getElementById('propertyModal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                btn.state('toggle-property-details');
            } else {
                modal.style.display = 'block';
                btn.state('toggle-property-details-active');
            }
        }
    }]
}).addTo(map);
// Add a button to toggle the marker clustering
var toggleMarkerClusteringButton = L.easyButton({
    states: [{
        stateName: 'toggle-marker-clustering',
        icon: 'fa fa-object-group',
        title: 'Toggle Marker Clustering',
        onClick: function(btn, map) {
            if (typeof markerClusterGroup === 'undefined') {
                markerClusterGroup = L.markerClusterGroup();
                properties.forEach(function(property) {
                    var marker = L.marker([property.lat, property.lng]).bindPopup('<b>' + property.title + '</b><br>' + property.description);
                    markerClusterGroup.addLayer(marker);
                });
                map.addLayer(markerClusterGroup);
                btn.state('toggle-marker-clustering-active');
            } else {
                map.removeLayer(markerClusterGroup);
                markerClusterGroup = undefined;
                btn.state('toggle-marker-clustering');
            }
        }
    }]
}).addTo(map);
// Add a button to toggle the property cards
var togglePropertyCardsButton = L.easyButton({
    states: [{
        stateName: 'toggle-property-cards',
        icon: 'fa fa-th',
        title: 'Toggle Property Cards',
        onClick: function(btn, map) {
            var cardsContainer = document.getElementById('propertyCards');
            if (cardsContainer.style.display === 'block') {
                cardsContainer.style.display = 'none';
                btn.state('toggle-property-cards');
            } else {
                cardsContainer.style.display = 'block';
                btn.state('toggle-property-cards-active');
            }
        }
    }]
}).addTo(map);
// Add a container for property cards and make it open as a pop up with a button to buy or rent the property
var cardsContainerHTML = `
<div id="propertyCards" class="property-cards" style="display: none;">
    <h2>Property Cards</h2>
    <div class="card">
        <h3>Property 1</h3>
        <p>Description for Property 1</p>
        <button class="btn btn-primary">Buy</button>
        <button class="btn btn-secondary">Rent</button>
    </div>
    <div class="card">
        <h3>Property 2</h3>
        <p>Description for Property 2</p>
        <button class="btn btn-primary">Buy</button>
        <button class="btn btn-secondary">Rent</button>
    </div>
    <div class="card">
        <h3>Property 3</h3>
        <p>Description for Property 3</p>
        <button class="btn btn-primary">Buy</button>
        <button class="btn btn-secondary">Rent</button>
    </div>
</div>
`;
// Append the cards container HTML to the body
document.body.insertAdjacentHTML('beforeend', cardsContainerHTML);
// Add CSS for the property cards
var cardsCSS = `
    .property-cards {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    }
    .property-cards .card {
        margin-bottom: 10px;
    }
    .property-cards .btn {
        margin-right: 5px;
    }
`;
// Append the CSS to the head
style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(cardsCSS));
document.head.appendChild(style);
// Add a button to toggle the property cards
var togglePropertyCardsButton = L.easyButton({
    states: [{
        stateName: 'toggle-property-cards',
        icon: 'fa fa-th',
        title: 'Toggle Property Cards',
        onClick: function(btn, map) {
            var cardsContainer = document.getElementById('propertyCards');
            if (cardsContainer.style.display === 'block') {
                cardsContainer.style.display = 'none';
                btn.state('toggle-property-cards');
            } else {
                cardsContainer.style.display = 'block';
                btn.state('toggle-property-cards-active');
            }
        }
    }]
}).addTo(map);
// add other exclusive features as well so that i can click on any spot and get a location marked over there and it shows the properties available over there

