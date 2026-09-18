// ==========================================================================
// Fraccionamiento Universidad - Servidor Web Local para Tour Virtual 360°
// Desarrollado para visualización local sin restricciones CORS de WebGL
// ==========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8085;
const ROOT_DIR = path.resolve(__dirname);

// Mapeo completo de tipos MIME para soportar todos los assets del proyecto
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Configuración de encabezados CORS para habilitar texturas WebGL de Pannellum
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parsear ruta de la solicitud
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let safePath = decodeURIComponent(parsedUrl.pathname);

  // Redirigir la raíz a index.html
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.normalize(path.join(ROOT_DIR, safePath));

  // Seguridad: Prevenir Directory Traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Prohibido: Acceso fuera del directorio del proyecto');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="utf-8"><title>404 - No Encontrado</title></head>
        <body style="font-family: sans-serif; background:#0f172a; color:#fff; text-align:center; padding:50px;">
          <h1 style="color:#f87171;">404 - Archivo no encontrado</h1>
          <p>No se encontró el recurso: <code>${safePath}</code></p>
          <p><a href="/" style="color:#38bdf8;">Volver al inicio</a></p>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}`;
  console.log('\n================================================================');
  console.log('   FRACCIONAMIENTO UNIVERSIDAD - SERVIDOR LOCAL ACTIVO');
  console.log('================================================================');
  console.log(` -> URL del Tour 360: ${url}`);
  console.log(` -> Raiz del proyecto: ${ROOT_DIR}`);
  console.log(' -> Compatible al 100% con WebGL, Pannellum y Leaflet');
  console.log('----------------------------------------------------------------');
  console.log(' Abriendo navegador predeterminado...');
  console.log(' Presiona [Ctrl + C] en cualquier momento para detener.');
  console.log('================================================================\n');

  // Abrir navegador automáticamente según la plataforma
  const openCmd = process.platform === 'win32' ? `start "" "${url}"` :
                  process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(openCmd, (err) => {
    if (err) {
      console.log(`Aviso: No se pudo abrir automáticamente. Puedes ingresar manualmente a: ${url}`);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[ERROR] El puerto ${PORT} ya esta en uso.`);
    console.error(`Intenta cerrar otra ventana de servidor activa o usa http://localhost:${PORT}\n`);
  } else {
    console.error('\n[ERROR]', err.message);
  }
  process.exit(1);
});
