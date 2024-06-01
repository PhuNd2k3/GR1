import { Link } from "react-router-dom";
import homeIcon from "../../assets/home.png";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header__item">
        <Link to="/">
          <img src={homeIcon} alt="Home" className="homeImage" />
        </Link>
      </div>
      <div className="header__item">
        <Link to="/data_table">Data Table</Link>
      </div>
      <div className="header__item">
        <Link to="/grid_image">Grid Image</Link>
      </div>
      <div className="header__item">
        <Link to="/maze">Maze</Link>
      </div>
      <div className="header__item">
        <Link to="/map">Map</Link>
      </div>
      <div className="header__item">
        <Link to="/chart">Chart</Link>
      </div>
    </div>
  );
}
