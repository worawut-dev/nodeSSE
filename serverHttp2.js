const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

// function สำหรับสุ่มตัวเลขจาก min ถึง max
const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(3);

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
    // เปิดการเชื่อมต่อกับ SSE
    if (headers[':path'] === '/events') {
      stream.respond({
        'content-type': 'text/event-stream',
        ':status': 200,
        'cache-control': 'no-cache',
        'Access-Control-Allow-Origin': '*', // อนุญาตทุก origin หรือระบุ origin ที่เฉพาะเจาะจง
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  
      // ส่งข้อมูลไปยัง Client ทุก 1 วินาที
      const interval = setInterval(() => {
        const currentDate = new Date();
        const usdRate = getRandomFloat(36.500, 37.202); // สุ่มค่าอัตราแลกเปลี่ยน USD ในช่วง 36.000 - 37.000
        const data = {
          dateTime: currentDate.toISOString(),
          bath: usdRate,
        };
        stream.write(`data: ${JSON.stringify(data)}\n\n`);
      }, 1000);
  
      // ปิดการเชื่อมต่อเมื่อ client ทำการปิดการเชื่อมต่อ
      stream.on('close', () => {
        clearInterval(interval);
      });
    } else {
      // หากเข้าด้วย route  อื่นจะ response 404 และข้อความ Not found
      stream.respond({
        'content-type': 'text/plain',
        ':status': 404
      });
      stream.end('Not found');
    }
  });

server.listen(8081);

console.log('Server running at https://localhost:8081');