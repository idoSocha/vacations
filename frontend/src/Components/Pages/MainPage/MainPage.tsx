import "./MainPage.css";
import { NavLink } from "react-router-dom";
import SingleVacation from "../../Vacations/SingleVacation/SingleVacation";
import { useEffect, useState } from "react";
import axios from "axios";
import Vacation from "../../Models/Vacation";

function MainPage(): JSX.Element {
  const [vacationList, setList] = useState<Vacation[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/vacations/vacationList")
      .then((response) => {
        setList(response.data);
      });
  }, [vacationList]);

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
