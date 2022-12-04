const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const httpsOptions = {
    key: fs.readFileSync('./cert/privkey.pem'),
    cert: fs.readFileSync('./cert/fullchain.pem')
};

console.log("lksdfjls");
app.prepare().then(() => {
    https.createServer(httpsOptions, async (req, res) => {

        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        await handle(req, res, parsedUrl)
    }).listen(port, (err) => {
        if(err) throw err
        console.log(`Ready on https://localhost:${port}`)
    })
})