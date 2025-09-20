import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const NameIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G opacity={0.4}>
      <Path
        d="M5 20V19C5 15.134 8.13401 12 12 12C15.866 12 19 15.134 19 19V20"
        stroke="#33569F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        stroke="#33569F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default NameIcon;
