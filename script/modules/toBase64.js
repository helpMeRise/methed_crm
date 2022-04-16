
// export const toBase64 = file => new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.addEventListener('loadend', () => {
//     resolve(reader.result);
//   });

//   reader.addEventListener('error', err => {
//     reject(err);
//   });

//   reader.readAsDataURL(file);
// });


// toBase64().then(data => console.log(data));

export const toBase64 = str => btoa(str);
