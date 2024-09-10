/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "d1eb4odpgtzkq4e",
    "created": "2024-09-10 13:00:52.585Z",
    "updated": "2024-09-10 13:00:52.585Z",
    "name": "dependencies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rpwjj4gr",
        "name": "name",
        "type": "text",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("d1eb4odpgtzkq4e");

  return dao.deleteCollection(collection);
})
