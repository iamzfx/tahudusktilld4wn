import fetch from "node-fetch";
import {SocksProxyAgent} from "socks-proxy-agent";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const getIdPuzzle = (proxy) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/puzzle/get-puzzle', {
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

export const getBase64Puzzle  = (idPuzzle, proxy) => new Promise ((resolve, reject) => {
    fetch('https://www.aeropres.in/chromeapi/dawn/v1/puzzle/get-puzzle-image?puzzle_id='+idPuzzle, {
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




/*
export async function puzzleImage () {
    const getIddPuzzle = await getIdPuzzle();
    const idPuzzle = getIddPuzzle.puzzle_id;
    const get64Puzzle = await getBase64Puzzle(idPuzzle);
    const imgBase64 = get64Puzzle.imgBase64;
    const buffer = Buffer.from(imgBase64, 'base64');
    const outputFilePath = 'outputFile.png';

    fs.writeFile(outputFilePath, buffer, (err) => {
        if(err){
            console.log("Error when Creating File!", err)
        }else{
            console.log("Image file Creating Successfully", outputFilePath)
        }
/*
        open(outputFilePath).then(() => {
            console.log("Image Opened Successfully")
        }).catch((err) => {
            console.log("Error when Creating File",err)
        })
    })

    fs.writeFileSync('idpuzzle.txt',`${idPuzzle}`);

};
*/
