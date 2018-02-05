package lt.ruptelaDemo.vendingMachine.service.definition;

import lt.ruptelaDemo.vendingMachine.service.declaration.CoinService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CoinServiceImpl implements CoinService {
    // Inserting coins in decreasing order. ArrayList preserves inserted order.
    private List<Integer> availableCoins = new ArrayList<>(Arrays.asList(50,20,10,5,2,1));

    public Map<String, Long> getChange(long productPrice, long insertedMoney) {
        long change = insertedMoney - productPrice;

        if (change < 0) {
            return null;
        }

        HashMap<String, Long> result = new HashMap<>();

        for (int monet : getAvailableCoins()) {
            result.put(String.valueOf(monet), change / monet);
            change = change % monet;

            if (change == 0) {
                break;
            }
        }

        return result;
    }

    public List<Integer> getAvailableCoins() {
        return availableCoins;
    }
}
