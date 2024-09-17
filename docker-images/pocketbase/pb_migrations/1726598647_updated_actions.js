/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5rknpe4q6lt5l2c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "beornpvr",
    "name": "title",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "czdirv6a",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5rknpe4q6lt5l2c")

  // remove
  collection.schema.removeField("beornpvr")

  // remove
  collection.schema.removeField("czdirv6a")

  return dao.saveCollection(collection)
})
