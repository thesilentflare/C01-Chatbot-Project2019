package com.group8.search.models;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Article {
    @Id
    private String name;
    private String url;
    private String keywords;
    private String text;

    private String[] KEYS = {"name", "url", "keywords", "text"};

    private Map<String, String> values = new HashMap<String, String>();

    public Article() {
    }

    public Article(String name, String url, String keywords, String text) {
        this.name = name;
        this.url = url;
        this.keywords = keywords;
        this.text = text;

        this.values.put(KEYS[0], name);
        this.values.put(KEYS[1], url);
        this.values.put(KEYS[2], keywords);
        this.values.put(KEYS[3], text);

    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
        this.values.put(KEYS[0], name);
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
        this.values.put(KEYS[1], url);
    }

    public String getKeywords() {
        return this.keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
        this.values.put(KEYS[2], keywords);
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
        this.values.put(KEYS[3], text);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this)
            return true;
        if (!(obj instanceof Article)) {
            return false;
        }
        Article other = (Article) obj;
        return (this.name.equals(other.name) && this.url.equals(other.url) && this.keywords.equals(other.keywords)
                && this.text.equals(other.text));
    }

    @Override
    public String toString() {
        return "{" + " name='" + getName() + "'" + ", url='" + getUrl() + "'" + ", keywords='" + getKeywords() + "'"
                + ", text='" + getText() + "'" + "}";
    }

    /**
     * Get an iterator to move though the Article valules
     * @return Iterator - iterate through Article
     */
    public Iterator<String> getIterator() {
        return new ArticleIterator(this);
    }

    public class ArticleIterator implements Iterator<String> {

        private Map<String, String> values;
        private String[] keys;
        private int index;


        /**
         * Constrcuts a DocumentIterator object
         */
        public ArticleIterator(Article art) {
            this.values = art.values;
            this.keys = art.KEYS;
            this.index = 0;
        }

        public boolean hasNext() {
            return this.index >= this.keys.length - 1;
        }

        public String next() {
            String res = null; 
            if (this.hasNext()) {
                res = this.values.get(keys[this.index]);
                this.index++;
            }

            return res;
        }

        /**
         * Get the current value being pointed too in the Artile row
         * 
         * @return String - current val being pointed too
         */
        public String currentValue() {
            String res;
            try {
                res = this.values.get(this.keys[this.index]);
            } catch (IndexOutOfBoundsException ex) {
                res = null;
            }
            
            return res;
        }

    }

}
