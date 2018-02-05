/**
 * test if vending machine service defined
 * test if vending machine service calculates correct change.
 */
describe('Vending machine service', function () {
    let serv;

    beforeEach(() => {
        angular.mock.module('vendingMachineDemo');
        angular.mock.inject((VendingMachineService) => {
            serv = VendingMachineService;
        });
    });

    it('service should be defined', function () {
        expect(VendingMachineService).toBeDefined();
    });
    it('calculateChange to be correct', function () {
        expect(VendingMachineService.calculateChange(52, 120))
            .toBe("1 coin of 50 c. , 1 coin of 10 c. , 1 coin of 5 c. , 1 coin of 2 c. , 1 coin of 1 c. ");
    });
});