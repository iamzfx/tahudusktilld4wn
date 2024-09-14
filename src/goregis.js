import fetch from "node-fetch";
import {SocksProxyAgent} from "socks-proxy-agent";

export const checkRefferal = (refferal, proxy) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/api/atom/v1/userreferral/iscodeexist?referralCode='+refferal, {
        headers: {
          'Host': 'www.aeropres.in',
          'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'Sec-Ch-Ua-Mobile': '?0',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Accept': '*/*',
          'Origin': 'chrome-extension://fpdkjdnhkakefebpekbdhillbhonfjjp',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          'Priority': 'u=1, i'
        },
        agent: proxy ? new SocksProxyAgent(proxy) : null
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});


