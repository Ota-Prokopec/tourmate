/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    answerType<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "AnswerType";
    colorTheme<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "ColorTheme";
    language<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Language";
    location<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Location";
    stringOrNumber<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "StringOrNumber";
    topic<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Topic";
    transport<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Transport";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "URL";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    answerType<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "AnswerType";
    colorTheme<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "ColorTheme";
    language<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Language";
    location<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Location";
    stringOrNumber<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "StringOrNumber";
    topic<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Topic";
    transport<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Transport";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "URL";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateAccountInput: { // input type
    myId: string; // String!
    username: string; // String!
  }
  CreateExperienceInput: { // input type
    connnectedMonumentId: string; // String!
    location: NexusGenScalars['Location']; // Location!
    picture: string; // String!
  }
  CreateMonumentInput: { // input type
    about: string; // String!
    location: NexusGenScalars['Location']; // Location!
    name: string; // String!
    picture: string; // String!
    placeName: string; // String!
    question?: NexusGenInputs['QuestionInput'] | null; // QuestionInput
    topics: NexusGenScalars['Topic'][]; // [Topic!]!
    transports: NexusGenScalars['Transport'][]; // [Transport!]!
  }
  LocationInput: { // input type
    location: NexusGenScalars['Location']; // Location!
    rangeMeters: number | null; // Float
  }
  MonumentInputByName: { // input type
    limit: number; // Int!
    name: string; // String!
  }
  QuestionInput: { // input type
    correctAnswer: NexusGenScalars['StringOrNumber']; // StringOrNumber!
    pickingAnswers?: string[] | null; // [String!]
    question: string; // String!
    type: NexusGenScalars['AnswerType']; // AnswerType!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  AnswerType: 'radio' | 'text' | 'number'
  ColorTheme: "dark" | "light"
  Language: "en" | "cs"
  Location: [number, number]
  StringOrNumber: string | number
  Topic: "castle" | "monument" | "person" | "animals" | "hiking"
  Transport: "train" | "bus" | "car" | "walk" | "bike"
  URL: URL
}

