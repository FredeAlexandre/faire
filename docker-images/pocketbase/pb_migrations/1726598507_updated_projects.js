/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fz0wc96490di4d7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "473gnomn",
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
  const collection = dao.findCollectionByNameOrId("fz0wc96490di4d7")

  // remove
  collection.schema.removeField("473gnomn")

  return dao.saveCollection(collection)
})
