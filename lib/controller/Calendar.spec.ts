import {expect} from 'chai';
import {Calendar} from "./Calendar";

describe('Calendar', () => {

    let calendar = new Calendar("02/1/1992");

    it('should be created', () => {
        expect(calendar).not.equal(undefined);
    });

    it('should calculate month year', () => {
        let calc = calendar.getCalculatedMonthYear(0,2020);
        expect(calc.month).equal(0);
        expect(calc.year).equal(2020);
    });

    it('should calculate month prev year', () => {
        let calc = calendar.getCalculatedMonthYear(-2,2020);
        expect(calc.month).equal(10);
        expect(calc.year).equal(2019);
    });

    it('should calculate month next year', () => {
        let calc = calendar.getCalculatedMonthYear(12,2020);
        expect(calc.month).equal(0);
        expect(calc.year).equal(2021);
    });

    it('should return correct datestring', () => {
        let calc = calendar.getSelectedAsString();
        expect(calc).equal("2/1/1992");
    });

    it('should return correct number of days', () => {
        let calc = calendar.getDaysInMonth(0 /* January = 0 */,2020);
        expect(calc).equal(31);
        calc = calendar.getDaysInMonth(1 /* February = 1 */,2019);
        expect(calc).equal(28);
    });

    it('should return correct number of days leap year', () => {
        let calc = calendar.getDaysInMonth(1 /* February = 1 */,2020);
        expect(calc).equal(29);
    });

});