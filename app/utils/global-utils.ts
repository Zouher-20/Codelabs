export default class GlobalUtils {
    static isEmptyValue(value: unknown) {
        if (this.isNullOrUndefined(value)) {
            return true;
        }
        switch (typeof value) {
            case 'object':
                if (Object.prototype.toString.call(value) === '[object Array]') {
                    return (value as unknown[]).length === 0;
                } else if (Object.prototype.toString.call(value) === '[object Date]') {
                    return !value;
                } else {
                    return Object.keys(value as object).length === 0;
                }

            case 'string':
                return (value as string).length === 0;
        }
        return false;
    }

    static isNullOrUndefined(value: unknown) {
        return value === null || value === undefined;
    }
}
