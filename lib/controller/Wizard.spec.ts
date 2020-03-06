import {expect} from 'chai';
import {Wizard, WizardStep} from "./Wizard";
import {MockWizardRenderer} from "../mock/MockWizardRenderer";

describe('Wizard', () => {


    let w_renderer = new MockWizardRenderer();

    let example = new Wizard(null, w_renderer);

    class ExampleStep implements WizardStep {

        focus(): void {
        }

        is_satisfied(): boolean {
            return false;
        }

        render(): string {
            return "Yay!";
        }

    }

    class ExampleStep2 implements WizardStep {

        focus(): void {
        }

        is_satisfied(): boolean {
            return false;
        }

        render(): string {
            return "Yay!2";
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
        expect(example.current_index).equal(0);
        expect(example.getStep().step).not.equal(null);
        expect(example.getStep().index).equal(0);
        expect(example.getStepFromIndex(0).step.render(example)).equal("Yay!");
    });

    it('should return second step', () => {
        let step2 = new ExampleStep2();
        example.addStep(step2);
        example.nextStep();
        expect(example.current_index).equal(1);
        expect(example.getStepFromIndex(1).step).not.equal(null);
        expect(example.getStepFromIndex(1).index).equal(1);
        expect(example.getStepFromIndex(1).step.render(example)).equal("Yay!2");
    });

    it('should return prevStep', () => {
        example.prevStep();
        expect(example.current_index).equal(0);
    });

});