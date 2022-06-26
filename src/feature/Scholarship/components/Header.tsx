import { Link } from "react-router-dom";
import Logo from "../../../assets/main-logo-Banner.png";
import classes from "./Header.module.scss";
function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.title}>
        <img width="100" src={Logo} alt="INSIGHTER" />
      </Link>
      <div className="search"></div>
    </header>
  );
}

export default Header;
