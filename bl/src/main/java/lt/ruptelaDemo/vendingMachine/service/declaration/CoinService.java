package lt.ruptelaDemo.vendingMachine.service.declaration;

import java.util.List;
import java.util.Map;

public interface CoinService {
    Map<String, Long> getChange(long productPrice, long insertedMoney);
    List<Integer> getAvailableCoins();
}
