import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function MovieForm() {
  return (
    <main>
      <form>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Poster URL" />
        <input type="text" placeholder="Description" />
      </form>
    </main>
  );
}
