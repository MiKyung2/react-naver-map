import { useEffect, useContext, FunctionComponent } from "react";
import { NaverMapContext } from "../Map";
import { TMarkerOptions } from "../type";

interface INaverMarker extends TMarkerOptions {

}

const NaverMarker: FunctionComponent<INaverMarker> = (props) => {
  const map = useContext(NaverMapContext);

  useEffect(() => {
    if (map === null) return;
    const marker = new naver.maps.Marker({
      ...props,
      position: new naver.maps.LatLng(props.position),
    });
  }, [map]);

  return null;
}

export default NaverMarker;
