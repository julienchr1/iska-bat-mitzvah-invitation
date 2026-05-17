/**
 * Endpoint pour créer la table Supabase automatiquement
 * Appel: POST /api/setup-db
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Variables d\'environnement manquantes' },
        { status: 500 }
      );
    }

    // Se connecter avec la clé de service (qui a les permissions)
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Créer la table si elle n'existe pas
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS rsvp_responses (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          nom TEXT NOT NULL,
          statut_rsvp TEXT NOT NULL CHECK (statut_rsvp IN ('oui', 'non', 'peut-être')),
          nombre_personnes INTEGER NOT NULL DEFAULT 1,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Allow public inserts" ON rsvp_responses;
        DROP POLICY IF EXISTS "Allow public select" ON rsvp_responses;
        DROP POLICY IF EXISTS "Allow public updates" ON rsvp_responses;

        CREATE POLICY "Allow public inserts" ON rsvp_responses
          FOR INSERT WITH CHECK (true);

        CREATE POLICY "Allow public select" ON rsvp_responses
          FOR SELECT USING (true);

        CREATE POLICY "Allow public updates" ON rsvp_responses
          FOR UPDATE USING (true) WITH CHECK (true);
      `,
    });

    if (createError) {
      // Si la fonction RPC n'existe pas, retourner un message utile
      if (createError.message.includes('could not find SQL function')) {
        return NextResponse.json(
          {
            status: 'warning',
            message:
              'La table doit être créée manuellement via Supabase SQL Editor',
            instructions: 'Allez dans Supabase → SQL Editor et exécutez le SQL dans SUPABASE_SQL.sql',
          },
          { status: 200 }
        );
      }
      throw createError;
    }

    return NextResponse.json(
      { status: 'success', message: 'Table créée avec succès!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message:
        'Endpoint de setup. Utilisez POST /api/setup-db pour initialiser la base de données.',
    },
    { status: 200 }
  );
}
