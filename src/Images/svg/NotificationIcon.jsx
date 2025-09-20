import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const NotificationIcon = ({size}) => (
  <Svg
    width={size || 19}
    height={size || 19}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_4077_13416)">
      <Path
        d="M7.125 14.25C7.125 14.8799 7.37522 15.484 7.82062 15.9294C8.26602 16.3748 8.87011 16.625 9.5 16.625C10.1299 16.625 10.734 16.3748 11.1794 15.9294C11.6248 15.484 11.875 14.8799 11.875 14.25"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.6562 1.78125C14.8028 2.51284 15.7328 3.53786 16.3496 4.75"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.65039 4.75C3.26727 3.53786 4.19723 2.51284 5.34379 1.78125"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.15658 8.3125C4.15658 6.89525 4.71959 5.53605 5.72173 4.5339C6.72388 3.53175 8.08308 2.96875 9.50033 2.96875C10.9176 2.96875 12.2768 3.53175 13.2789 4.5339C14.2811 5.53605 14.8441 6.89525 14.8441 8.3125C14.8441 10.971 15.4601 12.5133 15.9499 13.3594C16.002 13.4495 16.0294 13.5517 16.0295 13.6557C16.0296 13.7598 16.0023 13.862 15.9505 13.9522C15.8986 14.0424 15.8239 14.1174 15.734 14.1697C15.644 14.2219 15.5419 14.2496 15.4378 14.25H3.56283C3.45891 14.2494 3.35698 14.2215 3.26721 14.1691C3.17745 14.1168 3.103 14.0417 3.05131 13.9516C2.99962 13.8614 2.9725 13.7593 2.97266 13.6554C2.97281 13.5514 3.00025 13.4494 3.05221 13.3594C3.54131 12.5133 4.15658 10.9703 4.15658 8.3125Z"
        stroke="#33569F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4077_13416">
        <Rect width={19} height={19} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default NotificationIcon;
