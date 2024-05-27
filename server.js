const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

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
        const data = {
          dateTime: currentDate.toISOString(),
        };
        stream.write(`data: ${JSON.stringify(data)}\n\n`);
      }, 1000);
  
      // ปิดการเชื่อมต่อเมื่อ client ทำการปิดการเชื่อมต่อ
      stream.on('close', () => {
        clearInterval(interval);
      });
    } else if(headers[':path'] === '/basicSSE') { 
      // หากเข้าด้วย route basicSSE จะ response 200 และไฟล์ basicSSE.html
      stream.respond({
        'content-type': 'text/html',
        ':status': 200
      });
      const fileStream = fs.createReadStream('basicSSE.html');
      fileStream.pipe(stream);
    } else {
      // หากเข้าด้วย route  อื่นจะ response 404 และข้อความ Not found
      stream.respond({
        'content-type': 'text/plain',
        ':status': 404
      });
      stream.end('Not found');
    }
  });

server.listen(8080);

console.log('Server running at https://localhost:8080');
