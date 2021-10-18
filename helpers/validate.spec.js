const { validateTagBlockProperty } = require("./validate");

describe("validateTagBlockProperty test", () => {
  test("should pass when property is valid", () => {
    const property = {
      field: "validString"
    };

    expect(validateTagBlockProperty(property)).toBe(true);
  });

  test("should pass when valid property is nested", () => {
    const property = {
      firstField: {
        mockValue: "mockValue"
      },
      secondField: {},
      thirdField: "validString"
    };

    expect(validateTagBlockProperty(property)).toBe(true);
  });

  test("should pass when valid property is deeply nested", () => {
    const property = {
      firstField: {
        firstChildField: {
          firstValue: "validString",
          secondValue: {
            value: "nestedValue"
          }
        },
        secondChildField: ""
      },
      secondField: {},
      thirdField: "validString"
    };

    expect(validateTagBlockProperty(property)).toBe(true);
  });

  test("should be pass when property is invalid", () => {
    const property = {
      firstField: 1
    };

    expect(validateTagBlockProperty(property)).toBe(false);
  });

  test("should be pass when invalid property is nested", () => {
    const property = {
      firstField: {
        mockValue: null
      },
      secondField: {},
      thirdField: "validString"
    };

    expect(validateTagBlockProperty(property)).toBe(false);
  });

  test("should be pass when invalid property is deeply nested", () => {
    const property = {
      firstField: {
        firstChildField: {
          firstValue: "validString",
          secondValue: {
            value: ["nestedValue"]
          }
        },
        secondChildField: ""
      },
      secondField: {},
      thirdField: "validString"
    };

    expect(validateTagBlockProperty(property)).toBe(false);
  });
});
