import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { jwtVerify } from 'jose';
import Papa from 'papaparse';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await jwtVerify(token, secret);

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const text = await file.text();

    const parsed = await new Promise<Record<string, string>[]>((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as Record<string, string>[]);
        },
        error: (error: { message: string }) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        },
      });
    });

    const invites = parsed
      .map((row) => ({
        nom: (row.nom || row.Nom || '').trim(),
        prenom: (row.prenom || row.Prenom || '').trim(),
        telephone: (row.telephone || row.Telephone || '').trim() || null,
      }))
      .filter((invite) => invite.nom && invite.prenom);

    if (invites.length === 0) {
      return NextResponse.json({ error: 'No valid rows in CSV' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('invites').insert(invites);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, imported: invites.length });
  } catch (error) {
    console.error('[Admin Import] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: 401 }
    );
  }
}
