import "./MainPage.css";

import SingleVacation from "../../Vacations/SingleVacation/SingleVacation";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

import { project } from "../../../Redux/ProjectStore";
import {
  allVacationAction,
  deleteVacationAction,
} from "../../../Redux/VacationsReducer";
import Vacation from "../../Models/Vacation";
import { userIsAdmin } from "../../Utils/authUtils";
import SearchBar from "../../Features/SearchBar/SearchBar";
import Filters from "../../Features/Filters/Filters";
import { Backdrop, CircularProgress, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <Backdrop open={isLoading} style={{ zIndex: 1000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

function MainPage(): JSX.Element {
  const [vacationList, setList] = useState<Vacation[]>(
    project.getState().vacations.allVacations
  );
  const userVacations = useSelector(
    (state: any) => state.users.users[0]?.likedVacations || []
  );

  const isAdmin = userIsAdmin();
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVacations, setFilteredVacations] =
    useState<Vacation[]>(vacationList);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = vacationList.filter((vacation) =>
      vacation.destination.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVacations(results);
    setTotalPages(Math.ceil(results.length / itemsPerPage));
  };
  const handleFilters = (filteredVacations: Vacation[]) => {
    setFilteredVacations(filteredVacations);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredVacations.length / itemsPerPage));
  };
  const handlePageChange = (event: ChangeEvent<any>, page: number) => {
    setCurrentPage(page);
  };
  const getPageVacations = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredVacations.slice(start, end);
  };
  const deleteVac = async (vacationId: number) => {
    await axios.delete(
      `http://localhost:4000/api/v1/vacations/deleteVacation/${vacationId}`
    );
    project.dispatch(deleteVacationAction(vacationId));

    setFilteredVacations(project.getState().vacations.allVacations);
    setRefresh(true);
  };

  useEffect(() => {
    if (vacationList.length < 1) {
      axios
        .get("http://localhost:4000/api/v1/vacations/vacationList")
        .then((response) => {
          project.dispatch(allVacationAction(response.data));
          setList(() => project.getState().vacations.allVacations);
          setRefresh(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setFilteredVacations(vacationList);
      setTotalPages(Math.ceil(vacationList.length / itemsPerPage));
    }
  }, [vacationList.length, setRefresh, vacationList]);

  if (loading) {
    return <LoadingOverlay isLoading={loading} />;
  }

  return (
    <div className="MainPage">
      <div className="container">
        <div className="vacFilters">
          <Filters
            filters={[
              ...(isAdmin
                ? []
                : [{ label: "Liked Vacations", value: "liked" }]),
              { label: "Ongoing Vacations", value: "ongoing" },
              { label: "Upcoming Vacations", value: "upcoming" },
            ]}
            onFilterChange={handleFilters}
            vacations={vacationList}
            likedVacations={userVacations}
          />
        </div>
        <div className="vacSearch">
          <SearchBar query={searchQuery} onQueryChange={handleSearch} />
        </div>
      </div>
      <div className="VacationList">
        {getPageVacations().map((item) => (
          <SingleVacation
            key={item.vacation_code}
            vacation_code={item.vacation_code}
            file_img_name={item.file_img_name}
            destination={item.destination}
            description={item.description}
            start_date={item.start_date}
            end_date={item.end_date}
            price={item.price}
            isAdmin={isAdmin}
            likes={item.likes || 0}
            onDelete={() => deleteVac(item.vacation_code!)}
          />
        ))}
      </div>

      <Pagination
        className="pagination"
        color="secondary"
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default MainPage;
