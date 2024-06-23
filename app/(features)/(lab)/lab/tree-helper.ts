export default class TreeHelper {
    static getStringPath(path: string[]) {
        const stringPath = path.join('.directory.');
        return stringPath;
    }

    static getParsedPath(path: string[], isFile = true) {
        const parsedPath = [];
        for (let index = 0; index < path.length; index++) {
            if (index == 0 && path[index] === 'root') {
                continue;
            }
            const currentPath = path[index];
            parsedPath.push(currentPath);
            if (index + 1 !== path.length) parsedPath.push('directory');
        }
        if (isFile) {
            parsedPath.push('file');
            parsedPath.push('contents');
        }
        return parsedPath;
    }
}
