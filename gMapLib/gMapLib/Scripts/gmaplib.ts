/// <reference path="typings/google.maps.d.ts" />
enum MAP_COLOR_SCHEME { Neon, Soul, Candy, Essence };

class gMapHelper {
   
    private mapElement: string = "";
    private mapoption: google.maps.MapOptions = null;
    private mapView: google.maps.Map = null;
    private mapMakers: Array<google.maps.Marker> = null;
    private utility: BrowserUtilities = null;

    constructor(elementId: string, options: google.maps.MapOptions, scheme?: MAP_COLOR_SCHEME,  trackMarker? : boolean) {

        if (!Array.prototype.indexOf) {
            this.utility = new BrowserUtilities();
        }

        if (typeof (trackMarker) != "boolean") trackMarker = true;


        switch (scheme) {
            case MAP_COLOR_SCHEME.Essence:
                options.styles = [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill" }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "color": "#7dcdcd" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }];
                break;
            case MAP_COLOR_SCHEME.Candy:
                options.styles = [{ "featureType": "landscape", "stylers": [{ "hue": "#FFE100" }, { "saturation": 34.48275862068968 }, { "lightness": -1.490196078431353 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FF009A" }, { "saturation": -2.970297029703005 }, { "lightness": -17.815686274509815 }, { "gamma": 1 }] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FFE100" }, { "saturation": 8.600000000000009 }, { "lightness": -4.400000000000006 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#00C3FF" }, { "saturation": 29.31034482758622 }, { "lightness": -38.980392156862735 }, { "gamma": 1 }] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": 0 }, { "lightness": 0 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF19" }, { "saturation": -30.526315789473685 }, { "lightness": -22.509803921568633 }, { "gamma": 1 }] }];
                break;
            case MAP_COLOR_SCHEME.Soul:
                options.styles = [{ "stylers": [{ "saturation": -100 }, { "gamma": 0.8 }, { "lightness": 4 }, { "visibility": "on" }] }, { "featureType": "landscape.natural", "stylers": [{ "visibility": "on" }, { "color": "#5dff00" }, { "gamma": 4.97 }, { "lightness": -5 }, { "saturation": 100 }] }];
                break;
            default:
                options.styles = [{ "stylers": [{ "saturation": 100 }, { "gamma": 0.6 }] }]
                break;
        }

        this.mapMakers = trackMarker ? new Array<google.maps.Marker>() : null;
        this.mapElement = elementId.trim();
        this.mapoption = options;
 
        if (document.getElementById(this.mapElement) != null) {
            this.mapView = new google.maps.Map(document.getElementById(this.mapElement), options);
        }
    }

    //--------------- map navigation
    goto(marker: google.maps.Marker): void {
        this.mapView.panTo(marker.getPosition());
    }

    //------------ start marker functions
    setMarker(options: google.maps.MarkerOptions, exclude?: boolean): google.maps.Marker {
        var marker: google.maps.Marker = new google.maps.Marker(options);

        if (this.mapMakers != null) {
            if (typeof (exclude) != "boolean" || !exclude) {
                this.mapMakers.push(marker);
            }
        }
        return marker;
    }

    unmark(marker: google.maps.Marker): void {
        var revMakers = this.mapMakers.reverse();
        var i: number = this.utility != null ? this.utility.indexOf(this.mapMakers, marker) : this.mapMakers.indexOf(marker);

        marker.setMap(null);
        if (this.mapMakers != null) {
            if (i >= 0) this.mapMakers.splice(i, 1);
        }
    }

    mark(lat: number, lng: number, title?: string, clickCallBack?: Function, draggable?: boolean, eventName?: string): google.maps.Marker {
        var marker: google.maps.Marker = null;
        var markerOptions: google.maps.MarkerOptions = {};

        if (typeof (draggable) != "boolean") draggable = false;
        if (typeof (eventName) != "string") eventName = "click"

        markerOptions.position = new google.maps.LatLng(lat, lng);
        markerOptions.animation = google.maps.Animation.DROP;
        markerOptions.visible = true;
        markerOptions.map = this.mapView;
        markerOptions.draggable = draggable;

        if (typeof (title) == "string") {
            markerOptions.title = title;
        }

        marker = this.setMarker(markerOptions);

        if (typeof (clickCallBack) == "function") {
            google.maps.event.addListener(marker, eventName, clickCallBack)
        }

        return marker;
    }
    //------------ end marker functions

    //----------------- infowindow
    showInfo(textOrId: string, marker?: google.maps.Marker): void {
        var infowin: google.maps.InfoWindow = new google.maps.InfoWindow();
        var element: Element = document.getElementById(textOrId);

        if (element != null)
            infowin.setContent(element.cloneNode());
        else
            infowin.setContent(textOrId);

        if (marker != null)
            infowin.setPosition(marker.getPosition());

        infowin.open(this.mapView);
    }
}

