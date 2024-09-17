/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5rknpe4q6lt5l2c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g5qa38nt",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "4rn0eacijcmof8y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5rknpe4q6lt5l2c")

  // remove
  collection.schema.removeField("g5qa38nt")

  return dao.saveCollection(collection)
})
