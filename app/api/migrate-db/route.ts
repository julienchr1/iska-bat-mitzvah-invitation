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

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Exécuter les migrations
    const migrations = [
      // Ajouter les colonnes prenom et telephone si elles n'existent pas
      `ALTER TABLE rsvp_responses ADD COLUMN IF NOT EXISTS prenom TEXT DEFAULT '';`,
      `ALTER TABLE rsvp_responses ADD COLUMN IF NOT EXISTS telephone TEXT DEFAULT '';`,

      // Rendre les colonnes NOT NULL (seulement si elles existent et ont des valeurs)
      `ALTER TABLE rsvp_responses ALTER COLUMN prenom SET NOT NULL;`,
      `ALTER TABLE rsvp_responses ALTER COLUMN telephone SET NOT NULL;`,
    ];

    // Exécuter chaque migration
    for (const sql of migrations) {
      const { error } = await supabase.rpc('exec_sql', { sql });

      // Si exec_sql n'existe pas, essayer une autre approche
      if (error?.message.includes('could not find SQL function')) {
        return NextResponse.json(
          {
            status: 'warning',
            message: 'Veuillez exécuter les migrations manuellement via Supabase SQL Editor',
            sql: migrations.join('\n'),
          },
          { status: 200 }
        );
      }

      if (error) {
        throw error;
      }
    }

    return NextResponse.json(
      {
        status: 'success',
        message: 'Table migrée avec succès!',
        migrations_applied: migrations.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la migration', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Endpoint de migration. Utilisez POST /api/migrate-db pour migrer la base de données.',
    },
    { status: 200 }
  );
}
