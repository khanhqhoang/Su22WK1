const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  // TODO: complete writing this function
  return module.exports.items.find(item =>item.id == itemId);
}

module.exports.deleteById = async (itemId) => {
    // TODO: complete writing this function
    const index = module.exports.items.findIndex(item =>item.id == itemId);
    
    return module.exports.items.splice(index,1);   
}

module.exports.updateById = async (itemId, newObj) => {
    // TODO: complete writing this function
    const index = module.exports.items.findIndex(item =>item.id == itemId);
    let updateItem = module.exports.items[index];
   // console.log(newObj);
    updateItem.field = newObj.field;
    return updateItem;
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}