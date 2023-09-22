package br.com.arcelino.buscadornoticiasapi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.arcelino.buscadornoticiasapi.repository.NewsRepository;

public class NewsServiceTest {

    @Test
    public void testFindAll() {
        var newsRepository = mock(NewsRepository.class);
        var pageable = mock(Pageable.class);
        var expectedPage = mock(Page.class);
        when(newsRepository.findAll(pageable)).thenReturn(expectedPage);

        var newsService = new NewsService(newsRepository);
        var result = newsService.findAll(pageable);

        assertEquals(expectedPage, result);
        verify(newsRepository).findAll(pageable);
    }

    @Test
    public void testFindByTitle() {
        var newsRepository = mock(NewsRepository.class);
        var pageable = mock(Pageable.class);
        var title = "Test Title";
        var expectedPage = mock(Page.class);
        
        when(newsRepository.findByTitle(title, pageable)).thenReturn(expectedPage);

        var newsService = new NewsService(newsRepository);
        var result = newsService.findByTitle(title, pageable);

        assertEquals(expectedPage, result);
        verify(newsRepository).findByTitle(title, pageable);
    }

        @Test
    public void testFindByText() {
        var newsRepository = mock(NewsRepository.class);
        var pageable = mock(Pageable.class);
        var text = "Test Text";
        var expectedPage = mock(Page.class);

        when(newsRepository.findByText(text, pageable)).thenReturn(expectedPage);
        
        var newsService = new NewsService(newsRepository);       
        var result = newsService.findByText(text, pageable);
        
        assertEquals(expectedPage, result);
        verify(newsRepository).findByText(text, pageable);
    }

}
