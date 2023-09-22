# Consulta de Notícias

Este projeto tem como objetivo principal a busca e coleta de notícias a partir da plataforma Google News.

## Desenvolvimento

### Tecnologias

- Docker
- Java 17
- Spring Boot 3.1.4
- Elasticsearch 8.10.2
- Kibana 8.10.2
- Python 3.6
- React 18

## Infraestrutura

O projeto utiliza um arquivo Docker Compose que configura dois serviços: Elasticsearch e Kibana. Isso cria um ambiente local de análise e pesquisa de dados usando o Elastic Stack. O Elasticsearch é configurado como um único nó, e o Kibana fornece uma interface web para interagir com o Elasticsearch e visualizar os dados.

Para iniciar os serviços, utilize o seguinte comando:

```
$ docker-compose up -d
```


## Executando o Backend Localmente

A aplicação é construída usando o Maven. Para executar o projeto, siga os passos abaixo:

```
$ mvn clean package
```

```
$ mvn spring-boot:run
```


## Executando o Frontend Localmente

Certifique-se de ter o Node.js e o npm instalados. Em seguida, execute os seguintes comandos:

```
$ npm install
```

```
$ npm start
```


## Como Indexar Dados

Para indexar os dados no índice, utilize o notebook `extrator_noticias_google_news.ipynb`.

## Como Usar

Acesse a URL: http://localhost:3000/


## Autor

Matheus Rodrigues
