import appwrite from '../appwrite/appwrite';
export declare const getUser: (userId: string, collections: ReturnType<(typeof appwrite)['setCookie']>['collections']) => Promise<{
    _createdAt: string;
    _updatedAt: string;
    _collectionId: string;
    _id: string;
    _permissions: string[];
    _databaseId: string;
    myId: string;
    username: string;
    userId: string;
    profilePictureURL: URL;
}>;
//# sourceMappingURL=getUser.d.ts.map