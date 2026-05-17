# 🔧 Guide de dépannage

Problèmes courants et comment les résoudre.

## ❌ Erreurs au démarrage local

### "npm: command not found"

**Problème**: Node.js ou npm n'est pas installé

**Solution**:
1. Allez sur https://nodejs.org
2. Téléchargez la version LTS
3. Installez-la
4. Redémarrez votre terminal
5. Vérifiez : `npm --version`

---

### "Cannot find module '@supabase/supabase-js'"

**Problème**: Les dépendances ne sont pas installées

**Solution**:
```bash
npm install
```

Attendez que l'installation se termine, puis :
```bash
npm run dev
```

---

### "Missing Supabase environment variables"

**Problème**: `.env.local` n'existe pas ou est vide

**Solution**:
1. Vérifiez que `.env.local` existe dans le répertoire racine
2. Ouvrez le fichier
3. Assurez-vous qu'il contient :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

Tous les champs doivent avoir une valeur (pas vides).

---

## ❌ Erreurs lors du test du formulaire

### "Erreur lors de la soumission du formulaire"

**Problème**: L'API endpoint ne peut pas se connecter à Supabase

**Solution**:
1. Vérifiez `.env.local` à nouveau
2. Vérifiez que les clés sont correctes (copiées sans espaces)
3. Vérifiez que Supabase table existe :
   - Allez dans Supabase → Table Editor
   - Vous devez voir `rsvp_responses`

---

### "Database connection failed"

**Problème**: Les clés Supabase sont incorrectes ou expirées

**Solution**:
1. Allez dans Supabase → Settings → API
2. Récupérez les clés à nouveau
3. Mettez à jour `.env.local`
4. Redémarrez le dev server : `npm run dev`

---

### Le formulaire se soumet mais aucun message de succès

**Problème**: Peut-être une erreur côté serveur

**Solution**:
1. Ouvrez la console du navigateur : **F12**
2. Allez dans l'onglet **Network**
3. Remplissez et soumettez le formulaire
4. Cherchez la requête `rsvp`
5. Cliquez dessus
6. Regardez la **Response**
7. Vous verrez l'erreur exacte

---

### "RLS policy violation"

**Problème**: Les permissions Supabase ne permettent pas l'insertion

**Solution**:
1. Allez dans Supabase → Table Editor
2. Cliquez sur `rsvp_responses`
3. Allez dans l'onglet **Policies**
4. Vérifiez que vous avez au moins :
   - `Allow public inserts`
   - `Allow public select`
5. Si absent, exécutez le SQL de création de la table

---

## ❌ Erreurs après déploiement sur Vercel

### "Site not found" ou "404 error"

**Problème**: Le déploiement a échoué

**Solution**:
1. Allez sur votre projet Vercel
2. Cliquez sur **Deployments**
3. Cherchez un déploiement rouge (failed)
4. Cliquez dessus
5. Regardez les logs d'erreur
6. Correction commune : variables d'env manquantes

---

### "Environment variables are missing"

**Problème**: Les variables d'env ne sont pas configurées dans Vercel

**Solution**:
1. Allez sur votre projet Vercel
2. Cliquez sur **Settings**
3. Allez à **Environment Variables**
4. Ajoutez les 3 variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Cliquez sur **Redeploy**

---

### Formulaire fonctionne localement mais pas en ligne

**Problème**: Les variables d'env en ligne sont incorrectes

**Solution**:
1. Vérifiez dans Vercel que chaque variable a une **valeur complète**
2. Pas d'espaces avant ou après
3. Les valeurs ne doivent pas être vides
4. Cliquez **Redeploy**

---

### "Cannot POST /api/rsvp"

**Problème**: L'API route n'est pas trouvée

**Solution**:
1. Vérifiez que le fichier existe :
   - `app/api/rsvp/route.ts`
