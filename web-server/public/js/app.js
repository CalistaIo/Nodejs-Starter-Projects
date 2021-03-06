console.log('Client side javascript file is loaded!');

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.forecastData);
//         }
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    search.value = '';
    const urlString = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(urlString).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData;
            }
        })
    })
});