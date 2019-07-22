package com.group8.search.models;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.group8.search.ApplicationConfig;
import com.mysql.cj.jdbc.result.ResultSetMetaData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
@Qualifier("articleDao")
public class ArticleDAOImpl implements ArticleDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * Construct an ArticleDAOImpl object
     */
    public ArticleDAOImpl() {
        ApplicationConfig appConfig = new ApplicationConfig();
        this.jdbcTemplate = appConfig.jdbcTemplate(appConfig.dataSource());
    }

    /*@Autowired
    public ArticleDAOImpl(JdbcTemplate jdbcTemp) {
        this.jdbcTemplate = jdbcTemp;
    }*/

    /**
     * Get a list of all the Atricles in the database
     * @return List<Article> - all Articles in this database
     */
    @Transactional(readOnly=true)
    public List<Article> findAll() {
        String QUERY = "SELECT name, url, keywords, text FROM article";
        RowMapper<Article> rowMapper = new BeanPropertyRowMapper<Article>(Article.class);
        List<Article> articles = this.jdbcTemplate.query(QUERY, rowMapper);
        return articles;
    }

    /**
     * Get an Article with the given name
     * @param name String - the name of the Article to be found
     * @return Article - resulting Article related to the given name
     */
    @Transactional(readOnly=true)
    public Article find(String name) {
        String QUERY = "SELECT name, url, keywords, text FROM article WHERE name = ?";
        RowMapper<Article> rowMapper = new BeanPropertyRowMapper<Article>(Article.class);
        Article article = jdbcTemplate.queryForObject(QUERY, rowMapper, name);
        return article;
    }

    /**
     * Create the given Article as entry in the database's article table
     * @param article Article - the Article to be entered in the database
     */
    public void create(Article article) {
        String QUERY = "INSERT INTO article (name, url, keywords, text) values (?, ?, ?, ?)";
        this.jdbcTemplate.update(QUERY, article.getName(), article.getUrl(), article.getKeywords(), article.getText());
    }

    /**
     * Update the related database entry with the given Article
     * @param article Article - the Article information to be updated
     */
    public void update(Article article) {
        String QUERY = "UPDATE article SET url, keywords, text WHERE name=?";
        this.jdbcTemplate.update(QUERY, article.getUrl(), article.getKeywords(), article.getText());
    }

    /**
     * Delete the database entry related to the given Article name
     * @param name String - the name of the entry to be deleted
     */
    public void delete(String name) {
        String QUERY = "DELETE FROM article WHERE articleId=?";
        this.jdbcTemplate.update(QUERY, name);
    }

    /**
     * Check if the an entry with the given name of an Article exists
     * in the database
     * @param name String - name of the Article to check for
     * @return boolean - true if there is an article that exist the
     *                   given name, otherwise false
     */
    public boolean doesExist(String name) {
        boolean result = false;
        String QUERY = "SELECT count(*) FROM article WHERE name = ?";
        int count = this.jdbcTemplate.queryForObject(QUERY, Integer.class, name);
        if (count != 0) {
            result = true;
        }
        return result;
    }

    /**
     * Get the result set meta data about this related Article table
     * @return ResultSetMetaData
     */
    public ResultSetMetaData getMetaData() {
        String QUERY = "SELECT * FROM article";
        return jdbcTemplate.query(QUERY.toString(), new ResultSetExtractor<ResultSetMetaData>() {

            public ResultSetMetaData extractData(ResultSet arg0) throws SQLException, DataAccessException {
                ResultSetMetaData rsmd = (ResultSetMetaData) arg0.getMetaData();
                return rsmd;
            }

            
        });
    }

}