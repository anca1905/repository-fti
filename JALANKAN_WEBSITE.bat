@echo off
title Repositori Digital FTI - Server
cls
echo ======================================================================
echo    REPOSITORI RESMI FAKULTAS TEKNOLOGI INFORMASI (FTI REPOSITORY)
echo    Program Studi: S1 Sistem Informasi & S1 Ilmu Komputer
echo ======================================================================
echo.
echo [1/2] Memulai Server Next.js...
echo [2/2] Membuka browser ke http://localhost:3000 ...
echo.
timeout /t 2 /nobreak >nul
start http://localhost:3000
npm run dev
pause
