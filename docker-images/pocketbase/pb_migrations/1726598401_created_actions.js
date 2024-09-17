/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5rknpe4q6lt5l2c",
    "created": "2024-09-17 18:40:01.077Z",
    "updated": "2024-09-17 18:40:01.077Z",
    "name": "actions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qyozbzdk",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
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
  const collection = dao.findCollectionByNameOrId("5rknpe4q6lt5l2c");

  return dao.deleteCollection(collection);
})
