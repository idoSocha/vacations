import "./MainPage.css";
import { NavLink } from "react-router-dom";
import SingleVacation from "../../Vacations/SingleVacation/SingleVacation";
import { useState } from "react";
import axios from "axios";
import { log } from "console";

function MainPage(): JSX.Element {
  const [vacationList, setList] = useState([]);

  axios
    .get("http://localhost:4000/api/v1/vacations/vacationList")
    .then((response) => {
      setList(response.data);
    });
  // setList(vacationData.data);

  return (
    <div className="MainPage">
      <div className="VacationList">
        {vacationList.map((item) => (
          <SingleVacation
            key={item.vacation_code}
            file_img_name={item.file_img_name}
            destination={item.destination}
            description={item.description}
            start_date={item.start_date}
            end_date={item.end_date}
            price={item.price}
          />
        ))}
      </div>

      <NavLink to="/logintemp">loginTemp</NavLink>
      <br />
      <NavLink to="/login">login</NavLink>
    </div>
  );
}

export default MainPage;
