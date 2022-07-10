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
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  const searchedItem = itemData.getById(req.params.id);
  if (searchedItem)
  {
    res.json(itemData.updateById(req.params.id, req.body));
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
      //res.status(200).send({ text: 'Item has been deleted successfully!' });
      res.json(deleted);
    }
  }
  else
    res.status(301).send({ error: 'Item was not deleted!' });
});

module.exports = router;
