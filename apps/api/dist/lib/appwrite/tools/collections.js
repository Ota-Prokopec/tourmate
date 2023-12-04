"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsAdmin = exports.collectionsClient = void 0;
const collectionsClient = (Collection) => {
    return {
        userInfo: new Collection('experiences', 'userInfo'),
        experience: new Collection('experiences', 'experiences'),
        monument: new Collection('experiences', 'monuments'),
        token: new Collection('experiences', 'tokens'),
        placeDetail: new Collection('experiences', 'placeDetails'),
        monumentLike: new Collection('experiences', 'monument-likes'),
        experienceLike: new Collection('experiences', 'experience-likes'),
        answerTypeText: new Collection('experiences', 'textAnswers'),
        answerTypeNumber: new Collection('experiences', 'numberAnswers'),
        answerTypeRadio: new Collection('experiences', 'radioAnswers'),
        question: new Collection('experiences', 'question'),
        usersAnswer: new Collection('experiences', 'usersAnswers'),
    };
};
exports.collectionsClient = collectionsClient;
const collectionsAdmin = (Collection) => {
    return {
        userInfo: new Collection('experiences', 'userInfo'),
        experience: new Collection('experiences', 'experiences'),
        monument: new Collection('experiences', 'monuments'),
        token: new Collection('experiences', 'tokens'),
        placeDetail: new Collection('experiences', 'placeDetails'),
        monumentLike: new Collection('experiences', 'monument-likes'),
        experienceLike: new Collection('experiences', 'experience-likes'),
        answerTypeText: new Collection('experiences', 'textAnswers'),
        answerTypeNumber: new Collection('experiences', 'numberAnswers'),
        answerTypeRadio: new Collection('experiences', 'radioAnswers'),
        question: new Collection('experiences', 'question'),
        usersAnswer: new Collection('experiences', 'usersAnswers'),
    };
};
exports.collectionsAdmin = collectionsAdmin;
