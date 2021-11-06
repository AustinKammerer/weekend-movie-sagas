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

  return (
    <main>
      <form>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Poster URL" />
        <input type="text" placeholder="Description" />
        <select name={genres}>
          <option>--Select a Genre--</option>
          {genres.map((genre, i) => (
            <option key={i} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </form>
    </main>
  );
}
