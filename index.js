module.exports = {
  nodes: [
    require('./dist/nodes/TencentCloudOCRGeneral/TencentCloudOCRGeneral.node.js'),
  ],
  credentials: [
    require('./dist/credentials/TencentCloudOCRGeneral.credentials.js'),
  ],
};
