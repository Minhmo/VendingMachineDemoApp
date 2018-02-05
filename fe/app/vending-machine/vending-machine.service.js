/**
 * Vending machine service decl.
 */
angular
    .module('vendingMachineDemo')
    .factory('VendingMachineService', VendingMachineService);

VendingMachineService.$inject = ['$http'];

function VendingMachineService($http) {
    let VendingMachineService = {
        availableCoins: [50, 20, 10, 5, 2, 1],
        calculateChange: calculateChange,
        askServer: askServer,
    };

    return VendingMachineService;

    // cache values for better performance.
    let lastChange = null;
    let lastResult = null;

    /**
     * Method, that calculates change for a product with available coins.
     * @param money given by customer
     * @param price of the product
     * @returns string, which hold information about change.
     */
    function calculateChange(money, price) {
        if (!money || !price) {
            return;
        }

        let change = money - price;

        if (lastChange === change) {
            return lastResult;
        }

        // chache'ing change value, not repeating calculations if not needed.
        lastChange = change;

        if (change < 0) {
            let result = "too little money inserted...";
            lastResult = result;

            return result
        }

        let result = "";

        angular.forEach(VendingMachineService.availableCoins, coin => {
            if (change === 0) {
                return;
            }

            let div = Math.floor(change / coin);
            change = change % coin;

            if (div === 0) {
                return;
            }

            result = result.concat(div.toString(), " coin of ", coin.toString(), " c. , ")
        });

        // getting rid of last semmi.
        if (result.endsWith(', ')) {
            result = result.substring(0, result.lastIndexOf(", "));
        }

        lastResult = result;

        return result;
    }

    /**
     * Method, that requests server to calculate change (simulating the situation, when more complex bussines
     * logic is exported to server side.
     * @param money given by customer
     * @param price of the product
     */
    function askServer(money, price) {
        return $http.get('/machine/getChange', { params: {money: money, price: price} })
            .then(getChangeComplete)
            .catch(getChangeFailed);

        function getChangeComplete(response) {
            return response.data;
        }

        function getChangeFailed(error) {
            throw "XHR failed for askServer. " + error.data;
        }
    }
}