import fetch from "node-fetch";
import { SocksProxyAgent } from "socks-proxy-agent";

export const twitterUpdate = (bearer, proxy) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/profile/update', {
        method: 'POST',
        headers: {
          'Host': 'www.aeropres.in',
          'Content-Length': '31',
          'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'Content-Type': 'application/json',
          'Sec-Ch-Ua-Mobile': '?0',
          'Authorization': `Brearer ${bearer}`,
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
        agent: proxy ? new SocksProxyAgent(proxy) : null,
        body: JSON.stringify({
          'twitter_x_id': 'twitter_x_id'
        })
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

export const telegramUpdate = (bearer, proxy) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/profile/update', {
        method: 'POST',
        headers: {
          'Host': 'www.aeropres.in',
          'Content-Length': '27',
          'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'Content-Type': 'application/json',
          'Sec-Ch-Ua-Mobile': '?0',
          'Authorization': `Brearer ${bearer}`,
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
        agent: proxy ? new SocksProxyAgent(proxy) : null,
        body: JSON.stringify({
          'telegramid': 'telegramid'
        })
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

export const discordUpdate = (bearer, proxy) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/profile/update', {
        method: 'POST',
        headers: {
          'Host': 'www.aeropres.in',
          'Content-Length': '25',
          'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'Content-Type': 'application/json',
          'Sec-Ch-Ua-Mobile': '?0',
          'Authorization': `Brearer ${bearer}`,
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
        agent: proxy? new SocksProxyAgent(proxy) : null,
        body: JSON.stringify({
          'discordid': 'discordid'
        })
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

