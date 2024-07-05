# Unofficial Website Padukuhan Gangsalan Kidul

Selamat datang di repository Unofficial Website Padukuhan Gangsalan Kidul! Website ini dibuat untuk menyediakan informasi lengkap mengenai Padukuhan Gangsalan Kidul, termasuk berita terbaru, agenda kegiatan, profil desa, data padukuhan, dan informasi lokasi.

## Tech Stack

- **Next.js 14**: Framework React untuk pengembangan front-end.
- **Firebase**: Backend-as-a-Service untuk autentikasi dan database.
- **Vercel**: Hosting website.

## Fitur

### Sebagai Pengguna
1. **Berita**: Membaca berita terbaru tentang kegiatan dan informasi di Padukuhan Gangsalan Kidul.
2. **Agenda**: Melihat jadwal kegiatan dan acara yang akan datang.
3. **Profil**: Mengenal lebih dekat tentang Padukuhan Gangsalan Kidul, termasuk sejarah dan visi misinya.
4. **Data Padukuhan**: Mengakses data dan statistik penting mengenai padukuhan.
5. **Lokasi**: Mengetahui lokasi Padukuhan Gangsalan Kidul dengan peta yang terintegrasi.
6. **Struktur Organisasi**: Melihat struktur organisasi padukuhan.

### Sebagai Admin
1. **CRUD Berita**: Mengelola berita dengan fitur Create, Read, Update, dan Delete.
2. **CRUD Agenda**: Mengelola agenda dengan fitur Create, Read, Update, dan Delete.
3. **CRUD Profile**: Mengelola profil padukuhan dengan fitur Create, Read, Update, dan Delete.
4. **RU Data Padukuhan**: Mengelola data padukuhan dengan fitur Read dan Update.

## Instalasi

1. Clone repository ini:

    ```bash
    git clone https://github.com/username/unofficial-website-gangsalan-kidul.git
    cd unofficial-website-gangsalan-kidul
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Konfigurasi Firebase:

    - Buat project baru di [Firebase Console](https://console.firebase.google.com/).
    - Buat file `.env.local` di root project dan tambahkan konfigurasi Firebase Anda:

        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
        NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
        ```

4. Jalankan aplikasi:

    ```bash
    npm run dev
    ```

## Kontribusi

Kami sangat mengapresiasi kontribusi dari semua pihak. Untuk berkontribusi, silakan buat pull request atau buka issue baru jika menemukan bug atau memiliki saran perbaikan.

## Lisensi

Proyek ini dilisensikan di bawah lisensi [MIT](LICENSE).

---

Terima kasih telah mengunjungi dan menggunakan Unofficial Website Padukuhan Gangsalan Kidul!
