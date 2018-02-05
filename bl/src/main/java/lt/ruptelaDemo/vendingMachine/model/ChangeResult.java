package lt.ruptelaDemo.vendingMachine.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Helper class to simply deserialize values as json.
 */
@EqualsAndHashCode
@Getter
@Setter
public class ChangeResult {
    private String result;
    private boolean success;
}


