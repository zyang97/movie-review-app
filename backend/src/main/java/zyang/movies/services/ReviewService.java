package zyang.movies.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import zyang.movies.exception.EntityNotFoundException;
import zyang.movies.models.Movie;
import zyang.movies.repositories.MovieRepository;
import zyang.movies.models.Review;
import zyang.movies.repositories.ReviewRepository;

import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Optional<Review> createReview(String owner, String reviewBody, String imdbId) {

        // Check movie existence.
        Optional<Movie> movie =  movieRepository.findMovieByImdbId(imdbId);
        if (movie.isEmpty()) {
            throw new EntityNotFoundException(Movie.class, "imdbId", imdbId);
        }

        // Create review.
        Review review = reviewRepository.insert(new Review(owner, reviewBody));
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviews").value(review))
                .first();

        return Optional.of(review);
    }
}
