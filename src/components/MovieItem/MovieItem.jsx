import { useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export default function MovieItem({ movie }) {
  const history = useHistory();

  const handleClick = () => {
    // click a movie to go to its details page and bring id with
    history.push(`/details/${movie.id}`);
  };
  return (
    <Card sx={{ maxWidth: 185 }} square>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={movie.poster}
          alt={movie.title}
          sx={{ height: 275, width: 185 }}
        />
      </CardActionArea>
    </Card>
  );
}
