const request = require("request");
const Brand = require("../services/db services/brands");
const Product = require("../services/db services/products");
const faker = require("faker");
var brands = [
  {
    name: "Nike",
    image:
      "data:image/jpeg;base64,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"
  },
  {
    name: "Adidas",
    image: "http://pngimg.com/uploads/adidas/adidas_PNG14.png"
  },
  {
    name: "Tommy Hilfiger",
    image:
      "https://img.favpng.com/6/7/1/tommy-hilfiger-fashion-pvh-logo-clothing-png-favpng-f026Gsu3CfUs0LjPPq2C2jXUC.jpg"
  },
  {
    name: "Under Armour",
    image:
      "https://banner2.cleanpng.com/20180529/lfs/kisspng-under-armour-logo-clothing-sportswear-5b0d400ec348e6.4838299415275950227999.jpg"
  },
  {
    name: "Michael Kors",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Michael_Kors_%28brand%29_logo.svg/603px-Michael_Kors_%28brand%29_logo.svg.png"
  },
  {
    name: "Calvin Klein",
    image:
      "https://img.favpng.com/2/4/24/calvin-klein-logo-ck-be-brand-clothing-png-favpng-uDqK4J4kEd7r18r3Ti85W6k8z.jpg"
  },
  {
    name: "Ralph Lauren",
    image:
      "https://banner2.cleanpng.com/20180526/hpr/kisspng-t-shirt-ralph-lauren-corporation-polo-shirt-iron-o-5b09e6f2d0ce54.9246475115273756028553.jpg"
  },
  {
    name: "Abercrombie and Fitch",
    image:
      "https://toppng.com/uploads/preview/abercrombie-and-fitch-eps-vector-logo-free-download-11573991710tzqxcwz5rk.png"
  },
  {
    name: "Armani",
    image:
      "https://banner2.cleanpng.com/20180529/lwu/kisspng-armani-calvin-klein-logo-fashion-designer-5b0d71053afc25.3895305315276075572416.jpg"
  },
  {
    name: "Bershka",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bershka_logo.svg/1280px-Bershka_logo.svg.png"
  },
  {
    name: "Hollister",
    image: "https://pngimage.net/wp-content/uploads/2018/06/hollister-png.png"
  },
  {
    name: "Lacoste",
    image:
      "https://banner2.cleanpng.com/20180612/cau/kisspng-lacoste-brand-fifth-avenue-logo-lacoste-logo-5b1feec65e9f23.7064223515288193983876.jpg"
  },
  {
    name: "New Balance",
    image: "http://pluspng.com/img-png/new-balance-png-new-balance-480.png"
  }
];

var genders = ["Men", "Women"];

var categories = {
  men: [
    "Footwear",
    "Jeans & Trousers",
    "Jewelery & Watches",
    "Knitwear & Sweats",
    "Outerwear",
    "Shorts",
    "Suits",
    "Swimwear",
    "Tops"
  ],
  women: [
    "Dresses",
    "Footwear",
    "Jeans & Trousers",
    "Jewelery & Watches",
    "Knitwear & Sweats",
    "Outerwear",
    "Skirts",
    "Shorts",
    "Suits",
    "Swimwear",
    "Tops"
  ]
};

var sizes = ["XS", "S", "M", "L", "XL", "XXL"];

var tags = [
  "Festival",
  "Holidays",
  "Wedding",
  "Chic",
  "Fashion",
  "Sport-Chic",
  "Workwear",
  "Trending",
  "Going Out",
  "Sports",
  "Classy",
  "Street Style",
  "Luxury"
];

