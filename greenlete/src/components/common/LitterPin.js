import React from "react";
import { paths } from "./Icons/iconPaths.js";
import { styles } from "../styles/litterMap.js";

const litterIcon = paths.litter;

export default function LitterPin(props) {
  return (
    <svg
      height={props.size}
      viewBox="0 0 512 512"
      style={styles.pin}
      xmlns={paths.xmlns}
      onClick={props.onClick}
    >
      <path d={litterIcon} />
    </svg>
  );
}
