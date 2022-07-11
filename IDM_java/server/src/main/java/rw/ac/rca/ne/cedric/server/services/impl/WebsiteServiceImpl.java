package rw.ac.rca.ne.cedric.server.services.impl;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import rw.ac.rca.ne.cedric.server.models.Website;
import rw.ac.rca.ne.cedric.server.repositories.IWebsiteRepository;
import rw.ac.rca.ne.cedric.server.services.ILinkService;
import rw.ac.rca.ne.cedric.server.services.IWebsiteService;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateLinkDTO;

import java.io.*;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class WebsiteServiceImpl implements IWebsiteService {

    private final IWebsiteRepository websiteRepository;
    private final ILinkService linkService;

    @Value("${upload.directory}")
    private String savingPath;

    private final ILinkService courseService;

    public WebsiteServiceImpl(IWebsiteRepository websiteRepository, ILinkService linkService, ILinkService courseService) {
        this.websiteRepository = websiteRepository;
        this.linkService = linkService;
        this.courseService = courseService;
    }

    @Override
    public List<Website> all() {
        return websiteRepository.findAll();
    }

    public static Set<String> findLinks(String url) throws IOException {

        Set<String> links = new HashSet<>();

        Document doc = Jsoup.connect(url)
                .data("query", "Java")
                .userAgent("Mozilla")
                .cookie("auth", "token")
                .timeout(3000)
                .get();

        Elements elements = doc.select("a[href]");
        for (Element element : elements) {
            links.add(element.attr("href"));
        }

        return links;

    }

    public void createFolder(String path){
        File pathAsFile = new File(path);
        if (!Files.exists(Paths.get(path))) {
            pathAsFile.mkdir();
        }
    }

    @Override
    public Website create(URL url) throws IOException {

        UUID id = UUID.randomUUID();

        Website website = new Website();
        website.setId(id);
        website.setWebsite_name(url.getHost());
        website.setDownload_start_date_time(LocalDateTime.now());

        String fileName = url.getFile();
        // use index.html on urls without filename
        if(fileName.isEmpty() || fileName.length() < 3){
            fileName = "index.html";
        }
        System.out.println(fileName);
        String filePath = savingPath+"/"+website.getWebsite_name()+"/";
        String linksFilePath = filePath+"links";

        // create folder if it does not exist
        createFolder(savingPath);
        createFolder(filePath);
        createFolder(linksFilePath);

        Set<CreateLinkDTO> linksToSave = new HashSet<>();

        BufferedReader readr =
                new BufferedReader(new InputStreamReader(url.openStream()));

        // Enter filename in which you want to download
        BufferedWriter writer =
                new BufferedWriter(new FileWriter(filePath+fileName));

        // read each line from stream till end
        String line;
        while ((line = readr.readLine()) != null) {
            writer.write(line);
//            Set<String> links = findLinks(line);
//            for (String link: links) {
//                CreateLinkDTO linkDTO = new CreateLinkDTO();
//                linkDTO.setWebsite_id(id);
//                linkDTO.setPath(linksFilePath);
//                linkDTO.setUrl(new URL(link));
//
//                linksToSave.add(linkDTO);
//            }
        }

        readr.close();
        writer.close();
        website.setDownload_end_date_time(LocalDateTime.now());

        website.setTotal_downloaded_kilobytes(Files.size(Paths.get(filePath+fileName)) / 1024);

        website.setTotal_elapsed_time(Duration.between(website.getDownload_start_date_time(),website.getDownload_end_date_time()).toMillis());

        Website saved = websiteRepository.save(website);

//        for (CreateLinkDTO linkDTO: linksToSave) {
//            linkService.create(linkDTO);
//        }

        return saved;
    }
}
