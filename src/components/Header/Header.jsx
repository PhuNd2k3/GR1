import { Link } from "react-router-dom";
import homeIcon from "../../assets/home.png";
import "./Header.css";
import Home from "./../Home";

export default function Header() {
  return (
    <div className="header">
      <div className="header__item">
        <Link to="/">
          <img src={homeIcon} alt="Home" />
        </Link>
      </div>
      <div className="header__item">
        <Link to="/data_table">Data Table</Link>
      </div>
      <div className="header__item">
        <Link to="/grid_image">Grid Image</Link>
      </div>
      <div className="header__item">
        <Link to="/lesson_3">Lesson 3</Link>
      </div>
      <div className="header__item">
        <Link to="/lesson_4">Lesson 4</Link>
      </div>
      <div className="header__item">
        <Link to="/lesson_5">Lesson 5</Link>
      </div>
      <div className="header__item">
        <Link to="/chart">Chart</Link>
      </div>
    </div>
  );
}
