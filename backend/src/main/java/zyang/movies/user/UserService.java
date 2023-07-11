package zyang.movies.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import zyang.movies.exception.UserExistsException;
import zyang.movies.movie.Movie;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Optional<User> createuser(String username, String hashedPassword, String email) {
        Optional<User> user;

        // Check username and password.
        user = userRepository.findUserByUsername(username);
        if (!user.isEmpty()) {
            throw new UserExistsException();
        }
        user = userRepository.findUserByEmail(email);
        if (!user.isEmpty()) {
            throw new UserExistsException();
        }

        // Create user.
        user = Optional.of(userRepository.insert(new User(username, hashedPassword, email)));

        return user;
    }
}
