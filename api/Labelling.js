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

function oneprodkey(prodid, prodlist, key) {
  for (var i = 0; i < prodlist.length; i++) {
    if (prodid === prodlist[i]._id) {
      return prodlist[i][key];
      break;
    }
  }
}
function lable(userprod) {
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

  var array = [];
  var farray = [];
  for (var k in objproduser) {
    array.push(lableuser(k, objproduser[k], listofproducts));
  }

  for (var s = 0; s < array.length; s++) {
    var userf = new Userfinal(array[s].id);

    userf.gender = arraytoObj(array[s].gender);
    userf.age = arraytoObj(array[s].age);
    userf.category = arraytoObj(array[s].category);
    userf.brand = arraytoObj(array[s].brand);

    farray.push(userf);
  }
  return farray;
}