var colors = [
  "Pink",
  "LightPink",
  "HotPink",
  "DeepPink",
  "PaleVioletRed",
  "MediumVioletRed",
  "LightSalmon",
  "Salmon",
  "DarkSalmon",
  "LightCoral",
  "IndianRed",
  "Crimson",
  "Firebrick",
  "DarkRed",
  "Red",
  "OrangeRed",
  "Tomato",
  "Coral",
  "DarkOrange",
  "Orange",
  "Yellow",
  "LightYellow",
  "LemonChiffon",
  "LightGoldenrodYellow ",
  "PapayaWhip",
  "Moccasin",
  "PeachPuff",
  "PaleGoldenrod",
  "Khaki",
  "DarkKhaki",
  "Gold",
  "Cornsilk",
  "BlanchedAlmond",
  "Bisque",
  "NavajoWhite",
  "Wheat",
  "Burlywood",
  "Tan",
  "RosyBrown",
  "SandyBrown",
  "Goldenrod",
  "DarkGoldenrod",
  "Peru",
  "Chocolate",
  "SaddleBrown",
  "Sienna",
  "Brown",
  "Maroon",
  "DarkOliveGreen",
  "Olive",
  "OliveDrab",
  "YellowGreen",
  "LimeGreen",
  "Lime",
  "LawnGreen",
  "Chartreuse",
  "GreenYellow",
  "SpringGreen",
  "MediumSpringGreen ",
  "LightGreen",
  "PaleGreen",
  "DarkSeaGreen",
  "MediumAquamarine",
  "MediumSeaGreen",
  "SeaGreen",
  "ForestGreen",
  "Green",
  "DarkGreen",
  "Aqua",
  "Cyan",
  "LightCyan",
  "PaleTurquoise",
  "Aquamarine",
  "Turquoise",
  "MediumTurquoise",
  "DarkTurquoise",
  "LightSeaGreen",
  "CadetBlue",
  "DarkCyan",
  "Teal",
  "LightSteelBlue",
  "PowderBlue",
  "LightBlue",
  "SkyBlue",
  "LightSkyBlue",
  "DeepSkyBlue",
  "DodgerBlue",
  "CornflowerBlue",
  "SteelBlue",
  "RoyalBlue",
  "Blue",
  "MediumBlue",
  "DarkBlue",
  "Navy",
  "MidnightBlue",
  "Lavender",
  "Thistle",
  "Plum",
  "Violet",
  "Orchid",
  "Fuchsia",
  "Magenta",
  "MediumOrchid",
  "MediumPurple",
  "BlueViolet",
  "DarkViolet",
  "DarkOrchid",
  "DarkMagenta",
  "Purple",
  "Indigo",
  "DarkSlateBlue",
  "SlateBlue",
  "MediumSlateBlue ",
  "White",
  "Snow",
  "Honeydew",
  "MintCream",
  "Azure",
  "AliceBlue",
  "GhostWhite",
  "WhiteSmoke",
  "Seashell",
  "Beige",
  "OldLace",
  "FloralWhite",
  "Ivory",
  "AntiqueWhite",
  "Linen",
  "LavenderBlush",
  "MistyRose",
  "Gainsboro",
  "LightGray",
  "Silver",
  "DarkGray",
  "Gray",
  "DimGray",
  "LightSlateGray",
  "SlateGray",
  "DarkSlateGray",
  "Black"
].map(x => x.toLowerCase());

function populateFakeCustomers(num) {
  // Populate fake customers database
  console.log("entering populate users");
  for (let i = 0; i < num; i++) {
    let fakeUser = {
      email: "customer" + i + "@gmail.com",
      password: "password",
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    };
    addUser(fakeUser); // yourservice.addUser(fakeUser)
    console.log("added user" + i);
  }
}

function populateFakeBrands() {
  console.log("entering populate brands");
  for (let i = 0; i < brands.length; i++) {
    let fakeBrand = {
      email:
        brands[i].name.toLocaleLowerCase().replace(/ /g, "") + "@gmail.com",
      password: "password",
      image: brands[i].image,
      name: brands[i].name
    };
    Brand.addBrand(fakeBrand).then(brand => console.log(brand)); // yourservice.addBrand(fakeBrand)
    console.log("added brand " + brands[i].name);
  }
}

