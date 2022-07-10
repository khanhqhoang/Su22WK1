const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler

  const searchedItem = itemData.getById(req.params.id);
  if (searchedItem)
  {
    res.json(searchedItem);
  }
  else
  {
    res.status(404).send({ error: 'Item not found!' });
  }
  
});

router.post("/", (req, res, next) => {
  if(req.body.field){
    itemData.create(req.body);
    res.sendStatus(200);
  }
  else
  {
    res.status(300).send({ Error: 'Field value can not be blank!' });
  }
 
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  const searchedItem = itemData.getById(req.params.id);
  if (searchedItem)
  {
    
    console.log(req.body.field);
    if (!req.body.field){
      
      res.status(300).send({ Error: 'Field value can not be blank!' });
    }
    else
    {
      const updated = itemData.updateById(req.params.id, req.body)
      res.json(updated);
    }
    
  }
  else
  {
    res.status(200).send({ Text: 'Item not found!' });
  }
});

router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  const item = itemData.getById(req.params.id);
  if (item)
  {
    const deleted = itemData.deleteById(item.id)
    if (deleted)
    {
      
      res.json(deleted);
    }
  }
  else
    res.status(301).send({ error: 'Item was not found therefore not deleted!' });
});

module.exports = router;
