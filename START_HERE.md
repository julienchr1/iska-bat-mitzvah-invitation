# 🎉 START HERE - Bienvenue !

Vous avez une landing page d'invitation COMPLÈTE et prête pour le déploiement ! 

---

## ⚡ 5 minutes pour être en ligne

### Ce qui est déjà fait ✅

```
✓ Landing page complète (mobile-first)
✓ Formulaire RSVP interactif
✓ API pour stocker les réponses
✓ Code source sur Git
✓ Prêt pour Supabase + Vercel
✓ Documentation complète
```

---

## 🚀 Ce qu'il reste à faire (les vraies 5 minutes)

### Étape 1️⃣ : Créer Supabase (3 min)

```
1. Allez sur https://supabase.com
2. Sign Up → Create Project
3. Name: iska-bat-mitzvah-invitation
4. Password: Notez-le ! 
5. Region: Europe (Frankfurt)
6. Attendez la création ⏳
```

→ [Guide détaillé](./SETUP_STEPS.md#étape-1️⃣--créer-un-compte-supabase-5-min)

### Étape 2️⃣ : Copier les 3 clés (1 min)

Dans Supabase → Settings → API :

```
Copier:
- Project URL      → NEXT_PUBLIC_SUPABASE_URL
- anon public      → NEXT_PUBLIC_SUPABASE_ANON_KEY
- service_role     → SUPABASE_SERVICE_ROLE_KEY
```

→ [Guide détaillé](./SETUP_STEPS.md#12-récupérer-les-clés-api)

### Étape 3️⃣ : Créer la table (1 min)

Dans Supabase → SQL Editor → Paste & Run :

```sql
CREATE TABLE rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  statut_rsvp TEXT NOT NULL CHECK (statut_rsvp IN ('oui', 'non', 'peut-être')),
  nombre_personnes INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON rsvp_responses
  FOR SELECT USING (true);
```

→ [Guide détaillé](./SETUP_STEPS.md#13-créer-la-table-sql)

---

## 📝 Maintenant c'est votre tour

### 1. Éditez `.env.local`

Remplacez les valeurs de placeholder avec vos clés Supabase :

```bash
# Ouvrez le fichier
cat .env.local
```

Vous devez voir :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 2. Testez localement

```bash
cd /Users/julien.chriqui-ext/iska-bat-mitzvah-invitation
npm run dev
```

Ouvrez : http://localhost:3000 ✨

Remplissez le formulaire et vérifiez dans Supabase que ça fonctionne.

### 3. Créez un repo GitHub

```bash
# Dans votre repo
git remote add origin https://github.com/YOUR-USERNAME/iska-bat-mitzvah-invitation.git
git branch -M main
git push -u origin main
```

(Remplacez `YOUR-USERNAME` par votre username GitHub)

### 4. Déployez sur Vercel

1. Allez sur https://vercel.com/new
2. Import your GitHub repo
3. Add Environment Variables (les mêmes 3 clés Supabase)
4. Click Deploy

**Boom ! 💥 Votre site est en ligne !**

---

## 📊 Vérifier que tout fonctionne

✅ Allez sur votre URL Vercel :
```
https://iska-bat-mitzvah-invitation.vercel.app
```

✅ Remplissez le formulaire

✅ Vérifiez dans Supabase que la réponse est sauvegardée

✅ Partagez l'URL avec vos invités ! 🎉

---

## 📚 Guides complets

| Guide | Durée | Contenu |
|-------|-------|---------|
| [SETUP_STEPS.md](./SETUP_STEPS.md) | 15 min | Étapes complètes |
| [CHECKLIST.md](./CHECKLIST.md) | - | Vérification à chaque étape |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | - | Résolution des problèmes |
| [README.md](./README.md) | 10 min | Documentation complète |
| [RESPONSES.md](./RESPONSES.md) | 5 min | Consulter les réponses |

---

## 💾 Fichiers importants

```
📁 Répertoire racine
├── 📄 .env.local           ← REMPLISSEZ AVEC VOS CLÉS
├── 📄 package.json         ← Dépendances
├── 📁 app/
│   ├── page.tsx            ← Landing page
│   ├── layout.tsx          ← Layout
│   ├── globals.css         ← Styles
│   └── api/rsvp/route.ts   ← API endpoint
└── 📁 components/
    ├── EventDetails.tsx    ← Infos événement
    └── RSVPForm.tsx        ← Formulaire RSVP
```

---

## 🔑 Credentials à ne pas oublier

Sauvegardez ces informations en sécurité :

```
Supabase Password: _______________
Project URL: _______________
Anon Key: _______________
Service Role Key: _______________
GitHub Repo: _______________
Vercel URL: _______________
```

---

## 🎨 Personnaliser

### Changer la date/lieu

Éditez : `components/EventDetails.tsx`

```javascript
// Cherchez "28 Juin 2026" et "6 bis rue Émile Allez"
// Changez les valeurs
```

### Changer les couleurs

Éditez : `app/globals.css`

```css
:root {
  --color-primary: #87ceeb;      /* Bleu ciel */
  --color-gold: #d4af37;         /* Or */
}
```

### Après modification

```bash
git add .
git commit -m "Update: description"
git push
```

**Vercel redéploie automatiquement ! 🚀**

---

## 📞 Questions rapides

**Q: Combien ça coûte ?**
A: Zéro ! Supabase et Vercel sont gratuits.

**Q: Mes clés sont-elles sécurisées ?**
A: Oui, elles sont dans `.gitignore` (non committées).

**Q: Où voir les réponses ?**
A: Supabase → Table Editor → `rsvp_responses`

**Q: Comment modifier le site ?**
A: Modifiez le code → `git push` → Vercel redéploie.

**Q: Combien d'invités max ?**
A: Supabase gratuit supporte des milliers de réponses.

---

## ⚡ Raccourcis des commandes

```bash
# Développement
npm run dev              # Démarrer le serveur local

# Build/Deploy
npm run build            # Build production
npm start                # Démarrer production

# Git
git status              # Voir les changements
git add .               # Ajouter les fichiers
git commit -m "msg"     # Créer un commit
git push                # Pousser sur GitHub
```

---

## ✨ Prochaines étapes

- [ ] Créer Supabase project
- [ ] Récupérer les clés
- [ ] Créer la table SQL
- [ ] Remplir `.env.local`
- [ ] Tester localement
- [ ] Créer GitHub repo
- [ ] Déployer sur Vercel
- [ ] Partager l'URL
- [ ] Consulter les réponses

---

## 🆘 Besoin d'aide ?

1. **Commandes à exécuter ?** → [SETUP_STEPS.md](./SETUP_STEPS.md)
2. **Problème ?** → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
3. **Vérifier mon progrès ?** → [CHECKLIST.md](./CHECKLIST.md)
4. **Documentation complète ?** → [README.md](./README.md)
5. **Consulter les réponses ?** → [RESPONSES.md](./RESPONSES.md)

---

## 🎉 VOUS ÊTES PRÊTS !

Votre landing page est prête à être mise en ligne.

**Suivez les étapes et ce sera fait en moins de 15 minutes !**

---

**Bon amusement pour la Bat Mitzvah d'Iska ! ✨**

*Pour commencer : Créez votre compte Supabase sur https://supabase.com*
