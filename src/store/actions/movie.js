import axios from "axios";
import {
  ADD_MOVIES,
  ADD_MOVIES_REQUEST,
  GET_MOVIES,
  GET_MOVIES_REQUEST,
  SEARCH_MOVIES,
  GET_MOVIE_REQUEST,
  GET_MOVIE,
  ADD_FAV,
  REMOVE_FAV,
} from "../constants/movie";
import { getTorrentMovie } from "./torrent";
import { getSubtitle } from "./subtitles";
import { API_KEY } from "../../globalVariables";

// Get Popular Movies
export const getMovies = (filters, ordem) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_REQUEST });

  let res;

  if (Object.keys(filters).length === 0) {
    res = await axios.get(
      `https://api.themoviedb.org/3/movie/${ordem.value}?api_key=${API_KEY}&language=en-US&page=1`
    );
  } else {
    res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}${
        filters.genre ? `&with_genres=${filters.genre.value}` : ""
      }${filters.sort ? `&sort_by=${filters.sort.value}` : ""}${
        filters.vote ? `&vote_count.gte=${filters.vote.value}` : ""
      }${
        filters.releaseDate
          ? `&release_date.lte=${filters.releaseDate.value}`
          : ""
      }${
        filters.score ? `&vote_average.gte=${filters.score.value}` : ""
      }&language=en-US&page=1`
    );
  }

  dispatch({
    type: GET_MOVIES,
    payload: {
      movies: res.data.results,
      pages: res.data.total_pages,
      results: res.data.total_results,
    },
  });
};

// Get Popular Movies
export const addMovies = (page, filters) => async (dispatch) => {
  dispatch({ type: ADD_MOVIES_REQUEST });

  let res;

  if (Object.keys(filters).length !== 0) {
    res = await axios.get(
      `https://api.themoviedb.org/3/movie/${filters.ordem.value}?api_key=${API_KEY}&language=en-US&page=${page}`
    );
  } else {
    res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}${
        filters.genre ? `&with_genres=${filters.genre.value}` : ""
      }${filters.sort ? `&sort_by=${filters.sort.value}` : ""}${
        filters.vote ? `&vote_count.gte=${filters.vote.value}` : ""
      }${
        filters.releaseDate
          ? `&release_date.lte=${filters.releaseDate.value}`
          : ""
      }${
        filters.score ? `&vote_average.gte=${filters.score.value}` : ""
      }&language=en-US&page=${page}`
    );
  }
  dispatch({
    type: ADD_MOVIES,
    payload: res.data.results,
  });
};

// Get Single Movie
export const getMovie = (id) => async (dispatch) => {
  dispatch({ type: GET_MOVIE_REQUEST });

  const resBR = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  );

  const resUS = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  dispatch({
    type: GET_MOVIE,
    payload: { ...resUS.data, overview: resBR.data.overview },
  });

  dispatch(
    getTorrentMovie(resBR.data.title, resUS.data.title, resUS.data.release_date)
  );
  dispatch(
    getSubtitle(resBR.data.title, resUS.data.title, resUS.data.release_date)
  );
};

// Search Movies
export const searchMovies = (query) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_REQUEST });

  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`
  );

  dispatch({
    type: SEARCH_MOVIES,
    payload: {
      movies: res.data.results,
      pages: res.data.total_pages,
      results: res.data.total_results,
      query: query,
    },
  });
};

// Add Movie To Favorites
export const addToFavs = (movie) => (dispatch, getState) => {
  dispatch({
    type: ADD_FAV,
    payload: {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genres: movie.genres,
    },
  });
  localStorage.setItem(
    "favoriteMovies",
    JSON.stringify(getState().favoriteList.favorites)
  );
};

// Remove Movie From Favorites
export const removeFromFavs = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FAV,
    payload: id,
  });
  localStorage.setItem(
    "favoriteMovies",
    JSON.stringify(getState().favoriteList.favorites)
  );
};
