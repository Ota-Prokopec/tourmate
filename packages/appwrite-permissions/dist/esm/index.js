import { Permission, Role } from 'appwrite';

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
    Permission.read(Role.user(userId)),
    Permission.write(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
]);
const read = (...userIds) => userIds.map((userId) => Permission.read(Role.user(userId)));
const readAny = () => [Permission.read(Role.any())];

export { convert, owner, read, readAny };
//# sourceMappingURL=index.js.map
