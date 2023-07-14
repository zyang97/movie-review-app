package zyang.movies.controllers;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import zyang.movies.exception.EntityNotFoundException;
import zyang.movies.exception.UserExistsException;
import zyang.movies.models.User;
import zyang.movies.repositories.AuthRepository;
import zyang.movies.services.AuthService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private AuthRepository repository;

    @PostMapping("/register")
    public SaResult register(@RequestBody Map<String, String> payload) {
        Optional<User> user = service.createuser(payload.get("username"), payload.get("password"), payload.get("email"));
        return new SaResult(SaResult.CODE_SUCCESS, "registered", user.get().getId().toString());
    }

    @RequestMapping("/profile")
    public SaResult register() {
        Object userId = StpUtil.getLoginId();
        System.out.println("login id: " + userId.toString());
        return new SaResult(HttpStatus.OK.value(), "get profile success", userId);
    }

    @PostMapping("/login")
    public SaResult login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        // Find user from database.
        Optional<User> user = repository.findUserByUsername(username);
        if (user.isEmpty()) {
            return new SaResult(HttpStatus.NOT_FOUND.value(), "user does not exist", null);
        }

        // Matching username and password.
        if (user.get().getUsername().equals(username) && user.get().getPassword().equals(password)) {
            String userId = user.get().getId().toString();
            StpUtil.login(userId);
            return new SaResult(SaResult.CODE_SUCCESS, "login success", userId);
        }
        return SaResult.error("login failed");
    }

    @RequestMapping("/isLogin/{userId}")
    public SaResult checkLogin(@PathVariable String userId) {
        StpUtil.isLogin(userId);
        return SaResult.ok("check login success");
    }

    @RequestMapping("/logout/{userId}")
    public SaResult logout(@PathVariable String userId) {
        StpUtil.logout(userId);
        System.out.println("is logedin in：" + StpUtil.isLogin());
        return SaResult.ok("logout success");
    }



}
