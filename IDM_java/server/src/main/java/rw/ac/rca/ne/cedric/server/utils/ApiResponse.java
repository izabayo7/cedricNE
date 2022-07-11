package rw.ac.rca.ne.cedric.server.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ApiResponse {

    HttpStatus status;

    boolean success;

    String message;

    Object data;

    public static ApiResponse success(String message) {
        return new ApiResponse(HttpStatus.OK, true, message, null);
    }

    public static ApiResponse success(Object data) {
        return new ApiResponse(HttpStatus.OK, true, null, data);
    }

    public static ApiResponse badRequest(String message, Object data) {
        return new ApiResponse(HttpStatus.BAD_REQUEST, false, message, data);
    }
}
