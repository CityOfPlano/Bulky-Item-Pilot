import {expect} from 'chai';
import {Wizard, WizardStep} from "./Wizard";
import {MockWizardRenderer} from "../mock/MockWizardRenderer";

describe('Wizard', () => {


    let w_renderer = new MockWizardRenderer();

    let example = new Wizard(null,w_renderer);

    class ExampleStep implements WizardStep{
        focus(): void {
        }

        is_satisfied(): boolean {
            return false;
        }

        render(): string {
            return "Yay!";
        }

    }

    it('should be created', () => {
        expect(example).not.equal(undefined);
    });

    it('should return empty step', () => {
        expect(example.getStep()).equal(null);
    });

    it('should return first step', () => {
        let step = new ExampleStep();
        example.addStep(step);
        expect(example.getStep().step).not.equal(null);
        expect(example.getStep().index).equal(0);
        expect(example.getStepFromIndex(0).step.render(example)).equal("Yay!");
    });

});