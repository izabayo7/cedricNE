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

    public static Set<String> findLinks(String url) {

        Set<String> links = new HashSet<>();

        Document doc = null;
        try {
            doc = Jsoup.connect(url).get();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        Elements elements = doc.select("a[href]");
        for (Element element : elements) {
            links.add(element.attr("href"));
        }

        return links;

    }

    public void createFolder(String path){
        File pathAsFile = new File(path);
        System.out.println(path+"creating folder");
        if (!Files.exists(Paths.get(path))) {
            pathAsFile.mkdirs();
        }
    }

    @Override
    public Website create(URL url) {

        try {

            Website website = new Website();
            website.setWebsite_name(url.getHost());
            website.setDownload_start_date_time(LocalDateTime.now());

            String fileName = url.getFile();
            // use index.html on urls without filename
            if (fileName.isEmpty() || fileName.length() < 3) {
                fileName = "index.html";
            }
            String filePath = savingPath + "/" + website.getWebsite_name() + "/";
            String linksPath = filePath + "links";

            // create folder if it does not exist
            createFolder(linksPath);

            BufferedReader readr =
                    new BufferedReader(new InputStreamReader(url.openStream()));

            // Enter filename in which you want to download
            BufferedWriter writer =
                    new BufferedWriter(new FileWriter(filePath + fileName));

            // read each line from stream till end
            String line;
            while ((line = readr.readLine()) != null) {
                writer.write(line);
            }

            readr.close();
            writer.close();
            website.setDownload_end_date_time(LocalDateTime.now());

            website.setTotal_downloaded_kilobytes(Files.size(Paths.get(filePath + fileName)) / 1024);

            website.setTotal_elapsed_time(Duration.between(website.getDownload_start_date_time(), website.getDownload_end_date_time()).toMillis());

            website.setId(UUID.randomUUID());
            Website saved = websiteRepository.save(website);
            System.out.println(saved.getId());
            Set<String> links = findLinks(url.toExternalForm());
            for (String link : links) {
                CreateLinkDTO linkDTO = new CreateLinkDTO();
                linkDTO.setWebsite(saved);
                if (link.isEmpty()) continue;
                Boolean isFromSameSite = link.charAt(0) == '/';
                if (isFromSameSite) {
                    URL _url = new URL(url.toExternalForm() + link.substring(1));
                    createFolder(filePath + link.substring(1));
                    linkDTO.setUrl(_url);
                    linkDTO.setPath(filePath + link.substring(1));
                }
                else {
                    URL _url = new URL(link);
                    linkDTO.setUrl(_url);
                    createFolder(linksPath + "/" + _url.getHost());
                    linkDTO.setPath(linksPath);
                }

                linkService.create(linkDTO);
            }

            return saved;
        }
        catch (IOException e){
            System.out.println(e.getMessage());
            return null;
        }
    }
}
