import {expect} from 'chai';
import {Calendar} from "./Calendar";

describe('Calendar', () => {

    let calendar = new Calendar();

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

});