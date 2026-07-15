# Backend Overview

## Účel
Backend je centrální vrstva systému RBank, aktuálně hostovaná na cloudové infrastruktuře AWS (Node.js).

Zajišťuje veškerou komunikaci mezi klientskou aplikací (React/Capacitor) a databází. Klientská aplikace nikdy nepřistupuje přímo do databáze.

## Odpovědnosti backendu
- Poskytování REST API
- Zpracování CORS pro webové klienty
- Validace vstupů
- Business logika
- Přístup k databázi
- Autentizace a autorizace
- Logování

## Princip
Frontend (React) -> HTTP/REST -> Node.js Backend (AWS) -> Databáze

Backend představuje jediný vstupní bod pro práci s daty.

## Dlouhodobý cíl
Backend musí být schopen obsloužit:
- Hybridní mobilní aplikaci (Capacitor)
- Standardní webový prohlížeč
- Externí API klienty