export interface NexusGenObjects {
  Account: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _documentId: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    emailVerification: boolean; // Boolean!
    myId: string; // String!
    phoneVerification: boolean; // Boolean!
    prefs: NexusGenRootTypes['UsersPreferences']; // UsersPreferences!
    profilePictureURL: NexusGenScalars['URL']; // URL!
    status: boolean; // Boolean!
    userId: string; // String!
    username: string; // String!
  }
  EmailLogin: { // root type
    session: string; // String!
  }
  Experience: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    connectedMonumentId: string; // String!
    location: NexusGenScalars['Location']; // Location!
    pictureUrl: NexusGenScalars['URL']; // URL!
    userId: string; // String!
  }
  ExperienceLike: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    experienceId: string; // String!
    userId: string; // String!
  }
  Monument: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    about?: string | null; // String
    location: NexusGenScalars['Location']; // Location!
    name: string; // String!
    pictureURL: NexusGenScalars['URL']; // URL!
    placeDetailId: string; // String!
    questionId?: string | null; // String
    topics: NexusGenScalars['Topic'][]; // [Topic!]!
    transports: NexusGenScalars['Transport'][]; // [Transport!]!
    userId: string; // String!
  }
  MonumentLike: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    monumentId: string; // String!
    userId: string; // String!
  }
  Mutation: {};
  PlaceDetail: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    name: string; // String!
  }
  Query: {};
  Question: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    correctAnswer?: NexusGenScalars['StringOrNumber'] | null; // StringOrNumber
    pickingAnswers?: string[] | null; // [String!]
    question: string; // String!
    type: NexusGenScalars['AnswerType']; // AnswerType!
  }
  User: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    myId: string; // String!
    profilePictureURL: NexusGenScalars['URL']; // URL!
    userId: string; // String!
    username: string; // String!
  }
  UsersAnswerToQuestion: { // root type
    answeredCorrectly: boolean; // Boolean!
  }
  UsersPreferences: { // root type
    colorTheme: NexusGenScalars['ColorTheme']; // ColorTheme!
    language: NexusGenScalars['Language']; // Language!
    mapRange: number; // Int!
    termsAccepted: boolean; // Boolean!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Account: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _documentId: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    emailVerification: boolean; // Boolean!
    myId: string; // String!
    phoneVerification: boolean; // Boolean!
    prefs: NexusGenRootTypes['UsersPreferences']; // UsersPreferences!
    profilePictureURL: NexusGenScalars['URL']; // URL!
    secondsFromUserCreatedToNow: number; // Float!
    status: boolean; // Boolean!
    userId: string; // String!
    username: string; // String!
  }
  EmailLogin: { // field return type
    session: string; // String!
  }
  Experience: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    connectedMonument: NexusGenRootTypes['Monument'] | null; // Monument
    connectedMonumentId: string; // String!
    liked: NexusGenRootTypes['ExperienceLike'] | null; // ExperienceLike
    likes: NexusGenRootTypes['ExperienceLike'][]; // [ExperienceLike!]!
    location: NexusGenScalars['Location']; // Location!
    pictureUrl: NexusGenScalars['URL']; // URL!
    totalLikesCount: number; // Int!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  ExperienceLike: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    experienceId: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  Monument: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    about: string | null; // String
    connectedExperiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    liked: NexusGenRootTypes['MonumentLike'] | null; // MonumentLike
    likes: NexusGenRootTypes['MonumentLike'][]; // [MonumentLike!]!
    location: NexusGenScalars['Location']; // Location!
    name: string; // String!
    nearExperiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    pictureURL: NexusGenScalars['URL']; // URL!
    placeDetail: NexusGenRootTypes['PlaceDetail']; // PlaceDetail!
    placeDetailId: string; // String!
    question: NexusGenRootTypes['Question'] | null; // Question
    questionId: string | null; // String
    topics: NexusGenScalars['Topic'][]; // [Topic!]!
    totalLikesCount: number; // Int!
    transports: NexusGenScalars['Transport'][]; // [Transport!]!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
    usersAnswerToQuestion: NexusGenRootTypes['UsersAnswerToQuestion'] | null; // UsersAnswerToQuestion
    usersConnectedExperiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
  }
  MonumentLike: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    monument: NexusGenRootTypes['Monument']; // Monument!
    monumentId: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  Mutation: { // field return type
    answerQuestion: NexusGenRootTypes['UsersAnswerToQuestion']; // UsersAnswerToQuestion!
    createExperience: NexusGenRootTypes['Experience']; // Experience!
    createMonument: NexusGenRootTypes['Monument']; // Monument!
    deleteExperience: boolean; // Boolean!
    deleteMonument: boolean; // Boolean!
    likeExperience: NexusGenRootTypes['ExperienceLike']; // ExperienceLike!
    likeMonument: NexusGenRootTypes['MonumentLike']; // MonumentLike!
  }
  PlaceDetail: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    name: string; // String!
  }
  Query: { // field return type
    createAccount: NexusGenRootTypes['Account']; // Account!
    getAccount: NexusGenRootTypes['Account']; // Account!
    getExperience: NexusGenRootTypes['Experience']; // Experience!
    getListOfExperiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    getListOfMonumentLikeDocuments: NexusGenRootTypes['MonumentLike'][]; // [MonumentLike!]!
    getListOfMonuments: NexusGenRootTypes['Monument'][]; // [Monument!]!
    getListOfUsers: NexusGenRootTypes['User'][]; // [User!]!
    getMonument: NexusGenRootTypes['Monument']; // Monument!
    getUser: NexusGenRootTypes['User']; // User!
    logInViaEmail: NexusGenRootTypes['EmailLogin']; // EmailLogin!
    logout: boolean; // Boolean!
    setSession: boolean; // Boolean!
    updateProfilePicture: NexusGenRootTypes['Account']; // Account!
  }
  Question: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    correctAnswer: NexusGenScalars['StringOrNumber'] | null; // StringOrNumber
    pickingAnswers: string[] | null; // [String!]
    question: string; // String!
    type: NexusGenScalars['AnswerType']; // AnswerType!
  }
  User: { // field return type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    experiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    monuments: NexusGenRootTypes['Monument'][]; // [Monument!]!
    myId: string; // String!
    profilePictureURL: NexusGenScalars['URL']; // URL!
    userId: string; // String!
    username: string; // String!
  }
  UsersAnswerToQuestion: { // field return type
    answeredCorrectly: boolean; // Boolean!
  }
  UsersPreferences: { // field return type
    colorTheme: NexusGenScalars['ColorTheme']; // ColorTheme!
    language: NexusGenScalars['Language']; // Language!
    mapRange: number; // Int!
    termsAccepted: boolean; // Boolean!
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _documentId: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    emailVerification: 'Boolean'
    myId: 'String'
    phoneVerification: 'Boolean'
    prefs: 'UsersPreferences'
    profilePictureURL: 'URL'
    secondsFromUserCreatedToNow: 'Float'
    status: 'Boolean'
    userId: 'String'
    username: 'String'
  }
  EmailLogin: { // field return type name
    session: 'String'
  }
  Experience: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    connectedMonument: 'Monument'
    connectedMonumentId: 'String'
    liked: 'ExperienceLike'
    likes: 'ExperienceLike'
    location: 'Location'
    pictureUrl: 'URL'
    totalLikesCount: 'Int'
    user: 'User'
    userId: 'String'
  }
  ExperienceLike: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    experienceId: 'String'
    user: 'User'
    userId: 'String'
  }
  Monument: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    about: 'String'
    connectedExperiences: 'Experience'
    liked: 'MonumentLike'
    likes: 'MonumentLike'
    location: 'Location'
    name: 'String'
    nearExperiences: 'Experience'
    pictureURL: 'URL'
    placeDetail: 'PlaceDetail'
    placeDetailId: 'String'
    question: 'Question'
    questionId: 'String'
    topics: 'Topic'
    totalLikesCount: 'Int'
    transports: 'Transport'
    user: 'User'
    userId: 'String'
    usersAnswerToQuestion: 'UsersAnswerToQuestion'
    usersConnectedExperiences: 'Experience'
  }
  MonumentLike: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    monument: 'Monument'
    monumentId: 'String'
    user: 'User'
    userId: 'String'
  }
  Mutation: { // field return type name
    answerQuestion: 'UsersAnswerToQuestion'
    createExperience: 'Experience'
    createMonument: 'Monument'
    deleteExperience: 'Boolean'
    deleteMonument: 'Boolean'
    likeExperience: 'ExperienceLike'
    likeMonument: 'MonumentLike'
  }
  PlaceDetail: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    name: 'String'
  }
  Query: { // field return type name
    createAccount: 'Account'
    getAccount: 'Account'
    getExperience: 'Experience'
    getListOfExperiences: 'Experience'
    getListOfMonumentLikeDocuments: 'MonumentLike'
    getListOfMonuments: 'Monument'
    getListOfUsers: 'User'
    getMonument: 'Monument'
    getUser: 'User'
    logInViaEmail: 'EmailLogin'
    logout: 'Boolean'
    setSession: 'Boolean'
    updateProfilePicture: 'Account'
  }
  Question: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    correctAnswer: 'StringOrNumber'
    pickingAnswers: 'String'
    question: 'String'
    type: 'AnswerType'
  }
  User: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    experiences: 'Experience'
    monuments: 'Monument'
    myId: 'String'
    profilePictureURL: 'URL'
    userId: 'String'
    username: 'String'
  }
  UsersAnswerToQuestion: { // field return type name
    answeredCorrectly: 'Boolean'
  }
  UsersPreferences: { // field return type name
    colorTheme: 'ColorTheme'
    language: 'Language'
    mapRange: 'Int'
    termsAccepted: 'Boolean'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    answerQuestion: { // args
      answer: NexusGenScalars['StringOrNumber']; // StringOrNumber!
      monumentId: string; // String!
    }
    createExperience: { // args
      input: NexusGenInputs['CreateExperienceInput']; // CreateExperienceInput!
    }
    createMonument: { // args
      input: NexusGenInputs['CreateMonumentInput']; // CreateMonumentInput!
    }
    deleteExperience: { // args
      experienceId: string; // String!
    }
    deleteMonument: { // args
      monumentId: string; // String!
    }
    likeExperience: { // args
      experienceId: string; // String!
    }
    likeMonument: { // args
      monumentId: string; // String!
    }
  }
  Query: {
    createAccount: { // args
      language: NexusGenScalars['Language']; // Language!
      myId: string; // String!
      username: string; // String!
    }
    getExperience: { // args
      id: string; // String!
    }
    getListOfExperiences: { // args
      limit?: number | null; // Int
      location?: NexusGenInputs['LocationInput'] | null; // LocationInput
      offset?: number | null; // Int
      userId?: string | null; // String
    }
    getListOfMonumentLikeDocuments: { // args
      limit: number | null; // Int
      offset?: number | null; // Int
      userId?: string | null; // String
    }
    getListOfMonuments: { // args
      limit: number | null; // Int
      location?: NexusGenInputs['LocationInput'] | null; // LocationInput
      name?: string | null; // String
      offset?: number | null; // Int
      topics?: NexusGenScalars['Topic'][] | null; // [Topic!]
      transports?: NexusGenScalars['Transport'][] | null; // [Transport!]
      userId?: string | null; // String
    }
    getListOfUsers: { // args
      limit: number | null; // Int
      offset?: number | null; // Int
      searchingText?: string | null; // String
    }
    getMonument: { // args
      id: string; // String!
    }
    getUser: { // args
      myId?: string | null; // String
      userId?: string | null; // String
    }
    logInViaEmail: { // args
      email: string; // String!
      password: string; // String!
    }
    setSession: { // args
      session: string; // String!
    }
    updateProfilePicture: { // args
      picture: string; // String!
    }
  }
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
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

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
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
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