const productsService = require("../services/db services/products");
const express = require("express");
const router = express.Router();


    function mostviewed(object){
        var array=[]
        for(var key in object){
        let product = await productsService.getOneById(key);
            array.push(product)
        }
        return array
    }

 
    module.exports.mostviewed = mostviewed;
