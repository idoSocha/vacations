import "./Vacations.css";
import { NavLink } from "react-router-dom";
import SingleVacation from "../../Vacations/SingleVacation/SingleVacation";

function Vacations(): JSX.Element {
  return (
    <div className="Vacations">
      <SingleVacation />
      <NavLink to="/logintemp">loginTemp</NavLink>
      <br />
      <NavLink to="/login">login</NavLink>
    </div>
  );
}

export default Vacations;
