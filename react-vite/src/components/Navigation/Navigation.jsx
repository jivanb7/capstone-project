import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="Navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", width: "100%", boxSizing: "border-box", maxWidth: "1200px", padding: "10px 350px", margin: "0 auto",}}>
      <div>
        <NavLink to="/">
        <img 
          src="https://raw.githubusercontent.com/jivanb7/feedmelogo/refs/heads/main/caplogo.jpg"
          alt="Home-Logo"
          style={{height: "150px", width: "250px"}}
        />
        </NavLink>
      </div>

      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