function populateFakeProducts() {
  console.log(Brand);
  Brand.getAllBrands().then(brands => {
    // yourservice.getAllBrands
    let memory = "";
    for (let i = 0; i < 30; i++) {
      request("https://source.unsplash.com/1600x900/?product", function(
        error,
        response
      ) {
        // Print the response status code if a response was received
        if (response.request.href !== memory) {
          let maxTags = Math.floor(Math.random() * Math.floor(4)) + 1;
          let tagsArr = [];
          for (let i = 0; i < maxTags; i++) {
            let valueToPush =
              tags[Math.floor(Math.random() * Math.floor(tags.length))];
            if (tagsArr.indexOf(valueToPush) >= 0) {
              i--;
            } else {
              tagsArr.push(valueToPush);
            }
          }
          let maxColors = Math.floor(Math.random() * Math.floor(4)) + 1;
          let colorsArr = [];
          for (let j = 0; j < maxColors; j++) {
            let valueToPush =
              colors[Math.floor(Math.random() * Math.floor(colors.length))];
            if (colorsArr.indexOf(valueToPush) >= 0) {
              i--;
            } else {
              colorsArr.push(valueToPush);
            }
          }
          let availability = [];
          colorsArr.map(elem => {
            let maxSizes = Math.floor(Math.random() * Math.floor(sizes.length));
            let uniqueSizes = [];
            for (let k = 0; k < maxSizes; k++) {
              let valueToPush =
                sizes[Math.floor(Math.random() * Math.floor(sizes.length))];
              if (uniqueSizes.indexOf(valueToPush) >= 0) {
                i--;
              } else {
                uniqueSizes.push(valueToPush);
              }
            }
            uniqueSizes.forEach(specificSize => {
              console.log(1);
              availability.push({
                color: elem,
                size: specificSize,
                quantity: Math.floor(Math.random() * Math.floor(45)) + 5
              });
            });
          });
          console.log(2, availability);
          let genIndx = Math.floor(Math.random() * Math.floor(genders.length));
          let fakeProduct = {
            title: faker.commerce.productName(),
            description: faker.lorem.sentence(20),
            price: parseInt(faker.commerce.price()),
            brand:
              brands[Math.floor(Math.random() * Math.floor(brands.length))]._id,
            gender: genders[genIndx],
            category:
              categories[genders[genIndx].toLowerCase()][
                Math.floor(
                  Math.random() *
                    Math.floor(
                      categories[genders[genIndx].toLowerCase()].length
                    )
                )
              ],
            tags: tagsArr,
            availability: availability,
            images: [response.request.href]
          };
          console.log(3);

          Product.addProduct(fakeProduct); // yourService.addProduct(fakeProduct)
          memory = response.request.href;
        }
        console.log("added product");
      });
    }
  });
  //       .then(img => {
  //         if (response.request.href !== memory) {
  //           let maxTags = Math.floor(Math.random() * Math.floor(4)) + 1;
  //           let tagsArr = [];
  //           for (let i = 0; i < maxTags; i++) {
  //             let valueToPush =
  //               tags[Math.floor(Math.random() * Math.floor(tags.length))];
  //             if (tagsArr.indexOf(valueToPush) >= 0) {
  //               i--;
  //             } else {
  //               tagsArr.push(valueToPush);
  //             }
  //           }
  //           let maxColors = Math.floor(Math.random() * Math.floor(4)) + 1;
  //           let colorsArr = [];
  //           for (let j = 0; j < maxColors; j++) {
  //             let valueToPush =
  //               colors[Math.floor(Math.random() * Math.floor(colors.length))];
  //             if (colorsArr.indexOf(valueToPush) >= 0) {
  //               i--;
  //             } else {
  //               colorsArr.push(valueToPush);
  //             }
  //           }
  //           let availability = [];
  //           colorsArr.map(elem => {
  //             let maxSizes = Math.floor(Math.random() * Math.floor(sizes.length));
  //             let uniqueSizes = [];
  //             for (let k = 0; k < maxSizes; k++) {
  //               let valueToPush =
  //                 sizes[Math.floor(Math.random() * Math.floor(sizes.length))];
  //               if (uniqueSizes.indexOf(valueToPush) >= 0) {
  //                 i--;
  //               } else {
  //                 uniqueSizes.push(valueToPush);
  //               }
  //             }
  //             uniqueSizes.forEach(specificSize => {
  //               availability.push({
  //                 color: elem,
  //                 size: specificSize,
  //                 quantity: Math.floor(Math.random() * Math.floor(45)) + 5
  //               });
  //             });
  //           });
  //           let genIndx = Math.floor(Math.random() * Math.floor(gender.length));
  //           let fakeProduct = {
  //             title: faker.commerce.productName(),
  //             description: faker.lorem.sentence(20),
  //             price: parseInt(faker.commerce.price()),
  //             brand:
  //               brands[Math.floor(Math.random() * Math.floor(brands.length))]._id,
  //             gender: genders[genIndx],
  //             category:
  //               categories[genders[genIndx].toLowerCase()][
  //                 Math.floor(
  //                   Math.random() *
  //                     Math.floor(
  //                       categories[genders[genIndx].toLowerCase()].length
  //                     )
  //                 )
  //               ],
  //             tags: tagsArr,
  //             availability: availability,
  //             images: [img.url]
  //           };
  //           Product.addProduct(fakeProduct); // yourService.addProduct(fakeProduct)
  //           memory = img.url;
  //         }
  //       });
  //       console.log("added product");
}

// populateFakeBrands();
// populateFakeProducts();
module.exports.populateFakeBrands = populateFakeBrands;
module.exports.populateFakeProducts = populateFakeProducts;
