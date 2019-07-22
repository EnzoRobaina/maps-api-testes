function initMap(){
    const CAMPOS = new google.maps.LatLng(-21.759757, -41.322010)
    let map = new google.maps.Map(document.getElementById('map'), {
        center: CAMPOS,
        zoom: 8
    })
}