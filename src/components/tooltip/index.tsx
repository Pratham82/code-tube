import { useState } from "react";
import "styles/tooltip.scss";

export default function Tooltip({ children, text, delay }: any) {
  let timeout: any;
  const [active, setActive] = useState(false);
  return (
    <span
      onMouseEnter={() => {
        timeout = setTimeout(() => setActive(true), delay || 400);
      }}
      onMouseLeave={() => {
        clearInterval(timeout);
        setActive(false);
      }}
    >
      {children}
      {active && <div className="tooltip-container">{text}</div>}
    </span>
  );
}
