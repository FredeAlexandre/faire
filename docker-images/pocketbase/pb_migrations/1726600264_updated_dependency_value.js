/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4rn0eacijcmof8y")

  collection.name = "dependencies_values"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4rn0eacijcmof8y")

  collection.name = "dependency_value"

  return dao.saveCollection(collection)
})
