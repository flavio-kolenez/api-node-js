# API Node.JS & Express 
Projeto utilizado no curso da Alura

```javascript
let promise = new Promise(function (resolve, reject) {
axios.get('https://jsonplaceholder.typicode.com/users')
.then(response => {
resolve(response);
}).catch(err => {
reject(err);
});
});

promise.then(function (response) {
console.log(response);
}).catch(err => {
console.log(err);
});
```