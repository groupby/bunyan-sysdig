const chai   = require('chai');
const expect = chai.expect;
const Stream = require('../index');
const bunyan = require('bunyan');

describe('Sysdig logger stream', () => {
  it('should throw if sdc is null', () => {
    expect(() => new Stream(null, 'testService', 'warn')).to.throw('sdc must be an object with the function \'increment()\'');
  });

  it('should throw if sdc is not an object', () => {
    expect(() => new Stream(0, 'testService', 'warn')).to.throw('sdc must be an object with the function \'increment()\'');
  });

  it('should throw if sdc does not contain increment', () => {
    expect(() => new Stream({}, 'testService', 'warn')).to.throw('sdc must be an object with the function \'increment()\'');
  });

  it('should throw if sdc.increment is not a function', () => {
    expect(() => new Stream({increment: 'notAFunction'}, 'testService', 'warn')).to.throw('sdc must be an object with the function \'increment()\'');
  });

  it('should not throw if all validation conditions met', () => {
    expect(() => new Stream({increment: () => {}}, 'testService', 'warn')).to.not.throw();
  });

  it('should throw if serviceName is null', () => {
    expect(() => new Stream({increment: () => {}}, null, 'warn')).to.throw('serviceName must be of type string');
  });

  it('should throw if serviceName is not a string', () => {
    expect(() => new Stream({increment: () => {}}, 0, 'warn')).to.throw('serviceName must be of type string');
  });

  it('should throw if threshould is not part of log levels', () => {
    expect(() => new Stream({increment: () => {}}, 'testService', 'bad')).to.throw(/threshold must be one of/);
  });

  it('should call sysdig increment when threshold met', (done) => {
    const testFrameworkName = 'testFramework';
    const testThreshold = 'warn';

    const sdc = {
      increment: (name) => {
        expect(name).to.eql(`${testFrameworkName}.log.${testThreshold}`);
        done();
      }
    };

    const stream = new Stream(sdc, testFrameworkName, testThreshold);

    const testLogger = bunyan.createLogger({
      name:    'testLogger',
      streams: [{type: 'raw', stream: stream}]
    });

    testLogger.warn('this is a message');

  });
});