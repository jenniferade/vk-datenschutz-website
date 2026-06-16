# Datenschutz-Aufklärungskampagne (Website)

Diese interaktive Single-Page-Application (SPA) ist Teil einer Datenschutz-Aufklärungskampagne. Das Ziel ist es, Nutzer (insbesondere Jugendliche und junge Erwachsene) auf emotionale und moderne Weise über digitale Überwachung, Datensammlung und Filterblasen im Alltag aufzuklären.

Das Projekt nutzt ein modernes, klares Design im Dark Mode mit prägnanten violetten Akzenten und wurde streng nach dem "Mobile First"-Ansatz entwickelt.

## ✨ Features

- **Dynamisches Profiling (Tipp-Effekt):** Dem Nutzer wird direkt beim Start ("eerie" Typing-Animation) vor Augen geführt, welche Daten ein Profiling-Algorithmus scheinbar über ihn besitzt.
- **Aha-Moment (Aura-Design):** Emotionales und klares Messaging zur Sensibilisierung, untermalt durch einen atmosphärischen Hintergrund.
- **Eingebettetes Video:** Nahtlos integrierter YouTube-Player für detaillierte Aufklärung.
- **3D-Flashcards:** Klickbare Karten mit harten Fakten (z. B. "Sie wissen, wo du warst", "Sie kennen deine Freunde").
- **Tinder-Style Swipe Stack:** Ein vertikaler Kartenstapel, bei dem Nutzer Konsequenzen (z. B. "Dynamic Pricing") aktiv wegwischen müssen.
- **Checkliste mit Animationen:** Ein Intersection-Observer sorgt für sanftes, gestaffeltes Einblenden der empfohlenen Schutzmaßnahmen.
- **Interaktives Datenschutz-Quiz:** Die Antworten des Nutzers werden evaluiert und in einem dynamischen, abschließenden Profil (z. B. "Datenschutz-Profi") ausgewertet.

## 🛠️ Technologien

- **HTML5 & CSS3:** Semantisches HTML, native CSS-Variablen und Grid/Flexbox-Layouts.
- **Vanilla JavaScript:** Leichtgewichtige interaktive Logik (Swipes, Observer, dynamische DOM-Injektion) ohne schwere Frameworks.
- **Vite:** Extrem schnelles Build-Tool und Entwicklungsserver.

## 🚀 Lokalen Server starten

Voraussetzung ist eine installierte Version von [Node.js](https://nodejs.org/) auf Ihrem Computer.

1. **Terminal im Projektverzeichnis öffnen**
   Navigieren Sie in den Ordner `data-privacy-campaign-website`.

2. **Abhängigkeiten installieren**
   Installieren Sie die benötigten Pakete mit npm:
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   Starten Sie den lokalen Vite-Server:
   ```bash
   npm run dev
   ```
   Die Website ist anschließend in Ihrem Browser (in der Regel unter `http://localhost:5173`) erreichbar. Bei jeder Änderung am Code lädt sich die Seite dank *Hot Module Replacement (HMR)* blitzschnell von selbst neu.

4. **Für Produktion kompilieren (Optional)**
   Wenn Sie die Website live stellen möchten, generiert dieser Befehl die optimierten und minifizierten Dateien:
   ```bash
   npm run build
   ```
   Der fertige Code befindet sich danach komprimiert im Ordner `dist/`.
