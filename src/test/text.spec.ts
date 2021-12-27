import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { Text } from '../lib/text.class';
import { Variable } from '../tag/src/variable.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Text`, () => {

  const fix = 'fix';
  const fixValue = 'no fix';

  const id = 'id';
  const idValue = '427';

  const problem = 'problem';
  const problemValue = 'crucial crush';

  const template = 'There is {fix} for the {problem} with {id}';
  const variables = [fix, id, problem];


  const textSimple = new Text(template, fix, problem, id);
  const textVariables = new Text(template, ...variables);
  const textWithValues = new Text(template, [fix, fixValue], [problem, problemValue], [id, idValue]);

  beforeEach(() => {
    textSimple.resetText();
    textVariables.resetText();
    textWithValues.resetText();
  });

  testing

    .describe(`accessors`, () => {

      testing

        .it(`Text.prototype.template`, () => {
          expect(textSimple.template.template).toEqual(template);
          toBe.stringIncludes(textSimple.template.template, [fix, id, problem]);

          expect(textVariables.template.template).toEqual(template);
          toBe.stringIncludes(textVariables.template.template, [fix, id, problem]);

          expect(textWithValues.template.template).toEqual(template);
          toBe.stringIncludes(textWithValues.template.template, [fix, id, problem]);
        })

        .it(`Text.prototype.text`, () => {
          expect(textSimple.resetText().text).toEqual(`There is ${''} for the ${''} with ${''}`);
          toBe.not.stringIncludes(textSimple.text, [fix, id, problem]);

          expect(textVariables.text).toEqual(`There is ${''} for the ${''} with ${''}`);
          toBe.not.stringIncludes(textVariables.text, [fix, id, problem]);

          expect(textWithValues.text).toEqual(`There is ${fixValue} for the ${problemValue} with ${idValue}`);
          toBe.not.stringIncludes(textWithValues.text, [fix, id, problem]);
        });

    })

    .describe(`instance methods`, () => {

      testing

        .it(`Text.prototype.getReplacement()`, () => {

          expect(textSimple.getReplacement(fix)).toBeUndefined();
          expect(textSimple.getReplacement(id)).toBeUndefined();
          expect(textSimple.getReplacement(problem)).toBeUndefined();

          toBe
            .undefined(textSimple.getReplacement(fix))
            .undefined(textSimple.getReplacement(id))
            .undefined(textSimple.getReplacement(problem));

        })

        .it(`Text.prototype.getTemplate()`, () => {
          expect(textSimple.getTemplate().template).toEqual(template);
          toBe.stringIncludes(textSimple.getTemplate().template, [fix, id, problem]);

          expect(textVariables.getTemplate().template).toEqual(template);
          toBe.stringIncludes(textVariables.getTemplate().template, [fix, id, problem]);

          expect(textWithValues.getTemplate().template).toEqual(template);
          toBe.stringIncludes(textWithValues.getTemplate().template, [fix, id, problem]);
        })

        .it(`Text.prototype.getText()`, () => {
          expect(textSimple.getText()).toEqual(`There is ${''} for the ${''} with ${''}`);
          expect(textVariables.getText()).toEqual(`There is ${''} for the ${''} with ${''}`);
          expect(textWithValues.getText()).toEqual(`There is ${fixValue} for the ${problemValue} with ${idValue}`);
          expect(textWithValues.getText(true)).toEqual(`There is ${fixValue} for the ${problemValue} with ${idValue}`);
        })

        .it(`Text.prototype.replaceVariable()`, () => {
          expect(textSimple.resetText().replaceVariable(fix, fixValue).text).toEqual(`There is ${fixValue} for the  with `);
          expect(textSimple.resetText().replaceVariable(problem, problemValue).text).toEqual(`There is  for the ${problemValue} with `);
          expect(textSimple.resetText().replaceVariable(id, idValue).text).toEqual(`There is  for the  with ${idValue}`);

          expect(textSimple.resetText().replaceVariable(fix, fixValue).getText(false)).toEqual(`There is ${fixValue} for the {problem} with {id}`);
          expect(textSimple.replaceVariable(problem, problemValue).getText(false)).toEqual(`There is ${fixValue} for the ${problemValue} with {id}`);
          expect(textSimple.replaceVariable(id, idValue).text).toEqual(`There is ${fixValue} for the ${problemValue} with ${idValue}`);

          expect(textWithValues.resetText().replaceVariable(fix, fixValue).getText(false)).toEqual(`There is ${fixValue} for the {problem} with {id}`);
          expect(textWithValues.replaceVariable(problem, problemValue).getText(false)).toEqual(`There is ${fixValue} for the ${problemValue} with {id}`);
          expect(textWithValues.replaceVariable(id, idValue).text).toEqual(`There is ${fixValue} for the ${problemValue} with ${idValue}`);

          expect(textWithValues.resetText().getText(false)).toEqual(`There is {fix} for the {problem} with {id}`);
          expect(textWithValues.getText()).toEqual(`There is ${fixValue} for the ${problemValue} with ${idValue}`);
        })

        .it(`Text.prototype.setVariable()`, () => {
          expect(textSimple.setVariable(fix, fixValue).getText()).toEqual(`There is ${fixValue} for the  with `);
          textSimple.setVariable(fix);
        })

        .it(`Text.prototype.resetText()`, () => {
          expect(textSimple.replaceVariable(fix, fixValue).resetText().getText()).toEqual(`There is  for the  with `);
        })

        .it(`Text.prototype.setTemplate()`, () => {
          textSimple.setTemplate(`{fix} {problem} {id}` as any, fix, problem, id);
          expect(textSimple.resetText().text).toEqual(`  `);

          textSimple.setTemplate(`{fix} {problem} {id}` as any, [fix, fixValue], [problem, problemValue], [id, idValue]);
          expect(textSimple.resetText().text).toEqual(`${fixValue} ${problemValue} ${idValue}`);

          textSimple.setTemplate(template);
        });

    });
});
