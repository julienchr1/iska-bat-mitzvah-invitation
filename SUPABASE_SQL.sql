-- Exécutez ce SQL dans Supabase → SQL Editor

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
