# bunyan-sysdig

Bunyan your errors into Sysdig

## Installation
```bash
npm i -S bunyan-sysdig
```

## Use
```javascript
const bunyan       = require('bunyan');
const BunyanSysdig = require('bunyan-sysdig');
const SDC          = require('statsd-client');

const sdc = new SDC();

const logger = bunyan.createLogger({
    name:    'my app',
    streams: {
       type: 'raw',
       stream: new BunyanSysdig(sdc, 'nameServerExample', 'warn')
     }
  });


logger.info('Not sent to statsd');
logger.error('Sent to statsd because its above the threshold');

```