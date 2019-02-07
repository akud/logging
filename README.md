# @akud/logging

Basic logging framework for javascript. This supports controlling the
log level and string interpolation. Example usage:

```javascript
import logging from '@akud/logging';

const LOGGER = new logging.Logger('my-module');

LOGGER.debug("A debug message with {} args and an object: {}", 2, { foo:
'bar' });

//...

in app initialization:

import logging from '@akud/logging';
logging.setLevel(logging.INFO);
```

Supported levels:

1. `logging.ERROR`
2. `logging.WARN`
3. `logging.INFO`
4. `logging.DEBUG`
5. `logging.TRACE`
