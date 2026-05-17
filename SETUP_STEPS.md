# 🚀 Guide complet de configuration - Étape par étape

## Étape 1️⃣ : Créer un compte Supabase (5 min)

### 1.1 Créer le projet
1. Allez sur https://supabase.com/
2. Cliquez sur **Sign Up**
3. Connectez-vous avec GitHub, Google ou Email
4. Créez une nouvelle organisation (si nécessaire)
5. Cliquez sur **New Project**
   - **Name**: `iska-bat-mitzvah-invitation`
   - **Database Password**: Créez un mot de passe fort et **NOTEZ-LE**
   - **Region**: `Europe (Frankfurt)` pour la meilleure latence
6. Attendez quelques minutes que le projet soit créé ⏳

### 1.2 Récupérer les clés API

Une fois le projet créé :
1. Allez dans **Settings** → **API** (left sidebar)
2. Vous verrez 3 clés :
   - **Project URL**: `https://xxxxx.supabase.co` → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public**: `eyJhbGc...` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret**: `eyJhbGc...` → `SUPABASE_SERVICE_ROLE_KEY`

**Copiez ces 3 valeurs** - vous en aurez besoin pour `.env.local`

### 1.3 Créer la table SQL

1. Allez dans **SQL Editor** (left sidebar)
2. Cliquez sur **+ New Query**
3. Copiez-collez ce code SQL :

```sql
-- Créer la table
CREATE TABLE rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  statut_rsvp TEXT NOT NULL CHECK (statut_rsvp IN ('oui', 'non', 'peut-être')),
  nombre_personnes INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (sécurité)
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Permettre les insertions publiques
CREATE POLICY "Allow public inserts" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- Permettre les lectures publiques
CREATE POLICY "Allow public select" ON rsvp_responses
  FOR SELECT USING (true);

-- Permettre les updates
CREATE POLICY "Allow public updates" ON rsvp_responses
  FOR UPDATE USING (true) WITH CHECK (true);
```

4. Cliquez sur **Run** (bouton play ▶️)
5. Attendez le message ✅ "Success"

✅ **Supabase est maintenant prêt !**

---

## Étape 2️⃣ : Configurer .env.local (2 min)

1. Ouvrez le fichier `.env.local` dans votre éditeur
2. Remplacez les valeurs de placeholder :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Remplacez avec vos vraies clés de l'étape 1.2

3. Sauvegardez le fichier

✅ **Configuration locale terminée !**

---

## Étape 3️⃣ : Tester localement (5 min)

```bash
# Dans le répertoire du projet
npm run dev
```

Attendez quelques secondes...

```
✓ Ready in 2.5s
- Local: http://localhost:3000
```

### Tester le formulaire :

1. Ouvrez http://localhost:3000 dans votre navigateur
2. Remplissez le formulaire :
   - Nom: `Test User`
   - Réponse: Cliquez sur "Oui"
   - Nombre: `2`
3. Cliquez sur "Confirmer ma présence"
4. Vous devez voir : "Merci beaucoup ! ✨"

### Vérifier dans Supabase :

1. Allez dans Supabase → **Table Editor**
2. Cliquez sur `rsvp_responses`
3. Vous devez voir votre ligne ! ✅

✅ **Tout fonctionne localement !**

---

## Étape 4️⃣ : Créer un repo GitHub (3 min)

### 4.1 Créer le repo

1. Allez sur https://github.com/new
2. Remplissez :
   - **Repository name**: `iska-bat-mitzvah-invitation`
   - **Description**: `Landing page d'invitation pour la Bat Mitzvah d'Iska`
   - **Public** (cochez)
   - ✅ **Create repository**

### 4.2 Pousser le code

Dans votre terminal, exécutez :

```bash
cd /Users/julien.chriqui-ext/iska-bat-mitzvah-invitation

git remote add origin https://github.com/YOUR-USERNAME/iska-bat-mitzvah-invitation.git
git branch -M main
git push -u origin main
```

Remplacez `YOUR-USERNAME` par votre username GitHub

⏳ Attendez quelques secondes...

```
Enumerating objects: 29, done.
Writing objects: 100%
...
 * [new branch] main -> main
```

✅ **Code pushé sur GitHub !**

---

## Étape 5️⃣ : Déployer sur Vercel (5 min)

### 5.1 Créer le déploiement

1. Allez sur https://vercel.com/new
2. Cliquez sur **Import your GitHub repo**
3. Selectionnez : `YOUR-USERNAME/iska-bat-mitzvah-invitation`
4. Cliquez sur **Import**

### 5.2 Ajouter les variables d'environnement

1. Dans la page de configuration de Vercel
2. Allez à **Environment Variables**
3. Ajoutez les 3 variables :

| Clé | Valeur |
|-----|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` |

(Récupérez-les de Supabase Settings → API)

### 5.3 Déployer

1. Cliquez sur **Deploy**
2. Attendez 2-3 minutes ⏳

```
✓ Deployment successful!
https://iska-bat-mitzvah-invitation.vercel.app
```

✅ **Votre site est en ligne !**

---

## Étape 6️⃣ : Tester le site en ligne (2 min)

1. Allez sur votre URL Vercel :
   ```
   https://iska-bat-mitzvah-invitation.vercel.app
   ```

2. Testez le formulaire :
   - Remplissez avec un autre nom
   - Cliquez "Confirmer ma présence"
   - Vous devez voir le message de succès ✅

3. Vérifiez dans Supabase :
   - Table Editor → `rsvp_responses`
   - Vous devez voir votre nouveau test ✅

---

## ✅ C'est fait !

Vous avez maintenant :

✅ Landing page en ligne  
✅ Formulaire RSVP fonctionnel  
✅ Base de données Supabase  
✅ Déploiement automatique sur Vercel  

### 🎉 Partager le lien

Partagez cette URL avec vos invités :
```
https://iska-bat-mitzvah-invitation.vercel.app
```

### 📊 Consulter les réponses

À tout moment, allez dans Supabase → Table Editor → `rsvp_responses` pour voir les réponses !

---

## 🔄 Modifier le contenu

Si vous voulez changer quelque chose :

1. Modifiez le fichier (par ex: `components/EventDetails.tsx`)
2. Committez :
   ```bash
   git add .
   git commit -m "Update event details"
   git push
   ```
3. Vercel redéploie automatiquement ! 🚀

---

## 🆘 Dépannage

### "Erreur de connexion à la base de données"
- Vérifiez que `.env.local` a les bonnes clés
- Vérifiez dans Vercel → Settings → Environment Variables

### "La table n'existe pas"
- Allez dans Supabase SQL Editor
- Exécutez le SQL de l'étape 1.3

### "Le formulaire ne fonctionne pas"
- Ouvrez la console du navigateur (F12)
- Regardez les erreurs
- Vérifiez RLS dans Supabase

---

## 📞 Besoin d'aide ?

Consultez :
- [README.md](./README.md) - Docs complète
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guide détaillé
- [STRUCTURE.md](./STRUCTURE.md) - Architecture technique

**Bon amusement pour la Bat Mitzvah ! 🎉✨**
