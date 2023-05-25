import React from "react";
import "./NavBar.css";

export default function NavBar(props: { active: string }) {
  return (
    <div className="NavBarContainer">
      <img
        src="/home.svg"
        alt="Home"
        className={props.active === "home" ? "NavBarActive" : "NavBarInActive"}
      />
      <img
        src="/tournament.svg"
        alt="Tournament"
        className={
          props.active === "tournament" ? "NavBarActive" : "NavBarInActive"
        }
      />
    </div>
  );
}
