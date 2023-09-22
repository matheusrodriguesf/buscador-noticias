package br.com.arcelino.buscadornoticiasapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import br.com.arcelino.buscadornoticiasapi.models.News;

public interface NewsRepository extends ElasticsearchRepository<News, String> {

    Page<News> findByTitle(String title, Pageable pageable);

    Page<News> findByText(String text, Pageable pageable);

}
