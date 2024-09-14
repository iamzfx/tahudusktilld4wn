import fetch from "node-fetch";
import * as cheerio from "cheerio";
export const getListEmail = (firstName, lastName) => new Promise ((resolve, reject) => {
    fetch(`https://inboxkitten.com/api/v1/mail/list?recipient=${firstName}${lastName}`, {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.7',
          'priority': 'u=1, i',
          'referer': 'https://inboxkitten.com/inbox/patrickbechtelar/list',
          'sec-ch-ua': '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-gpc': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
        }
      })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

export const getResultEmail = (key) => new Promise ((resolve, reject) => {
    fetch('https://inboxkitten.com/api/v1/mail/getHtml?region=us-west1&key='+key, {
        headers: {
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.7',
          'priority': 'u=0, i',
          'referer': 'https://inboxkitten.com/inbox/patrickbechtelar/message/us-west1/BAABAQXutGSMDSSVjGpL5LYVsDItMWbkYw',
          'sec-ch-ua': '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'iframe',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
          'sec-gpc': '1',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
        }
      })
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);
        const get1 = $('a').attr('href')
        resolve(get1)
    })
    .catch(err => reject(err))
});
