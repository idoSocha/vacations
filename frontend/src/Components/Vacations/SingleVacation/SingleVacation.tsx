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

function SingleVacation(): JSX.Element {
  return (
    <div className="SingleVacation">
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
      </Box>
    </div>
  );
}

export default SingleVacation;
