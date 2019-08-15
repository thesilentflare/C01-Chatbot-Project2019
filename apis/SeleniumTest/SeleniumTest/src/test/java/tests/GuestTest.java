package tests;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.junit.runners.MethodSorters;

import environment.EnvironmentManager;
import environment.RunEnvironment;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class GuestTest {
	static WebDriver driver;
	
    @BeforeClass
    public static void setup() {
        EnvironmentManager.initWebDriver();
        driver = RunEnvironment.getWebDriver();
        driver.get("localhost:3000");
    }

    @Test
    public void T1clickOnTest() {
    	WebElement guestButton = driver.findElement(By.xpath("//button[contains(text(),'Proceed As Guest')]"));
    	guestButton.click();
    	String url = driver.getCurrentUrl();
        assertEquals("http://localhost:3000/guest", url );
    }
    
    @Test
    public void T2findTopSearch() {
    	String topSearch = driver.findElement(By.xpath("//h4[contains(text(),'TOP SEARCHES')]")).getText();
        assertEquals("TOP SEARCHES", topSearch);
    }
    
    @Test
    public void T3babaIntro() {
    	String intro = driver.findElement(By.xpath("//div[@class='msg z-depth-1 msgBaba']")).getText();
        assertEquals("Hello my name is Baba, How may I help you today?", intro);
    }
    
    @Test
    public void T4send() {
    	WebElement send = driver.findElement(By.xpath("//input[@placeholder='ask here']"));
    	send.sendKeys("Who is Abbas Attarwala");
    	WebElement button = driver.findElement(By.xpath("//button[@class='send']"));
    	button.click();
    	WebElement result = driver.findElement(By.xpath("//div[@class='msg z-depth-1 msgGuest']"));
    	String sent = result.getText();
        assertEquals("Who is Abbas Attarwala", sent);
    }
    

    @AfterClass
    public static void tearDown() {
        EnvironmentManager.shutDownDriver();
    }
}
