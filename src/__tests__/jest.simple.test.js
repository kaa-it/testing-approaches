import { getResponse } from "../utils/utils";

describe("check getResponse function", () => {
  test("should be success хорошо", () => {
    const testObject = {
      ok: true,
      json: function () {
        return { result: "OK" };
      },
    };

    const result = getResponse(testObject);

    expect(result).toEqual({ result: "OK" });
  });

  test("should be fail", () => {
    const testObject = {
      ok: false,
      json: function () {
        return { result: "OK" };
      },
      status: 400,
    };

    const result = getResponse(testObject);

    return expect(result).rejects.toBe("Ошибка: 400");
  });
});
