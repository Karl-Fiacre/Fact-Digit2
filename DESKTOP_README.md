# Script de Build Desktop

## Prérequis
1. Node.js 16+ installé
2. Python 3.x pour node-gyp (Windows)
3. Visual Studio Build Tools (Windows)

## Installation des dépendances
```bash
npm install
```

## Développement Electron
```bash
# Lancer en mode développement avec hot reload
npm run electron-dev
```

## Build pour production
```bash
# Build pour Windows (génère un .exe)
npm run dist-win

# Build portable Windows
npm run pack-electron

# Build pour toutes les plateformes
npm run build-electron
```

## Structure des fichiers générés
```
dist-electron/
├── Fact-Digit-Setup-1.0.0.exe    # Installeur Windows
├── Fact-Digit-Portable-1.0.0.exe # Version portable
└── win-unpacked/                   # Version non-packagée
```

## Configuration
- Configuration Electron : `electron/main.js`
- Scripts de build : `electron-package.json`
- Icons : `electron/assets/`

## Fonctionnalités Desktop
- Mode offline avec synchronisation différée
- Export PDF natif
- Raccourcis clavier
- Menu d'application natif
- Notifications système
- Auto-updater (à implémenter)

## Déploiement
1. Générer le build : `npm run dist-win`
2. Tester l'installeur : `dist-electron/Fact-Digit-Setup-1.0.0.exe`
3. Distribuer le fichier .exe

## Troubleshooting
- Erreur de certificat : désactiver temporairement l'antivirus
- Build qui échoue : vérifier Visual Studio Build Tools
- Problème de signature : configurer certificat de code (optionnel)