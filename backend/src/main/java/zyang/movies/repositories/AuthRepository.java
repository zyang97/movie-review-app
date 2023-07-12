package zyang.movies.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import zyang.movies.models.User;

import java.util.Optional;

@Repository
public interface AuthRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);
}
