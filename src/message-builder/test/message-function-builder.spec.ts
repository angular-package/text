// External class.
import { Testing, TestingToBeMatchers } from '@angular-package/testing';
// Class.
import { MessageFunctionBuilder } from '../src/message-function-builder.class';
/**
 * Initialize `Testing`.
 */
const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();
/**
 * Tests.
 */
testing.describe(`MessageFunctionBuilder`, () => {
  let messageFunctionBuilder = new MessageFunctionBuilder();

  beforeEach(() => (messageFunctionBuilder = new MessageFunctionBuilder()));

  // Basic testing.
  testing
    .it(`defined`, () =>
      toBe
        .defined(messageFunctionBuilder)
        .defined(messageFunctionBuilder)
        .instance(messageFunctionBuilder, MessageFunctionBuilder)
    )
    .toBeClass(MessageFunctionBuilder);

  testing.it(`build function`, () => {
    messageFunctionBuilder
      .setName('guardString')
      .setParam('value', 'string')
      .setReturn('boolean')
      .build();

    toBe.string(messageFunctionBuilder.get);
    expect(messageFunctionBuilder.get).toEqual('guardString(value: string): boolean');
  });
});
