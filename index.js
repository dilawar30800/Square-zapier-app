const authentication = require('./authentication');
const batchUpsertCatalogObjectsCreate = require('./creates/batch_upsert_catalog_objects.js');
const uploadFile = require('./creates/uploadFile.js');
module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [batchUpsertCatalogObjectsCreate.key]: batchUpsertCatalogObjectsCreate,
    [uploadFile.key]: uploadFile,
  },
};
