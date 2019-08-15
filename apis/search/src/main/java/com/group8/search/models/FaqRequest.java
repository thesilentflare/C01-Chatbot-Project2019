package com.group8.search.models;

public class FaqRequest {
    private Integer limit;
    

    public FaqRequest() {
        this.limit = null;
    }

    /**
     * Constrcut a FAQRequest object consisting of a limit of FAQ to get
     * @param limit Integer - the limit of number of FAQ wanted
     */
    public FaqRequest(Integer limit) {
        this.limit = limit;
    }

    /**
     * Get the limit of this FaqRequest
     * @return Integer - the limit
     */
    public Integer getLimit() {
        return this.limit;
    }

    /**
     * Set a new limit value for this FaqRequest
     * @param limit Integer - the new limit to be set
     */
    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}