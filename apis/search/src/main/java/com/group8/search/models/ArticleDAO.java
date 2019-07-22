package com.group8.search.models;

import java.util.List;

import com.mysql.cj.jdbc.result.ResultSetMetaData;

public interface ArticleDAO {
    
    /**
     * Get a list of all the Atricles in the database
     * @return List<Article> - all Articles in this database
     */
    public List<Article> findAll();

    /**
     * Get an Article with the given name
     * @param name String - the name of the Article to be found
     * @return Article - resulting Article related to the given name
     */
    public Article find(String name);

    /**
     * Create the given Article as entry in the database's article table
     * @param article Article - the Article to be entered in the database
     */
    public void create(Article article);

    /**
     * Update the related database entry with the given Article
     * @param article Article - the Article information to be updated
     */
    public void update(Article article);

    /**
     * Detele the database entry related to the given Article name
     * @param name String - the name of the entry to be deleted
     */
    public void delete(String name);

    /**
     * Get the result set meta data about this related Article table
     * @return ResultSetMetaData
     */
    public ResultSetMetaData getMetaData();
}