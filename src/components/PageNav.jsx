import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navLinks}>
        <li>
          <img
            src="../logo_dark.png"
            alt="App logo"
            style={{ height: "45px", width: "45px" }}
          />
        </li>
        <li>
          <NavLink to="/">
            <ion-icon name="thunderstorm-outline" class="icon-small"></ion-icon>
            &nbsp; Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cities">
            <ion-icon name="list-outline" class="icon-small"></ion-icon>
            &nbsp; Cities
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
