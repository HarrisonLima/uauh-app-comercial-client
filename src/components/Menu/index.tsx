import Profile from "../Profile";
import Modules from "./Modules";
import Exit from "../Exit";

const Menu = () => {
  return (
    <>
      <div className="menu__profile">
        <Profile />
      </div>
      <div className="menu">
        <Modules />
      </div>
      <div className="menu__exit">
        <Exit />
      </div>
    </>
  );
};

export default Menu;
