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
