const express = require('express');
const cors = require('cors');

const app = express();

// เพิ่ม middleware สำหรับใช้งาน CORS
app.use(cors());

// function สำหรับสุ่มตัวเลขจาก min ถึง max
const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(3);

// Route สำหรับการส่ง Server Sent Events (SSE)
app.get('/events', (req, res) => {
  // ตั้งค่า Header สำหรับ SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // ส่งข้อมูลไปยัง Client ทุก 1 วินาที
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const usdRate = getRandomFloat(36.500, 37.202); // สุ่มค่าอัตราแลกเปลี่ยน USD ในช่วง 36.000 - 37.000
    const data = {
      dateTime: currentDate.toISOString(),
      bath: usdRate,
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);

  // จัดการเมื่อ Client ปิดการเชื่อมต่อ
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Serve static files
app.use('/currencyExchange', express.static('./currencyExchange.html'));
app.use('/styles', express.static('./styles.css', { 'Content-Type': 'text/css' }));


// เริ่มต้น Server ที่ port 8080
app.listen(8080, () => {
  console.log('Server running on port 8080');
});
