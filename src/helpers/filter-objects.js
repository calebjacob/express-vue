function accessOjectValue(object, key) {
  if (key.indexOf('.') === -1) {
    return object[key];
  }


  const keys = key.split('.');
  return object[keys[0]][keys[1]];
}



function filterObjects(rawSearchTerm, searchKeys, objects) {
  if (rawSearchTerm) {
    const searchTerm = rawSearchTerm.toLowerCase().trim().replace(/['.-]/g, '');
    const searchTermWords = searchTerm.split(' ');
    const searchTermWordCount = searchTermWords.length;
    const results = [];

    objects.forEach((object) => {
      let contentToSearch = '';
      let matchesSearch = true;
      let i = 0;

      searchKeys.forEach((searchKey) => {
        contentToSearch = `${contentToSearch + accessOjectValue(object, searchKey)} `;
      });

      contentToSearch = contentToSearch.toLowerCase().replace(/['.-]/g, '');

      while (matchesSearch && searchTermWordCount > i) {
        const searchTermWord = searchTermWords[i];

        if (contentToSearch.indexOf(searchTermWord) === -1) {
          matchesSearch = false;
        }

        i++;
      }

      if (matchesSearch) {
        results.push(object);
      }
    });

    return results;
  }


  return objects;
}



export default filterObjects;
