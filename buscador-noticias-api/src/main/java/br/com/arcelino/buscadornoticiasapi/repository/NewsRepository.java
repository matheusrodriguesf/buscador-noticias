package br.com.arcelino.buscadornoticiasapi.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import br.com.arcelino.buscadornoticiasapi.models.News;

public interface NewsRepository extends ElasticsearchRepository<News, String> {

}
