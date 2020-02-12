var expect = require("chai").expect;
var request = require("request");
const mongoose = require("mongoose");
const User = require("../models/user");

describe("GET /AllProducts", function() {
  it("get all products", function(done) {
    request("http://localhost:3000/api/products/allproducts", function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body)).to.be.an.instanceof(Array);
      done();
    });
  });
});

describe("USER", function() {
  after(async function() {
    await User.deleteOne({ email: "testmocha@test.com" });
  });

  it("Sign Up", function(done) {
    request.post(
      "http://localhost:3000/api/user/signUp",
      {
        json: {
          firstName: "test firstname",
          lastName: "test lastname",
          email: "testmocha@test.com",
          password: "test123456"
        }
      },
      function(error, response, body) {
        console.log(response.body);
        expect(response.statusCode).to.equal(200);
        expect(response.body.status).to.equal("success");

        done();
      }
    );
  });

  it("Sign In", function(done) {
    request.post(
      "http://localhost:3000/api/user/login",
      {
        json: {
          email: "testmocha@test.com",
          password: "test123456"
        }
      },
      async function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(response.body.details).to.own.property("token");
        done();
      }
    );
  });

  it("Sign In", function(done) {
    request.post(
      "http://localhost:3000/api/user/login",
      {
        json: {
          email: "testmocha@test.com",
          password: "falsepassword"
        }
      },
      async function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(response.body.details).to.not.have.own.property("token");

        done();
      }
    );
  });
});
