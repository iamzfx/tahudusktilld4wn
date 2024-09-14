import fetch from "node-fetch";
import fs from "fs";
import open from "open"
import delay from "delay"
import readline from "readline-sync";
import {faker} from "@faker-js/faker";
import { getIdPuzzle, getBase64Puzzle} from "./src/getPuzzle.js";
import {checkRefferal} from "./src/goregis.js"
import {getListEmail, getResultEmail} from "./src/formail.js";
import {twitterUpdate, discordUpdate, telegramUpdate} from "./src/login.js"
import * as dotenv from "dotenv";
dotenv.config();

const lesgoRegister = (firstName, lastName, email, password, refferal, idPuzzle, answerquest) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/puzzle/validate-register', {
        redirect: 'manual',
        method: 'POST',
        headers: {
          'Host': 'www.aeropres.in',
          'Content-Length': '220',
          'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Sec-Ch-Ua-Mobile': '?0',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Origin': 'chrome-extension://fpdkjdnhkakefebpekbdhillbhonfjjp',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          'Priority': 'u=1, i'
        },
        body: JSON.stringify({
          'firstname': firstName,
          'lastname': lastName,
          'email': email,
          'mobile': '',
          'password': password,
          'country': '+91',
          'referralCode': refferal,
          'puzzle_id': idPuzzle,
          'ans': answerquest
        })
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const visitLink = (linkVerif) => new Promise ((resolve, reject) => {
    fetch(linkVerif, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Connection': 'keep-alive',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Sec-GPC': '1',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"'
        }
      })
    .then(async(res) => {
        resolve({
            code: res.status,
            data: await res.text()
        })
    })
    .catch(err => reject(err))
});

const loginAcc = (email, password, datetime, idPuzzle, answerquest) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/user/login/v2', {
        redirect: "manual",
        method: 'POST',
        headers: {
          'Host': 'www.aeropres.in',
          'Content-Length': '186',
          'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Sec-Ch-Ua-Mobile': '?0',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Origin': 'chrome-extension://fpdkjdnhkakefebpekbdhillbhonfjjp',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          'Priority': 'u=1, i'
        },
        body: JSON.stringify({
          'username': email,
          'password': password,
          'logindata': {
            '_v': '1.0.7',
            'datetime': datetime
          },
          'puzzle_id': idPuzzle,
          'ans': answerquest
        })
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

(async() => {
    const refferal = process.env.REFFERAL;
    const checkReff = await checkRefferal(refferal);

    if(checkReff.message){
        console.log("Refferal was exist!");
    }
    else{
      console.log("Refferal Not Exist!");
        process.exit()
    }
    try{
      //create name and email
      const firstname = faker.person.firstName().toLowerCase();
      const lastname = faker.person.lastName().toLowerCase();
      const email = `${firstname}${lastname}@inboxkitten.com`;
      const password = process.env.PASSWORD_KEY;
      console.log(email);
      //get idPuzzle and ImgBase64 Puzzle
  
      let status = false;
      while(status == false){
        const getIddPuzzle = await getIdPuzzle();
        const idPuzzle = getIddPuzzle.puzzle_id;
        //console.log(idPuzzle)
        const get64Puzzle = await getBase64Puzzle(idPuzzle);
        const imgBase64 = get64Puzzle.imgBase64;
    
        const buffer = Buffer.from(imgBase64, 'base64');
        const imagePath = './puzzleImage.png';
    
        fs.writeFileSync(imagePath, buffer);
        console.log("Puzzle image saved as", imagePath);
    
        await open(imagePath);
        // register
        const answerques = readline.question("Input Angka Jawaban : ")
        const register = await lesgoRegister(firstname, lastname, email, password, refferal, idPuzzle, answerques);
        if(register.success == true){
            console.log("Register Success dengan Email "+ email);
            fs.appendFileSync('email.txt',`\n${email}`);
            status = true
        }else{
            console.log("Email Gagal Terdaftar, Reason : ", register.message)
        }
      }
      
      console.log("Tunggu 30 Detik");
      await delay(30*1000);
      const listemail = await getListEmail(firstname, lastname);
      const storageData = listemail.map(item => item.storage);
      const key = storageData.map(item => item.key)
    //  console.log(key)
      const getResult = await getResultEmail(key);
      const goVerif = await visitLink(getResult);
      if(goVerif.code == 200){
          console.log("Verif Success with Email ", email);
      }else{
          console.log("Verif fail keknya");
      };
      await delay(5000);
  
      fs.appendFileSync('email-verif.txt',`\n${email}`)
      // get IdPuzzle for Login
      let imgBase64Login = '';
      let idPuzzleLogin = '';
      // while biar ga mager error mlu tai
      let status1 = false;
      let login = null;
      while(status1 == false){
      do{
        const getIddPuzzleLogin = await getIdPuzzle();
        idPuzzleLogin = getIddPuzzleLogin.puzzle_id;
       // console.log(idPuzzleLogin)
        const get64PuzzleLogin = await getBase64Puzzle(idPuzzleLogin);
        imgBase64Login  = get64PuzzleLogin.imgBase64;
      }while(!imgBase64Login)
  
      // create image from imgBase64
      const bufferLogin = Buffer.from(imgBase64Login, 'base64');
      const imagePathLogin = './puzzleImagelogin.png';
  
      fs.writeFileSync(imagePathLogin, bufferLogin);
      console.log("Puzzle image saved as", imagePathLogin);
  
      await open(imagePathLogin);
  
      // Login
      const date = new Date();
      const dateStringISO = date.toISOString()
      //console.log(dateStringISO)
      const answerquest = readline.question("Input Angka Jawaban : ")
      do{
      try{
          login = await loginAcc(email, password, dateStringISO, idPuzzleLogin, answerquest);
      }catch(error){
        console.log("Error Login, Reason was : ", error.toString());
      }
      }while(!login || login.success == false)
      status1 = true;
    }
      // let Claim Twitter, Discord, Telegram
  
      let getTwitterUpdate = "";
      do{
      try{
        getTwitterUpdate = await twitterUpdate(login.data.token);
      }catch(error){
        console.log("Error Claim Twitter, Reason ", error.toString());
      }
      }while(!getTwitterUpdate || getTwitterUpdate.success == false);
  
      console.log("Claim Twitter Success!")
  
      let getdiscordUpdate = "";
  
      do{
      try{
        getdiscordUpdate = await discordUpdate(login.data.token);
      }catch(error){
        console.log("Error Claim Discord, Reason ", error.toString());
      }
      }while(!getdiscordUpdate || getdiscordUpdate.success == false);
  
      console.log("Claim Discord Success!");
  
  
      let gettelegramUpdate = "";
  
      do{
      try{
        gettelegramUpdate = await telegramUpdate(login.data.token);
      }catch(error){
        console.log("Error Claim Telegram, Reason ", error.toString());
      }
      }while(!gettelegramUpdate || gettelegramUpdate.success == false);
  
      console.log("Claim Telegram Success!");
  
      fs.appendFileSync('./email-success.txt',`\n${email}`)
  
      }catch(error){
      console.log(error.toString())
      }
  


})();
