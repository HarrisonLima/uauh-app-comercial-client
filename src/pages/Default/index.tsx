import { Outlet } from "react-router-dom";

import Menu from "./../../components/Menu";
import Logo from "../../components/Logo";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../components/Icon";
import { useState } from "react";

const Default = () => {
  const [overlayMenu, setOverlayMenu] = useState(false);
  return (
    <div className={`structure ${overlayMenu ? "menu-active" : ""}`}>
      <header>
        <Logo />
      </header>
      <aside data-overlay={overlayMenu}>
        <Menu />
      </aside>
      <main>
        <Outlet />
      </main>
      <div className="structure__menu">
        <Icon
          icon={faBars}
          color="white"
          size="lg"
          variant="button"
          onClick={() => setOverlayMenu(!overlayMenu)}
        />
      </div>
      {overlayMenu && <div className="overlay" onClick={() => setOverlayMenu(false)}></div>}
    </div>
  );
};

export default Default;
