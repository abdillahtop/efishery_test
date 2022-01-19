EFISHERY TEST

## How To Run Service in Local

<br />

### Clone Repository

- Clone the project from github.com

```
https://github.com/abdillahtop/efishery_test
```

- Copy .env.defaults and change to .env
- Run simple command `npm install`
- Now run project `npm start` or `npm run start:dev`
- Check server running in `localhost:9000` with Method GET
- Check also Healt Check in `localhost:9000/health` with Method GET
- Untuk menjalankan Unit Testing `npm run test` or `npm run test:coverage`

<br/>

## Diagram

![ScreenShot](/source/diagram.jpg)
<br/>
Saya membuat dengan database MySql dengan 2 modulem yaitu module *User* & *Storage* , dimana saya membuat table <b>_users_</b>  dan <b>_currecy_converter_</b> serta 

Menggunakan 2 api eksternal yaitu 
* https://stein.efishery.com
* https://free.currconv.com

NB : Untuk penggunaan https://free.currconv.com , berhubung menggunakan free jadi perlu diupdate pada env `` CONVERT_URL `` menggunakan api_key terbaru 
untuk mengupdate nilai mata uang IDR to USD dengan mengganti link berikut :
```
https://free.currconv.com/api/v7/convert?q=IDR_USD,USD_IDR&compact=ultra&apiKey={{YOUR_APIKEY}}
```

<br/>

## API

- Host :
  ```
  https://efishery-abdillah.herokuapp.com
  ```
- Postman Documentation :

  ```
  https://www.getpostman.com/collections/790976956dc7bc86cfe3
  ```
