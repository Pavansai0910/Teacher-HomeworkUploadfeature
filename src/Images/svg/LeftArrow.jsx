import * as React from "react";
import Svg, { Path } from "react-native-svg";

const LeftArrow = ({ width, height, flip }) => (
  <Svg
    width={width || 9}
    height={height || 8}
    viewBox="0 0 9 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: flip ? [{ scaleX: -1 }] : undefined, // Apply horizontal flip if flip prop is true
    }}
  >
    <Path
      d="M4.25497 7.13139L4.89418 6.49929L2.67472 4.27983H8.25V3.35653H2.67472L4.89418 1.14062L4.25497 0.504971L0.941761 3.81818L4.25497 7.13139Z"
      fill="#06286E"
    />
  </Svg>
);

export default LeftArrow;
