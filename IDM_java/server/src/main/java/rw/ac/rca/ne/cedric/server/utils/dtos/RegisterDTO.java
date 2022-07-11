package rw.ac.rca.ne.cedric.server.utils.dtos;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class RegisterDTO {

    @NotEmpty
    private String fullNames;

    @NotEmpty
    private String phoneNumber;

    @NotEmpty
    @Size(min = 16, max = 16, message = "Enter a valid National ID")
    private String nationalId;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private String password;
}
