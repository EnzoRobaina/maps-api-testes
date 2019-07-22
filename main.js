function initMap(){
    const polyArray = [
        {lat:-21.7537901,lng:-41.3252839},
        {lat:-21.7540147,lng:-41.3253784},
        {lat:-21.7541181,lng:-41.3254227},
        {lat:-21.7542171,lng:-41.3254645},
        {lat:-21.7543619,lng:-41.3255252},
        {lat:-21.7545254,lng:-41.3255952},
        {lat:-21.7547471,lng:-41.3256888},
        {lat:-21.7546973,lng:-41.3258108},
        {lat:-21.7546639,lng:-41.3258869},
        {lat:-21.7546319,lng:-41.325961},
        {lat:-21.7547321,lng:-41.3260086}]
    
    
    const CAMPOS = new google.maps.LatLng(-21.759757, -41.322010)
    
    let map = new google.maps.Map(document.getElementById('map'), {
        center: CAMPOS,
        zoom: 13
    })

    let marker1 = new google.maps.Marker({
        map: map,
        draggable: false,
        position: {lat:-21.7537901,lng:-41.3252839},
        title: '1'
    })

    let marker2 = new google.maps.Marker({
        map: map,
        draggable: true,
        position: {lat: -21.756801, lng: -41.318911},
        title: '2'
    })

    let poly = new google.maps.Polyline({
        path: polyArray,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    })

    marker2.addListener('dragend', (event)=>{
        let coordinates1 = new google.maps.LatLng(marker1.getPosition().lat(), marker1.getPosition().lng())
        let coordinates2 = new google.maps.LatLng(marker2.getPosition().lat(), marker2.getPosition().lng())
        console.log(google.maps.geometry.spherical.computeDistanceBetween(marker1.getPosition(), marker2.getPosition()).toFixed(2) + 'm')
        console.log(haversineFormula(coordinates1, coordinates2))
        console.log(`is on edge? ${google.maps.geometry.poly.isLocationOnEdge(marker2.getPosition(), poly, 20e-4)}`)
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

