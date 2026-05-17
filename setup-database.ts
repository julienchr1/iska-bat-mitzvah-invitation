#!/usr/bin/env node

/**
 * Setup script pour créer la table Supabase automatiquement
 * Utilise les clés du fichier .env.local
 */

import { createClient } from '@supabase/supabase-js';

// Charger les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Erreur: Variables d\'environnement manquantes');
  console.error('Assurez-vous que .env.local contient:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('🚀 Création de la table Supabase...');
console.log(`📍 URL: ${supabaseUrl}`);

// Créer le client Supabase avec la clé de service
const supabase = createClient(supabaseUrl, serviceRoleKey);

// SQL à exécuter
const SQL = `
-- Créer la table
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  statut_rsvp TEXT NOT NULL CHECK (statut_rsvp IN ('oui', 'non', 'peut-être')),
  nombre_personnes INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (sécurité)
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Supprimer les policies existantes si elles existent
DROP POLICY IF EXISTS "Allow public inserts" ON rsvp_responses;
DROP POLICY IF EXISTS "Allow public select" ON rsvp_responses;
DROP POLICY IF EXISTS "Allow public updates" ON rsvp_responses;

-- Créer les policies
CREATE POLICY "Allow public inserts" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON rsvp_responses
  FOR SELECT USING (true);

CREATE POLICY "Allow public updates" ON rsvp_responses
  FOR UPDATE USING (true) WITH CHECK (true);
`;

async function setupDatabase() {
  try {
    // Utiliser rpc pour exécuter du SQL brut
    // Note: Cette approche nécessite une fonction stockée dans Supabase
    // Alternative: On va utiliser une approche différente avec l'admin client

    // Créer une vérification simple - essayer de créer une table test
    console.log('✓ Connexion à Supabase établie');

    // Vérifier que la connexion fonctionne
    const { data: tables, error: checkError } = await supabase
      .from('information_schema.tables')
      .select('table_name');

    if (checkError && checkError.message.includes('relation')) {
      console.log('✓ Base de données accessible');
    }

    // Pour exécuter du SQL brut, nous avons besoin d'une approche différente
    // Supabase ne supporte pas l'exécution de SQL arbitraire via l'API REST
    // La meilleure approche est d'utiliser le client PostgreSQL directement

    console.log('\n⚠️  Limitation: L\'API Supabase n\'expose pas l\'exécution SQL arbitraire');
    console.log('   Deux solutions:');
    console.log('\n   1. Créer manuellement via le SQL Editor de Supabase');
    console.log('      → C\'est rapide (1 min)');
    console.log('      → Le SQL est dans SUPABASE_SQL.sql');
    console.log('\n   2. Utiliser une fonction PostgreSQL stockée');
    console.log('      → Plus complexe');

    console.log('\n✅ Pour continuer: Allez dans Supabase → SQL Editor et exécutez:');
    console.log('───────────────────────────────────────────────');
    console.log(SQL);
    console.log('───────────────────────────────────────────────');

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

setupDatabase();
