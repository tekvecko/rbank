# System Components

Systém je složen ze tří hlavních technologických pilířů.

## 1. Frontend (RBank App)
- **Framework:** React.js s Vite
- **UI & Stylování:** Tailwind CSS (Navy Blue design systém)
- **Nativní běhové prostředí:** Capacitor (obaluje web do Android APK)
- **Routování:** React Router DOM

## 2. Backend (API Gateway)
- **Prostředí:** Node.js (hostováno na AWS EC2 / VM)
- **Architektura:** RESTful API
- **Úloha:** Validace dat, autentizace, abstrakce databáze, ochrana před přímým přístupem.

## 3. Storage (Databáze)
- Relační databáze (Plánováno PostgreSQL nebo MySQL)
- Drží "Single Source of Truth" (jedinou verzi pravdy).
