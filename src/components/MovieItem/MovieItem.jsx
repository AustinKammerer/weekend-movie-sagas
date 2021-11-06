import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function MovieItem({ movie }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch({ type: "SET_DETAILS", payload: movie });
    history.push(`/details/${movie.id}`);
  };
  return (
    <div>
      <h3>{movie.title}</h3>
      <img src={movie.poster} alt={movie.title} onClick={handleClick} />
    </div>
  );
}
