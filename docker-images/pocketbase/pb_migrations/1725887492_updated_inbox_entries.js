/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("845s6cupej2m4ww")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p2jwf6xh",
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
  const collection = dao.findCollectionByNameOrId("845s6cupej2m4ww")

  // remove
  collection.schema.removeField("p2jwf6xh")

  return dao.saveCollection(collection)
})
