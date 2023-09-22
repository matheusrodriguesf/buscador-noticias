package br.com.arcelino.buscadornoticiasapi.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.arcelino.buscadornoticiasapi.models.News;
import br.com.arcelino.buscadornoticiasapi.service.NewsService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public Page<News> all(Pageable pageable) {
        return newsService.findAll(pageable);
    }

}
