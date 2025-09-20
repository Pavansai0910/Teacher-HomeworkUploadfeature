import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const CoinIcon = ({size}) => (
  <Svg
    width={size || 25}
    height={size || 25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4080_792)">
      <Path
        d="M9.375 11.7188C13.6897 11.7188 17.1875 10.1448 17.1875 8.20312C17.1875 6.2615 13.6897 4.6875 9.375 4.6875C5.06028 4.6875 1.5625 6.2615 1.5625 8.20312C1.5625 10.1448 5.06028 11.7188 9.375 11.7188Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.5625 8.20312V12.1094C1.5625 14.0508 5.06055 15.625 9.375 15.625C13.6895 15.625 17.1875 14.0508 17.1875 12.1094V8.20312"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.25 11.4258V15.332"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.1875 9.44531C20.7539 9.77148 23.4375 11.1895 23.4375 12.8906C23.4375 14.832 19.9395 16.4062 15.625 16.4062C13.7109 16.4062 11.957 16.0967 10.5986 15.582"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.8125 15.5547V16.7969C7.8125 18.7383 11.3105 20.3125 15.625 20.3125C19.9395 20.3125 23.4375 18.7383 23.4375 16.7969V12.8906"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.75 16.1133V20.0195"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 11.4258V20.0195"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4080_792">
        <Rect width={25} height={25} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CoinIcon;
