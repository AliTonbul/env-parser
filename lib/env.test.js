"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
describe("env parser", () => {
    describe("env without cast", () => {
        it("returns undefined if env var is NOT defined", () => {
            expect((0, env_1.default)("NONE_EXISTANT")).toBeUndefined();
        });
        it("returns fallback when passed and env var does NOT exist", () => {
            process.env.KEY = "test";
            expect((0, env_1.default)("NONE_EXISTANT", "fallback")).toEqual("fallback");
        });
        it("returns env var as string when key exists", () => {
            process.env.KEY = "";
            expect((0, env_1.default)("KEY")).toEqual("");
            process.env.KEY = "test";
            expect((0, env_1.default)("KEY")).toEqual("test");
        });
    });
    describe("env with integer cast", () => {
        it("returns undefined if key is NOT defined", () => {
            expect(env_1.default.int("NONE_EXISTANT")).toBeUndefined();
        });
        it("returns NaN if key is NOT castable", () => {
            process.env.INT_KEY = "";
            expect(env_1.default.int("INT_KEY")).toEqual(Number.NaN);
        });
        it("returns a valid int when possible", () => {
            process.env.INT_VAR = "123";
            expect(env_1.default.int("INT_VAR")).toEqual(123);
        });
    });
    describe("env with float cast", () => {
        it("returns undefined if key is NOT defined", () => {
            expect(env_1.default.float("NONE_EXISTANT")).toBeUndefined();
        });
        it("returns NaN if key is NOT castable", () => {
            process.env.NOT_FLOAT_VAR = "";
            expect(env_1.default.float("NOT_FLOAT_VAR")).toEqual(Number.NaN);
        });
        it("returns a valid float when possible", () => {
            process.env.FLOAT_VAR = "123.45";
            expect(env_1.default.float("FLOAT_VAR")).toEqual(123.45);
        });
    });
    describe("env with boolean cast", () => {
        it("returns undefined if key is NOT defined", () => {
            expect(env_1.default.bool("NONE_EXISTANT")).toBeUndefined();
        });
        it.each(["", "1", "-1", "false"])("returns false if key is NOT equal to true (%s)", (value) => {
            process.env.NOT_TRUE = value;
            expect(env_1.default.bool("NOT_TRUE")).toEqual(false);
        });
        it('returns true when using "true"', () => {
            process.env.TRUE_VAR = "true";
            expect(env_1.default.bool("TRUE_VAR")).toEqual(true);
        });
        it("returns true when using boolean true default Value", () => {
            expect(env_1.default.bool("TRUE_VAR", true)).toEqual(true);
        });
    });
    describe("env with json cast", () => {
        it("returns undefined if key is NOT defined", () => {
            expect(env_1.default.json("NONE_EXISTANT")).toBeUndefined();
        });
        it("Throws if key is NOT a valid json", () => {
            process.env.JSON_VAR = '{"}';
            expect(() => {
                env_1.default.json("JSON_VAR");
            }).toThrow("Invalid json environment variable");
        });
        it.each([
            ["123.45", 123.45],
            ["{}", {}],
            ['{ "key": "value" }', { key: "value" }],
            ['{ "key": 12 }', { key: 12 }],
            ['{ "key": { "subKey": "value" } }', { key: { subKey: "value" } }],
            ['"some text"', "some text"],
            ["[12,32]", [12, 32]],
        ])("returns a valid json when possible (%s)", (input, expected) => {
            process.env.JSON_VAR = input;
            expect(env_1.default.json("JSON_VAR")).toEqual(expected);
        });
    });
    describe("env with array cast", () => {
        it("returns undefined if key is NOT defined", () => {
            expect(env_1.default.array("NONE_EXISTANT")).toBeUndefined();
        });
        it("returns an array even when NOT an array is passed", () => {
            process.env.NOT_ARRAY_VAR = "somevalue";
            expect(env_1.default.array("NOT_ARRAY_VAR")).toEqual(["somevalue"]);
        });
        it("returns only strings", () => {
            process.env.ARRAY_VAR = "123,456";
            expect(env_1.default.array("ARRAY_VAR")).toEqual(["123", "456"]);
        });
        it("returns an array when NOT using brackets", () => {
            process.env.ARRAY_VAR = "firstValue, secondValue";
            expect(env_1.default.array("ARRAY_VAR")).toEqual(["firstValue", "secondValue"]);
        });
        it("Supports brackets", () => {
            process.env.ARRAY_VAR = "[firstValue, secondValue]";
            expect(env_1.default.array("ARRAY_VAR")).toEqual(["firstValue", "secondValue"]);
        });
    });
    describe("env with date cast", () => {
        it("returns undefined if key is NOT defined", () => {
            expect(env_1.default.date("NONE_EXISTANT")).toBeUndefined();
        });
        it("returns InvalidDate if key is NOT castable", () => {
            var _a;
            process.env.NOT_DATE_VAR = "random string";
            expect((_a = env_1.default.date("NOT_DATE_VAR")) === null || _a === void 0 ? void 0 : _a.getTime()).toEqual(Number.NaN);
        });
        it("returns a valid date object when valid date string is passed", () => {
            process.env.DATE_VAR = "2010-02-21T12:34:12";
            expect(env_1.default.date("DATE_VAR")).toEqual(new Date(2010, 1, 21, 12, 34, 12));
        });
    });
});
//# sourceMappingURL=env.test.js.map