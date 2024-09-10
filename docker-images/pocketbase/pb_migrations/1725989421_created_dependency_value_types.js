/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vuna310svfmg1jq",
    "created": "2024-09-10 17:30:21.463Z",
    "updated": "2024-09-10 17:30:21.463Z",
    "name": "dependency_value_types",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hcd6j9ch",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "eu54bplu",
        "name": "icon",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vuna310svfmg1jq");

  return dao.deleteCollection(collection);
})
