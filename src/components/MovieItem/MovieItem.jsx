import { useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function MovieItem({ movie }) {
  const history = useHistory();

  const handleClick = () => {
    // dispatch({ type: "SET_DETAILS", payload: movie });
    history.push(`/details/${movie.id}`);
  };
  return (
    <Card sx={{ maxWidth: 185 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={movie.poster}
          alt={movie.title}
          sx={{ height: 275, width: 185 }}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {movie.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
