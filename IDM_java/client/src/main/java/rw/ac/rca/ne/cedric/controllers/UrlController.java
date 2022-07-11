package rw.ac.rca.ne.cedric.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import rw.ac.rca.ne.cedric.dao.Link;
import rw.ac.rca.ne.cedric.dao.Website;
import rw.ac.rca.ne.cedric.utils.ApiResponse;
import rw.ac.rca.ne.cedric.utils.Utility;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Controller
@RequestMapping("/")
public class UrlController {
    @GetMapping
    public String mainEntry(){
        return "Url";
    }


    @PostMapping("/download")
    public String download(HttpServletRequest request, Model model, HttpSession session) throws JsonProcessingException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            Map<String, String> requestBody = new HashMap<>();

            for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
                requestBody.put(entry.getKey(), entry.getValue()[0]);
            }

            ResponseEntity<ApiResponse> res = restTemplate.postForEntity(Utility.formatURL("/api/websites"), requestBody, ApiResponse.class);

            return "redirect:/report";
        } catch (Exception e) {
            ApiResponse response = new ObjectMapper().readValue(e.getMessage().substring(7, e.getMessage().length() - 1), ApiResponse.class);
            model.addAttribute("error", response.getMessage());

            return "Url";
        }
    }

    @GetMapping("/report")
    public String report(HttpServletRequest request, Model model) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Object> entity = new HttpEntity<>(null, headers);

        ResponseEntity<Website[]> websitesResponse = restTemplate.exchange(Utility.formatURL("/api/websites"), HttpMethod.GET, entity, Website[].class);

        model.addAttribute("websites", Objects.requireNonNull(websitesResponse.getBody()));

        return "Report";
    }

    @GetMapping("/links/{id}")
    public String links(HttpServletRequest request, Model model, @PathVariable UUID id) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Object> entity = new HttpEntity<>(null, headers);

        ResponseEntity<Link[]> websitesResponse = restTemplate.exchange(Utility.formatURL("/api/websites/links/"+id), HttpMethod.GET, entity, Link[].class);

        model.addAttribute("links", Objects.requireNonNull(websitesResponse.getBody()));

        return "Links";
    }
}
