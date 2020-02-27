import {expect} from 'chai';
import {Example} from "./Example";

describe('Example', () => {

    let example_name = "propertyName";

    let example = new Example(example_name);

    it('should be created', () => {
        expect(example).not.equal(undefined);
    });

    it('should return name', () => {
        expect(example.getName()).not.equal(example_name+'extra');
        expect(example.getName()).equal(example_name);
    });

});