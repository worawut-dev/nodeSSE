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

## การใช้งาน

เมื่อติดตั้งแล้ว คุณสามารถรันเซิร์ฟเวอร์ได้ด้วยคำสั่ง:

command นี้จะสร้าง certificate and key สำหรับใช้สำหรับ HTTP2
```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```
เมื่อ run เสร็จจะปรากฏ file localhost-privkey.pem และ localhost-cert.pem

```bash
node server.js
```

![exampleNodeSSE](https://github.com/worawut-dev/nodeSSE/assets/64031286/97e09c0c-142a-4269-b775-837ac8169e54)
