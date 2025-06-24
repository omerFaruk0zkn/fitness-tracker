# 🏃‍♂️ Fitness Tracker

**Fitness Tracker**, MongoDB–Express–React–Node (MERN) teknolojileri ile geliştirilmiş, kullanıcıların fitness verilerini (kalori, kilo, bölge ölçümleri vb.) takip etmelerini sağlayan, bir web uygulamasıdır.
🔗 [Canlı Uygulama](https://fitness-tracker-34b9.onrender.com)

---

## 📋 İçindekiler
- [Özellikler](#özellikler)  
- [Teknolojiler](#teknolojiler)  
- [Proje Yapısı](#proje-yapısı)  
- [Kurulum & Çalıştırma](#kurulum--çalıştırma)  
- [Test & Geliştirme](#test--geliştirme)  

---

## ✨ Özellikler

- Kullanıcı kaydı, giriş ve JWT tabanlı güvenlik
- Egzersiz türü (bölge bölge), tarih, açıklama gibi detaylarla eklenebilir egzersizler
- Çalışma Planı oluşturma
- Geçmiş aktivite listesi, düzenleme ve silme işlemleri
- Kullanıcı dostu React arayüzü ve mobil uyumlu tasarım

---

## 🚀 Teknolojiler

- **Frontend**: React, Tailwind CSS, Shadcn, Vite
- **Backend**: Node.js, Express.js
- **Veritabanı**: MongoDB
- **Kimlik Doğrulama**: JSON Web Tokens (JWT)
- **Durum Yönetimi**: Zustand

---

## 📁 Proje Yapısı

```
fitness-tracker/
├── server/
│    ├── config/
│    ├── controllers/
│    ├── fonts/
│    ├── middlewares/
│    ├── models/
│    ├── routes/
│    ├── utils/
│    └── app.js
│    └── server.js
├── client/
│   ├── src/
│     ├── api/
│     ├── assets/
│     ├── components/
│     ├── config/
│     ├── layout/
│     ├── lib/
│     ├── pages/
│     ├── store/
│     ├── App.jsx
│     └── main.jsx
├── .gitignore
├── package.json
```

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/omerFaruk0zkn/fitness-tracker.git
cd fitness-tracker
```

### 2. Ortam Değişkenlerini Ayarlayın

#### Backend (`/server` dizininde `.env` dosyası oluşturun):

```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_token_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 3. Bağımlılıkları Yükleyin ve Uygulamayı Başlatın

#### Backend:

```bash
cd server
npm install
npm run dev
```

#### Frontend:

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Test ve Geliştirme

- **Geliştirme Ortamı**: Vite ile hızlı geliştirme ve sıcak yeniden yükleme.
- **Hata Ayıklama**: Hem istemci hem de sunucu tarafında kapsamlı hata ayıklama araçları.
