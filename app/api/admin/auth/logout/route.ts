import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    { message: 'Déconnecté avec succès' },
    { status: 200 }
  );

  response.cookies.delete('adminToken');

  return response;
}
