const express=require("express");
const router=express.Router();
const db = require('../data/mysqldbContext');
const verifyToken = require('../services/auth-service');

router.get("/categories", (req, res) => {
    res.render("categories");
});
router.get("/upload", (req, res) => {
    res.render("image-post");
});
router.get("/products/:id", async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product=await db('products').where({id:productId}).first();
console.log(product)
    if (product) {
        res.render("product-details",  {product} );
    } else {
        res.status(404).send("Product not found");
    }
});

router.get("/products",async (req, res) => {
    const products = await db('products')
    res.render("products", { list: products });
});

router.get("/", async (req, res) => {
    const products = await db('products'); // Veritabanından ürünler çekiliyor
    console.log(products[0]); // İlk ürünü logluyoruz (Kontrol amaçlı)
    res.render("index",{ list: products });
 
});
router.get("/productsjson", async (req, res) => {
    const products=await db('products');
    res.send( products );
});


module.exports=router;