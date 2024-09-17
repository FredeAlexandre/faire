/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fz0wc96490di4d7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mlzjqgms",
    "name": "actions",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5rknpe4q6lt5l2c",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fz0wc96490di4d7")

  // remove
  collection.schema.removeField("mlzjqgms")

  return dao.saveCollection(collection)
})
