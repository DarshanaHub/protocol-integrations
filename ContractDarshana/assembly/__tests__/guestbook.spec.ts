import { addRegisterValidation, getRegisters } from '../main';
import { PostedValidation, messages } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createMessage(text: string): PostedValidation {
  return new PostedValidation(text);
}

const message = createMessage('hello world');

describe('message tests', () => {
  afterEach(() => {
    while(messages.length > 0) {
      messages.pop();
    }
  });

  it('adds a message', () => {
    addRegisterValidation('hello world');
    expect(messages.length).toBe(
      1,
      'should only contain one message'
    );
    expect(messages[0]).toStrictEqual(
      message,
      'message should be "hello world"'
    );
  });

  it('adds a premium message', () => {
    VMContext.setAttached_deposit(u128.from('10000000000000000000000'));
    addRegisterValidation('hello world');
    const messageAR = getRegisters();
    expect(messageAR[0].premium).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves messages', () => {
    addRegisterValidation('hello world');
    const messagesArr = getRegisters();
    expect(messagesArr.length).toBe(
      1,
      'should be one message'
    );
    expect(messagesArr).toIncludeEqual(
      message,
      'messages should include:\n' + message.toJSON()
    );
  });

  it('only show the last 10 messages', () => {
    addRegisterValidation('hello world');
    const newMessages: PostedValidation[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'message #' + i.toString();
      newMessages.push(createMessage(text));
      addRegisterValidation(text);
    }
    const messages = getRegisters();
    log(messages.slice(7, 10));
    expect(messages).toStrictEqual(
      newMessages,
      'should be the last ten messages'
    );
    expect(messages).not.toIncludeEqual(
      message,
      'shouldn\'t contain the first element'
    );
  });
});

describe('attached deposit tests', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(u128.fromString('0'));
    VMContext.setAccount_balance(u128.fromString('0'));
  });

  it('attaches a deposit to a contract call', () => {
    log('Initial account balance: ' + Context.accountBalance.toString());

    addRegisterValidation('hello world');
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
