import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect} from 'react';
import Layout from './compoments/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './compoments/home/Home';
import Header from './compoments/header/Header';

function App() {
  
    const [movies, setMovies] = useState();

    // Load all movies.
    useEffect(() => {
        api.get('/api/v1/movies').then(res => {
            try {
                setMovies(res.data);
            } catch (err) {
                console.log(err);
            }
        })
    }, [])


    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home movies={movies} />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
