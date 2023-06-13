import "./MainPage.css";
import { NavLink } from "react-router-dom";
import SingleVacation from "../../Vacations/SingleVacation/SingleVacation";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Pagination } from "@mui/material";
import { project } from "../../../Redux/ProjectStore";
import { allVacationAction } from "../../../Redux/VacationsReducer";
import Vacation from "../../Models/Vacation";

function MainPage(): JSX.Element {
  const [vacationList, setList] = useState<Vacation[]>(
    project.getState().vacations.allVacations
  );
  // const [currentPage, setCurrentPage] = useState(1);
  // const [cardsPerPage, setcardsPerPage] = useState(10);
  const [refresh, setRefresh] = useState(false);

  // const lastIndex = currentPage * cardsPerPage;
  // const firstIndex = lastIndex - cardsPerPage;
  // const currentCards = vacationList.slice(firstIndex, lastIndex);

  useEffect(() => {
    const unsubscribed = project.subscribe(() => {
      setList(() => project.getState().vacations.allVacations);
    });
    if (project.getState().vacations.allVacations.length < 1) {
      axios
        .get("http://localhost:4000/api/v1/vacations/vacationList")
        .then((response) => {
          project.dispatch(allVacationAction(response.data));
          setRefresh(!refresh);
        });
    }
    return unsubscribed;
  }, []);

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
      {/* <Pagination
        count={Math.ceil(vacationList.length / 10)}
        color="primary"
        onChange={() => setCurrentPage}
      ></Pagination> */}
      <br />
      <NavLink to="/login">login</NavLink>
    </div>
  );
}

export default MainPage;
