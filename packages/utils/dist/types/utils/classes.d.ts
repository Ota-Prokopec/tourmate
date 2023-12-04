export declare function executeFunctionBeforeAndAfterClassMethod<Methods extends {}, TClass extends {
    new (): any;
}>(classs: TClass, funs?: {
    before?: (classs: TClass, propertyName: keyof Methods) => TClass | TClass | boolean | boolean;
    after?: (result: Methods[keyof Methods], classs: TClass, propertyName: keyof Methods) => Methods[keyof Methods] | false | undefined | null | void | Methods[keyof Methods] | false | undefined | null | void;
}, excludedMethods?: {
    before?: (keyof Methods)[];
    after?: (keyof Methods)[];
}): TClass;
//# sourceMappingURL=classes.d.ts.map