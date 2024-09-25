/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0p1tb4ucdt0kokl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ppqdcqhj",
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
  const collection = dao.findCollectionByNameOrId("0p1tb4ucdt0kokl")

  // remove
  collection.schema.removeField("ppqdcqhj")

  return dao.saveCollection(collection)
})
