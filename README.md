# Ruang Diskusi — Aplikasi Forum Diskusi

Aplikasi forum diskusi berbasis **Next.js** (Pages Router) + **Redux Toolkit** +
**styled-components**, memanfaatkan [Dicoding Forum API v1](https://forum-api.dicoding.dev/v1/#/).

Proyek ini merupakan kelanjutan dari submission sebelumnya (React + Vite), dengan
tambahan: automation testing (Vitest, React Testing Library, Cypress), CI/CD
(GitHub Actions + Vercel), dan migrasi ke ekosistem Next.js + styled-components.

## Menjalankan Proyek Secara Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Skrip yang Tersedia

```bash
npm run dev        # menjalankan Next.js dalam mode development
npm run build       # build produksi (Next.js)
npm run start        # menjalankan hasil build produksi (jalankan setelah npm run build)
npm run lint          # ESLint (Airbnb JavaScript Style Guide)
npm test               # unit & component test dengan Vitest (sekali jalan)
npm run test:watch      # Vitest dalam mode watch, untuk development
npm run e2e               # build, jalankan production server, lalu Cypress headless
npm run e2e:dev             # jalankan dev server lalu buka Cypress UI interaktif (cypress open)
```

> **Catatan tentang Cypress:** paket `cypress` mengunduh sebuah binary terpisah
> (bukan hanya paket npm biasa) saat `npm install` dijalankan. Proses instalasi
> ini butuh koneksi internet ke `download.cypress.io`. Jalankan `npm install`
> di komputer Anda sendiri (bukan di lingkungan yang jaringannya dibatasi)
> supaya Cypress ter-install dengan benar sebelum menjalankan `npm run e2e`.

## Struktur Folder

```
src/
  pages/        routing Next.js (Pages Router) — satu file = satu halaman
  components/   komponen UI reusable & modular, masing-masing dengan *.styles.js
  states/       seluruh logika Redux (slice + thunk) + *.test.js (reducer/thunk test)
  hooks/        custom hooks (mis. useInput untuk controlled form)
  utils/        fungsi bantu; satu-satunya modul yang memanggil fetch() ke API
  styles/       theme.js (design tokens), GlobalStyle.js, styled-components bersama
cypress/
  e2e/          skenario pengujian End-to-End (login.cy.js)
.github/workflows/
  ci.yml        GitHub Actions: lint + unit test + build + e2e
```

## Ringkasan Arsitektur & Teknologi

- **Next.js (Pages Router)** — `pages/_app.js` membungkus seluruh halaman dengan
  Redux `Provider`, styled-components `ThemeProvider`, dan layout bersama
  (Navbar/LoadingBar/MessageBanner). `pages/_document.js` menangani SSR
  styled-components dengan benar (mencegah flash of unstyled content).
- **styled-components** — seluruh styling memakai styled-components
  (`*.styles.js` di samping tiap komponen/halaman), dengan design token
  terpusat di `src/styles/theme.js`.
- **Redux Toolkit** menyimpan hampir seluruh state yang bersumber dari API.
  Semua pemanggilan REST API terpusat di `src/utils/api.js`, hanya dipanggil
  dari dalam Redux thunk — **tidak ada** `fetch()` langsung di lifecycle/efek
  komponen React.
- **Optimistic UI** untuk vote thread & komentar (lihat `src/states/voteHelper.js`).
- `utils/api.js` aman dipanggil saat **SSR** (akses `localStorage` di-guard
  dengan `typeof window !== 'undefined'`).

## Testing

| Jenis Pengujian | Tools | Lokasi | Perintah |
|---|---|---|---|
| Reducer | Vitest | `src/states/**/*.test.js` | `npm test` |
| Thunk Function | Vitest (API di-mock) | `src/states/**/*.thunk.test.js` | `npm test` |
| React Component | Vitest + React Testing Library | `src/components/**/*.test.jsx` | `npm test` |
| End-to-End (alur login) | Cypress | `cypress/e2e/login.cy.js` | `npm run e2e` |

Setiap berkas pengujian diawali komentar blok berisi **skenario pengujian**
yang dicakup berkas tersebut.

## Deployment (CI/CD)

### 1. Continuous Integration — GitHub Actions

Sudah disiapkan di `.github/workflows/ci.yml`, berjalan otomatis setiap kali
ada `push` atau `pull_request` ke `master`. Berisi dua job:
- **test**: install dependencies → `npm run lint` → `npm test` → `npm run build`.
- **e2e**: build lalu menjalankan Cypress (`npm run e2e`), tergantung job `test` lolos dulu.

Anda tidak perlu mengubah apa pun di sini — cukup push proyek ini ke GitHub
dan workflow akan otomatis terdeteksi dan berjalan.

### 2. Continuous Deployment — Vercel

Langkah yang **perlu Anda lakukan sendiri** (butuh akun & akses dashboard):

1. Push proyek ini ke sebuah repository GitHub baru.
2. Buka [vercel.com](https://vercel.com) → **Add New... → Project**.
3. Import repository GitHub Anda. Vercel otomatis mendeteksi ini sebagai
   proyek Next.js (tidak perlu konfigurasi build command/output khusus).
4. Klik **Deploy**. Setelah selesai, Vercel memberi Anda sebuah URL
   (mis. `https://nama-proyek-anda.vercel.app`) — **lampirkan URL ini di
   catatan submission Anda** (poin 5 pada kriteria Deployment).
5. Secara default, Vercel akan otomatis mendeploy ulang setiap ada push baru
   ke branch `master` (production deployment), dan membuat *preview deployment*
   terpisah untuk setiap pull request — ini sudah memenuhi syarat "Continuous
   Deployment dengan Vercel" tanpa perlu menulis workflow GitHub Actions
   tambahan khusus untuk deploy.

### 3. Memproteksi branch `master`

Dilakukan di GitHub (Settings repository Anda), bukan di kode:

1. Buka repository di GitHub → **Settings → Branches**.
2. Pada **Branch protection rules**, klik **Add branch protection rule**.
3. **Branch name pattern**: isi `master`.
4. Centang **Require a pull request before merging**.
5. Centang **Require status checks to pass before merging**, lalu cari dan
   pilih job `Lint, Unit Test & Build` (nama job `test` dari `ci.yml`) sebagai
   status check wajib. (Catatan: nama job baru muncul di daftar pilihan
   setelah workflow pernah berjalan minimal satu kali pada repository Anda —
   jalankan dulu satu push/PR percobaan sebelum menambahkannya di sini.)
6. Klik **Create** / **Save changes**.

### 4. Menyiapkan 3 Screenshot Bukti CI/CD

Semua langkah di bawah ini dilakukan di akun GitHub Anda sendiri:

**`1_ci_check_error.png`** — bukti CI gagal:
1. Buat branch baru, mis. `git checkout -b demo/ci-gagal`.
2. Rusak salah satu test dengan sengaja — contoh paling mudah: buka
   `src/states/message/messageSlice.test.js` dan ubah salah satu nilai
   `expect(...)` jadi nilai yang salah (mis. ganti `'success'` menjadi `'sukses'`).
3. Commit & push branch tersebut, lalu buka **Pull Request** ke `master` di GitHub.
4. Tunggu beberapa saat — tab **Checks** pada PR akan menampilkan tanda ❌
   merah pada job `test` karena `npm test` gagal. Screenshot halaman ini.

**`2_ci_check_pass.png`** — bukti CI lolos:
1. Kembalikan perubahan yang sengaja dirusak tadi ke kondisi semula (benar).
2. Commit & push lagi ke branch yang sama (PR yang sama otomatis ter-update).
3. Tunggu CI selesai berjalan ulang — tab **Checks** akan menampilkan tanda
   centang ✅ hijau pada job `test`. Screenshot halaman ini.

**`3_branch_protection.png`** — bukti branch protection aktif:
1. Masih di halaman Pull Request yang sama, screenshot bagian bawah PR yang
   menampilkan status "Required" pada status check, dan/atau tombol merge
   yang menunjukkan aturan proteksi berlaku (mis. teks "Merging is blocked"
   sebelum check lolos, atau label "Branch protection" pada PR).
   Anda juga bisa menambahkan screenshot halaman
   **Settings → Branches** yang menunjukkan rule `master` sudah aktif.

Setelah ketiga screenshot ini didapat, lampirkan di catatan submission Anda
bersama URL Vercel dari langkah Deployment di atas.

## Hal-hal yang Perlu Anda Lakukan Sendiri (Ringkasan)

Bagian-bagian berikut **tidak bisa saya lakukan langsung** karena butuh akun/
akses yang hanya Anda miliki:

1. **Push kode ini ke repository GitHub Anda** (buat repo baru, lalu `git init`,
   `git remote add origin ...`, `git push`).
2. **Jalankan `npm install` di komputer Anda sendiri** — supaya Cypress
   ter-download dengan benar (lingkungan saya tidak punya akses jaringan ke
   server unduhan Cypress), dan supaya Anda bisa mencoba `npm run dev`,
   `npm test`, `npm run e2e` secara langsung sebelum push.
3. **Hubungkan repository ke Vercel** dan deploy (lihat bagian Deployment di atas).
4. **Aktifkan branch protection rule** pada `master` di pengaturan repository GitHub.
5. **Ambil 3 screenshot** bukti CI/CD sesuai langkah di atas.
6. **Lampirkan URL Vercel + ketiga screenshot** pada catatan submission Dicoding Anda.

Semua kode (konfigurasi Next.js, styled-components, seluruh test, workflow
GitHub Actions, konfigurasi Cypress) sudah saya siapkan dan sudah saya
verifikasi lolos `npm run lint`, `npm test`, dan `npm run build` di
lingkungan saya.
