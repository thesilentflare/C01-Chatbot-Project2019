package com.group8.search;

import javax.sql.DataSource;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
 
@Configuration
@ComponentScan(basePackages = "com.group8.search")
@PropertySource(value = { "classpath:application.properties" })
public class ApplicationConfig {
 
    private String CLASS_NAME = "com.mysql.jdbc.Driver";
    private String URL = "jdbc:mysql://localhost:3306/app?useSSL=false&serverTimezone=EST5EDT";
    private String USERNAME = "root";
    private String PASSWORD = "password";

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(this.CLASS_NAME);
        dataSource.setUrl(this.URL);
        dataSource.setUsername(this.USERNAME);
        dataSource.setPassword(this.PASSWORD);
        return dataSource;
    }
 
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.setResultsMapCaseInsensitive(true);
        return jdbcTemplate;
    }
 
}