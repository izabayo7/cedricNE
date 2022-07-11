package rw.ac.rca.ne.cedric.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.ne.cedric.server.services.IWebsiteService;
import rw.ac.rca.ne.cedric.server.utils.dtos.CreateWebsiteDTO;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@RestController
@RequestMapping("/api/websites")
public class WebsiteController {

    private final IWebsiteService websiteService;


    public WebsiteController(IWebsiteService websiteService) {
        this.websiteService = websiteService;
    }

    @GetMapping("")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok(websiteService.all());
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
