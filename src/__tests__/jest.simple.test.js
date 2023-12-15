import {getResponse} from "../utils/utils";

describe("check getResponse function", () => {
    test("should be success", () => {
        const testObject = {
            ok: true,
            json: function () {
                return { result: "OK" }
            }
        }

        const result = getResponse(testObject);

        expect(result).toEqual({ result: "OK" })
    })

    test("should be fail", () => {
        const testObject = {
            ok: false,
            status: 400
        }

        const result = getResponse(testObject)

        // Нужно возвращать промисы или вызывать на них await, чтобы тест не завершился раньше разрешения промиса
        return expect(result).rejects.toBe("Ошибка: 400");
    })
})