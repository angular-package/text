// External class.
import { Testing, TestingToBeMatchers } from '@angular-package/testing';
// Class.
import { MessageBuilder } from '../src/message-builder.class';
/**
 * Initialize `Testing`.
 */
const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();
/**
 * Tests.
 */
testing.describe(`MessageBuilder`, () => {
  let messageClassBuilder = new MessageBuilder('class');
  let messageFunctionBuilder = new MessageBuilder('function');
  let messageMethodBuilder = new MessageBuilder('method');

  beforeEach(() => (messageClassBuilder = new MessageBuilder('class')));
  beforeEach(() => (messageFunctionBuilder = new MessageBuilder('function')));
  beforeEach(() => (messageMethodBuilder = new MessageBuilder('method')));

  // Basic testing.
  testing
    .it(`defined`, () =>
      toBe
        .defined(MessageBuilder)
        .defined(messageClassBuilder)
        .defined(messageFunctionBuilder)
        .defined(messageMethodBuilder)
        .instance(messageClassBuilder, MessageBuilder)
        .instance(messageFunctionBuilder, MessageBuilder)
        .instance(messageMethodBuilder, MessageBuilder)
    )
    .toBeClass(MessageBuilder);

  testing.it(`build function`, () => {
    messageFunctionBuilder
      .replaceFunctionName('guardString')
      .replaceParam('value', 'string')
      .replaceReturn('boolean');

    toBe.string(messageFunctionBuilder.get);
    expect(messageFunctionBuilder.get).toEqual('guardString(value: string): boolean');
  });

  testing.it(`build class`, () => {
    messageClassBuilder
      .replaceClassName('Person.prototype.')
      .replaceMethodName('setPerson')
      .replaceParam('value?', 'object')
      .replaceReturn('object');

    toBe.string(messageClassBuilder.get);
    expect(messageClassBuilder.get).toEqual('Person.prototype.setPerson(value?: object): object');
  });

  testing.it(`build method`, () => {
    messageMethodBuilder
      .replaceMethodName('setPerson')
      .replaceParam('value', 'string')
      .replaceReturn('this');

    toBe.string(messageMethodBuilder.get);
    expect(messageMethodBuilder.get).toEqual('setPerson(value: string): this');
  });
});
