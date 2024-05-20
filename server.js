const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;
app.use(cors());

const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

app.get('/events', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const usdRate = getRandomFloat(36, 37); // สุ่มค่าอัตราแลกเปลี่ยน USD ในช่วง 36.00 - 37.00

    const data = {
      dateTime: currentDate.toISOString(),
      usd: usdRate,
    };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 5000);

  req.on('close', () => {
    console.log('========This Close========');
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
