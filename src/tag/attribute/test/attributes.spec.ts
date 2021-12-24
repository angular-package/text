import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { Attributes } from '../src/attributes.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Attributes`, () => {

  const name = `color`;
  const value = `red`;
  // const attribute = new Attributes(name, value);

  // const attributes = new Attributes(['color', 'red'], ['name', 'none']);

  // console.log(attributes.toString());


  // const attributes1 = new Attributes(['color', 'red'], ['name', 'none']);

  // console.log(attributes1.getAll());

  testing
    .describe(`accessors`, () => {})
    .describe(`instance methods`, () => {

    });
});
