// 간단한 HTTP 서버 (IP 접근 가능)
const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

const START_PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // 모든 네트워크 인터페이스에서 접근 가능
const MAX_PORT_ATTEMPTS = 10;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

// 포트가 사용 가능한지 확인
function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, HOST, () => {
            server.once('close', () => resolve(true));
            server.close();
        });
        server.on('error', () => resolve(false));
    });
}

// 사용 가능한 포트 찾기
async function findAvailablePort(startPort) {
    for (let i = 0; i < MAX_PORT_ATTEMPTS; i++) {
        const port = startPort + i;
        const available = await isPortAvailable(port);
        if (available) {
            return port;
        }
    }
    throw new Error(`사용 가능한 포트를 찾을 수 없습니다 (${startPort}-${startPort + MAX_PORT_ATTEMPTS - 1})`);
}

// HTTP 서버 생성
function createServer() {
    return http.createServer((req, res) => {
        console.log(`${req.method} ${req.url}`);

        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './design-system-viewer.html';
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 - 파일을 찾을 수 없습니다</h1>', 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end(`서버 오류: ${error.code}`, 'utf-8');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });
}

// 서버 시작
async function startServer() {
    try {
        const port = await findAvailablePort(START_PORT);
        const server = createServer();
        
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`⚠️  포트 ${port}이 사용 중입니다. 다른 포트를 시도합니다...`);
                // 재시도
                setTimeout(() => {
                    startServer();
                }, 1000);
            } else {
                console.error('❌ 서버 오류:', err.message);
                process.exit(1);
            }
        });
        
        server.listen(port, HOST, () => {
            const os = require('os');
            const networkInterfaces = os.networkInterfaces();
            let localIP = 'localhost';
            
            // 로컬 IP 주소 찾기
            for (const interfaceName in networkInterfaces) {
                const interfaces = networkInterfaces[interfaceName];
                for (const iface of interfaces) {
                    if (iface.family === 'IPv4' && !iface.internal) {
                        localIP = iface.address;
                        break;
                    }
                }
            }

            console.log('='.repeat(50));
            console.log('🚀 AJ네트웍스 디자인 시스템 서버가 시작되었습니다!');
            console.log('='.repeat(50));
            if (port !== START_PORT) {
                console.log(`⚠️  포트 ${START_PORT}이 사용 중이어서 포트 ${port}로 시작했습니다.`);
            }
            console.log(`📱 로컬 접속: http://localhost:${port}`);
            console.log(`🌐 네트워크 접속: http://${localIP}:${port}`);
            console.log('='.repeat(50));
            console.log('\n서버를 중지하려면 Ctrl+C를 누르세요.\n');
        });
    } catch (err) {
        console.error('❌ 서버 시작 실패:', err.message);
        process.exit(1);
    }
}

// 서버 시작
startServer();
