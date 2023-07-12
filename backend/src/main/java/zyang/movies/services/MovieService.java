package zyang.movies.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zyang.movies.exception.EntityNotFoundException;
import zyang.movies.models.Movie;
import zyang.movies.repositories.MovieRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId) {
        Optional<Movie> movie =  movieRepository.findMovieByImdbId(imdbId);
        if (movie.isEmpty()) {
            throw new EntityNotFoundException(Movie.class, "imdbId", imdbId);
        }
        return movie;
    }
}
