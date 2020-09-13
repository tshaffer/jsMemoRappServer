"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbInterface_1 = require("./dbInterface");
// tag
/*  POST
    {{URL}}/api/v1/tag
    Body
      {
        "value": "taqueria",
      }
*/
function createTag(request, response, next) {
    console.log('createTag');
    console.log(request.body);
    const { value } = request.body;
    const tagEntity = {
        value,
    };
    dbInterface_1.createTagDocument(tagEntity)
        .then((tagDoc) => {
        const tagDocument = tagDoc;
        console.log('added tagDocument');
        console.log(tagDocument);
        console.log(tagDocument.toObject());
        response.status(201).json({
            success: true,
            data: tagDocument,
        });
    });
}
exports.createTag = createTag;
function createTags(request, response, next) {
    console.log('createTags');
    console.log(request.body);
    const tagEntities = request.body.values.map((tagValue) => {
        const tagEntity = { value: tagValue };
        return tagEntity;
    });
    dbInterface_1.createTagDocuments(tagEntities)
        .then((tagDocs) => {
        const tagDocuments = tagDocs;
        console.log('added tagDocuments');
        console.log(tagDocuments);
        response.status(201).json({
            success: true,
            data: tagDocuments,
        });
    });
}
exports.createTags = createTags;
/*
    GET
    {{URL}}/api/v1/tags
*/
function getTags(request, response, next) {
    return dbInterface_1.getTagsFromDb().then((responseData) => {
        response.json(responseData);
    });
}
exports.getTags = getTags;
//# sourceMappingURL=tag.js.map