2. Vérifiez que le code est correct (pas d'erreurs de syntaxe)
3. Essayez localement : `npm run dev`
4. Vérifiez le build : `npm run build`

---

## ❌ Erreurs avec GitHub & Vercel

### "Repository not found"

**Problème**: Le repo GitHub n'existe pas ou l'URL est incorrecte

**Solution**:
1. Vérifiez que le repo existe sur GitHub
2. Allez sur https://github.com/YOUR-USERNAME/iska-bat-mitzvah-invitation
3. Assurez-vous que c'est public (pas private)
4. Vérifiez que Vercel a accès à GitHub
5. Réessayez l'import sur Vercel

---

### "Permission denied" lors de git push

**Problème**: Git ne peut pas se connecter à GitHub

**Solution**:
1. Vérifiez votre git config :
   ```bash
   git config --global user.name
   git config --global user.email
   ```

2. Si c'est vide, configurez :
   ```bash
   git config --global user.name "Votre Nom"
   git config --global user.email "votre@email.com"
   ```

3. Essayez à nouveau :
   ```bash
   git push
   ```

---

### "Deployment keeps failing"

**Problème**: Vercel réessaie continuellement de déployer

**Solution**:
1. Allez sur votre projet Vercel
2. Cliquez sur **Settings** → **Deployments**
3. Cherchez un déploiement failure
4. Cliquez sur **View Logs**
5. Cherchez la ligne d'erreur rouge
6. Corrigez le problème
7. Poussez le fix : `git push`
8. Vercel redéploie automatiquement

---

## ❌ Erreurs Supabase

### "Table already exists"

**Problème**: La table existe déjà

**Solution**:
- C'est normal, vous avez déjà exécuté le SQL
- Continuez, aucune action nécessaire

---

### "Invalid credentials" dans la console

**Problème**: Les clés Supabase ne sont pas bonnes

**Solution**:
1. Allez dans Supabase → Settings → API
2. Vérifiez les clés
3. Copiez à nouveau (attention aux espaces)
4. Mettez à jour `.env.local`
5. Redémarrez le dev server

---

### Aucune donnée dans la table après soumission

**Problème**: Peut-être une erreur RLS ou API

**Solution**:
1. Vérifiez la console du navigateur (F12)
2. Cherchez les erreurs d'API
3. Essayez d'ajouter manuellement une ligne dans Supabase :
   ```sql
   INSERT INTO rsvp_responses (nom, statut_rsvp, nombre_personnes)
   VALUES ('Test', 'oui', 1);
   ```
4. Si ça fonctionne, c'est un problème d'API
5. Vérifiez `.env.local` à nouveau

---

## ✅ Dépannage rapide - Checklist

- [ ] `.env.local` existe et n'est pas vide
- [ ] Supabase table `rsvp_responses` existe
- [ ] Supabase RLS policies existent
- [ ] Clés Supabase sont dans `.env.local` ET dans Vercel
- [ ] Dev server redémarré après changement d'env
- [ ] Vercel redéployé après changement d'env
- [ ] GitHub repo est public
- [ ] Pas d'espaces avant/après dans les clés

---

## 🔍 Comment déboguer

### 1. Vérifier la console locale

```bash
npm run dev
```

Regardez les erreurs dans le terminal.

### 2. Vérifier la console du navigateur

Appuyez sur **F12** → **Console** tab

Cherchez les erreurs rouges.

### 3. Vérifier Network tab

F12 → **Network** tab → Remplissez le formulaire

Cherchez la requête `rsvp` POST

Vérifiez la réponse (response body)

### 4. Vérifier les logs Vercel

Allez sur votre projet Vercel → **Deployments** → Cliquez sur un déploiement → **View Logs**

---

## 📞 Si rien ne marche

1. Lisez [README.md](./README.md) - Dépannage section
2. Lisez [SETUP_STEPS.md](./SETUP_STEPS.md) - Vérifiez chaque étape
3. Vérifiez la [CHECKLIST.md](./CHECKLIST.md) - Que manque-t-il ?
4. Google l'erreur exacte + "Next.js" ou "+ Supabase"
5. Consultez :
   - [Next.js Docs](https://nextjs.org/docs)
   - [Supabase Docs](https://supabase.com/docs)
   - [Vercel Docs](https://vercel.com/docs)

---

## 🆘 Messages d'erreur communs

| Erreur | Cause | Solution |
|--------|-------|----------|
| `Cannot find module` | Dépendance manquante | `npm install` |
| `Missing env vars` | `.env.local` vide | Remplissez `.env.local` |
| `Connection failed` | Clés incorrectes | Vérifiez Supabase → API |
| `404 Not Found` | API route manquante | Vérifiez `app/api/rsvp/route.ts` |
| `RLS policy` | Permissions refusées | Vérifiez RLS dans Supabase |
| `Environment variables missing` | Vercel n'a pas les vars | Ajoutez dans Vercel Settings |

---

**Bon amusement pour la Bat Mitzvah ! 🎉✨**

*Si vous êtes bloqué, consultez [SETUP_STEPS.md](./SETUP_STEPS.md) ou lisez la section dépannage du [README.md](./README.md)*
