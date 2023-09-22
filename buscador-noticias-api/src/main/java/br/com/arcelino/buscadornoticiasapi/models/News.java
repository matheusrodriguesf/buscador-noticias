package br.com.arcelino.buscadornoticiasapi.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(indexName = "news")
public class News {

    @Id
    String id;

    @Field(name = "title", type = FieldType.Text)
    String title;

    @Field(name = "text", type = FieldType.Text)
    String text;

    @Field(name = "url", type = FieldType.Text)
    String url;

    @Field(name = "keywords", type = FieldType.Nested)
    @Builder.Default
    List<String> keywords = new ArrayList<>();
}
