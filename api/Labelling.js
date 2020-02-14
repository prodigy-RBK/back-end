const productsService = require("../services/db services/products");
const behavoirService = require("../services/db services/userbehavoir");
const express = require("express");
const router = express.Router();

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
function updatebehavoir(objindb, objinres) {
  for (var k in objinres) {
    if (objindb[k] === undefined) {
      objindb[k] = objinres[k];
    } else {
      objindb[k] = parseInt(objinres[k]) + parseInt(objindb[k]);
    }
  }
  return objindb;
}

async function update(data) {
  let pro = await productsService.getAll();
  let result = await lable(data, pro);

  for (var i = 0; i < result.length; i++) {
    try {
      let user = await behavoirService.findBehavoirByuserId(result[i].id);
      if (user === null) {
        try {
          behavoirService.addUserBehavoir(result[i]);
        } catch (err) {
          console.log(err);
        }
      } else {
        var Userb = function(id) {
          this.id = id;
          (this.gender = {}), (this.category = {}), (this.brand = {});
        };
        var userb = new Userb(result[i].id);

        userb.gender = updatebehavoir(user.gender, result[i].gender);
        userb.category = updatebehavoir(user.category, result[i].category);
        userb.brand = updatebehavoir(user.brand, result[i].brand);

        try {
          let update = await behavoirService.updatebehavoir(user._id, userb);
        } catch (err) {
          console.log(err.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports.update = update;
