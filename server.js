const express = require('express');
const cors = require('cors');

const app = express();

// เพิ่ม middleware สำหรับใช้งาน CORS
app.use(cors());

// Route สำหรับการส่ง Server Sent Events (SSE)
app.get('/events', (req, res) => {
  // ตั้งค่า Header สำหรับ SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // ส่งข้อมูลไปยัง Client ทุก 2 วินาที
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const data = {
      dateTime: currentDate.toISOString(),
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);

  // จัดการเมื่อ Client ปิดการเชื่อมต่อ
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Serve static files
app.use('/basicSSE', express.static('./basicSSE.html'));

// เริ่มต้น Server ที่ port 8080
app.listen(8080, () => {
  console.log('Server running on port 8080');
});
