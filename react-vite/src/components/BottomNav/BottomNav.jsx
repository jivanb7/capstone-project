import { Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";

export default function BottomNavigation() {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <FaHome size={30} />
      </Link>

      <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <FaUser size={28} />
      </Link>
    </div>
  );
}
