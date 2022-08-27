import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { MovieList } from "./pages/MovieList";
import { SerialList } from "./pages/SerialList";
import { MovieItem } from "./pages/MovieItem";
import { SerialItem } from "./pages/SerialItem";
import { LoginTrack } from "./pages/LoginTrack";
import { MovieHistoryList } from "./pages/MovieHistoryList";
import { VideoPlayer } from "./pages/VideoPlayer";
import { NotFoundPage } from "./pages/NotFoundPage";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/serials" element={<SerialList />} />
          <Route path="/movie/:id" element={<MovieItem />} />
          <Route path="/serial/:id" element={<SerialItem />} />
          <Route path="/history" element={<MovieHistoryList />} />
          <Route path="/login" element={<LoginTrack />} />
          <Route path="/player" element={<VideoPlayer />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
