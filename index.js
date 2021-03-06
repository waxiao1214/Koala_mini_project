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
  return page
}

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
})

io.on('connection', async (socket) => {
  let screen = await takeScreen();

  setInterval(async () => {
    socket.emit('screencapture', await screen.screenshot({
      type: 'jpeg',
      omitBackground: true
    }
    ));
  }, 100) 

  socket.on('capturekey', async (key) => {
    screen.keyboard.press(key.key);
  })

  socket.on("mousemove", async (pos) => {
    screen.mouse.move(pos.x, pos.y)
  })

  socket.on('mouseclick', async (pos) => {
    screen.mouse.click(pos.x, pos.y);
  })

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
