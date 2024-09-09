/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "845s6cupej2m4ww",
    "created": "2024-09-09 11:50:24.585Z",
    "updated": "2024-09-09 11:50:24.585Z",
    "name": "inbox_entries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mvr5bxwl",
        "name": "content",
        "type": "editor",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
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
  const collection = dao.findCollectionByNameOrId("845s6cupej2m4ww");

  return dao.deleteCollection(collection);
})
