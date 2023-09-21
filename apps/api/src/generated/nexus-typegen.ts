/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    location<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Location";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "URL";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    location<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Location";
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
    location: NexusGenScalars['Location']; // Location!
    picture: string; // String!
  }
  CreateMonumentInput: { // input type
    about: string; // String!
    location: NexusGenScalars['Location']; // Location!
    name: string; // String!
    picture?: string | null; // String
    placeName: string; // String!
  }
  ExperienceInput: { // input type
    location: NexusGenScalars['Location']; // Location!
    zoom: number; // Int!
  }
  MonumentInput: { // input type
    location: number[]; // [Float!]!
    zoom: number; // Int!
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
  Location: [number, number]
  URL: URL
}

export interface NexusGenObjects {
  Account: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    emailVerification: boolean; // Boolean!
    myId: string; // String!
    phoneVerification: boolean; // Boolean!
    profilePictureURL?: NexusGenScalars['URL'] | null; // URL
    staus: boolean; // Boolean!
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
    imgSrc: NexusGenScalars['URL']; // URL!
    location: NexusGenScalars['Location']; // Location!
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
    creatorUserId: string; // String!
    location: NexusGenScalars['Location']; // Location!
    name: string; // String!
    pictureURL?: NexusGenScalars['URL'] | null; // URL
    placeDetailId: string; // String!
  }
  Mutation: {};
  PlaceDetails: { // root type
    _collectionId: string; // String!
    _createdAt: string; // String!
    _databaseId: string; // String!
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    name: string; // String!
  }
  Query: {};
  UsersPreferences: { // root type
    location?: number[] | null; // [Float!]
    termsAccepted?: boolean | null; // Boolean
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
    _id: string; // String!
    _permissions: string[]; // [String!]!
    _updatedAt: string; // String!
    emailVerification: boolean; // Boolean!
    experiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    monuments: NexusGenRootTypes['Monument'][]; // [Monument!]!
    myId: string; // String!
    phoneVerification: boolean; // Boolean!
    prefs: NexusGenRootTypes['UsersPreferences'] | null; // UsersPreferences
    profilePictureURL: NexusGenScalars['URL'] | null; // URL
    staus: boolean; // Boolean!
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
    imgSrc: NexusGenScalars['URL']; // URL!
    location: NexusGenScalars['Location']; // Location!
    user: NexusGenRootTypes['Account']; // Account!
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
    creator: NexusGenRootTypes['Account']; // Account!
    creatorUserId: string; // String!
    location: NexusGenScalars['Location']; // Location!
    name: string; // String!
    nearExperiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    pictureURL: NexusGenScalars['URL'] | null; // URL
    placeDetailId: string; // String!
    placeDetails: NexusGenRootTypes['PlaceDetails']; // PlaceDetails!
  }
  Mutation: { // field return type
    createExperience: NexusGenRootTypes['Experience']; // Experience!
    createMonument: NexusGenRootTypes['Monument']; // Monument!
  }
  PlaceDetails: { // field return type
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
    getAccountByMyId: NexusGenRootTypes['Account']; // Account!
    getExperience: NexusGenRootTypes['Experience']; // Experience!
    getListOfExperience: NexusGenRootTypes['Experience'][]; // [Experience!]!
    getListOfMonuments: NexusGenRootTypes['Monument'][]; // [Monument!]!
    getMonument: NexusGenRootTypes['Monument']; // Monument!
    logInViaEmail: NexusGenRootTypes['EmailLogin']; // EmailLogin!
    updateProfilePicture: NexusGenRootTypes['Account']; // Account!
  }
  UsersPreferences: { // field return type
    location: number[] | null; // [Float!]
    termsAccepted: boolean | null; // Boolean
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    _collectionId: 'String'
    _createdAt: 'String'
    _databaseId: 'String'
    _id: 'String'
    _permissions: 'String'
    _updatedAt: 'String'
    emailVerification: 'Boolean'
    experiences: 'Experience'
    monuments: 'Monument'
    myId: 'String'
    phoneVerification: 'Boolean'
    prefs: 'UsersPreferences'
    profilePictureURL: 'URL'
    staus: 'Boolean'
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
    imgSrc: 'URL'
    location: 'Location'
    user: 'Account'
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
    creator: 'Account'
    creatorUserId: 'String'
    location: 'Location'
    name: 'String'
    nearExperiences: 'Experience'
    pictureURL: 'URL'
    placeDetailId: 'String'
    placeDetails: 'PlaceDetails'
  }
  Mutation: { // field return type name
    createExperience: 'Experience'
    createMonument: 'Monument'
  }
  PlaceDetails: { // field return type name
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
    getAccountByMyId: 'Account'
    getExperience: 'Experience'
    getListOfExperience: 'Experience'
    getListOfMonuments: 'Monument'
    getMonument: 'Monument'
    logInViaEmail: 'EmailLogin'
    updateProfilePicture: 'Account'
  }
  UsersPreferences: { // field return type name
    location: 'Float'
    termsAccepted: 'Boolean'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createExperience: { // args
      input: NexusGenInputs['CreateExperienceInput']; // CreateExperienceInput!
    }
    createMonument: { // args
      input: NexusGenInputs['CreateMonumentInput']; // CreateMonumentInput!
    }
  }
  Query: {
    createAccount: { // args
      myId: string; // String!
      username: string; // String!
    }
    getAccount: { // args
      userId?: string | null; // String
    }
    getAccountByMyId: { // args
      myId: string; // String!
    }
    getExperience: { // args
      id: string; // String!
    }
    getListOfExperience: { // args
      input?: NexusGenInputs['ExperienceInput'] | null; // ExperienceInput
    }
    getListOfMonuments: { // args
      input?: NexusGenInputs['MonumentInput'] | null; // MonumentInput
    }
    getMonument: { // args
      id: string; // String!
    }
    logInViaEmail: { // args
      email: string; // String!
      password: string; // String!
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