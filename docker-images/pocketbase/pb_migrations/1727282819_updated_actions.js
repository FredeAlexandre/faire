/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5rknpe4q6lt5l2c")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5rknpe4q6lt5l2c")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
