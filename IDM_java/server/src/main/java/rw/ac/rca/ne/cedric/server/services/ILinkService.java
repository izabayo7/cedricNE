package rw.ac.rca.ne.cedric.server.services;

import rw.ac.rca.ne.cedric.server.models.Link;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateLinkDTO;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ILinkService {

    List<Link> all();

    Link create(CreateLinkDTO course) throws IOException;

    List<Link> findByWebsite(UUID websiteId);

}
