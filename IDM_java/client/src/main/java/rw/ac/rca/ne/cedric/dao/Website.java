package rw.ac.rca.ne.cedric.dao;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class Website {

    private UUID id;

    private String website_name;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime download_start_date_time;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime download_end_date_time;

    private Long  total_elapsed_time;

    private Long  total_downloaded_kilobytes;

    private Set<Link> links = new HashSet<>();
}
