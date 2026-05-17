# 🚀 Guide de Déploiement - Invitation Bat Mitzvah

Ce guide explique comment déployer la landing page d'invitation sur internet en 5 minutes.

## Étape 1️⃣ : Créer un compte Supabase (5 minutes)

### 1. Créer le projet

1. Allez sur https://supabase.com
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub, Google ou un email
4. Créez une nouvelle organisation
5. Créez un nouveau projet :
   - **Name** : `iska-bat-mitzvah-invitation`
   - **Database Password** : Créez un mot de passe sécurisé (notez-le !)
   - **Region** : Europe (Frankfurt) pour la meilleure latence

### 2. Récupérer vos clés API

Une fois le projet créé :

1. Allez dans **Settings** → **API**
2. Copiez les clés suivantes :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Gardez secret !)

Gardez ces valeurs, vous en aurez besoin plus tard.

### 3. Créer la table dans Supabase

1. Allez dans **SQL Editor** (left sidebar)
2. Cliquez sur **New Query**
3. Collez ce code SQL :

```sql
-- Create table
CREATE TABLE rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  statut_rsvp TEXT NOT NULL CHECK (statut_rsvp IN ('oui', 'non', 'peut-être')),
  nombre_personnes INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts
CREATE POLICY "Allow public inserts" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- Create policy for public select
CREATE POLICY "Allow public select" ON rsvp_responses
  FOR SELECT USING (true);

-- Create policy for public updates
CREATE POLICY "Allow public updates" ON rsvp_responses
  FOR UPDATE USING (true) WITH CHECK (true);
```

4. Cliquez sur **Run** (le bouton play ▶️)
5. Attendez le message de succès ✅

## Étape 2️⃣ : Configurer votre code local

### 1. Mettre à jour .env.local

Ouvrez le fichier `.env.local` dans votre éditeur et remplacez les valeurs :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Remplacez `xxxxx` et les clés par vos vraies valeurs de Supabase.

### 2. Tester en local

```bash
npm run dev
```

Ouvrez http://localhost:3000 dans votre navigateur et testez le formulaire.

## Étape 3️⃣ : Déployer sur Vercel (gratuit !)

### Option A : Déploiement via le dashboard Vercel (recommandé)

#### 1. Pousser le code sur GitHub

```bash
# Initialisez un repo Git si ce n'est pas déjà fait
git init
git add .
git commit -m "Initial commit: Bat Mitzvah invitation"

# Créez un repo sur GitHub
# Puis poussez votre code
git remote add origin https://github.com/YOUR-USERNAME/iska-bat-mitzvah-invitation.git
git branch -M main
git push -u origin main
```

#### 2. Déployer sur Vercel

1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Cliquez sur **Import Project**
4. Sélectionnez votre repo `iska-bat-mitzvah-invitation`
5. Cliquez sur **Import**
6. Configurez les variables d'environnement :
   - Cliquez sur **Environment Variables**
   - Ajoutez les 3 variables depuis Supabase :
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
7. Cliquez sur **Deploy**

⏳ Attendez 2-3 minutes... Vercel déploie automatiquement ! 🎉

Votre site sera accessible à : `https://iska-bat-mitzvah-invitation.vercel.app`

### Option B : Déploiement CLI (rapide)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel

# Ajouter les variables d'environnement quand demandé
```

## Étape 4️⃣ : Tester votre site en ligne

1. Allez sur votre URL Vercel : `https://iska-bat-mitzvah-invitation.vercel.app`
2. Testez le formulaire :
   - Entrez un nom
   - Sélectionnez une réponse (Oui/Non/Peut-être)
   - Modifiez le nombre de personnes
   - Cliquez sur "Confirmer ma présence"

✅ Si le formulaire fonctionne, c'est bon !

## Étape 5️⃣ : Consulter les réponses

### Dans Supabase

1. Allez sur https://app.supabase.com
2. Ouvrez votre projet
3. Allez dans **Table Editor**
4. Cliquez sur `rsvp_responses`
5. Voyez toutes les réponses ! 📊

### Via SQL Query

Dans **SQL Editor**, exécutez :

```sql
SELECT nom, statut_rsvp, nombre_personnes, created_at 
FROM rsvp_responses 
ORDER BY created_at DESC;
```

## 🔗 Partager le lien

Votre site est maintenant en ligne ! Partagez :

```
https://iska-bat-mitzvah-invitation.vercel.app
```

Ou avec un lien personnalisé (optionnel) :

Dans Vercel :
1. **Settings** → **Domains**
2. Ajoutez un domaine personnalisé
3. Pointez votre DNS vers Vercel

## ❓ Dépannage

### "Erreur de connexion à la base de données"
- Vérifiez que vos clés Supabase dans `.env.local` et Vercel sont correctes
- Assurez-vous que la table `rsvp_responses` existe

### "Le formulaire ne soumet pas"
- Vérifiez dans le navigateur : Ouvrez la console (F12) → **Network** tab
- Cherchez la requête `/api/rsvp` et voyez l'erreur exacte
- Vérifiez que RLS est activé et que les policies existent

### "CORS error"
- Allez dans Supabase → **Settings** → **API**
- Vérifiez que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est la clé "anon"

## 🎨 Personnalisation après déploiement

Vous pouvez modifier :

### Les détails de l'événement
- Ouvrez `components/EventDetails.tsx`
- Changez la date, le lieu, etc.
- Committez et poussez : `git push`
- Vercel redéploie automatiquement ! 🚀

### Les couleurs
- Modifiez `app/globals.css` (variables CSS)
- Committez et poussez

### Le style du formulaire
- Modifiez `components/RSVPForm.tsx`
- Committez et poussez

## 📊 Statistiques

Pour voir les stats en temps réel :

**Requête SQL** :
```sql
SELECT 
  statut_rsvp, 
  COUNT(*) as total,
  SUM(nombre_personnes) as participants
FROM rsvp_responses
GROUP BY statut_rsvp;
```

## ✨ Tout est prêt !

Vous avez maintenant une landing page entièrement fonctionnelle pour la Bat Mitzvah ! 

**Bon amusement ! 🎉**

---

**Questions ?** Consultez :
- [Docs Next.js](https://nextjs.org/docs)
- [Docs Supabase](https://supabase.com/docs)
- [Docs Vercel](https://vercel.com/docs)
