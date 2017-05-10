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

    if (data.level >= self.thresholdLevel) {
      sdc.increment(`${serviceName}.log.${data.level}`);
    }
  };

  self.end = () => {};

  return self;
};


module.exports = Stream;
