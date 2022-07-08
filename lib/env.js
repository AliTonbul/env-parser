"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const has = (key) => key in process.env;
const env = (key, defaultValue) => has(key) ? process.env[key] : defaultValue;
exports.default = Object.assign(env, {
    int(key, defaultValue) {
        if (!has(key)) {
            return defaultValue;
        }
        const value = process.env[key];
        return parseInt(value, 10);
    },
    float(key, defaultValue) {
        if (!has(key)) {
            return defaultValue;
        }
        const value = process.env[key];
        return parseFloat(value);
    },
    bool(key, defaultValue) {
        if (!has(key)) {
            return defaultValue;
        }
        const value = process.env[key];
        return value === "true";
    },
    json(key, defaultValue) {
        if (!has(key)) {
            return defaultValue;
        }
        const value = process.env[key];
        try {
            return JSON.parse(value);
        }
        catch (error) {
            throw new Error(`Invalid json environment variable ${key}: ${JSON.stringify(error)}`);
        }
    },
    array(key, defaultValue) {
        if (!has(key)) {
            return defaultValue;
        }
        let value = process.env[key];
        if (value.startsWith("[") && value.endsWith("]")) {
            value = value.substring(1, value.length - 1);
        }
        return value.split(",").map((v) => {
            return v.trim();
        });
    },
    date(key, defaultValue) {
        if (!has(key)) {
            return defaultValue;
        }
        const value = process.env[key];
        return new Date(value);
    },
});
//# sourceMappingURL=env.js.map