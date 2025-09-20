import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const HandShakeIcon = ({size}) => (
  <Svg
    width={size || 22}
    height={size || 22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4080_784)">
      <Path
        d="M17.1875 13.0625L13.75 16.5L8.25 15.125L3.4375 11.6875"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.24609 6.06977L11.0002 4.8125L15.7542 6.06977"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.95323 5.19237L0.760107 9.58034C0.678601 9.74332 0.665132 9.93199 0.722659 10.1049C0.780187 10.2778 0.904004 10.4208 1.0669 10.5024L3.43706 11.6875L6.2455 6.06979L3.8762 4.88557C3.79546 4.84508 3.70753 4.8209 3.61744 4.8144C3.52735 4.80791 3.43686 4.81923 3.35114 4.84772C3.26543 4.87621 3.18617 4.92131 3.11789 4.98045C3.04962 5.03959 2.99367 5.1116 2.95323 5.19237Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5623 11.6875L20.9325 10.5024C21.0954 10.4208 21.2192 10.2778 21.2767 10.1049C21.3343 9.93199 21.3208 9.74332 21.2393 9.58034L19.0462 5.19237C19.0057 5.1116 18.9498 5.03959 18.8815 4.98045C18.8132 4.92131 18.734 4.87621 18.6483 4.84772C18.5625 4.81923 18.4721 4.80791 18.382 4.8144C18.2919 4.8209 18.2039 4.84508 18.1232 4.88557L15.7539 6.06979L18.5623 11.6875Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8129 6.1875H12.3754L8.45149 9.99367C8.37854 10.0666 8.32294 10.155 8.28878 10.2523C8.25463 10.3496 8.24282 10.4533 8.2542 10.5559C8.26559 10.6584 8.2999 10.757 8.35458 10.8444C8.40926 10.9319 8.48291 11.0059 8.57008 11.061C10.0748 12.0227 12.1176 11.9565 13.7504 10.3125L17.1879 13.0625L18.5629 11.6875"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6614 18.5625L7.07609 17.6662L4.8125 16.0488"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4080_784">
        <Rect width={22} height={22} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default HandShakeIcon;
