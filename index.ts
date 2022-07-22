interface DoneCallback {
  (...args: any[]): any;
  fail(error?: string | { message: string }): any;
}

export interface ProvidesCallback {
  (cb: DoneCallback): any;
}

type ConditionFunc = () => boolean;
export type Condition = boolean | ConditionFunc;

// Add skipIf and testIf to the jest namespace
declare global {
  namespace jest {
    interface It {
      skipIf(
        skipCondition: Condition,
        name: string,
        fn?: ProvidesCallback
      ): void;
      testIf(
        testCondition: Condition,
        name: string,
        fn?: ProvidesCallback
      ): void;
    }
  }
}

export const skipIf = (
  skipCondition: Condition,
  name: string,
  fn?: ProvidesCallback
) => {
  if (test == null) {
    throw new Error(
      "skipIf must be used in the context of a Jest test run. `test` is not defined."
    );
  }

  if (typeof skipCondition === "boolean") {
    // Handle boolean
    skipCondition ? test.skip(name, fn) : test(name, fn);
  } else if (typeof skipCondition === "function") {
    // Handle function
    skipCondition() ? test.skip(name, fn) : test(name, fn);
  } else {
    throw new Error(
      "skipIf was not provided a boolean or function to evaluate"
    );
  }
};

export const testIf = (
  testCondition: Condition,
  name: string,
  fn?: ProvidesCallback
) => {
  if (test == null) {
    throw new Error(
      "testIf must be used in the context of a Jest test run. `test` is not defined."
    );
  }

  if (typeof testCondition === "boolean") {
    // Handle boolean
    testCondition ? test(name, fn) : test.skip(name, fn);
  } else if (typeof testCondition === "function") {
    // Handle function
    testCondition() ? test(name, fn) : test.skip(name, fn);
  } else {
    throw new Error(
      "testIf was not provided a boolean or function to evaluate"
    );
  }
};

export default { skipIf, testIf };
