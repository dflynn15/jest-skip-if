import { skipIf, testIf } from "./";

const throwSpecError = () => {
  throw new Error("This should be skipped");
};

describe("skipIf", () => {
  describe("skips", () => {
    skipIf(true, "given a true boolean", throwSpecError);

    skipIf(
      () => {
        return true;
      },
      "given a function returning true",
      throwSpecError
    );
  });

  describe("runs the spec", () => {
    skipIf(false, "given a false boolean", () => {
      expect(true).toEqual(true);
    });

    skipIf(
      () => {
        return false;
      },
      "given a function returning false",
      () => {
        expect(true).toEqual(true);
      }
    );
  });
});

describe("testIf", () => {
  describe.only("skips", () => {
    testIf(false, "given a false boolean", throwSpecError);
    testIf(
      () => {
        return false;
      },
      "given a function returning false",
      throwSpecError
    );
  });

  describe("runs the spec", () => {
    testIf(true, "given a true boolean", () => {
      expect(true).toEqual(true);
    });

    testIf(
      () => {
        return true;
      },
      "given a function returning true",
      () => {
        expect(true).toEqual(true);
      }
    );
  });
});
