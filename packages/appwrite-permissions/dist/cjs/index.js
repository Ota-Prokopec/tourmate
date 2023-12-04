'use strict';

var appwrite = require('appwrite');

const convert = (permissions) => {
    if (typeof permissions === 'object')
        permissions = Object.values(permissions); //because appwrite sometimes gives you [] permissions and sometimes {}
    const arr = permissions === null || permissions === void 0 ? void 0 : permissions.map((permission) => {
        const propetries = permission.split('(').join(')').split(')');
        const key = propetries[0];
        const value = propetries[1];
        if (!key || !value)
            throw new Error('Invalid permissions array');
        return {
            [key]: JSON.parse(value),
        };
    });
    const object = {
        delete: { users: [], teams: [] },
        read: { users: [], teams: [] },
        update: { users: [], teams: [] },
        create: { users: [], teams: [] },
        write: { users: [], teams: [] },
    };
    arr === null || arr === void 0 ? void 0 : arr.forEach((item) => {
        const [key, value] = Object.entries(item)[0];
        const role = `${value.split(':')[0]}s`;
        const ID = value.split(':')[1];
        if (!object[key][role])
            object[key][role] = [];
        object[key][role] = [...object[key][role], ID || 'any-has-value-empty'];
    });
    return object;
};

const owner = (...userIds) => userIds.flatMap((userId) => [
    appwrite.Permission.read(appwrite.Role.user(userId)),
    appwrite.Permission.write(appwrite.Role.user(userId)),
    appwrite.Permission.update(appwrite.Role.user(userId)),
    appwrite.Permission.delete(appwrite.Role.user(userId)),
]);
const read = (...userIds) => userIds.map((userId) => appwrite.Permission.read(appwrite.Role.user(userId)));
const readAny = () => [appwrite.Permission.read(appwrite.Role.any())];

exports.convert = convert;
exports.owner = owner;
exports.read = read;
exports.readAny = readAny;
//# sourceMappingURL=index.js.map
