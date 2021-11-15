import { Wrapper } from '../src/wrapper.class';
import { Wrap } from '../type/wrap.type';
import { ResultCallback, isTrue } from '@angular-package/type';
import { TestingToBeMatchers } from '@angular-package/testing';

const toBe = new TestingToBeMatchers();

export const specWrapper = <Chars extends string>(
  wrap: Wrap<Chars>,
  callback?: ResultCallback<Wrap<Chars>>
) => {
  let result = false;
  const wrapper = new Wrapper(wrap, undefined, (r, value) => {
    result = r;
    return callback ? callback(r, value) : r;
  });

  if (isTrue(result)) {
    toBe
      .stringOfLength(wrapper.closingChar, 1)
      .stringOfLength(wrapper.get(), 2)
      .stringOfLength(wrapper.getClosingChar(), 1)
      .stringOfLength(wrapper.getOpeningChar(), 1)
      .stringOfLength(wrapper.value, 2)
      .stringOfLength(wrapper.valueOf(), 2)
      .stringOfLength(wrapper.openingChar, 1);

    expect(wrapper.closingChar).toEqual(wrap[1]);
    expect(wrapper.get()).toEqual(wrap);
    expect(wrapper.getClosingChar()).toEqual(wrap[1]);
    expect(wrapper.getOpeningChar()).toEqual(wrap[0]);
    expect(wrapper.openingChar).toEqual(wrap[0]);
    expect(wrapper.value).toEqual(wrap);
    expect(wrapper.valueOf()).toEqual(wrap);
  } else {
    // toBe
    //   .stringOfLength(wrapper.closingChar, 1)
    //   .stringOfLength(wrapper.get(), 2)
    //   .stringOfLength(wrapper.getClosingChar(), 1)
    //   .stringOfLength(wrapper.getOpeningChar(), 1)
    //   .stringOfLength(wrapper.value, 2)
    //   .stringOfLength(wrapper.valueOf(), 2)
    //   .stringOfLength(wrapper.openingChar, 1);

    // expect(wrapper.closingChar).not.toEqual(wrap[1]);
    // expect(wrapper.get()).not.toEqual(wrap);
    // expect(wrapper.getClosingChar()).not.toEqual(wrap[1]);
    // expect(wrapper.getOpeningChar()).not.toEqual(wrap[0]);
    // expect(wrapper.openingChar).not.toEqual(wrap[0]);
    // expect(wrapper.value).not.toEqual(wrap);
    // expect(wrapper.valueOf()).not.toEqual(wrap);
  }
};
