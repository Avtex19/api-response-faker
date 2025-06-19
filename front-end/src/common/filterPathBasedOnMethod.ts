export function filterPathBasedOnMethod(methodName: string, paths: string[]) {
    switch (methodName) {
        case 'GET':
            return paths;
        case 'POST':
            return paths.filter(path => !path.includes(':id'))
        case 'PUT':
            return paths.filter(path => path.includes(':id'))
        case 'DELETE':
            return paths.filter(path => path.includes(':id'))
        case 'PATCH':
            return paths.filter(path => path.includes(':id'))
        default:
            return paths;
    }
}