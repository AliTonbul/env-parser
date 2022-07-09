declare const _default: ((key: string, defaultValue?: string | undefined) => string | undefined) & {
    int(key: string, defaultValue?: number): number | undefined;
    float(key: string, defaultValue?: number): number | undefined;
    bool(key: string, defaultValue?: boolean): boolean | undefined;
    json<T>(key: string, defaultValue?: T | undefined): any;
    array<T_1>(key: string, defaultValue?: T_1 | undefined): T_1 | string[] | undefined;
    date(key: string, defaultValue?: Date): Date | undefined;
};
export default _default;
//# sourceMappingURL=index.d.ts.map