import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./SingleVacation.css";
import moment from "moment";
import { useState } from "react";
// import axios from "axios";

interface vacationProps {
  destination: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;
  file_img_name: string;
}
function SingleVacation(props: vacationProps): JSX.Element {
  // const [liked, setliked] = useState(false);

  // const isliked = () => {
  //   axios.post("http://localhost:4000/api/v1/vacations/addFollower",);
  //   setliked(true);
  // };

  return (
    <div className="SingleVacation">
      <Box width="300px">
        <Card variant="outlined">
          <div id="inside-image">
            <IconButton
              id="favorite"
              aria-label="add to favorites"
              // onClick={isliked}
            >
              <FavoriteIcon />
            </IconButton>
            <CardMedia
              component="img"
              height="200px"
              src={props.file_img_name}
            />
          </div>
          <CardContent>
            <Typography variant="body2">{props.destination}</Typography>
            <Typography variant="body2">{props.description}</Typography>
            <Typography variant="body2">
              from:
              {moment(props.start_date).format("DD-MM-YYYY")}
            </Typography>{" "}
            <Typography variant="body2">
              till:
              {moment(props.end_date).format("DD-MM-YYYY")}
            </Typography>
            <CardActions>
              <Button size="large">{props.price}€</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default SingleVacation;
