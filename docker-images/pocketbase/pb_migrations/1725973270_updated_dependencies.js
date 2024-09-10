/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d1eb4odpgtzkq4e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5nylj3vf",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d1eb4odpgtzkq4e")

  // remove
  collection.schema.removeField("5nylj3vf")

  return dao.saveCollection(collection)
})
