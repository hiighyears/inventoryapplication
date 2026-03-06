const express = require("express");
const router = express.Router();

const controller = require("../controllers/inventoryController");

router.get("/",controller.index);

router.get("/category/new",controller.newCategoryForm);
router.post("/category/new",controller.createCategory);

router.get("/category/:id",controller.categoryView);

router.get("/item/new",controller.newItemForm);
router.post("/item/new",controller.createItem);

router.get("/item/:id",controller.itemView);

router.post("/item/:id/delete",controller.deleteItem);

module.exports = router;