const Stream = function (sdc, serviceName, threshold) {
  const self      = this;
  const logLevels = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal'
  ];

  self.thresholdLevel = (logLevels.indexOf(threshold) + 1) * 10;

  self.write = (data) => {

    const logLevelNumeric = data.level;
    if (logLevelNumeric >= self.thresholdLevel) {
      const logIndex = (logLevelNumeric/10)-1;
      sdc.increment(`${serviceName}.log.${logLevels[logIndex]}`);
    }

  };

  self.end = () => {};

  return self;
};


module.exports = Stream;
