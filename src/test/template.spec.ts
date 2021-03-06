import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { Template } from '../lib/template.class';
import { Variable } from '../tag/variable/src/variable.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Template`, () => {

  const fix = 'fix';
  const fixValue = 'no fix';

  const id = 'id';
  const idValue = '427';

  const problem = 'problem';
  const problemValue = 'crucial crush';

  const template = 'There is {fix} for the {problem} with {id}';
  const variables = [fix, id, problem];

  const templateSimple = new Template(template, fix, id, problem);
  const templateVariables = new Template(template, ...variables);
  const templateWithValues = new Template(template, [fix, fixValue], [id, idValue], [problem, problemValue]);

  testing

    .describe(`accessors`, () => {

      testing

        .it(`Template.prototype.template`, () => {
          expect(templateSimple.template).toEqual(template);
          toBe.stringIncludes(templateSimple.template, [fix, id, problem]);

          expect(templateVariables.template).toEqual(template);
          toBe.stringIncludes(templateVariables.template, [fix, id, problem]);

          expect(templateWithValues.template).toEqual(template);
          toBe.stringIncludes(templateWithValues.template, [fix, id, problem]);
        })

        .it(`Template.prototype.variable`, () => {
          // template
          expect(templateSimple.variable.fix).toBeInstanceOf(Variable);
          expect(templateSimple.variable.id).toBeInstanceOf(Variable);
          expect(templateSimple.variable.problem).toBeInstanceOf(Variable);

          expect(templateSimple.variable.fix.name).toEqual(fix);
          expect(templateSimple.variable.id.name).toEqual(id);
          expect(templateSimple.variable.problem.name).toEqual(problem);

          expect(templateSimple.variable.fix.value).toBeUndefined();
          expect(templateSimple.variable.id.value).toBeUndefined();
          expect(templateSimple.variable.problem.value).toBeUndefined();

          // templateVariables
          expect(templateVariables.variable.fix).toBeInstanceOf(Variable);
          expect(templateVariables.variable.id).toBeInstanceOf(Variable);
          expect(templateVariables.variable.problem).toBeInstanceOf(Variable);

          expect(templateVariables.variable.fix.name).toEqual(fix);
          expect(templateVariables.variable.id.name).toEqual(id);
          expect(templateVariables.variable.problem.name).toEqual(problem);

          expect(templateVariables.variable.fix.value).toBeUndefined();
          expect(templateVariables.variable.id.value).toBeUndefined();
          expect(templateVariables.variable.problem.value).toBeUndefined();

          // templateWithValues
          expect(templateWithValues.variable.fix).toBeInstanceOf(Variable);
          expect(templateWithValues.variable.id).toBeInstanceOf(Variable);
          expect(templateWithValues.variable.problem).toBeInstanceOf(Variable);

          expect(templateWithValues.variable.fix.name).toEqual(fix);
          expect(templateWithValues.variable.id.name).toEqual(id);
          expect(templateWithValues.variable.problem.name).toEqual(problem);

          expect(templateWithValues.variable.fix.value).toEqual(fixValue);
          expect(templateWithValues.variable.id.value).toEqual(idValue);
          expect(templateWithValues.variable.problem.value).toEqual(problemValue);
        })

        .it(`Template.prototype.variables`, () => {
          // template
          expect(templateSimple.variables[0].name).toEqual(fix);
          expect(templateSimple.variables[1].name).toEqual(id);
          expect(templateSimple.variables[2].name).toEqual(problem);

          expect(templateSimple.variables[0].value).toBeUndefined();
          expect(templateSimple.variables[1].value).toBeUndefined();
          expect(templateSimple.variables[2].value).toBeUndefined();

          templateSimple.variables.forEach(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe.instance(variable, Variable)));

          // templateVariables
          expect(templateVariables.variables[0].name).toEqual(fix);
          expect(templateVariables.variables[1].name).toEqual(id);
          expect(templateVariables.variables[2].name).toEqual(problem);

          expect(templateVariables.variables[0].value).toBeUndefined();
          expect(templateVariables.variables[1].value).toBeUndefined();
          expect(templateVariables.variables[2].value).toBeUndefined();

          templateVariables.variables.forEach(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe.instance(variable, Variable)));

          // templateWithValues
          expect(templateWithValues.variables[0].name).toEqual(fix);
          expect(templateWithValues.variables[1].name).toEqual(id);
          expect(templateWithValues.variables[2].name).toEqual(problem);

          expect(templateWithValues.variables[0].value).toEqual(fixValue);
          expect(templateWithValues.variables[1].value).toEqual(idValue);
          expect(templateWithValues.variables[2].value).toEqual(problemValue);

          templateWithValues.variables.forEach(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe.instance(variable, Variable)));

          toBe
            .array(templateSimple.variables)
            .array(templateVariables.variables)
            .array(templateWithValues.variables);
        });

    })

    .describe(`instance methods`, () => {

      testing

        .it(`Template.prototype.forEachVariable()`, () => {
          templateSimple.forEachVariable(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe
              .instance(variable, Variable)
              .stringIncludesSome(variable.name, [fix, id, problem])));

          templateVariables.forEachVariable(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe
              .instance(variable, Variable)
              .stringIncludesSome(variable.name, [fix, id, problem])));

          templateWithValues.forEachVariable(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe
              .instance(variable, Variable)
              .stringIncludesSome(variable.name, [fix, id, problem])
              .stringIncludesSome(variable.value, [fixValue, idValue, problemValue])));
        })

        .it(`Template.prototype.getTemplate()`, () => {
          expect(templateSimple.template).toEqual(template);
          toBe.stringIncludes(templateSimple.template, [fix, id, problem]);

          expect(templateVariables.template).toEqual(template);
          toBe.stringIncludes(templateVariables.template, [fix, id, problem]);

          expect(templateWithValues.template).toEqual(template);
          toBe.stringIncludes(templateWithValues.template, [fix, id, problem]);
        })

        .it(`Template.prototype.getVariable()`, () => {
          expect(templateSimple.getVariable(fix)?.name).toEqual(fix);
          expect(templateVariables.getVariable(fix)?.name).toEqual(fix);
          expect(templateWithValues.getVariable(fix)?.name).toEqual(fix);

          expect(templateSimple.getVariable(fix)?.value).toBeUndefined();
          expect(templateVariables.getVariable(fix)?.value).toBeUndefined();
          expect(templateWithValues.getVariable(fix)?.value).toEqual(fixValue);

          expect(templateSimple.getVariable(id)?.name).toEqual(id);
          expect(templateVariables.getVariable(id)?.name).toEqual(id);
          expect(templateWithValues.getVariable(id)?.name).toEqual(id);

          expect(templateSimple.getVariable(id)?.value).toBeUndefined();
          expect(templateVariables.getVariable(id)?.value).toBeUndefined();
          expect(templateWithValues.getVariable(id)?.value).toEqual(idValue);

          expect(templateSimple.getVariable(problem)?.name).toEqual(problem);
          expect(templateVariables.getVariable(problem)?.name).toEqual(problem);
          expect(templateWithValues.getVariable(problem)?.name).toEqual(problem);

          expect(templateSimple.getVariable(problem)?.value).toBeUndefined();
          expect(templateVariables.getVariable(problem)?.value).toBeUndefined();
          expect(templateWithValues.getVariable(problem)?.value).toEqual(problemValue);
        })

        .it(`Template.prototype.getVariables()`, () => {
          // template
          expect(templateSimple.getVariables()[0].name).toEqual(fix);
          expect(templateSimple.getVariables()[1].name).toEqual(id);
          expect(templateSimple.getVariables()[2].name).toEqual(problem);

          expect(templateSimple.getVariables()[0].value).toBeUndefined();
          expect(templateSimple.getVariables()[1].value).toBeUndefined();
          expect(templateSimple.getVariables()[2].value).toBeUndefined();

          templateSimple.getVariables().forEach(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe.instance(variable, Variable)));

          // templateVariables
          expect(templateVariables.getVariables()[0].name).toEqual(fix);
          expect(templateVariables.getVariables()[1].name).toEqual(id);
          expect(templateVariables.getVariables()[2].name).toEqual(problem);

          expect(templateVariables.getVariables()[0].value).toBeUndefined();
          expect(templateVariables.getVariables()[1].value).toBeUndefined();
          expect(templateVariables.getVariables()[2].value).toBeUndefined();

          templateVariables.getVariables().forEach(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe.instance(variable, Variable)));

          // templateWithValues
          expect(templateWithValues.getVariables()[0].name).toEqual(fix);
          expect(templateWithValues.getVariables()[1].name).toEqual(id);
          expect(templateWithValues.getVariables()[2].name).toEqual(problem);

          expect(templateWithValues.getVariables()[0].value).toEqual(fixValue);
          expect(templateWithValues.getVariables()[1].value).toEqual(idValue);
          expect(templateWithValues.getVariables()[2].value).toEqual(problemValue);

          templateWithValues.getVariables().forEach(variable =>
            (expect(variable).toBeInstanceOf(Variable),
            toBe.instance(variable, Variable)));

          toBe
            .array(templateSimple.getVariables())
            .array(templateVariables.getVariables())
            .array(templateWithValues.getVariables());
        })

        .it(`Template.prototype.hasVariable()`, () => {
          expect(templateSimple.hasVariable(fix)).toBeTrue();
          expect(templateVariables.hasVariable(fix)).toBeTrue();
          expect(templateWithValues.hasVariable(fix)).toBeTrue();

          expect(templateSimple.hasVariable(id)).toBeTrue();
          expect(templateVariables.hasVariable(id)).toBeTrue();
          expect(templateWithValues.hasVariable(id)).toBeTrue();

          expect(templateSimple.hasVariable(problem)).toBeTrue();
          expect(templateVariables.hasVariable(problem)).toBeTrue();
          expect(templateWithValues.hasVariable(problem)).toBeTrue();

          expect(templateSimple.hasVariable('no prop' as any)).toBeFalse();
          expect(templateVariables.hasVariable('no prop' as any)).toBeFalse();
          expect(templateWithValues.hasVariable('no prop' as any)).toBeFalse();
        })

        .it(`Template.prototype.setVariable()`, () => {
          expect(templateSimple.setVariable(fix, 'new Value').getVariable(fix)?.value).toEqual('new Value');
          templateSimple.setVariable(fix);
        })

        .it(`Template.prototype.valueOf()`, () => {
          expect(templateSimple.valueOf()).toEqual(template);
          toBe.stringIncludes(templateSimple.valueOf(), [fix, id, problem]);

          expect(templateVariables.valueOf()).toEqual(template);
          toBe.stringIncludes(templateVariables.valueOf(), [fix, id, problem]);

          expect(templateWithValues.valueOf()).toEqual(template);
          toBe.stringIncludes(templateWithValues.valueOf(), [fix, id, problem]);
        });

      });

  });
