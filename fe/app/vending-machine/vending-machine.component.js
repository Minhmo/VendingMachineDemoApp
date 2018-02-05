import VendingMachineOption from "../helper/vendingMachineOption";
import './vending-machine.service';

/**
 * Vending machine component declaration.
 */
angular.module('vendingMachineDemo').component('vendingMachine', {
    template: require('./vending-machine.html'),
    controller: VendingMachineController,
    controllerAs: 'machine'
});

VendingMachineController.$inject = ['$scope', 'VendingMachineService'];

function VendingMachineController($scope, VendingMachineService) {
    let ctrl = this;

    ctrl.price = null;
    ctrl.moneyValue = null;
    ctrl.changeFromServer = null;

    ctrl.calculateChange = VendingMachineService.calculateChange;
    ctrl.askServerChange = askServerChange;

    ctrl.options = [new VendingMachineOption(52, 'Cola'), new VendingMachineOption(34, 'Fanta'),
        new VendingMachineOption(11, 'Vytautas')];

    function askServerChange() {
        VendingMachineService.askServer(ctrl.moneyValue, ctrl.price).then(r => {
            if (r) {
                ctrl.changeFromServer = r.result;
            }
        });
    }
}
