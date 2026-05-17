import jwt from 'jsonwebtoken';

const ADMIN_EMAILS = [
  'julienchriqui@gmail.com',
  'laurachriqui@hotmail.com',
];

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function checkAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateJWT(email: string): string {
  return jwt.sign(
    { email, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 }, // 24 hours
    JWT_SECRET
  );
}

export function verifyAuthToken(token: string): { email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; exp: number };
    return { email: decoded.email };
  } catch (error) {
    console.error('[Auth] Token verification failed:', error instanceof Error ? error.message : String(error));
    return null;
  }
}
