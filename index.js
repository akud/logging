const ERROR = Symbol('ERROR');
const WARN = Symbol('WARN');
const INFO = Symbol('INFO');
const DEBUG = Symbol('DEBUG');
const TRACE = Symbol('TRACE');

const LEVEL_ORDER = [
  ERROR,
  WARN,
  INFO,
  DEBUG,
  TRACE,
];

const LEVEL_NAMES = {};
LEVEL_NAMES[ERROR] = 'ERROR';
LEVEL_NAMES[WARN] = 'WARN';
LEVEL_NAMES[INFO] = 'INFO';
LEVEL_NAMES[DEBUG] = 'DEBUG';
LEVEL_NAMES[TRACE] = 'TRACE';



let GLOBAL_LEVEL = DEBUG;

class Logger {
  constructor(name, { level, console }) {
    this.name = name;
    this.level = level;
    this.console = console || global.console;
  }

  setLevel(level) {
    this.level = level;
  }

  error(msg, ...args) {
    if (this._isLevelEnabled(ERROR)) {
      this._doLog(ERROR, msg, args);
    }
  }

  warn(msg, ...args) {
    if (this._isLevelEnabled(WARN)) {
      this._doLog(WARN, msg, args);
    }
  }

  info(msg, ...args) {
    if (this._isLevelEnabled(INFO)) {
      this._doLog(INFO, msg, args);
    }
  }

  debug(msg, ...args) {
    if (this._isLevelEnabled(DEBUG)) {
      this._doLog(DEBUG, msg, args);
    }
  }

  trace(msg, ...args) {
    if (this._isLevelEnabled(TRACE)) {
      this._doLog(TRACE, msg, args);
    }
  }

  _doLog(level, msg, args) {
    const levelDisplay = LEVEL_NAMES[level].padEnd(5, ' ');
    const nameDisplay = this.name.slice(0,15).padEnd(15, ' ');
    let numSubstitutions = 0;
    msg = msg.replace(/{}/g, () => JSON.stringify(args[numSubstitutions++]));
    this.console.log(`[${levelDisplay} - ${nameDisplay}] - ${msg}`);
  }

  _isLevelEnabled(level) {
    return LEVEL_ORDER.indexOf(level) <= LEVEL_ORDER.indexOf(this._currentLevel());
  }

  _currentLevel() {
    return this.level || GLOBAL_LEVEL;
  }
}

module.exports = {
  ERROR,
  WARN,
  INFO,
  DEBUG,
  TRACE,
  Logger,
  setLevel: level => { GLOBAL_LEVEL = level; },
};
