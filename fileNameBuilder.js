const { getFile } = require('hoopoe');

getFile('./proj-example.json')
  .then((x) => JSON.parse(x))
  .then((data) => {
    const idsToFiles = data.files.reduce((acc, file) => {
      acc[file.id] = file;
      return acc;
    }, {});
    const childrenIdsToParentsIds = data.files.reduce((acc, file) => {
      file.children.forEach((childId) => {
        acc[childId] = file.id;
      });
      return acc;
    }, {});

    function getName(id) {
      const thisFile = idsToFiles[id];
      const parentid = childrenIdsToParentsIds[id];
      if (!parentid) {
        return '';
      }
      return `${getName(parentid)}/${thisFile.name}`;
    }
    return Object.keys(idsToFiles).reduce((acc, id) => {
      acc[id] = getName(id).slice(1);
      return acc;
    }, {});
  });
