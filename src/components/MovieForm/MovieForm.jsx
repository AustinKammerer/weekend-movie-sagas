import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function MovieForm() {
  const dispatch = useDispatch();
  // save the genres in the store on page load for the dropdown
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);
  // get the genre list
  const genres = useSelector((store) => store.genres);

  // local state to store inputs
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    description: "",
    genre: "",
  });

  const handleChange = (e) => {
    // grab the name and value of the input being changed
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    // change the newMovie state according to which input is being changed
    // if the current property being set is genre, put the value in an array
    setNewMovie({ ...newMovie, [name]: name === "genre" ? [value] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMovie);
  };

  return (
    <main>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Title" />
        <input name="poster" type="text" placeholder="Poster URL" />
        <input name="description" type="text" placeholder="Description" />
        <select name="genre">
          <option>--Select a Genre--</option>
          {genres.map((genre, i) => (
            <option key={i} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </main>
  );
}
