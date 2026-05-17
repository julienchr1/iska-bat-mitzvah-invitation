#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🎉 Setup Bat Mitzvah Invitation Deployment 🎉        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Check Node & npm
echo -e "${YELLOW}✓ Step 1: Vérification des prérequis${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm est installé${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${YELLOW}✓ Step 2: Installation des dépendances${NC}"
npm install --silent
echo -e "${GREEN}✓ Dépendances installées${NC}"
echo ""

# Step 3: Build test
echo -e "${YELLOW}✓ Step 3: Test du build${NC}"
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build réussi${NC}"
else
    echo -e "${RED}✗ Erreur lors du build${NC}"
    exit 1
fi
echo ""

# Step 4: Check git
echo -e "${YELLOW}✓ Step 4: Configuration Git${NC}"
if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Repo Git initialisé${NC}"
else
    echo -e "${YELLOW}! Initialisation du repo Git...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Bat Mitzvah invitation"
fi
echo ""

# Step 5: Environment variables
echo -e "${YELLOW}✓ Step 5: Variables d'environnement${NC}"
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓ .env.local existe${NC}"
    echo ""
    echo -e "${YELLOW}Actuellement configuré avec (placeholders):${NC}"
    grep "NEXT_PUBLIC_SUPABASE" .env.local
else
    echo -e "${YELLOW}! Création de .env.local...${NC}"
    cp .env.local.example .env.local
    echo -e "${GREEN}✓ .env.local créé${NC}"
fi
echo ""

# Step 6: Instructions for next steps
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           🚀 PROCHAINES ÉTAPES (15 minutes)             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}1️⃣  SUPABASE - Créer le projet${NC}"
echo -e "   Allez sur: ${BLUE}https://supabase.com${NC}"
echo "   • New Project"
echo "   • Name: iska-bat-mitzvah-invitation"
echo "   • Region: Europe (Frankfurt)"
echo "   • Notez le mot de passe"
echo ""

echo -e "${YELLOW}2️⃣  SUPABASE - Récupérer les clés${NC}"
echo "   Dans Supabase:"
echo "   • Settings → API"
echo "   • Copiez Project URL"
echo "   • Copiez anon public key"
echo "   • Copiez service_role secret"
echo ""

echo -e "${YELLOW}3️⃣  SUPABASE - Créer la table${NC}"
echo "   Dans Supabase SQL Editor:"
cat << 'EOF'
   Exécutez ce SQL:

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
EOF
echo ""

echo -e "${YELLOW}4️⃣  MISE À JOUR - Fichier .env.local${NC}"
echo "   Éditez ${BLUE}.env.local${NC} avec vos clés Supabase:"
echo ""
echo "   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc..."
echo "   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc..."
echo ""

echo -e "${YELLOW}5️⃣  TEST LOCAL${NC}"
echo "   Exécutez:"
echo "   ${BLUE}npm run dev${NC}"
echo "   Testez sur: ${BLUE}http://localhost:3000${NC}"
echo ""

echo -e "${YELLOW}6️⃣  GITHUB - Créer le repo${NC}"
echo "   Allez sur: ${BLUE}https://github.com/new${NC}"
echo "   • Name: iska-bat-mitzvah-invitation"
echo "   • Public"
echo "   • Puis exécutez:"
echo ""
echo "   ${BLUE}git remote add origin https://github.com/YOUR-USERNAME/iska-bat-mitzvah-invitation.git${NC}"
echo "   ${BLUE}git branch -M main${NC}"
echo "   ${BLUE}git push -u origin main${NC}"
echo ""

echo -e "${YELLOW}7️⃣  VERCEL - Déployer${NC}"
echo "   Allez sur: ${BLUE}https://vercel.com/new${NC}"
echo "   • Import your GitHub repo"
echo "   • Add Environment Variables:"
echo "     - NEXT_PUBLIC_SUPABASE_URL"
echo "     - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "     - SUPABASE_SERVICE_ROLE_KEY"
echo "   • Deploy!"
echo ""

echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        ✅ Préparation terminée ! C'est prêt !          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Pour lancer le dev server localement:${NC}"
echo "  ${BLUE}npm run dev${NC}"
echo ""

echo -e "${BLUE}Documentation:${NC}"
echo "  • ${BLUE}DEPLOYMENT.md${NC} - Guide complet du déploiement"
echo "  • ${BLUE}QUICK_START.md${NC} - Démarrage rapide"
echo "  • ${BLUE}README.md${NC} - Documentation complète"
echo ""
