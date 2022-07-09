"use strict";

const has = (key: string): boolean => key in process.env;

const env = (key: string, defaultValue?: string) =>
  has(key) ? process.env[key] : defaultValue;

export default Object.assign(env, {
  int(key: string, defaultValue?: number) {
    if (!has(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    return parseInt(value, 10);
  },

  float(key: string, defaultValue?: number) {
    if (!has(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    return parseFloat(value);
  },

  bool(key: string, defaultValue?: boolean) {
    if (!has(key)) {
      return defaultValue;
    }

    const value = process.env[key];
    return value === "true";
  },

  json<T>(key: string, defaultValue?: T) {
    if (!has(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(
        `Invalid json environment variable ${key}: ${JSON.stringify(error)}`
      );
    }
  },
  array<T>(key: string, defaultValue?: T) {
    if (!has(key)) {
      return defaultValue;
    }

    let value = process.env[key] as string;

    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.substring(1, value.length - 1);
    }

    return value.split(",").map((v) => {
      return v.trim();
    });
  },

  date(key: string, defaultValue?: Date) {
    if (!has(key)) {
      return defaultValue;
    }

    const value = process.env[key] as string;
    return new Date(value);
  },
});
