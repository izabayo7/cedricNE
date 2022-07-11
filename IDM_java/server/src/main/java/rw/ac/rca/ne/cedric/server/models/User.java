package rw.ac.rca.ne.cedric.server.models;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import rw.ac.rca.ne.cedric.server.models.enums.ERole;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String fullNames;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    @Column(unique = true)
    private String nationalId;

    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private ERole role = ERole.ADMIN;
}
