import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Icons.css";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { updateLikesAction } from "../../../Redux/UsersReducer";
import {
  vacationLikesAction,
  vacationUnlikeAction,
} from "../../../Redux/VacationsReducer";
import { project } from "../../../Redux/ProjectStore";

interface IconProps {
  vacationId?: number;
  onDelete: () => void;
  isAdmin: boolean;
  initialLikes: number;
}

function Icons({
  vacationId,
  onDelete,
  isAdmin,
  initialLikes,
}: IconProps): JSX.Element {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const likeUrl = "http://localhost:4000/api/v1/vacations";
  const user = useSelector((state: any) => state.users.users[0]);

  const likedVac = useSelector(
    (state: any) => state.users.users[0].likedVacations
  );

  // const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [updatedLikesVacations, setUpdatedLikesVacations] = useState(likedVac);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleEdit = () => {
    navigate(`/editVacation/${vacationId}`); // check if exists
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  const handleLike = async () => {
    const userId = user.user_code;

    const requestData = {
      user_code: userId,
      vacation_code: vacationId,
    };

    try {
      // console.log("typeof vacationId: ", typeof vacationId);
      // console.log("is array an array?: ", Array.isArray(user.likedVacations));

      const isLiked = user.likedVacations.includes(vacationId);
      // console.log(isLiked);

      let updatedLikedVacations = [...user.likedVacations];
      // console.log(updatedLikedVacations);

      if (isLiked) {
        // console.log(isLiked);
        // console.log(updatedLikedVacations);
        // console.log(user[0]);
        console.log(isLiked);

        // Unlike the vacation
        project.dispatch(vacationUnlikeAction(vacationId!));
        setLikes((prevLikes) => prevLikes - 1);
        setUpdatedLikesVacations(updatedLikedVacations);
        // Update the liked vacations array
        // updatedLikedVacations = updatedLikedVacations.filter(
        //   (id: number) => id !== vacationId
        // );
      } else {
        // Like the vacation
        project.dispatch(vacationLikesAction(vacationId!));
        setLikes((prevLikes) => prevLikes + 1);

        updatedLikedVacations.push(vacationId!);
      }
      project.dispatch(updateLikesAction([vacationId!]));

      await axios.post(`${likeUrl}/addFollower`, requestData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Icons">
      {isAdmin ? (
        <div className="adminIcons">
          <Tooltip title="Edit">
            <EditOutlinedIcon onClick={handleEdit} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteForeverOutlinedIcon onClick={handleDelete} />
          </Tooltip>
        </div>
      ) : (
        <div className="userIcons">
          {user.likedVacations.includes(vacationId) ? (
            <FavoriteIcon className="heartIcon filled" onClick={handleLike} />
          ) : (
            <FavoriteBorderOutlinedIcon
              className="heartIcon outlined"
              onClick={handleLike}
            />
          )}
          <Badge
            badgeContent={likes}
            color="primary"
            overlap="rectangular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          />
        </div>
      )}

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Icons;
