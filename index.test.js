const logging = require('./index');

describe('logging', () => {
  let console;
  let logger1;
  let logger2;

  beforeEach(() => {
    console = { log: jest.fn() },
    logger1 = new logging.Logger('test-logger1', { console });
    logger2 = new logging.Logger('test-logger2', { console });
  });

  describe('Logger', () => {
    it('subsitutes args in the log message', () => {
      logger1.error('msg: data {}, array {}, val {}', {'a': 'b'}, ['3','4'], 'foo');

      expect(console.log).toHaveBeenCalledWith(
        '[ERROR - test-logger1   ] - msg: data {"a":"b"}, array ["3","4"], val "foo"'
      );
    });

    it('can handle missing opts in constructor', () => {
      new logging.Logger('name');
    });

    describe('setLevel', () => {
      it('affects only a single logger', () => {
        logger1.setLevel(logging.TRACE);
        logger2.setLevel(logging.WARN);

        logger1.trace('trace msg');
        logger1.debug('debug msg');
        logger1.info('info msg');
        logger1.warn('warn msg');
        logger1.error('error msg');

        logger2.trace('trace msg');
        logger2.debug('debug msg');
        logger2.info('info msg');
        logger2.warn('warn msg');
        logger2.error('error msg');

        expect(console.log).toHaveBeenCalledWith('[TRACE - test-logger1   ] - trace msg');
        expect(console.log).toHaveBeenCalledWith('[DEBUG - test-logger1   ] - debug msg');
        expect(console.log).toHaveBeenCalledWith('[INFO  - test-logger1   ] - info msg');
        expect(console.log).toHaveBeenCalledWith('[WARN  - test-logger1   ] - warn msg');
        expect(console.log).toHaveBeenCalledWith('[ERROR - test-logger1   ] - error msg');

        expect(console.log).toHaveBeenCalledWith('[WARN  - test-logger2   ] - warn msg');
        expect(console.log).toHaveBeenCalledWith('[ERROR - test-logger2   ] - error msg');

        expect(console.log.mock.calls.length).toBe(7);
      });
    });


  });

  describe('logging.setLevel', () => {
    it('affects all loggers', () => {
      logging.setLevel(logging.INFO);

      logger1.trace('trace msg');
      logger1.debug('debug msg');
      logger1.info('info msg');
      logger1.warn('warn msg');
      logger1.error('error msg');

      logger2.trace('trace msg');
      logger2.debug('debug msg');
      logger2.info('info msg');
      logger2.warn('warn msg');
      logger2.error('error msg');

      expect(console.log).toHaveBeenCalledWith('[INFO  - test-logger1   ] - info msg');
      expect(console.log).toHaveBeenCalledWith('[WARN  - test-logger1   ] - warn msg');
      expect(console.log).toHaveBeenCalledWith('[ERROR - test-logger1   ] - error msg');

      expect(console.log).toHaveBeenCalledWith('[INFO  - test-logger2   ] - info msg');
      expect(console.log).toHaveBeenCalledWith('[WARN  - test-logger2   ] - warn msg');
      expect(console.log).toHaveBeenCalledWith('[ERROR - test-logger2   ] - error msg');

      expect(console.log.mock.calls.length).toBe(6);
    });
  });
});
