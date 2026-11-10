<?php
// Portal Otomatis Repositori Digital FTI untuk Laragon
$isServerRunning = false;
$port = 3000;

// Cek apakah server Next.js port 3000 sedang aktif
$connection = @fsockopen('127.0.0.1', $port, $errno, $errstr, 1);
if (is_resource($connection)) {
    $isServerRunning = true;
    fclose($connection);
    // Langsung redirect ke server jika aktif
    header("Location: http://localhost:3000/");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Repositori FTI — Panduan Menjalankan Website</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 85vh;
        }
        .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-top: 4px solid #ea580c;
            border-radius: 8px;
            max-width: 650px;
            width: 100%;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f1f5f9;
        }
        .logo {
            background-color: #ea580c;
            color: white;
            font-weight: 900;
            font-size: 18px;
            width: 52px;
            height: 52px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #c2410c;
        }
        h1 {
            font-size: 18px;
            margin: 0 0 4px 0;
            color: #0f172a;
        }
        .sub {
            font-size: 12px;
            color: #64748b;
            margin: 0;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background-color: #fef3c7;
            color: #92400e;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 20px;
            border: 1px solid #fde68a;
        }
        .instructions {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 16px 20px;
            margin-bottom: 24px;
            font-size: 13px;
            line-height: 1.6;
        }
        .step {
            margin-bottom: 12px;
        }
        code {
            background-color: #0f172a;
            color: #f8fafc;
            padding: 3px 8px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 13px;
        }
        .btn-launch {
            display: inline-block;
            background-color: #ea580c;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            transition: background-color 0.2s;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
        }
        .btn-launch:hover {
            background-color: #c2410c;
        }
        .footer-note {
            font-size: 11px;
            color: #94a3b8;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <div class="logo">FTI</div>
            <div>
                <h1>Repositori Digital Fakultas Teknologi Informasi</h1>
                <p class="sub">Portal Karya Ilmiah: S1 Sistem Informasi & S1 Ilmu Komputer</p>
            </div>
        </div>

        <div class="status-badge">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#d97706;"></span>
            <span>Aplikasi Dibangun dengan Modern Tech Stack (Next.js 14 + React)</span>
        </div>

        <div class="instructions">
            <p style="margin-top:0; font-weight:bold; color:#0f172a;">
                Website ini membutuhkan Node.js runtime untuk menjalankan server Next.js:
            </p>
            
            <div class="step">
                <strong>Cara Termudah (1 Klik):</strong><br>
                Buka folder ini di File Explorer (<code>c:\laragon\www\repository_fti</code>) lalu klik ganda berkas:
                <br><br>
                <code style="background:#ea580c; font-size:14px;">▶ JALANKAN_WEBSITE.bat</code>
            </div>

            <div class="step" style="margin-top:16px;">
                <strong>Atau Lewat Terminal / PowerShell:</strong><br>
                Jalankan perintah berikut di folder proyek:
                <br><br>
                <code>npm run dev</code>
            </div>
            
            <p style="margin-bottom:0; font-size:12px; color:#64748b;">
                Setelah server aktif, website otomatis terbuka di browser pada alamat: <strong>http://localhost:3000</strong>
            </p>
        </div>

        <a href="http://localhost:3000" class="btn-launch" id="btnCheck">
            Buka Website Repositori FTI (http://localhost:3000) &raquo;
        </a>

        <div class="footer-note">
            Halaman ini otomatis me-refresh jika server Node.js port 3000 telah berjalan.
        </div>
    </div>

    <script>
        // Auto-check jika server port 3000 sudah menyala
        setInterval(function() {
            fetch('http://localhost:3000', { mode: 'no-cors' })
                .then(function() {
                    window.location.href = 'http://localhost:3000';
                })
                .catch(function() {});
        }, 3000);
    </script>
</body>
</html>
