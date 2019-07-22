function initMap(){
    const CAMPOS = new google.maps.LatLng(-21.759757, -41.322010)
    
    let map = new google.maps.Map(document.getElementById('map'), {
        center: CAMPOS,
        zoom: 13
    })

    let marker1 = new google.maps.Marker({
        map: map,
        draggable: false,
        position: {lat: -21.756801, lng: -41.318911},
        title: '1'
    })

    let marker2 = new google.maps.Marker({
        map: map,
        draggable: true,
        position: {lat: -21.756801, lng: -41.4},
        title: '2'
    })

    marker2.addListener('dragend', (event)=>{
        let coordinates1 = new google.maps.LatLng(marker1.getPosition().lat(), marker1.getPosition().lng())
        let coordinates2 = new google.maps.LatLng(marker2.getPosition().lat(), marker2.getPosition().lng())
        console.log(google.maps.geometry.spherical.computeDistanceBetween(marker1.getPosition(), marker2.getPosition()).toFixed(2) + 'm')
        console.log(haversineFormula(coordinates1, coordinates2))
    })

    function toRadians(value) {
        /** Converts numeric degrees to radians */
        return value * Math.PI / 180;
    }

    function haversineFormula(coordinates, coordinates2){
        let R = 6371e3; // metres
        let φ1 = toRadians(coordinates.lat())
        let φ2 = toRadians(coordinates2.lat())
        let Δφ = toRadians((coordinates2.lat() - coordinates.lat()))
        let Δλ = toRadians((coordinates2.lng() - coordinates.lng()))
        let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return R * c
    }
}

