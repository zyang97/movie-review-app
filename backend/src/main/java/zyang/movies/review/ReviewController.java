package zyang.movies.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zyang.movies.movie.Movie;
import zyang.movies.movie.MovieService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private MovieService movieService;

    @PostMapping
    public ResponseEntity<Optional<Review>> createReview(@RequestBody Map<String, String> payload) {

        return new ResponseEntity<Optional<Review>>(
                reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")),
                HttpStatus.CREATED
        );
    }

}
