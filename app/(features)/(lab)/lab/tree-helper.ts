export default class TreeHelper {
    static getFileContents(path: string[]) {}

    static getStringPath(path: string[]) {
        const stringPath = path.join('.directory.');
        return stringPath;
    }
}
