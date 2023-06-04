import "./MainPage.css";
import { NavLink } from "react-router-dom";
import SingleVacation from "../../Vacations/SingleVacation/SingleVacation";
import { useEffect, useState } from "react";
import axios from "axios";
import Vacation from "../../Models/Vacation";
import { Pagination } from "@mui/material";

function MainPage(): JSX.Element {
  const [vacationList, setList] = useState<Vacation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setcardsPerPage] = useState(1);

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  const currentCards = vacationList.slice(firstIndex, lastIndex);

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
        {currentCards.map((item) => (
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
      <Pagination
        count={Math.ceil(vacationList.length / 1)}
        color="primary"
        onChange={() => setCurrentPage}
      ></Pagination>
      <br />
      <NavLink to="/login">login</NavLink>
    </div>
  );
}

export default MainPage;
