import fetch from "node-fetch";
import {SocksProxyAgent} from "socks-proxy-agent";
import { getIdPuzzle, getBase64Puzzle} from "./src/getPuzzle.js";
import open from "open"
import readline from "readline-sync";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();
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

(async() => {
  console.log("Auto Save Bearer x ");
  const pilihan = readline.question(`Gunakan Script ini menggunakan Proxy atau Tidak ? (Yes = Y / No = N) : `);
  if(pilihan.toLowerCase() == 'y'){
    if (fs.existsSync('./proxy.txt')) {
      const getProxy = fs.readFileSync('./proxy.txt','utf-8');
      const proxySplit = getProxy.split('\r\n');
    
      for(let i = 0; i<getEmail.length; i++){
        try{
          const randProxy = Math.floor(proxySplit.length * Math.random());
          const proxy = `socks5h://${proxySplit[randProxy]}`;
          console.log(email[i]);
          let status1 = false;
          let login = null;
          let idPuzzleLogin = '';
          let imgBase64Login = '';
          while(status1 == false){
          do{
            const getIddPuzzleLogin = await getIdPuzzle(proxy);
            idPuzzleLogin = getIddPuzzleLogin.puzzle_id;
           // console.log(idPuzzleLogin)
            const get64PuzzleLogin = await getBase64Puzzle(idPuzzleLogin, proxy);
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
              login = await loginAcc(email[i], password, dateStringISO, idPuzzleLogin, answerquest, proxy);
          }catch(error){
            console.log("Error Login, Reason was : ", error.toString());
          }
          }while(!login || login.success == false)
          status1 = true;      
          console.log(`Login Success with Email ${email[i]}`);
          fs.appendFileSync('bearer.txt',`\n${login.data.token}`);
          fs.appendFileSync('emaildonebearer.txt',`\n${email[i]}`);
        }
        }catch(error){
          console.log(error.toString());
        }
      }
    }else{  
     
      console.log("File Proxy Tidak Ada");
      process.exit(0);
    }
  }else if(pilihan.toLowerCase() == 'n'){
    const getEmail = fs.readFileSync("./email-success.txt", "utf8");
    const email = getEmail.split('\n')
    const password = process.env.PASSWORD_KEY;
    for(let i = 0; i<getEmail.length; i++){
      try{
        console.log(email[i]);
        let status1 = false;
        let login = null;
        let idPuzzleLogin = '';
        let imgBase64Login = '';
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
            login = await loginAcc(email[i], password, dateStringISO, idPuzzleLogin, answerquest, null);
        }catch(error){
          console.log("Error Login, Reason was : ", error.toString());
        }
        }while(!login || login.success == false)
        status1 = true;      
        console.log(`Login Success with Email ${email[i]}`);
        fs.appendFileSync('bearer.txt',`\n${login.data.token}`);
        fs.appendFileSync('emaildonebearer.txt',`\n${email[i]}`);
      }
    }catch(error){
      console.log(error.toString());
    }
  }
  }else{
    console.log("Input Tidak Valid");
    process.exit(0);
  }
  
})();

