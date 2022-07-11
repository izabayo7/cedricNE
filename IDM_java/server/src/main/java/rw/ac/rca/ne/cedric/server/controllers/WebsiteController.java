package rw.ac.rca.ne.cedric.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.ne.cedric.server.services.ILinkService;
import rw.ac.rca.ne.cedric.server.services.IWebsiteService;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateWebsiteDTO;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;

@RestController
@RequestMapping("/api/websites")
public class WebsiteController {

    private final IWebsiteService websiteService;
    private final ILinkService linksService;


    public WebsiteController(IWebsiteService websiteService, ILinkService linksService) {
        this.websiteService = websiteService;
        this.linksService = linksService;
    }

    @GetMapping("")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok(websiteService.all());
    }

    @GetMapping("/links/{websiteId}")
    public ResponseEntity<?> byId(@PathVariable UUID websiteId) {
        return ResponseEntity.ok(linksService.findByWebsite(websiteId));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateWebsiteDTO website) {
        try{
            URL url = new URL(website.getUrl());
            return ResponseEntity.ok(websiteService.create(url));
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
