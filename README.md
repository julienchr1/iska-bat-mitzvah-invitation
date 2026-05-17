# Invitation Bat Mitzvah d'Iska

Landing page d'invitation interactive avec formulaire RSVP pour la Bat Mitzvah d'Iska (28 Juin 2026, Paris).

## 🎉 Caractéristiques

- ✨ Design élégant et responsive (mobile-first)
- 📝 Formulaire RSVP avec validation
- 💾 Stockage des réponses en base de données (Supabase PostgreSQL)
- 🚀 Déploiement simple sur Vercel
- 🎨 Thème inspiré par les save-the-date officiels

## 🔧 Configuration

### 1. Créer un compte Supabase

1. Allez sur [supabase.com](https://supabase.com) et créez un compte gratuit
2. Créez un nouveau projet
3. Copiez votre `Project URL` et `API Keys`

### 2. Créer la table dans Supabase

Allez dans l'éditeur SQL et exécutez cette requête :

```sql
CREATE TABLE rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  statut_rsvp TEXT NOT NULL CHECK (statut_rsvp IN ('oui', 'non', 'peut-être')),
  nombre_personnes INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre les insertions publiques
CREATE POLICY "Allow public inserts" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- Créer une politique pour permettre les lectures publiques
CREATE POLICY "Allow public select" ON rsvp_responses
  FOR SELECT USING (true);
```

### 3. Configurer les variables d'environnement

```bash
# Copiez le fichier d'exemple
cp .env.local.example .env.local

# Remplissez .env.local avec vos clés Supabase
# NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🚀 Développement Local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🌐 Déploiement sur Vercel

### Option 1 : Déploiement via GitHub

1. Poussez le code sur GitHub
2. Allez sur [vercel.com](https://vercel.com)
3. Importez votre repo GitHub
4. Ajoutez les variables d'environnement dans Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Vercel déploie automatiquement

### Option 2 : Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

## 📋 Champs du formulaire RSVP

- **Nom** : Le nom complet de l'invitée
- **Statut** : Réponse (Oui / Non / Peut-être)
- **Nombre de personnes** : Nombre de participants (1-5)

## 📊 Consulter les réponses

Dans Supabase :
1. Allez dans l'onglet "SQL Editor"
2. Exécutez :
```sql
SELECT * FROM rsvp_responses ORDER BY created_at DESC;
```

Ou utilisez le tableau de données intégré dans Supabase Studio.

## 🎨 Personnalisation

### Changer les couleurs

Modifiez les variables CSS dans `app/globals.css` :

```css
:root {
  --color-primary: #87ceeb;      /* Bleu ciel */
  --color-primary-dark: #4a90e2; /* Bleu foncé */
  --color-gold: #d4af37;         /* Or */
  --color-accent: #8b7bcd;       /* Mauve */
}
```

### Modifier les détails de l'événement

Éditez `src/components/EventDetails.tsx` pour changer la date, le lieu, etc.

### Ajouter des images

1. Placez les images dans `public/images/`
2. Importez et utilisez-les dans les composants

## 📱 Responsive Design

La page est optimisée pour :
- Mobile (375px et plus)
- Tablette (768px et plus)
- Desktop (1440px et plus)

## 🔒 Sécurité

- Validation côté client et serveur
- Utilisation de Zod pour validation strict
- RLS (Row Level Security) activé dans Supabase
- Clé de service limitée pour les insertions

## 📦 Structure du projet

```
.
├── app/
│   ├── api/
│   │   └── rsvp/
│   │       └── route.ts        # API endpoint RSVP
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Page d'accueil
│   └── globals.css             # Styles globaux
├── src/
│   ├── components/
│   │   ├── EventDetails.tsx    # Détails de l'événement
│   │   └── RSVPForm.tsx        # Formulaire RSVP
│   └── lib/
│       ├── supabase.ts         # Client Supabase
│       └── types.ts            # Types TypeScript
├── public/
│   └── images/                 # Images
├── .env.local.example          # Template env vars
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🆘 Dépannage

### "Missing Supabase environment variables"
→ Vérifiez que `.env.local` contient `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Le formulaire ne soumet pas les données
→ Vérifiez que RLS est activé et les politiques sont correctes dans Supabase

### "Database connection failed"
→ Assurez-vous que votre clé Supabase est correcte et que la table existe

## 📞 Support

Pour toute question sur le projet, consultez :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vercel](https://vercel.com/docs)

---

**Bon amusement pour la Bat Mitzvah d'Iska ! ✨**
