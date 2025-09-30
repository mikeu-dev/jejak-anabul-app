# Jejak Meong App

Jejak Meong App adalah aplikasi mobile untuk membantu menemukan dan melaporkan kucing yang hilang atau ditemukan di sekitar Anda. Aplikasi ini menampilkan laporan pada peta interaktif dan dalam format daftar, sehingga komunitas dapat saling membantu menemukan kembali teman berbulu mereka dengan mudah.

## Fitur Utama

- **Peta Interaktif:** Lihat laporan kucing yang hilang atau ditemukan di sekitar Anda menggunakan Google Maps dengan clustering.
- **Tampilan Daftar:** Jelajahi semua laporan dalam format kartu yang mudah dibaca. (fitur mendatang)
- **Pelaporan Kucing:** Pengguna yang sudah login dapat melaporkan kucing baru dengan detail seperti nama, jenis kelamin, foto, dan lokasi terakhir terlihat.
- **Login dengan Google:** Sistem autentikasi yang aman menggunakan Firebase Authentication. (fitur mendatang)
- **Saran Ras Berbasis AI:** Unggah foto kucing dan dapatkan saran ras menggunakan Google AI (Gemini) melalui Genkit. (fitur mendatang)
- **Dukungan Multibahasa:** Antarmuka tersedia dalam Bahasa Indonesia (default) dan Inggris. (fitur mendatang)
- **Mode Gelap/Terang:** Tema aplikasi dapat diganti sesuai preferensi pengguna. (fitur mendatang)
- **Desain Responsif untuk Mobile:** Tampilan yang optimal di perangkat Android dan iOS.

## Teknologi yang Digunakan

- **Framework Mobile:** React Native + Expo
- **Navigasi:** React Navigation
- **Database:** Firebase Firestore
- **Autentikasi:** Firebase Authentication
- **Peta & Cluster:** react-native-maps + react-native-map-clustering
- **UI & Styling:** Expo Vector Icons dan Tailwind CSS (via library React Native)
- **Bahasa:** TypeScript

## Pengaturan & Menjalankan di Lokal

1. **Clone Repositori:**
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd jejak-anabul-app
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Siapkan Environment Variables:**
    Buat file baru bernama `.env` di direktori root proyek Anda. Masukkan konfigurasi Firebase dan API key AI:

    ```env
    FIREBASE_API_KEY=AIz...
    FIREBASE_AUTH_DOMAIN=...
    FIREBASE_PROJECT_ID=...
    FIREBASE_STORAGE_BUCKET=...
    FIREBASE_MESSAGING_SENDER_ID=...
    FIREBASE_APP_ID=...
    ```

4. **Jalankan Aplikasi di Android:**
    ```bash
    npm run android
    ```
    Aplikasi akan berjalan di emulator Android atau perangkat fisik yang terhubung.
