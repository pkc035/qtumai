import React, { useEffect } from "react";

const Map = () => {
  const { kakao } = window;

  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };

    // var geocoder = new kakao.maps.services.Geocoder();

    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
    kakao.maps.event.addListener(map, 'drag', function () {
      // var message = '지도를 드래그 하고 있습니다. ' +
      //   '지도의 중심 좌표는 ' + map.getCenter().toString() + ' 입니다.';
      // console.log(map.getCenter().toString());
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Map;
