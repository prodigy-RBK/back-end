const productsService = require("../services/db services/products");
const behavoirService = require("../services/db services/userbehavoir");
const express = require("express");
const router = express.Router();
var data = [
  ["5e42c03fe912cc19c0dfd2c8", "clicked product", "5e43da488bbf4d22e468ba9f", "3"],
  ["5e42c096e912cc19c0dfd36b", "clicked product", "5e43da488bbf4d22e468ba9f", "1"],
  ["5e42c0a6e912cc19c0dfd410", "clicked product", "5e43da488bbf4d22e468ba9f", "1"]
];

function arraytoObj(arrayy) {
  var obj = {};
  for (var i = 0; i < arrayy.length; i++) {
    if (obj[arrayy[i]] === undefined) {
      obj[arrayy[i]] = 1;
    } else {
      obj[arrayy[i]]++;
    }
  }
  return obj;
}
var Userfinal = function(id) {
  this.id = id;
  (this.gender = {}), (this.category = {}), (this.brand = {});
};

var User = function(id) {
  this.id = id;
  (this.gender = []), (this.category = []), (this.brand = []);
};

function lableuser(userid, products, listofprods) {
  var user = new User(userid);
  for (var i = 0; i < products.length; i++) {
    user.gender.push(oneprodkey(products[i], listofprods, "gender"));
    user.category.push(oneprodkey(products[i], listofprods, "category"));
    user.brand.push(oneprodkey(products[i], listofprods, "brand"));
  }
  return user;
}
function lableuser(userid, produc, listofprods) {
  var user = new User(userid);
  for (var i = 0; i < produc.length; i++) {
    user.gender.push(oneprodkey(produc[i], listofprods, "gender"));
    user.category.push(oneprodkey(produc[i], listofprods, "category"));
    user.brand.push(oneprodbrand(produc[i], listofprods));
  }
  return user;
}

function oneprodkey(prodid, prodlist, key) {
  for (var i = 0; i < prodlist.length; i++) {
    if (JSON.stringify(prodlist[i]._id) === JSON.stringify(prodid)) {
      return prodlist[i][key];
    }
  }
}
function oneprodbrand(prodid, prodlist) {
  for (var i = 0; i < prodlist.length; i++) {
    if (JSON.stringify(prodlist[i]._id) === JSON.stringify(prodid)) {
      return prodlist[i]["brand"]["name"];
    }
  }
}
function lable(userprod, prods) {
  var objproduser = {};
  for (var i = 0; i < userprod.length; i++) {
    if (objproduser[userprod[i][2]] === undefined) {
      objproduser[userprod[i][2]] = [];
    }
  }
  for (var key in objproduser) {
    for (var i = 0; i < userprod.length; i++) {
      if (userprod[i][2] === key) {
        objproduser[key].push(userprod[i][0]);
      }
    }
  }

  //console.log(objproduser);
  let products = prods;

  var array = [];
  var farray = [];
  for (var k in objproduser) {
    array.push(lableuser(k, objproduser[k], products));
  }

  for (var s = 0; s < array.length; s++) {
    var userf = new Userfinal(array[s].id);

    userf.gender = arraytoObj(array[s].gender);

    userf.category = arraytoObj(array[s].category);
    userf.brand = arraytoObj(array[s].brand);

    farray.push(userf);
  }
  return farray;
}
router.get("/behavoir", async (req, res) => {
  let pro = await productsService.getAll();
  let result = await lable(data, pro);
  console.log(result);
  for (var i = 0; i < result.length; i++) {
    try {
      behavoirService.addUserBehavoir(result[i]);
    } catch (err) {
      console.log(err);
    }
  }
});
module.exports = router;
