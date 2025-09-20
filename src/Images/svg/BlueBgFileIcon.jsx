import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
const BlueBgFileIcon = ({width, height}) => (
  <Svg
    width={width || 41}
    height={height || 41}
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width={41} height={41} rx={20.5} fill="#1D5AD5" />
    <G clipPath="url(#clip0_2855_11416)">
      <Path
        d="M29.5345 15.3276L23.6282 8.98383C23.5498 8.8997 23.4567 8.83298 23.3543 8.7875C23.2519 8.74202 23.1421 8.71866 23.0312 8.71875H12.9062C12.4587 8.71875 12.0295 8.90971 11.713 9.24962C11.3965 9.58953 11.2188 10.0505 11.2188 10.5313V30.4688C11.2188 30.9495 11.3965 31.4105 11.713 31.7504C12.0295 32.0903 12.4587 32.2812 12.9062 32.2812H28.0938C28.5413 32.2812 28.9705 32.0903 29.287 31.7504C29.6035 31.4105 29.7812 30.9495 29.7812 30.4688V15.9688C29.7813 15.8497 29.7596 15.7318 29.7172 15.6218C29.6749 15.5118 29.6128 15.4118 29.5345 15.3276ZM23.0312 15.9688V10.9844L27.6719 15.9688H23.0312Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2855_11416">
        <Rect width={27} height={29} fill="white" transform="translate(7 6)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BlueBgFileIcon;
