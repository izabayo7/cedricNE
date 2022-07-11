package rw.ac.rca.ne.cedric.dtos;

import rw.ac.rca.ne.cedric.enums.ERole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CreateOrUpdateUserDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String password;
    private ERole role;

    public CreateOrUpdateUserDTO(String firstName, String lastName, String email, String phone, String password, String username,ERole role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.username = username;
        this.role = role;
    }
}
