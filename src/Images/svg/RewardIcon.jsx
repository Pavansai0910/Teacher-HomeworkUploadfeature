import * as React from "react";
import Svg, { Path } from "react-native-svg";
const RewardIcon = ({size}) => (
  <Svg
    width={size || 64}
    height={size || 64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M26.6663 10.6665L37.3329 10.6665V17.5139C37.3329 18.2026 37.7887 18.8139 38.4329 19.0575C61.1641 27.6554 55.7505 58.6666 39.9996 58.6666H23.9996C8.24883 58.6666 2.83501 27.6554 25.5664 19.0575C26.2105 18.8138 26.6663 18.2026 26.6663 17.5139V10.6665Z"
      stroke="#33569F"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M16 26.6666H48" stroke="#33569F" strokeWidth={1.7} />
    <Path
      d="M24 5.33337H40"
      stroke="#33569F"
      strokeWidth={1.7}
      strokeLinecap="round"
    />
    <Path
      d="M31.1115 34.6666L26.667 42.6666H37.3337L32.8891 50.6666"
      stroke="#FFCC00"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RewardIcon;
