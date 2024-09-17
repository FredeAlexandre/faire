/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4rn0eacijcmof8y",
    "created": "2024-09-17 18:46:41.055Z",
    "updated": "2024-09-17 18:46:41.055Z",
    "name": "action_dependency_value",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ve87gw8c",
        "name": "value",
        "type": "text",
        "required": false,
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
        "id": "sbkcpjh3",
        "name": "dependency",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "d1eb4odpgtzkq4e",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("4rn0eacijcmof8y");

  return dao.deleteCollection(collection);
})
