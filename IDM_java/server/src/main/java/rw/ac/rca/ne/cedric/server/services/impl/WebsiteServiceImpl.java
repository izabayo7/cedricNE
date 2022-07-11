package rw.ac.rca.ne.cedric.server.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import rw.ac.rca.ne.cedric.server.models.Website;
import rw.ac.rca.ne.cedric.server.repositories.IWebsiteRepository;
import rw.ac.rca.ne.cedric.server.services.ILinkService;
import rw.ac.rca.ne.cedric.server.services.IWebsiteService;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateLinkDTO;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateWebsiteDTO;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Array;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class WebsiteServiceImpl implements IWebsiteService {

    private final IWebsiteRepository websiteRepository;

    @Value("${upload.directory}")
    private String savingPath;

    private final ILinkService courseService;

    public WebsiteServiceImpl(IWebsiteRepository websiteRepository, ILinkService courseService) {
        this.websiteRepository = websiteRepository;
        this.courseService = courseService;
    }

    @Override
    public List<Website> all() {
        return websiteRepository.findAll();
    }

    @Override
    public Website create(URL url) throws IOException {

        Website website = new Website();
        website.setWebsite_name(url.getHost());
        website.setDownload_start_date_time(LocalDateTime.now());

        String filePath = savingPath+"/"+website.getWebsite_name();
//        Array<CreateLinkDTO> links = new Array();

        BufferedReader readr =
                new BufferedReader(new InputStreamReader(url.openStream()));

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
        website.setDownload_end_date_time(LocalDateTime.now());

        website.setTotal_downloaded_kilobytes(Files.size(Paths.get(filePath)) / 1024);

        website.setTotal_elapsed_time(Duration.between(website.getDownload_start_date_time(),website.getDownload_end_date_time()).toMillis());

        Website saved = websiteRepository.save(website);



        return saved;
    }
}
