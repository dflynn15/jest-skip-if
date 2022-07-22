# jest-skip-if

This package is created to handle the use case when you need to conditionally skip or test a spec in jest.

## Installation

```bash
yarn add --dev jest jest-skip-if 
```

## Setup

With `jest-skip-if` installed you can either use it on individual files or add it globally.

For individual files you can import and use it directly.

```js
import {skipIf} from 'jest-skip-if';

skipIf(true, 'skipped spec', () => {})
```

Or, if desired it can be setup globally by adding or modifying a setup script with Jest's `setupFilesAfterEnv` configuration.

```js
// testSetup.js
import {skipIf, testIf} from 'jest-skip-if';

global.skipIf = skipIf;
global.testIf = testIf;
```

```js
"jest": {
  "setupFilesAfterEnv": ["./testSetup.js"]
}
```

If desired, you can also add `jest-skip-if` setup file to your `setupFilesAfterEnv` array.

```js
"jest": {
  "setupFilesAfterEnv": ["jest-skip-if/setup"]
}
```

## Helpers

### `skipIf`
When there is a use case that you need to skip a spec based off of a condition you can use `skipIf`

```js
skipIf(hasFeatureEnabled, 'spec using feature', () => {
  // Nothing is run given hasFeatureEnabled is true
  expect(true).toBe(true);
})
```

In the example, `hasFeatureEnabled` can be both a `boolean` or a function returning a `boolean`.

### `testIf`

When there is a use case that you need to test a spec based off of a condition you can use `testIf`

```js
testIf(hasFeatureEnabled, 'spec using feature', () => {
  // Spec is run given hasFeatureEnabled is true
  expect(true).toBe(true);
})
```
In the example, `hasFeatureEnabled` can be both a `boolean` or a function returning a `boolean`.
