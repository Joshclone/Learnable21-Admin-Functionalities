let library = require("../data/library");

const { writeDataToFile } = require("../utils");

// The admin write,(adds) a total number of copies available for a particular book
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(library);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = library.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id, ...product };
    library.push(newProduct);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/library.json", library);
    }
    resolve(newProduct);
  });
}

//After a book is requested by a user, we would want to decrease the count
// of available books by writing to the databse
function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = library.findIndex((p) => p.id === id);
    library[index] = { id, ...product };
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/library.json", library);
    }
    resolve(library[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    library = library.filter((p) => p.id !== id);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/library.json", library);
    }
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
