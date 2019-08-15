package tests;

import static org.junit.Assert.*;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import environment.EnvironmentManager;
import environment.RunEnvironment;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AnalyticsTest {

	static WebDriver driver;
	
    @BeforeClass
    public static void setup() {
        EnvironmentManager.initWebDriver();
        driver = RunEnvironment.getWebDriver();
        driver.get("localhost:3000");
    }

    @Test
    public void T1clickOnTest() {
    	WebElement guestButton = driver.findElement(By.xpath("//button[contains(text(),'Analytics')]"));
    	guestButton.click();
    	String url = driver.getCurrentUrl();
        assertEquals("http://localhost:3000/analytics", url );
    }
    
    @Test
    public void T2findfaq() {
    	String topSearch = driver.findElement(By.xpath("//h1[@class='faqTitle']")).getText();
        assertEquals("Frequently Asked Questions", topSearch);
    }
    
    @Test
    public void T2findIBM() {
    	String topSearch = driver.findElement(By.xpath("//h1[@class='IBMUnanswered']")).getText();
        assertEquals("IBM Watson Unanswered Questions", topSearch);
    }
    
    @Test
    public void T2findindexer() {
    	String topSearch = driver.findElement(By.xpath("//h1[@class='indexerUnanswered']")).getText();
        assertEquals("Lucene Indexer Unanswered Questions", topSearch);
    }
    

    @AfterClass
    public static void tearDown() {
        EnvironmentManager.shutDownDriver();
    }
}
