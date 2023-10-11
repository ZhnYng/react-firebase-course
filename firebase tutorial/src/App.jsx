import React from "react";
import Auth from "./components/Auth";
import { auth, db, storage } from "./config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function App() {
  const [movieList, setMovieList] = React.useState([])
  const [loadingId, setLoadingId] = React.useState("")
  const [fileUpload, setFileUpload] = React.useState("")
  const [movie, setMovie] = React.useState({
    title: "",
    releaseDate: 0,
    receivedAnOscar: false,
  });
  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getMovieList();
  }, []);

  const handleMovieChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovie((prevMovie) => {
      return {
        ...prevMovie,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleMovieSubmit = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movie.title,
        releaseDate: movie.releaseDate,
        receivedAnOscar: movie.receivedAnOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    setLoadingId(id);
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);

      getMovieList();
      setLoadingId("");
    } catch (err) {
      console.error(err);
      setLoadingId("");
    }
  };

  const uploadFile = async() => {
    if(!fileUpload) return
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Auth />
      <div>
        <input
          type="text"
          onChange={handleMovieChange}
          name="title"
          placeholder="Movie Title..."
          value={movie.title}
        />
        <input
          onChange={handleMovieChange}
          placeholder="Release Date..."
          type="number"
          name="releaseDate"
          value={movie.releaseDate}
        />
        <input
          onChange={handleMovieChange}
          name="receivedAnOscar"
          type="checkbox"
          checked={movie.receivedAnOscar}
        />
        <label>Received an Oscar</label>
        <button onClick={handleMovieSubmit}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie, id) => (
          <div key={id}>
            <h1
              className={
                movie.receivedAnOscar ? "text-green-500" : "text-red-500"
              }
            >
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>
              {movie.id === loadingId ? "Loading..." : "Delete Movie"}
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={e => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}
