import angular from "angular";

const APP_NAME = 'vendingMachineDemo';

// decalaring main module.
let appModule = angular.module(APP_NAME, []);

// requiring needed files, for webpack bundling.
require('./helper/vendingMachineOption.js')
require('./vending-machine/vending-machine.component');