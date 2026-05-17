# 📐 Architecture du Projet

## 🏗️ Stack Technique

```
Frontend:        Next.js 16 + React 19 + TypeScript
Styles:          Tailwind CSS 4
Validation:      Zod
Backend:         Next.js API Routes
Database:        Supabase (PostgreSQL)
Deployment:      Vercel
```

## 📂 Structure des fichiers

```
iska-bat-mitzvah-invitation/
│
├── 📁 app/                    # Next.js App Router
│   ├── page.tsx               # Landing page principale
│   ├── layout.tsx             # Layout avec métadonnées & polices
│   ├── globals.css            # Styles globaux & Tailwind
│   └── 📁 api/
│       └── 📁 rsvp/
│           └── route.ts       # Endpoint POST /api/rsvp
│
├── 📁 components/             # Composants React
│   ├── EventDetails.tsx       # Section infos événement
│   └── RSVPForm.tsx           # Formulaire RSVP avec validation
│
├── 📁 lib/                    # Code utilitaire
│   ├── supabase.ts            # Client Supabase initialisé
│   └── types.ts               # Interfaces TypeScript
│
├── 📁 public/                 # Fichiers statiques
│   └── images/                # Images de style (save-the-date)
│
├── 📄 .env.local.example      # Template variables d'env
├── 📄 .env.local              # ⚠️ Variables d'env réelles (pas committées)
├── 📄 .gitignore              # Fichiers ignorés par Git
├── 📄 package.json            # Dépendances & scripts
├── 📄 tsconfig.json           # Configuration TypeScript
├── 📄 tailwind.config.ts      # Configuration Tailwind
├── 📄 next.config.ts          # Configuration Next.js
├── 📄 README.md               # Documentation complète
├── 📄 DEPLOYMENT.md           # Guide de déploiement
├── 📄 QUICK_START.md          # Quick start
└── 📄 STRUCTURE.md            # Ce fichier
```

## 🔄 Flux de données

```
User Form (RSVPForm.tsx)
    ↓
  Submit POST /api/rsvp
    ↓
Validation (Zod schema)
    ↓
Insert into Supabase
    ↓
Return JSON response
    ↓
Show success message
```

## 📝 Types de données

### RSVPResponse (Supabase table `rsvp_responses`)

```typescript
{
  id: UUID (primary key)
  nom: string (required)
  statut_rsvp: 'oui' | 'non' | 'peut-être'
  nombre_personnes: number (1-5)
  created_at: timestamp
  updated_at: timestamp
}
```

## 🎯 Composants

### EventDetails.tsx
Affiche les infos de l'événement :
- 📅 Date/Heure
- 📍 Lieu
- 👗 Dress code
- ✨ Type d'invitation

### RSVPForm.tsx
Formulaire interactif avec :
- Input texte pour le nom
- 3 boutons radio (Oui/Non/Peut-être)
- Compteur +/- pour le nombre de personnes
- Validation client et serveur
- Message de succès

## 🔌 API Endpoint

### POST /api/rsvp

**Request:**
```json
{
  "nom": "Marie Dupont",
  "statut_rsvp": "oui",
  "nombre_personnes": 2
}
```

**Response (201):**
```json
{
  "message": "Réponse enregistrée avec succès",
  "data": [{ id, nom, statut_rsvp, nombre_personnes, created_at }]
}
```

**Errors:**
- 400: Validation error
- 500: Server error

## 🎨 Thème & Couleurs

Défini dans `app/globals.css` :

```css
--color-primary: #87ceeb         /* Bleu ciel */
--color-primary-dark: #4a90e2    /* Bleu foncé */
--color-gold: #d4af37            /* Or élégant */
--color-accent: #8b7bcd          /* Mauve */
```

Classes utilitaires :
- `.card-elegant` - Cartes avec blur effect
- `.button-primary` - Boutons avec gradient
- `.input-elegant` - Inputs stylés
- `.animate-fade-in-up` - Animation entrée
- `.gradient-gold` - Texte dégradé or

## 📱 Responsive Design

Mobile-first avec breakpoints Tailwind :
- **sm** : 640px+ (tablette)
- **md** : 768px+ (desktop)
- **lg** : 1024px+

## 🔐 Sécurité

### Côté client
- Validation avec HTML5 + Zod
- Messages d'erreur clairs

### Côté serveur
- Validation Zod stricte
- Types TypeScript
- RLS (Row Level Security) dans Supabase

### Secrets
- `.env.local` dans `.gitignore`
- Clés API jamais committées
- Service role key sécurisée

## 🚀 Déploiement

### Développement
```bash
npm run dev
```
Serveur sur http://localhost:3000

### Build production
```bash
npm run build
npm start
```

### Vercel (automatique)
- Push sur GitHub
- Vercel détecte et déploie
- Variables d'env dans dashboard Vercel

## 📊 Consultable

Dans Supabase SQL Editor :
```sql
-- Voir toutes les réponses
SELECT * FROM rsvp_responses ORDER BY created_at DESC;

-- Statistiques
SELECT 
  statut_rsvp, 
  COUNT(*) as total,
  SUM(nombre_personnes) as participants
FROM rsvp_responses
GROUP BY statut_rsvp;
```

## 🔄 Flux de développement

1. **Modifier code** → `npm run dev`
2. **Tester localement** → http://localhost:3000
3. **Valider API** → Tester formulaire
4. **Vérifier DB** → Check Supabase
5. **Commit & Push** → Git
6. **Vercel déploie** → Automatiquement

## 📦 Dépendances principales

- `next` : Framework React
- `@supabase/supabase-js` : Client DB
- `zod` : Validation
- `tailwindcss` : Styling
- `typescript` : Type safety

## 🎯 Points clés

✅ Mobile-first responsive
✅ Validation complète
✅ Design cohérent avec save-the-date
✅ Déploiement simple sur Vercel
✅ Base de données sécurisée
✅ Pas de frais (tiers gratuits)

---

**Prêt à lancer ? Consultez [DEPLOYMENT.md](./DEPLOYMENT.md) ! 🚀**
