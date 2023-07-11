package zyang.movies.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Optional<User>> createUser(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<Optional<User>>(
                userService.createuser(payload.get("username"), payload.get("password"), payload.get("email")), HttpStatus.CREATED
        );
    }

    @GetMapping("/login")
    public ResponseEntity<Optional<>>
}
