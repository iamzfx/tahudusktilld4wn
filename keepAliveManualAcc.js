import fetch from "node-fetch";
import {SocksProxyAgent} from "socks-proxy-agent";
import { getIdPuzzle, getBase64Puzzle} from "./src/getPuzzle.js";
import open from "open"
import readline from "readline-sync";
import fs from "fs";
import delay from "delay";
const loginAcc = (email, password, datetime, idPuzzle, answerquest, proxy) => new Promise ((resolve, reject) => {
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
        agent: proxy ? new SocksProxyAgent(proxy) : null,
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

const getPointAccount = (bearer) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/api/atom/v1/userreferral/getpoint', {
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'authorization': `Berear ${bearer}`,
          'content-type': 'application/json',
          'origin': 'chrome-extension://fpdkjdnhkakefebpekbdhillbhonfjjp',
          'priority': 'u=1, i',
          'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-gpc': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        }
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const keepAliveAccount = (bearer, email) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/userreward/keepalive', {
        method: 'POST',
        redirect: "manual",
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'authorization': `Berear ${bearer}`,
          'content-type': 'application/json',
          'origin': 'chrome-extension://fpdkjdnhkakefebpekbdhillbhonfjjp',
          'priority': 'u=1, i',
          'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-gpc': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
            'username': email,
            "extensionid": "fpdkjdnhkakefebpekbdhillbhonfjjp",
            "numberoftabs": 0,
            "_v": "1.0.7"
          })
        })
    .then(async(res) => {
        resolve({
            code: res.status,
            data: await res.json()
        })
    })
    .catch(err => reject(err))
});


(async() => {
    const email = readline.questionEMail("Input Email: ");
    const password =readline.question("Input your Password : ");
    try{
      console.log(`\nYour Email was ${email}`);
      let status1 = false;
      let login = null;
      let idPuzzleLogin = '';
      let imgBase64Login = '';
      let bearer = ''
      while(status1 == false){
      do{
        const getIddPuzzleLogin = await getIdPuzzle();
        idPuzzleLogin = getIddPuzzleLogin.puzzle_id;
       // console.log(idPuzzleLogin)
        const get64PuzzleLogin = await getBase64Puzzle(idPuzzleLogin, null);
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
          login = await loginAcc(email, password, dateStringISO, idPuzzleLogin, answerquest, null);
      }catch(error){
        console.log("Error Login, Reason was : ", error.toString());
      }
      }while(!login || login.success == false || !login.data.token)
      status1 = true;      
      console.log(`Login Success with Email ${email}`);
      bearer = login.data.token;
      
    }

    const getPoint = await getPointAccount(bearer);
    const refferalPoint = getPoint.data.referralPoint;
    const rewardPoint = getPoint.data.rewardPoint;

    let totalPoints = rewardPoint.points + rewardPoint.registerpoints + rewardPoint.signinpoints + rewardPoint.twitter_x_id_points + rewardPoint.discordid_points + rewardPoint.telegramid_points + rewardPoint.bonus_points + refferalPoint.commission;
    console.log(`Your Point : ${totalPoints}`);

    while(true){
      try{
        const keepAlive = await keepAliveAccount(bearer, email);
  
        if(keepAlive.code == 200){
          console.log(`Sukses Keep Alive with Email ${email}`);
        }else if (keepAlive.code == 403){
          console.log(`Maybe Email Wrong ${email}`);
        }else {
          console.log(`Error Keep Alive with Email ${email}`);
        }
        await delay(180*1000);
      }catch(error){
        console.log(error.toString());
      }
    } 
    }catch(error){
      console.log(error.toString());
    }
  
})();

