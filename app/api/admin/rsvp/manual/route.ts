import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

const createRSVPSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().optional(),
  telephone: z.string().optional(),
  statut_rsvp: z.enum(['oui', 'non', 'peut-être']),
  nombre_personnes: z.number().int().positive(),
  present_status: z.enum(['pending', 'present', 'absent']).optional(),
  invite_id: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await jwtVerify(token, secret);

    const body = await request.json();
    const parsed = createRSVPSchema.parse(body);

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('rsvp_responses')
      .insert({
        nom: parsed.nom,
        prenom: parsed.prenom || null,
        telephone: parsed.telephone || null,
        statut_rsvp: parsed.statut_rsvp,
        nombre_personnes: parsed.nombre_personnes,
        present_status: parsed.present_status || 'pending',
        invite_id: parsed.invite_id || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    console.error('[Admin Manual RSVP] Error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
