package rw.ac.rca.ne.cedric.server.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.ac.rca.ne.cedric.server.models.Link;
import rw.ac.rca.ne.cedric.server.repositories.ILinkRepository;
import rw.ac.rca.ne.cedric.server.services.ILinkService;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateLinkDTO;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public void createFolder(String path){
        System.out.println(path);
        File pathAsFile = new File(path);
        if (!Files.exists(Paths.get(path))) {
            pathAsFile.mkdirs();
        }
    }

    @Override
    public Link create(CreateLinkDTO linkDTO) throws IOException {
        Link link = new Link();

        String filePath= linkDTO.getPath();

        if(linkDTO.getFileName().isBlank()){
            link.setLink_name(linkDTO.getFileName());
            filePath = filePath+"index.html";
        } else {
            link.setLink_name(linkDTO.getUrl().getHost());
            filePath = filePath+linkDTO.getFileName();
        }

        link.setWebsite_id(linkDTO.getWebsite_id());


        LocalDateTime start = LocalDateTime.now();

        BufferedReader readr =
                new BufferedReader(new InputStreamReader(linkDTO.getUrl().openStream()));

        // Enter filename in which you want to download
        BufferedWriter writer =
                new BufferedWriter(new FileWriter(filePath));

        // read each line from stream till end
        String line;
        while ((line = readr.readLine()) != null) {
            writer.write(line);
        }

        readr.close();
        writer.close();
        LocalDateTime end = LocalDateTime.now();
        link.setTotal_elapsed_time(Duration.between(start,end).toMillis());
        link.setTotal_downloaded_kilobytes(Files.size(Paths.get(filePath)) / 1024);
        return linkRepository.save(link);
    }
}
