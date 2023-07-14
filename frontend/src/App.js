import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect} from 'react';
import Layout from './compoments/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './compoments/home/Home';
import Header from './compoments/header/Header';
import Trailer from './compoments/trailer/Trailer';
import { setRef } from '@mui/material';
import Reviews from './compoments/reviews/Reviews';
import Login from './compoments/login/Login';
import Register from './compoments/register/Register';
import { UserContextProvider } from './compoments/userContext/UserContext';

function App() {
  
    const [movies, setMovies] = useState();
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);

    // Load all movies.
    useEffect(() => {
        api.get('/api/v1/movies').then(res => {
            try {
                setMovies(res.data);
            } catch (err) {
                console.log(err);
            }
        })
    }, []);

    // Load single movie.
    async function getMovieData(movieId) {
        try {
            const response = await api.get(`/api/v1/movies/${movieId}`);
            const singleMovie = response.data;
            setMovie(singleMovie);
            setReviews(singleMovie.reviews);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="App">
            <UserContextProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home movies={movies} />}></Route>
                        <Route path='/Trailer/:ytTrailerId' element={<Trailer />}></Route>
                        <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
                        <Route path='/Login' element={<Login />}></Route>
                        <Route path='/Register' element={<Register />}></Route>
                    </Route>
                </Routes>
            </UserContextProvider>
        </div>
    );
}

export default App;
