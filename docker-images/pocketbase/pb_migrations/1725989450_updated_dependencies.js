/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d1eb4odpgtzkq4e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wvmqrhy3",
    "name": "value_type",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vuna310svfmg1jq",
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
  collection.schema.removeField("wvmqrhy3")

  return dao.saveCollection(collection)
})
