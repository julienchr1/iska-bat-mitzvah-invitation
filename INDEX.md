# 🎉 Invitation Bat Mitzvah d'Iska - Documentation

Bienvenue ! Voici tous les guides pour utiliser cette landing page.

## 📍 Où commencer ?

### ⚡ Je veux démarrer rapidement
→ **[QUICK_START.md](./QUICK_START.md)** (3 min)

### 🚀 Je veux déployer en ligne
→ **[DEPLOYMENT.md](./DEPLOYMENT.md)** (15 min)

### 📖 Je veux comprendre le projet
→ **[README.md](./README.md)** (documentation complète)

### 📐 Je veux voir l'architecture
→ **[STRUCTURE.md](./STRUCTURE.md)** (architecture technique)

### 📊 Je veux consulter les réponses
→ **[RESPONSES.md](./RESPONSES.md)** (gérer les RSVP)

---

## 📑 Guide par étape

### Étape 1️⃣ : Configuration locale

```bash
# Le projet est déjà préparé
# Installez les dépendances
npm install

# Vérifiez que .env.local existe
# (voir DEPLOYMENT.md - Étape 2)

# Démarrez le serveur
npm run dev
```

[Voir QUICK_START.md pour les détails](./QUICK_START.md)

### Étape 2️⃣ : Configuration Supabase

1. Créer un compte Supabase
2. Créer la table `rsvp_responses`
3. Ajouter les clés dans `.env.local`

[Voir DEPLOYMENT.md - Étapes 1 et 2](./DEPLOYMENT.md)

### Étape 3️⃣ : Déployer sur Vercel

1. Pousser le code sur GitHub
2. Connecter GitHub à Vercel
3. Ajouter les variables d'environnement
4. Vercel déploie automatiquement

[Voir DEPLOYMENT.md - Étape 3](./DEPLOYMENT.md)

### Étape 4️⃣ : Partager et consulter

- Partagez l'URL Vercel
- Consultez les réponses dans Supabase
- Exportez les données si besoin

[Voir RESPONSES.md pour les requêtes SQL](./RESPONSES.md)

---

## 🎯 Cas d'usage courants

### "Comment tester localement ?"
→ [QUICK_START.md](./QUICK_START.md) → npm run dev

### "Comment mettre en ligne ?"
→ [DEPLOYMENT.md](./DEPLOYMENT.md)

### "Où est Supabase ?"
→ https://supabase.com (gratuit)

### "Où est Vercel ?"
→ https://vercel.com (gratuit)

### "Comment modifier la date ?"
→ Éditez `components/EventDetails.tsx` → Git push

### "Comment modifier les couleurs ?"
→ Éditez `app/globals.css` → Git push

### "Comment consulter les réponses ?"
→ [RESPONSES.md](./RESPONSES.md)

### "Comment partager le lien ?"
→ Votre URL Vercel : `https://iska-bat-mitzvah-invitation.vercel.app`

---

## 📂 Fichiers importants

| Fichier | Rôle |
|---------|------|
| `app/page.tsx` | Page principale |
| `components/RSVPForm.tsx` | Formulaire RSVP |
| `components/EventDetails.tsx` | Infos événement |
| `app/api/rsvp/route.ts` | API endpoint |
| `.env.local` | Secrets (jamais committées) |
| `app/globals.css` | Thème & couleurs |

---

## 🔍 Navigation rapide

### Technologies
- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Validation**: Zod

### Environnements

| Env | URL | Commande |
|-----|-----|----------|
| Local | http://localhost:3000 | `npm run dev` |
| Build | Production | `npm run build` |
| Deploy | Vercel | git push |

### Commandes

```bash
npm run dev      # Développement local
npm run build    # Build production
npm start        # Démarrer production
npm run lint     # Vérifier code
```

---

## 🆘 Aide

### "J'ai une erreur"
1. Consultez [README.md](./README.md) → Dépannage
2. Vérifiez les variables d'env dans `.env.local`
3. Vérifiez que Supabase table existe

### "Je ne sais pas par où commencer"
→ Consultez [QUICK_START.md](./QUICK_START.md)

### "Comment déployer ?"
→ Consultez [DEPLOYMENT.md](./DEPLOYMENT.md)

### "Comment gérer les réponses ?"
→ Consultez [RESPONSES.md](./RESPONSES.md)

---

## 📊 Vue d'ensemble

```
User → Landing Page → RSVP Form → Supabase DB
                                      ↓
                                   Dashboard
```

1. **User** accède au formulaire
2. **Form** envoie POST /api/rsvp
3. **API** valide et insert en DB
4. **Supabase** stocke les données
5. **Dashboard** consulte les réponses

---

## ✨ Exemple de flux

### Pour l'utilisateur
1. Clique sur le lien : `https://iska-bat-mitzvah-invitation.vercel.app`
2. Remplit le formulaire (Nom, Réponse, Nombre)
3. Clique "Confirmer ma présence"
4. Voit le message de succès ✅

### Pour vous
1. Allez dans Supabase → Table Editor
2. Voyez la réponse dans `rsvp_responses`
3. Consultez les statistiques
4. Exportez les données si besoin

---

## 🎨 Personnalisation

Tous les fichiers peuvent être modifiés :

- **Contenu** → `components/` → git push
- **Style** → `app/globals.css` → git push
- **API** → `app/api/` → git push

Vercel redéploie automatiquement après chaque push !

---

## 🚀 Next steps

- [ ] Lire QUICK_START.md
- [ ] Créer compte Supabase
- [ ] Configurer variables d'env
- [ ] Tester localement
- [ ] Créer repo GitHub
- [ ] Déployer sur Vercel
- [ ] Partager le lien
- [ ] Consulter les réponses

---

## 📞 Ressources

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Tailwind**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

**Bon amusement pour la Bat Mitzvah d'Iska ! 🎉✨**

*Pour commencer : [QUICK_START.md](./QUICK_START.md)*
