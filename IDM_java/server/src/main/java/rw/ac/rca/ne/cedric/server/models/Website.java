package rw.ac.rca.ne.cedric.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "websites")
public class Website {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String website_name;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime download_start_date_time;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime download_end_date_time;

    private Long  total_elapsed_time;

    private Long  total_downloaded_kilobytes;

    @JsonManagedReference
    @OneToMany(mappedBy = "website",  cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Link> links = new HashSet<>();
}
