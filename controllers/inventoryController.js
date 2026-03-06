const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.index = async (req,res)=>{
  const categories = await db.getCategories();
  res.render("index",{categories});
};

exports.categoryView = async (req,res)=>{
  const items = await db.getItemsByCategory(req.params.id);
  res.render("category",{items});
};

exports.itemView = async (req,res)=>{
  const item = await db.getItem(req.params.id);
  res.render("item",{item});
};

exports.newItemForm = async (req,res)=>{
  const categories = await db.getCategories();
  res.render("itemForm",{categories,errors:[]});
};

exports.createItem = [
  body("name").trim().notEmpty(),
  body("price").isNumeric(),

  async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      const categories = await db.getCategories();
      return res.render("itemForm",{categories,errors:errors.array()});
    }

    await db.addItem(
      req.body.name,
      req.body.price,
      req.body.category
    );

    res.redirect("/");
  }
];

exports.deleteItem = async (req,res)=>{
  await db.deleteItem(req.params.id);
  res.redirect("/");
};

exports.newCategoryForm = (req,res)=>{
  res.render("categoryForm",{errors:[]});
};

exports.createCategory = [
  body("name").trim().notEmpty(),

  async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.render("categoryForm",{errors:errors.array()});
    }

    await db.addCategory(req.body.name);
    res.redirect("/");
  }
];