/// <reference path="typings/FastClick.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/google.maps.d.ts" />
var maplibs: gMapHelper = null;

function bootup(): any
{
    $(document).ready(function () {
        var helper = new BrowserUtilities();
        helper.loadVisualAsync("sarapmo", "src", "images/sarap.jpg");
        helper.loadScriptAsync("https://maps.googleapis.com/maps/api/js?v=3&sensor=false", "loadmap");
        FastClick.attach(document.body);
        var snapper = new Snap({
            element: document.getElementById('content'),
            hyperextensible: false,
            disable: 'right'
        });
    });
}

function loadmap(): void {
    var options = {
        center: new google.maps.LatLng(14.5977000, 121.0109000),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        scrollwheel: false,
        zoom: 17
    };
    maplibs = new gMapHelper("map-content", options);
    var x = maplibs.mark(14.5977000, 121.0109000, "PUP");
    maplibs.showInfo("<div style='height:300px;width:300px;'>this is my map</div>",x);
}

window.onload=bootup();

