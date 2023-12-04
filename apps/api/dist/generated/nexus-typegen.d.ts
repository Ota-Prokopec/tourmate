/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */
import type { Context } from "./../context";
import type { core } from "nexus";
declare global {
    interface NexusGenCustomInputMethods<TypeName extends string> {
        answerType<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void;
        location<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void;
        stringOrNumber<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void;
        topic<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void;
        transport<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void;
        /**
         * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
         */
        url<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void;
    }
}
declare global {
    interface NexusGenCustomOutputMethods<TypeName extends string> {
        answerType<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void;
        location<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void;
        stringOrNumber<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void;
        topic<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void;
        transport<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void;
        /**
         * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
         */
        url<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void;
    }
}
declare global {
    interface NexusGen extends NexusGenTypes {
    }
}
export interface NexusGenInputs {
    CreateAccountInput: {
        myId: string;
        username: string;
    };
    CreateExperienceInput: {
        connnectedMonumentId: string;
        location: NexusGenScalars['Location'];
        picture: string;
    };
    CreateMonumentInput: {
        about: string;
        location: NexusGenScalars['Location'];
        name: string;
        picture: string;
        placeName: string;
        question?: NexusGenInputs['QuestionInput'] | null;
        topics: NexusGenScalars['Topic'][];
        transports: NexusGenScalars['Transport'][];
    };
    LocationInput: {
        location: NexusGenScalars['Location'];
        rangeMeters: number | null;
    };
    MonumentInputByName: {
        limit: number;
        name: string;
    };
    QuestionInput: {
        correctAnswer: NexusGenScalars['StringOrNumber'];
        pickingAnswers?: string[] | null;
        question: string;
        type: NexusGenScalars['AnswerType'];
    };
}
export interface NexusGenEnums {
}
export interface NexusGenScalars {
    String: string;
    Int: number;
    Float: number;
    Boolean: boolean;
    ID: string;
    AnswerType: 'radio' | 'text' | 'number';
    Location: [number, number];
    StringOrNumber: string | number;
    Topic: "castle" | "monument" | "person" | "animals" | "hiking";
    Transport: "train" | "bus" | "car" | "walk" | "bike";
    URL: URL;
}
export interface NexusGenObjects {
    Account: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _documentId: string;
        _permissions: string[];
        _updatedAt: string;
        emailVerification: boolean;
        myId: string;
        phoneVerification: boolean;
        prefs: NexusGenRootTypes['UsersPreferences'];
        profilePictureURL: NexusGenScalars['URL'];
        status: boolean;
        userId: string;
        username: string;
    };
    EmailLogin: {
        session: string;
    };
    Experience: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        connectedMonumentId: string;
        location: NexusGenScalars['Location'];
        pictureUrl: NexusGenScalars['URL'];
        userId: string;
    };
    ExperienceLike: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        experienceId: string;
        userId: string;
    };
    Monument: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        about?: string | null;
        location: NexusGenScalars['Location'];
        name: string;
        pictureURL: NexusGenScalars['URL'];
        placeDetailId: string;
        questionId?: string | null;
        topics: NexusGenScalars['Topic'][];
        transports: NexusGenScalars['Transport'][];
        userId: string;
    };
    MonumentLike: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        monumentId: string;
        userId: string;
    };
    Mutation: {};
    PlaceDetail: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        name: string;
    };
    Query: {};
    Question: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        correctAnswer: NexusGenScalars['StringOrNumber'];
        pickingAnswers?: string[] | null;
        question: string;
        type: NexusGenScalars['AnswerType'];
    };
    User: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        myId: string;
        profilePictureURL: NexusGenScalars['URL'];
        userId: string;
        username: string;
    };
    UsersAnswerToQuestion: {
        answeredCorrectly: boolean;
    };
    UsersPreferences: {
        mapRange: number;
        termsAccepted: boolean;
    };
}
export interface NexusGenInterfaces {
}
export interface NexusGenUnions {
}
export type NexusGenRootTypes = NexusGenObjects;
export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars;
export interface NexusGenFieldTypes {
    Account: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _documentId: string;
        _permissions: string[];
        _updatedAt: string;
        emailVerification: boolean;
        myId: string;
        phoneVerification: boolean;
        prefs: NexusGenRootTypes['UsersPreferences'];
        profilePictureURL: NexusGenScalars['URL'];
        status: boolean;
        userId: string;
        username: string;
    };
    EmailLogin: {
        session: string;
    };
    Experience: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        connectedMonument: NexusGenRootTypes['Monument'] | null;
        connectedMonumentId: string;
        liked: NexusGenRootTypes['ExperienceLike'] | null;
        likes: NexusGenRootTypes['ExperienceLike'][];
        location: NexusGenScalars['Location'];
        pictureUrl: NexusGenScalars['URL'];
        user: NexusGenRootTypes['User'];
        userId: string;
    };
    ExperienceLike: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        experienceId: string;
        user: NexusGenRootTypes['User'];
        userId: string;
    };
    Monument: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        about: string | null;
        connectedExperiences: NexusGenRootTypes['Experience'][];
        liked: NexusGenRootTypes['MonumentLike'] | null;
        likes: NexusGenRootTypes['MonumentLike'][];
        location: NexusGenScalars['Location'];
        name: string;
        nearExperiences: NexusGenRootTypes['Experience'][];
        pictureURL: NexusGenScalars['URL'];
        placeDetail: NexusGenRootTypes['PlaceDetail'];
        placeDetailId: string;
        question: NexusGenRootTypes['Question'] | null;
        questionId: string | null;
        topics: NexusGenScalars['Topic'][];
        transports: NexusGenScalars['Transport'][];
        user: NexusGenRootTypes['User'];
        userId: string;
        usersAnswerToQuestion: NexusGenRootTypes['UsersAnswerToQuestion'] | null;
    };
    MonumentLike: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        monumentId: string;
        user: NexusGenRootTypes['User'];
        userId: string;
    };
    Mutation: {
        answerQuestion: NexusGenRootTypes['UsersAnswerToQuestion'];
        createExperience: NexusGenRootTypes['Experience'];
        createMonument: NexusGenRootTypes['Monument'];
        deleteExperience: boolean;
        deleteMonument: boolean;
        likeExperience: NexusGenRootTypes['ExperienceLike'];
        likeMonument: NexusGenRootTypes['MonumentLike'];
    };
    PlaceDetail: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        name: string;
    };
    Query: {
        createAccount: NexusGenRootTypes['Account'];
        getAccount: NexusGenRootTypes['Account'];
        getExperience: NexusGenRootTypes['Experience'];
        getListOfExperiences: NexusGenRootTypes['Experience'][];
        getListOfMonuments: NexusGenRootTypes['Monument'][];
        getMonument: NexusGenRootTypes['Monument'];
        getUser: NexusGenRootTypes['User'];
        getUsers: NexusGenRootTypes['User'][];
        logInViaEmail: NexusGenRootTypes['EmailLogin'];
        logout: boolean;
        updateProfilePicture: NexusGenRootTypes['Account'];
    };
    Question: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        correctAnswer: NexusGenScalars['StringOrNumber'];
        pickingAnswers: string[] | null;
        question: string;
        type: NexusGenScalars['AnswerType'];
    };
    User: {
        _collectionId: string;
        _createdAt: string;
        _databaseId: string;
        _id: string;
        _permissions: string[];
        _updatedAt: string;
        experiences: NexusGenRootTypes['Experience'][];
        monuments: NexusGenRootTypes['Monument'][];
        myId: string;
        profilePictureURL: NexusGenScalars['URL'];
        userId: string;
        username: string;
    };
    UsersAnswerToQuestion: {
        answeredCorrectly: boolean;
    };
    UsersPreferences: {
        mapRange: number;
        termsAccepted: boolean;
    };
}
export interface NexusGenFieldTypeNames {
    Account: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _documentId: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        emailVerification: 'Boolean';
        myId: 'String';
        phoneVerification: 'Boolean';
        prefs: 'UsersPreferences';
        profilePictureURL: 'URL';
        status: 'Boolean';
        userId: 'String';
        username: 'String';
    };
    EmailLogin: {
        session: 'String';
    };
    Experience: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _id: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        connectedMonument: 'Monument';
        connectedMonumentId: 'String';
        liked: 'ExperienceLike';
        likes: 'ExperienceLike';
        location: 'Location';
        pictureUrl: 'URL';
        user: 'User';
        userId: 'String';
    };
    ExperienceLike: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _id: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        experienceId: 'String';
        user: 'User';
        userId: 'String';
    };
    Monument: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _id: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        about: 'String';
        connectedExperiences: 'Experience';
        liked: 'MonumentLike';
        likes: 'MonumentLike';
        location: 'Location';
        name: 'String';
        nearExperiences: 'Experience';
        pictureURL: 'URL';
        placeDetail: 'PlaceDetail';
        placeDetailId: 'String';
        question: 'Question';
        questionId: 'String';
        topics: 'Topic';
        transports: 'Transport';
        user: 'User';
        userId: 'String';
        usersAnswerToQuestion: 'UsersAnswerToQuestion';
    };
    MonumentLike: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _id: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        monumentId: 'String';
        user: 'User';
        userId: 'String';
    };
    Mutation: {
        answerQuestion: 'UsersAnswerToQuestion';
        createExperience: 'Experience';
        createMonument: 'Monument';
        deleteExperience: 'Boolean';
        deleteMonument: 'Boolean';
        likeExperience: 'ExperienceLike';
        likeMonument: 'MonumentLike';
    };
    PlaceDetail: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _id: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        name: 'String';
    };
    Query: {
        createAccount: 'Account';
        getAccount: 'Account';
        getExperience: 'Experience';
        getListOfExperiences: 'Experience';
        getListOfMonuments: 'Monument';
        getMonument: 'Monument';
        getUser: 'User';
        getUsers: 'User';
        logInViaEmail: 'EmailLogin';
        logout: 'Boolean';
        updateProfilePicture: 'Account';
    };
    Question: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _id: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        correctAnswer: 'StringOrNumber';
        pickingAnswers: 'String';
        question: 'String';
        type: 'AnswerType';
    };
    User: {
        _collectionId: 'String';
        _createdAt: 'String';
        _databaseId: 'String';
        _id: 'String';
        _permissions: 'String';
        _updatedAt: 'String';
        experiences: 'Experience';
        monuments: 'Monument';
        myId: 'String';
        profilePictureURL: 'URL';
        userId: 'String';
        username: 'String';
    };
    UsersAnswerToQuestion: {
        answeredCorrectly: 'Boolean';
    };
    UsersPreferences: {
        mapRange: 'Int';
        termsAccepted: 'Boolean';
    };
}
export interface NexusGenArgTypes {
    Mutation: {
        answerQuestion: {
            answer: NexusGenScalars['StringOrNumber'];
            monumentId: string;
        };
        createExperience: {
            input: NexusGenInputs['CreateExperienceInput'];
        };
        createMonument: {
            input: NexusGenInputs['CreateMonumentInput'];
        };
        deleteExperience: {
            experienceId: string;
        };
        deleteMonument: {
            monumentId: string;
        };
        likeExperience: {
            experienceId: string;
        };
        likeMonument: {
            monumentId: string;
        };
    };
    Query: {
        createAccount: {
            myId: string;
            username: string;
        };
        getExperience: {
            id: string;
        };
        getListOfExperiences: {
            location?: NexusGenInputs['LocationInput'] | null;
        };
        getListOfMonuments: {
            limit: number | null;
            location?: NexusGenInputs['LocationInput'] | null;
            name?: string | null;
            offset?: number | null;
            topics?: NexusGenScalars['Topic'][] | null;
            transports?: NexusGenScalars['Transport'][] | null;
            userId?: string | null;
        };
        getMonument: {
            id: string;
        };
        getUser: {
            myId?: string | null;
            userId?: string | null;
        };
        getUsers: {
            searchingText?: string | null;
        };
        logInViaEmail: {
            email: string;
            password: string;
        };
        updateProfilePicture: {
            picture: string;
        };
    };
}
export interface NexusGenAbstractTypeMembers {
}
export interface NexusGenTypeInterfaces {
}
export type NexusGenObjectNames = keyof NexusGenObjects;
export type NexusGenInputNames = keyof NexusGenInputs;
export type NexusGenEnumNames = never;
export type NexusGenInterfaceNames = never;
export type NexusGenScalarNames = keyof NexusGenScalars;
export type NexusGenUnionNames = never;
export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;
export type NexusGenAbstractsUsingStrategyResolveType = never;
export type NexusGenFeaturesConfig = {
    abstractTypeStrategies: {
        isTypeOf: false;
        resolveType: true;
        __typename: false;
    };
};
export interface NexusGenTypes {
    context: Context;
    inputTypes: NexusGenInputs;
    rootTypes: NexusGenRootTypes;
    inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
    argTypes: NexusGenArgTypes;
    fieldTypes: NexusGenFieldTypes;
    fieldTypeNames: NexusGenFieldTypeNames;
    allTypes: NexusGenAllTypes;
    typeInterfaces: NexusGenTypeInterfaces;
    objectNames: NexusGenObjectNames;
    inputNames: NexusGenInputNames;
    enumNames: NexusGenEnumNames;
    interfaceNames: NexusGenInterfaceNames;
    scalarNames: NexusGenScalarNames;
    unionNames: NexusGenUnionNames;
    allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
    allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
    allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes'];
    abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
    abstractTypeMembers: NexusGenAbstractTypeMembers;
    objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
    abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
    features: NexusGenFeaturesConfig;
}
declare global {
    interface NexusGenPluginTypeConfig<TypeName extends string> {
    }
    interface NexusGenPluginInputTypeConfig<TypeName extends string> {
    }
    interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    }
    interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    }
    interface NexusGenPluginSchemaConfig {
    }
    interface NexusGenPluginArgConfig {
    }
}
//# sourceMappingURL=nexus-typegen.d.ts.map