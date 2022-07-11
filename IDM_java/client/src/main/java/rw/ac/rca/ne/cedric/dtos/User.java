package rw.ac.rca.ne.cedric.dtos;

import rw.ac.rca.ne.cedric.enums.ERole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;

    @JsonIgnore
    private String password;

    private ERole role;
    public User(CreateOrUpdateUserDTO dto){
        this.firstName = dto.getFirstName();
        this.lastName = dto.getLastName();
        this.username = dto.getUsername();
        this.phone = dto.getPhone();
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.role = dto.getRole();
    }
}
