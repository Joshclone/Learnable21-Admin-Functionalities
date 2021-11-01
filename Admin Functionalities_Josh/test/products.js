//During the test the env variable is set to test
//Product refers to Books
//Product means Books in the library
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe("library", () => {
  // Consts
  const id = "3",
    numlibrary = 5,
    successCode = 200,
    product = {
      name: "hello",
      description: "Express",
      price: "1170",
    },
    testName = "Pro Nodejs",
    testPrice = { title: "hello", price: "778" };

  /*
   * Test for /GET
  The User should be able to request for a book
   */
  describe("/GET product", () => {
    it("it should GET all the library", (done) => {
      chai
        .request(server)
        .get("/api/library")
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(numlibrary);
          done();
        });
    });
  });

  describe("/POST product", () => {
    it("it should POST a product ", (done) => {
      chai
        .request(server)
        .post("/api/library")
        .send(product)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("description");
          res.body.should.have.property("price");
          res.body.should.have.property("id");
          done();
        });
    });
  });
  /*
   * Test for /GET:id
   */
  describe("/GET/:id product", () => {
    it("it should GET a book by the given id", (done) => {
      chai
        .request(server)
        .get(`/api/library/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          res.body.should.have.property("description");
          res.body.should.have.property("price");
          res.body.should.have.property("name").eql(testName);
          done();
        });
    });
  });
  /*
   * Test for /PUT:id
   * The admin modifies the book(poduct) in the library
   * (when the  user returns the borrowed book)
   */
  describe("/PUT/:id product", () => {
    it("it should UPDATE a product given the id", (done) => {
      chai
        .request(server)
        .put(`/api/library/${id}`)
        .send(testPrice)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          res.body.should.have.property("name").eql(testName);
          res.body.should.have.property("description");
          res.body.should.have.property("price").eql(testPrice.price);
          done();
        });
    });
  });
  /*
   * Test for /DELETE:id
   */
  describe("/DELETE/:id product", () => {
    it("it should DELETE a product given the id", (done) => {
      chai
        .request(server)
        .delete(`/api/library/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql(`Product ${id} removed`);
          done();
        });
    });
  });
});
