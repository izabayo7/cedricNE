package rw.ac.rca.ne.cedric.server.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.ac.rca.ne.cedric.server.models.Link;
import rw.ac.rca.ne.cedric.server.repositories.ILinkRepository;
import rw.ac.rca.ne.cedric.server.services.ILinkService;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateLinkDTO;

import java.util.List;

@Service
public class LinkServiceImpl implements ILinkService {

    private final ILinkRepository linkRepository;

    @Autowired
    public LinkServiceImpl(ILinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

    @Override
    public List<Link> all() {
        return linkRepository.findAll();
    }

    @Override
    public Link create(CreateLinkDTO linkDTO) {
        Link link = new Link();
        link.setLink_name(linkDTO.getUrl().getHost());
        link.setWebsite_id(linkDTO.getWebsite_id());


        return linkRepository.save(link);
    }
}
