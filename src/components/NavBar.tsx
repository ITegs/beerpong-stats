import React from "react";
import "./NavBar.css";

export default function NavBar(props: { active: string; setActive: Function }) {
  return (
    <div className="NavBarContainer">
      <div className="home">
        <img
          src="./home.svg"
          alt="Home"
          className={
            props.active === "home" ? "NavBarActive" : "NavBarInActive"
          }
          onClick={() => props.setActive("home")}
        />
        <p>Home</p>
      </div>
      <div className="tournament">
        <img
          src="./tournament.svg"
          alt="Tournament"
          className={
            props.active === "tournament" ? "NavBarActive" : "NavBarInActive"
          }
          onClick={() => props.setActive("tournament")}
        />
        <p>Tournament</p>
      </div>
    </div>
  );
}
