package br.com.arcelino.buscadornoticiasapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.arcelino.buscadornoticiasapi.models.News;
import br.com.arcelino.buscadornoticiasapi.repository.NewsRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;

    public Page<News> findAll(Pageable pageable) {
        return newsRepository.findAll(pageable);
    }

}
