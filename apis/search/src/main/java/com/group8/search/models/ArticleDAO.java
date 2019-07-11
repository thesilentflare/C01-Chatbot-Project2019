package com.group8.search.models;

import java.util.List;

interface ArticleDAO {
    List<Article> findAll();
    Article find(String name);
    void create(Article article);
    void update(Article article);
    void delete(String name);
    boolean doesExist(String name);
}