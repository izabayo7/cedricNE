package rw.ac.rca.ne.cedric.server.services;

import rw.ac.rca.ne.cedric.server.models.Website;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateWebsiteDTO;

import java.io.IOException;
import java.util.List;
import java.net.URL;

public interface IWebsiteService {
    List<Website> all();

    Website create(URL url) throws IOException;
}
