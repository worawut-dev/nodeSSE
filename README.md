# Server Sent Event BY USE HTTP2(SSE) Example 

## ความต้องการระบบ

- Node.js (เวอร์ชันที่แนะนำ)
- npm (Node Package Manager) 

## Installation

1. ดาวน์โหลดหรือ clone โค้ดจาก GitHub Repository
2. เปิด Command Prompt หรือ Terminal และเข้าไปยังโฟลเดอร์โปรเจ็ค
3. Run คำสั่ง `npm install` เพื่อติดตั้ง dependencies

```bash
npm install
```


4. เมื่อติดตั้งแล้วคุณสามารถรันเซิร์ฟเวอร์ได้ด้วยคำสั่ง: command นี้จะสร้าง certificate and key สำหรับใช้สำหรับ HTTP2

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```
5. เมื่อ run เสร็จจะปรากฏ file localhost-privkey.pem และ localhost-cert.pem
6. run คำสั่ง start server ด้วย
```bash
node server.js
```

7. เปิด browser ด้วย route `http://localhost:8080/currencyExchange`


![sse_example](https://github.com/worawut-dev/nodeSSE/assets/64031286/b3e959d1-ec2a-402f-a313-d31197be6e9a)
