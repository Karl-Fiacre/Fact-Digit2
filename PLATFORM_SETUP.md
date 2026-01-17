# Guide de Configuration Multi-Plateformes - Fact-Digit

Ce guide explique comment configurer et déployer Fact-Digit sur différentes plateformes.

## 📱 Mobile (Capacitor)

### Prérequis
- Node.js 18+
- Android Studio (pour Android)
- Xcode 14+ (pour iOS, sur macOS uniquement)

### Configuration initiale
```bash
# Installer les dépendances
npm install

# Construire l'application web
npm run build

# Ajouter les plateformes
npx cap add android
npx cap add ios

# Synchroniser le code
npx cap sync
```

### Développement
```bash
# Lancer en mode développement avec hot reload
npm run dev

# Ouvrir dans Android Studio
npx cap open android

# Ouvrir dans Xcode
npx cap open ios
```

### Build de production

#### Android
```bash
# Build APK
npx cap sync android
# Puis dans Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)

# Build AAB (pour Google Play)
# Dans Android Studio: Build > Build Bundle(s) / APK(s) > Build Bundle(s)
```

#### iOS
```bash
# Build pour App Store
npx cap sync ios
# Puis dans Xcode: Product > Archive
```

### Notifications Push

#### Configuration Android
1. Créer un projet Firebase
2. Télécharger `google-services.json`
3. Placer dans `android/app/google-services.json`
4. Ajouter le plugin dans `android/app/build.gradle`

#### Configuration iOS
1. Activer les notifications dans Apple Developer Portal
2. Créer un certificat APNs
3. Configurer dans Xcode: Signing & Capabilities > Push Notifications

---

## 💻 Desktop Electron

### Prérequis
- Node.js 18+
- Python 3.x (pour node-gyp)
- Visual Studio Build Tools (Windows)

### Installation
```bash
npm install
```

### Développement
```bash
# Lancer en mode développement
npm run electron-dev
```

### Build de production

#### Windows
```bash
# Build installateur Windows
npm run dist-win

# Build portable Windows
npm run pack-electron
```

#### Linux
```bash
npm run dist-linux
```

#### macOS
```bash
npm run dist-mac
```

### Fichiers générés
```
dist-electron/
├── Fact-Digit-Setup-1.0.0.exe    # Installeur Windows
├── Fact-Digit-Portable-1.0.0.exe # Portable Windows
├── Fact-Digit-1.0.0.AppImage     # Linux AppImage
├── Fact-Digit-1.0.0.deb          # Linux Debian
└── Fact-Digit-1.0.0.dmg          # macOS
```

### Fonctionnalités Desktop
- ✅ Mode offline avec synchronisation
- ✅ Export PDF natif
- ✅ Raccourcis clavier
- ✅ Menu d'application natif
- ✅ Notifications système
- ✅ Auto-stockage local

---

## 🦀 Desktop Tauri (Alternative légère)

### Prérequis
- Node.js 18+
- Rust 1.70+ ([rustup.rs](https://rustup.rs))
- Build tools système:
  - **Windows**: Visual Studio Build Tools avec C++ workload
  - **Linux**: `build-essential`, `libwebkit2gtk-4.0-dev`, `libssl-dev`
  - **macOS**: Xcode Command Line Tools

### Installation Rust
```bash
# Installation de Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Vérification
rustc --version
cargo --version
```

### Installation des dépendances Tauri
```bash
npm install --save-dev @tauri-apps/cli
```

### Développement
```bash
# Lancer en mode développement
npm run tauri dev
```

### Build de production

#### Windows
```bash
npm run tauri build -- --target x86_64-pc-windows-msvc
```

#### Linux
```bash
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

#### macOS
```bash
# Intel
npm run tauri build -- --target x86_64-apple-darwin

# Apple Silicon
npm run tauri build -- --target aarch64-apple-darwin
```

### Avantages de Tauri vs Electron
- ✅ **Taille**: ~10-20 MB vs 150+ MB (Electron)
- ✅ **Mémoire**: Utilise WebView natif du système
- ✅ **Performance**: Meilleure utilisation des ressources
- ✅ **Sécurité**: Permissions granulaires par défaut

### Fichiers générés
```
src-tauri/target/release/bundle/
├── msi/             # Windows installer
├── deb/             # Debian package
├── appimage/        # Linux AppImage
└── dmg/             # macOS disk image
```

---

## 🌐 Web (Production)

### Déploiement Lovable
1. Cliquer sur "Publish" dans l'interface Lovable
2. L'app est automatiquement déployée
3. Accessible via `https://your-project.lovable.app`

### Déploiement personnalisé

#### Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

#### Netlify
```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# Build
npm run build

# Déployer (nécessite configuration du repo)
npm run deploy
```

---

## ⚙️ Configuration des Variables d'Environnement

### Développement
Créer `.env.local`:
```env
VITE_SUPABASE_URL=https://jdyfigqyefqtdnooktyk.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_publique
```

### Production
- **Lovable**: Configuré automatiquement
- **Vercel/Netlify**: Ajouter dans les settings du projet
- **Electron/Tauri**: Les clés sont bundlées (utiliser des clés publiques uniquement)

---

## 🔒 Sécurité

### Recommandations générales
- ❌ Ne JAMAIS inclure la clé API FNE dans le code
- ✅ Utiliser les edge functions pour les appels API sensibles
- ✅ Activer RLS (Row Level Security) sur Supabase
- ✅ Utiliser HTTPS en production
- ✅ Valider toutes les entrées utilisateur

### Configuration des permissions

#### Capacitor
Éditer `capacitor.config.ts` pour ajuster les permissions

#### Electron
Éditer `electron/main.js` - section `webPreferences`

#### Tauri
Éditer `src-tauri/tauri.conf.json` - section `allowlist`

---

## 📦 Scripts NPM disponibles

```json
{
  "dev": "Développement web",
  "build": "Build production web",
  "electron-dev": "Développement Electron",
  "dist-win": "Build Electron Windows",
  "dist-linux": "Build Electron Linux",
  "dist-mac": "Build Electron macOS",
  "tauri dev": "Développement Tauri",
  "tauri build": "Build Tauri production"
}
```

---

## 🐛 Dépannage

### Erreurs communes

#### Capacitor
- **Erreur de synchronisation**: `npx cap sync --force`
- **Plugins manquants**: Vérifier `capacitor.config.ts`

#### Electron
- **Erreur de build Windows**: Installer Visual Studio Build Tools
- **Certificat de signature**: Désactiver antivirus temporairement

#### Tauri
- **Rust non trouvé**: Redémarrer le terminal après installation
- **Erreur webkit (Linux)**: `sudo apt install libwebkit2gtk-4.0-dev`

### Logs de debug
- **Capacitor**: `npx cap run android -l` (Android logs)
- **Electron**: DevTools s'ouvrent en mode dev
- **Tauri**: `npm run tauri dev` affiche les logs Rust

---

## 📚 Ressources

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Documentation Electron](https://www.electronjs.org/docs)
- [Documentation Tauri](https://tauri.app/v1/guides/)
- [Lovable Docs](https://docs.lovable.dev)

---

## 🚀 Déploiement Recommandé

Pour une couverture maximale:
1. **Web**: Lovable/Vercel (accès universel)
2. **Mobile**: Capacitor (iOS + Android)
3. **Desktop**: Tauri (léger, moderne) OU Electron (plus de compatibilité)

Chaque plateforme partage le même code source React, garantissant une expérience cohérente.
