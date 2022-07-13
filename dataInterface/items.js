const uuid = require('uuid');

module.exports = {};

module.exports.movies = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.movies;
}

module.exports.getById = (itemId) => {
  // TODO: complete writing this function
  //find item using find function by id
  return module.exports.movies.find(item =>item.id == itemId);
}

module.exports.deleteById = async (itemId) => {
    // TODO: complete writing this function
    //find index of an item using findIndex by item.id
    const index = module.exports.movies.findIndex(item =>item.id == itemId);
    //use splice function to remove item from an array
    return module.exports.movies.splice(index,1);   
}

module.exports.updateById = async (itemId, newObj) => {
    // TODO: complete writing this function
    //make sure field value is not blank
    if (newObj.field != ''){
      const index = module.exports.movies.findIndex(item =>item.id == itemId);
      let updateItem = module.exports.movies[index];
      updateItem.field = newObj.field;
      return updateItem;
    }
    else
    {
      return;
    }
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.movies.push(newItem);
  return newItem;
}