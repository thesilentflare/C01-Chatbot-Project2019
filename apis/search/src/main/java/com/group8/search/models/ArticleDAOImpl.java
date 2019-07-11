package com.group8.search.models;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.mysql.cj.jdbc.result.ResultSetMetaData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public class ArticleDAOImpl implements ArticleDAO {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public ArticleDAOImpl(JdbcTemplate jdbcTemp) {
        this.jdbcTemplate = jdbcTemp;
    }

    public List<Article> findAll() {
        String QUERY = "SELECT name, url, keywords, text FROM articles";
        RowMapper<Article> rowMapper = new BeanPropertyRowMapper<Article>(Article.class);
        List<Article> articles = this.jdbcTemplate.query(QUERY, rowMapper);
        return articles;
    }

    public Article find(String name) {
        String QUERY = "SELECT name, url, keywords, text FROM articles WHERE name = ?";
        RowMapper<Article> rowMapper = new BeanPropertyRowMapper<Article>(Article.class);
        Article article = jdbcTemplate.queryForObject(QUERY, rowMapper, name);
        return article;
    }

    public void create(Article article) {
        String QUERY = "INSERT INTO articles (name, url, keywords, text) values (?, ?, ?, ?)";
        this.jdbcTemplate.update(QUERY, article.getName(), article.getUrl(), article.getKeywords(), article.getText());
    }

    public void update(Article article) {
        String QUERY = "UPDATE articles SET url, keywords, text WHERE name=?";
        this.jdbcTemplate.update(QUERY, article.getUrl(), article.getKeywords(), article.getText());
    }

    public void delete(String name) {
        String QUERY = "DELETE FROM articles WHERE articleId=?";
        this.jdbcTemplate.update(QUERY, name);
    }

    public boolean doesExist(String name) {
        boolean result = false;
        String QUERY = "SELECT count(*) FROM articles WHERE name = ?";
        int count = this.jdbcTemplate.queryForObject(QUERY, Integer.class, name);
        if (count != 0) {
            result = true;
        }
        return result;
    }

    public ResultSetMetaData getMetaData() {
        String QUERY = "SELECT * FROM articles";
        return jdbcTemplate.query(QUERY.toString(), new ResultSetExtractor<ResultSetMetaData>() {

            public ResultSetMetaData extractData(ResultSet arg0) throws SQLException, DataAccessException {
                ResultSetMetaData rsmd = (ResultSetMetaData) arg0.getMetaData();
                return rsmd;
            }

            
        });
    }
}