import React from "react";

import styled from "styled-components"; 
import { createContext } from "react";

declare global {
  let naver: any;
}

interface IMainPageProps {
  className?: string;
  width: string | number;
  height: string | number;
  center: { lat: number, lng: number };
  level: number;
  // mapTypeId: string;
}

export const NaverMapContext = createContext(null);

let NaverMap: React.FunctionComponent<IMainPageProps> = (props) => {
  const [_map, setMap] = React.useState<any>(null);

  React.useEffect(() => {
    initMap();
  }, []);

  React.useEffect(() => {
    _map?.setZoom(props.level);
  }, [props.level]);

  React.useEffect(() => {
    _map?.setCenter(props.center);
  }, [props.center]);

  function initMap() {
    const mapOptions = {
      center: props.center,
      zoom: props.level,
    };
  
    setMap(new naver.maps.Map('map', mapOptions));
  }

  /** 
   * Naver map
   * 1. 지도 조작
   * 2. 마커 표시
   * 3. 커스텀 마커 표시
   * 4. 폴리곤 표시
   * 5. 주소로 위치 받아오기
   * 6. 위치로 주소 받아오기
   */
  return (
    <>
      <NaverMapContext.Provider value={_map}>
        <div id="map" className={props.className}>
          {props.children}
        </div>
      </NaverMapContext.Provider>
    </>
  );
};

NaverMap.defaultProps = {
  center: { lat: 33.3572421, lng: 126.5322317 },
}

NaverMap = styled(NaverMap)`
  width: ${({ width }) => typeof width === "number" ? `${width}px` : width};
  height: ${({ height }) => typeof height === "number" ? `${height}px` : height};
`
export default NaverMap;
