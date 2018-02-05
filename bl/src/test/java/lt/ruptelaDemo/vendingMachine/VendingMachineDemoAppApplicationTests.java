package lt.ruptelaDemo.vendingMachine;

import lt.ruptelaDemo.vendingMachine.service.declaration.CoinService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VendingMachineDemoAppApplicationTests {

	@Autowired
    CoinService coinService;

	@Test
	public void contextLoads() {
	}

	@Test
	public void testCorrectChange () {
        Map<String, Long> change = coinService.getChange(53, 67);

        HashMap<String, Long> correct = new HashMap<>();
        correct.put("50", 0L);
        correct.put("20", 0L);
        correct.put("10", 1L);
        correct.put("5", 0L);
        correct.put("2", 2L);

        Assert.assertEquals(change, correct);
    }

}
