/*global kakao*/ 
import React, { useEffect } from 'react'



const LocationMap=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.3355510564729, 127.100666095195),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(37.3355510564729, 127.100666095195); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);

    }, [])


    return (
        <div>
        <div id="map" style={{width:"888px", height:"598px",border:"1px solid #ddd", borderRight:"0"}}></div>
       
        </div>
    )
}

export default LocationMap;