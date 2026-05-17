# ✅ Checklist de déploiement

Suivez cette checklist pour vous assurer que tout est configuré correctement.

## 📋 Phase 1 : Préparation locale

- [ ] **Dépendances installées**
  ```bash
  npm install
  ```

- [ ] **Build réussi**
  ```bash
  npm run build
  ```
  ✓ Vous voyez `✓ Compiled successfully`

- [ ] **Repo Git initialisé**
  ```bash
  git status
  ```
  ✓ Vous voyez `On branch main`

- [ ] **Fichier .env.local existe**
  - Vérifiez : `/path/to/iska-bat-mitzvah-invitation/.env.local`
  - Contient 3 lignes (même vides)

---

## 🔐 Phase 2 : Configuration Supabase

### Création du projet
- [ ] **Compte Supabase créé**
  - Allez sur https://supabase.com
  - Sign up / Login

- [ ] **Nouveau projet créé**
  - Name: `iska-bat-mitzvah-invitation`
  - Region: Europe (Frankfurt)
  - Password: Noté en sécurité ✓

- [ ] **Projet finalisé**
  - Attendez le message "Project created"
  - Page d'accueil du projet chargée

### Récupération des clés
- [ ] **URL du projet copié**
  - Settings → API → Project URL
  - Format: `https://xxxxx.supabase.co`
  - Stocké dans `.env.local` comme `NEXT_PUBLIC_SUPABASE_URL`

- [ ] **Clé anon copié**
  - Settings → API → anon public
  - Format: `eyJhbGc...` (long token)
  - Stocké dans `.env.local` comme `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- [ ] **Clé service_role copié**
  - Settings → API → service_role secret
  - Format: `eyJhbGc...` (long token)
  - Stocké dans `.env.local` comme `SUPABASE_SERVICE_ROLE_KEY`

### Création de la table
- [ ] **SQL exécuté**
  - SQL Editor → New Query
  - Copié-collé le code SQL complet
  - Cliqué "Run"
  - Message ✅ "Success"

- [ ] **Table visible**
  - Table Editor → `rsvp_responses` existe
  - 5 colonnes visibles :
    - id (UUID)
    - nom (text)
    - statut_rsvp (text)
    - nombre_personnes (int)
    - created_at (timestamp)

- [ ] **RLS activé**
  - Table Editor → Policies tab
  - Au moins 3 policies visibles

---

## 🔧 Phase 3 : Configuration locale .env.local

- [ ] **NEXT_PUBLIC_SUPABASE_URL complété**
  - Non vide ✓
  - Commence par `https://`
  - Contient `.supabase.co`

- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY complété**
  - Non vide ✓
  - Commence par `eyJ`
  - Environ 200+ caractères

- [ ] **SUPABASE_SERVICE_ROLE_KEY complété**
  - Non vide ✓
  - Commence par `eyJ`
  - Environ 200+ caractères

---

## 🧪 Phase 4 : Test local

- [ ] **Dev server démarré**
  ```bash
  npm run dev
  ```
  ✓ Vous voyez `Ready in Xs`

- [ ] **Landing page accessible**
  - Allez sur http://localhost:3000
  - Page charge sans erreurs ✓

- [ ] **Formulaire rempli et soumis**
  - Nom: `Test User`
  - Réponse: Sélectionnez une option
  - Nombre: Modifiez le nombre
  - Cliquez "Confirmer ma présence"

- [ ] **Message de succès**
  - Vous voyez "Merci beaucoup ! ✨"

- [ ] **Réponse dans Supabase**
  - Supabase → Table Editor → `rsvp_responses`
  - Vous voyez une ligne avec votre test

- [ ] **Dev server arrêté**
  ```bash
  Ctrl+C
  ```

---

## 🌐 Phase 5 : GitHub & Vercel

### Créer repo GitHub
- [ ] **GitHub repo créé**
  - Allez sur https://github.com/new
  - Name: `iska-bat-mitzvah-invitation`
  - Public ✓
  - Created ✓

- [ ] **Code pushé sur GitHub**
  ```bash
  git remote add origin https://github.com/YOUR-USERNAME/iska-bat-mitzvah-invitation.git
  git branch -M main
  git push -u origin main
  ```
  ✓ Pas d'erreur

- [ ] **Repo visible sur GitHub**
  - Allez sur https://github.com/YOUR-USERNAME/iska-bat-mitzvah-invitation
  - Tous les fichiers sont là ✓

### Déployer sur Vercel
- [ ] **Projet créé sur Vercel**
  - Allez sur https://vercel.com/new
  - Import repo GitHub ✓

- [ ] **Variables d'env ajoutées**
  - Environment Variables tab
  - 3 variables ajoutées :
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY`
  - Chaque variable a une vraie valeur ✓

- [ ] **Déploiement lancé**
  - Cliquez "Deploy"
  - Attendez 2-3 minutes ⏳

- [ ] **Déploiement réussi**
  - Page montre "Deployment successful"
  - URL affichée : `https://iska-bat-mitzvah-invitation.vercel.app`

---

## 🧪 Phase 6 : Test en ligne

- [ ] **Site accessible en ligne**
  - Allez sur `https://iska-bat-mitzvah-invitation.vercel.app`
  - Page charge sans erreurs ✓

- [ ] **Formulaire fonctionne**
  - Remplissez avec un nom différent
  - Soumettez le formulaire
  - Vous voyez le message de succès ✓

- [ ] **Réponse dans Supabase**
  - Supabase → Table Editor → `rsvp_responses`
  - Votre test en ligne est visible ✓

---

## 🎯 Phase 7 : Finalisation

- [ ] **URL notée**
  - Votre URL publique : `https://iska-bat-mitzvah-invitation.vercel.app`
  - Stockée en sécurité pour partager

- [ ] **Documentation lue**
  - [SETUP_STEPS.md](./SETUP_STEPS.md) - Ce que vous avez fait
  - [README.md](./README.md) - Docs complète
  - [RESPONSES.md](./RESPONSES.md) - Comment consulter les réponses

- [ ] **Prêt à partager**
  - Pouvez envoyer l'URL aux invités
  - Pouvez consulter les réponses dans Supabase
  - Pouvez modifier le contenu si nécessaire

---

## 🚀 Prêt pour le lancement !

Si toutes les cases sont cochées ✅, vous êtes prêt !

### Prochaines étapes
1. Partagez l'URL avec les invités
2. Consultez les réponses régulièrement dans Supabase
3. Si besoin, modifiez et re-deployez

### Pour modifier le contenu

Si vous voulez changer quelque chose :

1. Modifiez le fichier (par ex: `components/EventDetails.tsx`)
2. Committez et poussez :
   ```bash
   git add .
   git commit -m "Update: description de changement"
   git push
   ```
3. Vercel redéploie automatiquement ! 🚀

---

## 💡 Tips

- **Gardez `.env.local` sécurisé** : Il contient vos clés
- **Ne committez jamais `.env.local`** : C'est dans `.gitignore`
- **Supabase est gratuit** : Vous pouvez consulter les réponses à tout moment
- **Vercel est gratuit** : Pas besoin de payer pour Next.js
- **Tout est sauvegardé** : En cas de problème, vous pouvez redéployer

---

## 🆘 Si quelque chose n'est pas coché

Consultez :
1. [SETUP_STEPS.md](./SETUP_STEPS.md) - Guide étape par étape
2. [README.md](./README.md) - Dépannage section
3. [DEPLOYMENT.md](./DEPLOYMENT.md) - Guide détaillé

**Bon amusement pour la Bat Mitzvah ! 🎉✨**
