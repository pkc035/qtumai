import React, { useEffect } from "react";

const Map = ({ size, lat, lng }) => {
  const { kakao } = window;

  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(lat, lng),
      draggable: false,
      level: 4,
    };

    var imageSrc = `/images/pin_detail.svg`,
      imageSize = new kakao.maps.Size(20, 30);

    var map = new kakao.maps.Map(container, options);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
      markerPosition = new kakao.maps.LatLng(lat, lng);

    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);
  }, [lat, lng]);

  return (
    <div>
      <div id="map" style={{ ...size }}></div>
    </div>
  );
};

export default Map;
