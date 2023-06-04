import { useState } from "react";
import "./Header.css";

function Header(): JSX.Element {
  const [login, setLogin] = useState(false);

  const userLogged = () => {};
  return (
    <div className="Header">
      <nav></nav>
    </div>
  );
}

export default Header;
