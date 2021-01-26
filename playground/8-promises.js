const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([1, 4, 7]);
        reject('Things went wrong!');
        resolve([1, 4, 7]);
    }, 2000);
});

doWorkPromise.then((result) => {
    console.log('Success!');
    console.log(result);
}).catch((error) => {
    console.log(error);
})