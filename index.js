const logLevels = [
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal'
];

const Stream = function (sdc, serviceName, threshold) {
  const self      = this;

  if (!sdc || typeof sdc != 'object' || !sdc.increment || typeof sdc.increment != 'function'){
    throw new Error('sdc must be an object with the function \'increment()\'');
  }

  if (!serviceName || typeof serviceName != 'string'){
    throw new Error ('serviceName must be of type string');
  }

  if (logLevels.indexOf(threshold) === -1){
    throw new Error(`threshold must be one of: ${logLevels}`);
  }

  self.thresholdLevel = (logLevels.indexOf(threshold) + 1) * 10;

  self.write = (data) => {

    const logLevelNumeric = data.level;
    if (logLevelNumeric >= self.thresholdLevel) {
      const logIndex = (logLevelNumeric / 10) - 1;
      sdc.increment(`${serviceName}.log.${logLevels[logIndex]}`);
    }

  };

  self.end = () => {
  };

  return self;
};

module.exports = Stream;

