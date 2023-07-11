package zyang.movies.exception;

import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

public class UserExistsException extends RuntimeException {
    public UserExistsException() {
        super("cannot create user, username or email already registered");
    }
}
