import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { sendNotificationEmail } from '@/lib/email';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const RSVPSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis').max(100),
  prenom: z.string().min(1, 'Le prénom est requis').max(100),
  telephone: z.string().min(1, 'Le téléphone est requis').max(20),
  statut_rsvp: z.enum(['oui', 'non']),
  nombre_personnes: z.number().int().min(1).max(5),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const validatedData = RSVPSchema.parse(body);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('rsvp_responses')
      .insert([
        {
          nom: validatedData.nom,
          prenom: validatedData.prenom,
          telephone: validatedData.telephone,
          statut_rsvp: validatedData.statut_rsvp,
          nombre_personnes: validatedData.nombre_personnes,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de la réponse' },
        { status: 500 }
      );
    }

    // Send notification email to admins
    await sendNotificationEmail({
      nom: validatedData.nom,
      prenom: validatedData.prenom,
      telephone: validatedData.telephone,
      statut_rsvp: validatedData.statut_rsvp,
      nombre_personnes: validatedData.nombre_personnes,
    });

    return NextResponse.json(
      { message: 'Réponse enregistrée avec succès', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST to submit RSVP responses' },
    { status: 405 }
  );
}
