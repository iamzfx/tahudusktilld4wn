import fetch from "node-fetch";
import { SocksProxyAgent } from "socks-proxy-agent";
import fs from "fs";
import readline from "readline-sync";
import delay from "delay";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const getPointAccount = (bearer, proxy) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/api/atom/v1/userreferral/getpoint', {
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
        agent: proxy ? new SocksProxyAgent(proxy) : null
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const keepAliveAccount = (bearer, email, proxy) => new Promise ((resolve, reject) => {
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
        agent: proxy ? new SocksProxyAgent(proxy) : null,
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
  console.log("Auto Keep ALive x ");
  const pilihan = readline.question(`Gunakan Script ini menggunakan Proxy atau Tidak ? (Yes = Y / No = N) : `);
 // console.log(pilihan);

  if (pilihan.toLowerCase() === 'y') {
      if (fs.existsSync('./proxy.txt')) {
        const getBearer = fs.readFileSync('./bearer.txt','utf-8');
        const splitBearer = getBearer.split('\n');
        while(true){
          try{
            const getProxy = fs.readFileSync('./proxy.txt','utf-8');
            const proxySplit = getProxy.split('\r\n');
            let count = 1;
            const proxy = `socks5h://${proxySplit[count]}`;
            for(let bearer of splitBearer){
              const getEmail = await getPointAccount(bearer, proxy);
              const email = getEmail.data.rewardPoint.userId;
              const keepAlive = await keepAliveAccount(bearer, email, proxy);  
              if(keepAlive.code == 200){
                console.log(`Sukses Keep Alive with Email ${email}`);
              }else if (keepAlive.code == 403){
                console.log(`Maybe Email Wrong ${email}`);
              }else {
                console.log(`Error Keep Alive with Email ${email}`);
              }
              count++
            }
            count = 1;
            const getDelay = Math.floor(Math.random() * (300000-180000+1000)) + 180000
            await delay(getDelay);
          }catch(error){
            console.log(error.toString());
          }
        }
      } else {
          console.log("Proxy Tidak Tersedia");
          process.exit(1);
      }
  } else if (pilihan.toLowerCase() === 'n') {
      // Handle 'No' case
      const getBearer = fs.readFileSync('./bearer.txt','utf-8');
      const splitBearer = getBearer.split('\n');
      while(true){
        try{
          for(let bearer of splitBearer){
            const getEmail = await getPointAccount(bearer);
            const email = getEmail.data.rewardPoint.userId;
            const keepAlive = await keepAliveAccount(bearer, email, null);  
            if(keepAlive.code == 200){
              console.log(`Sukses Keep Alive with Email ${email}`);
            }else if (keepAlive.code == 403){
              console.log(`Maybe Email Wrong ${email}`);
            }else {
              console.log(`Error Keep Alive with Email ${email}`);
            }
          }
          const getDelay = Math.floor(Math.random() * (300000-180000+1000)) + 180000
          await delay(getDelay);
        }catch(error){
          console.log(error.toString());
        }
      }
  } else {
      console.log("Invalid input. Please enter Y or N.");
}
})();