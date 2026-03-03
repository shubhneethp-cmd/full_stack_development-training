const person = { name: "John", age: 25, city: "New York" };

for (let key in person) {
  console.log(key + " 👉 " + person[key]);
}
const fruits = ["🍎", "🍌", "🍇"];

for (let index in fruits) {
  console.log(index, fruits[index]);
}

const word = "HELLO";

for (let char of word) {
  console.log(char);
}