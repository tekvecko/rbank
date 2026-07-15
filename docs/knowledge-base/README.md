# Knowledge Base

Zde ukládáme dlouhodobá zjištění a debug tipy.
- **Termux memory limit:** Při buildu `gradlew assembleDebug` je doporučeno zavřít na telefonu náročné aplikace, aby Android neukončil proces kvůli OOM (Out Of Memory).
- **Tailwind v Capacitoru:** Pamatuj, že dynamické třídy se nemusí vygenerovat, pokud nejsou obsaženy v purgování, proto se v `History.jsx` musí bezpečně definovat barvy a stavy.
