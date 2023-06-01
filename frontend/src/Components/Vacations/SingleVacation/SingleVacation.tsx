import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./SingleVacation.css";
import moment from "moment";

interface vacationProps {
  vacation_code: number;
  destination: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;
  file_img_name: string;
}
function SingleVacation(props: vacationProps): JSX.Element {
  return (
    <div className="SingleVacation">
      <Box width="300px">
        <Card variant="outlined">
          <CardMedia component="img" height="200px" src={props.file_img_name} />
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
            <Typography variant="body2">{props.price}€</Typography>
            <CardActions>
              <Button size="small">Order Now!</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
      {/* <Box width="300px">
        <Card variant="outlined">
          <CardMedia
            component="img"
            height="200px"
            image="https:source.unsplash.com/random"
          />
          <CardContent>
            <Typography variant="body2">hey</Typography>
            <CardActions>
              <Button size="small">$40</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
      <Box width="300px">
        <Card variant="outlined">
          <CardMedia
            component="img"
            height="200px"
            image="https:source.unsplash.com/random"
          />
          <CardContent>
            <Typography variant="body2">hey</Typography>
            <CardActions>
              <Button size="small">$40</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box> */}
    </div>
  );
}

export default SingleVacation;
