package rw.ac.rca.ne.cedric.dao;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class Link {

    private UUID id;

    private String link_name;

    private Long  total_elapsed_time;

    private Long  total_downloaded_kilobytes;

    private Website website;

}
