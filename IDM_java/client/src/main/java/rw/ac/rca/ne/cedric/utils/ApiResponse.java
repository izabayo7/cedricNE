package rw.ac.rca.ne.cedric.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {

    HttpStatus status;

    boolean success;

    String message;

    Object data;
}
