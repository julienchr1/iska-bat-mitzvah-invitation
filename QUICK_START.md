# ⚡ Quick Start Guide

Démarrage rapide en 3 étapes.

## 1️⃣ Préparation locale (2 min)

```bash
cd iska-bat-mitzvah-invitation

# Les dépendances sont déjà installées
# Vérifiez que .env.local existe (voir DEPLOYMENT.md)

npm run dev
```

Ouvrez http://localhost:3000 ✅

## 2️⃣ Configurer Supabase (5 min)

Suivez : [DEPLOYMENT.md](./DEPLOYMENT.md) - Étapes 1 et 2

Récupérez vos clés et mettez-les dans `.env.local`

## 3️⃣ Déployer (5 min)

Suivez : [DEPLOYMENT.md](./DEPLOYMENT.md) - Étape 3

Partagez votre URL ! 🚀

## 📁 Structure du projet

```
components/           # Composants React
  ├── EventDetails.tsx    # Info de l'événement
  └── RSVPForm.tsx        # Formulaire
  
app/                  # Pages et API
  ├── page.tsx            # Landing page
  ├── layout.tsx          # Layout
  ├── globals.css         # Styles
  └── api/
      └── rsvp/route.ts   # API endpoint
      
lib/                  # Utilitaires
  ├── supabase.ts         # Client DB
  └── types.ts            # Types TS
```

## 🎨 Personnalisé

Changez la date/lieu dans `components/EventDetails.tsx`

## 🔒 Variables d'env requises

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 📚 Docs complètes

- [README.md](./README.md) - Documentation complète
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guide détaillé de déploiement

## ✨ C'est prêt !

Bon amusement pour la Bat Mitzvah ! 🎉
