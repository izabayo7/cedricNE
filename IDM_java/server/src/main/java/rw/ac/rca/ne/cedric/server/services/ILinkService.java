package rw.ac.rca.ne.cedric.server.services;

import rw.ac.rca.ne.cedric.server.models.Link;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateLinkDTO;

import java.util.List;

public interface ILinkService {

    List<Link> all();

    Link create(CreateLinkDTO course);

}
