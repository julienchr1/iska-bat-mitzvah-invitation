import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

const linkInviteSchema = z.object({
  action: z.enum(['link', 'create']),
  invite_id: z.string().uuid().optional(),
  nom: z.string().optional(),
  prenom: z.string().optional(),
  telephone: z.string().optional(),
}).refine(
  (data) => {
    if (data.action === 'link') return !!data.invite_id;
    if (data.action === 'create') return !!data.nom && !!data.prenom;
    return false;
  },
  { message: 'Invalid data for action' }
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await jwtVerify(token, secret);

    const body = await request.json();
    const parsed = linkInviteSchema.parse(body);

    const supabase = createClient(supabaseUrl, supabaseKey);

    let inviteId: string | null = null;

    // If creating a new invite
    if (parsed.action === 'create') {
      const { data: newInvite, error: createError } = await supabase
        .from('invites')
        .insert({
          nom: parsed.nom,
          prenom: parsed.prenom || null,
          telephone: parsed.telephone || null,
          message_envoye: false,
        })
        .select()
        .single();

      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }

      inviteId = newInvite.id;
    } else if (parsed.action === 'link') {
      inviteId = parsed.invite_id;
    }

    // Link the RSVP response to the invite
    const { data, error } = await supabase
      .from('rsvp_responses')
      .update({ invite_id: inviteId })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    console.error('[Admin Link Invite] Error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
