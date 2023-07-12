package zyang.movies.services;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import zyang.movies.exception.EntityNotFoundException;
import zyang.movies.exception.UserExistsException;
import zyang.movies.models.User;
import zyang.movies.repositories.AuthRepository;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private AuthRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Optional<User> getUserByUsername(String username) {
        Optional<User> user = repository.findUserByUsername(username);
        return user;
    }

    public Optional<User> createuser(String username, String password, String email) {
        Optional<User> user;

        // Check username and password.
        user = repository.findUserByUsername(username);
        if (!user.isEmpty()) {
            throw new UserExistsException();
        }
        user = repository.findUserByEmail(email);
        if (!user.isEmpty()) {
            throw new UserExistsException();
        }

        // Create user.
        user = Optional.of(repository.insert(new User(username, password, email)));

        return user;
    }

}
