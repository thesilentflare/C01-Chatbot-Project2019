package tests;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
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
public class SignUpTest {
	static WebDriver driver;
	
    @BeforeClass
    public static void setup() {
        EnvironmentManager.initWebDriver();
        driver = RunEnvironment.getWebDriver();
        driver.get("localhost:3000");
    }

    @Test
    public void T1toSignup() {
    	WebElement guestButton = driver.findElement(By.xpath("//button[contains(text(),'Create An Account')]"));
    	guestButton.click();
    	String url = driver.getCurrentUrl();
        assertEquals("http://localhost:3000/create", url );
    }
    


    @AfterClass
    public static void tearDown() {
        EnvironmentManager.shutDownDriver();
    }

}
