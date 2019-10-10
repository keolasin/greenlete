import React from "react";
import { paths } from "./Icons/iconPaths.js";
import { styles } from "../styles/litterMap.js";

const pinIcon = paths.mainPin;

export default function DraggablePin(props) {
  return (
    <svg
      height={props.size}
      viewBox="0 0 512 512"
      id="draggablePin"
      xmlns={paths.xmlns}
    >
      <path d={pinIcon} />
    </svg>
  );
}
