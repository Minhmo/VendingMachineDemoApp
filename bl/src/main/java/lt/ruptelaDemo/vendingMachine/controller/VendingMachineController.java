package lt.ruptelaDemo.vendingMachine.controller;

import lt.ruptelaDemo.vendingMachine.model.ChangeResult;
import lt.ruptelaDemo.vendingMachine.service.declaration.CoinService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Rest controller, for business logic of vending machine.
 */
@RestController
@RequestMapping(path = "/machine")
public class VendingMachineController {

    private CoinService coinService;

    public VendingMachineController(CoinService coinService) {
        this.coinService = coinService;
    }

    @GetMapping(path = "/getChange")
    public ChangeResult getMonetaryChange(@RequestParam long money, @RequestParam long price) {
        Map<String, Long> change = coinService.getChange(price, money);

        ChangeResult changeResult = new ChangeResult();
        if(change == null) {
            changeResult.setResult("too little money inserted...");
            changeResult.setSuccess(false);
        } else {
            changeResult.setSuccess(true);
            changeResult.setResult(concatChangeResult(change));
        }

        return changeResult;
    }

    /**
     * Method, that concatenates map to string representation of coins.
     * @param result map, that contains information about change.
     * @return string, that contains information about change.
     */
    private String concatChangeResult(Map<String, Long> result) {

        StringBuilder stringBuilder = new StringBuilder();

        for (String key : result.keySet()) {
            Long value = result.get(key);

            if (value == 0) continue;

            stringBuilder.append(value);
            stringBuilder.append(" coins of ");
            stringBuilder.append(key);
            stringBuilder.append(" c. , ");
        }

        return stringBuilder.toString();
    }
}
