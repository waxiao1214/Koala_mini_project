const app = require("express")();
const Http = require("http");
const cors = require("cors");
const puppeteer = require("puppeteer");

// Create the Http server
const server = Http.createServer(app);

const takeScreen = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://google.com");
  const options = {
    path: 'website.png',
    omitbackground: true
  }
  await page.screenshot(options);
}

takeScreen()
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))