// Object property shorthand
const name = 'Calista'
const userAge = 20

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

// Object destructuring

const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// var {label:productLabel='Hello', stock, rating = 5} = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);

const transaction = (type, {label, stock=0} = {}) => {
    console.log(type);
    console.log(label);
    console.log(stock);
}

transaction('order');