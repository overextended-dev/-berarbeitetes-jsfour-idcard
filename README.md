# jsfour-idcard

Überarbeitetes `jsfour-idcard` für ESX mit Unterstützung für mehrere Dokumente (z. B. Personalausweis und Führerschein) und Client-/Server-Integration über `jsfour-idcard:open`.

## Anforderungen

- FiveM / GTA V
- ESX Legacy / ESX Framework
- `mysql-async`
- Optional: `ox_lib` für Hinweisbenachrichtigungen

## Installation

1. Kopiere den Ordner `jsfour-idcard` in dein `resources/[core]`-Verzeichnis.
2. Stelle sicher, dass die folgenden Ressourcen in deiner `server.cfg` geladen werden:
   - `start mysql-async`
   - `start es_extended`
   - `start jsfour-idcard`
3. Überprüfe, dass `fxmanifest.lua` im Resource-Ordner vorhanden ist.

## Nutzung

Dieser Resource zeigt die Daten eines Spielers an, wenn das Event `jsfour-idcard:open` ausgelöst wird.

Beispielaufruf vom Server:

```lua
TriggerEvent('jsfour-idcard:open', source, targetPlayerId, 'idcard')
```

Parameter:

- `source` / `ID`: ID des ausstellenden Spielers (der Benutzer, dessen Daten geladen werden sollen)
- `targetPlayerId`: ID des Empfänger-Spielers (wer die Karte sehen soll)
- `type`: Dokumenttyp, z. B. `idcard` oder `driver_license`

## Funktionalität

- Liest Spielerinformationen aus der `users`-Tabelle (`firstname`, `lastname`, `dateofbirth`, `sex`, `height`).
- Liest Lizenzinformationen aus der `user_licenses`-Tabelle.
- Sendet die Daten an den Client, der das NUI-Overlay öffnet.
- Unterstützt Dokumentwechsel mit den Pfeiltasten (`Links`/`Rechts`, `Oben`/`Unten`).
- Schließt das Overlay bei `ESC` oder `Backspace`.

## Dateien

- `fxmanifest.lua` – Resource-Metadaten und Abhängigkeiten
- `server.lua` – Serverseitige Abfrage und Event-Logik
- `client.lua` – Clientseitige NUI-Integration und Tasteneingaben
- `html/index.html` – NUI-Oberfläche
- `html/assets/` – CSS, JS, Schriftarten und Bilder

## Hinweise

- Stelle sicher, dass deine Datenbank die entsprechenden `users`- und `user_licenses`-Tabellen enthält.
- Wenn `ox_lib` nicht installiert ist, funktionieren die Benachrichtigungen nicht, das Dokument selbst jedoch weiterhin.