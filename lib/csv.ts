import Papa from 'papaparse';
import { RSVPResponse } from './types';

export interface ParsedCSVRow {
  nom: string;
  prenom: string;
  telephone?: string;
}

export async function parseCSV(file: File): Promise<ParsedCSVRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = (results.data as Record<string, string>[]).map((row) => ({
          nom: (row.nom || row.Nom || '').trim(),
          prenom: (row.prenom || row.Prenom || '').trim(),
          telephone: (row.telephone || row.Telephone || '').trim() || undefined,
        }));
        resolve(parsed);
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      },
    });
  });
}

export function generateRSVPCSV(rsvps: RSVPResponse[]): string {
  const headers = ['Nom', 'Prénom', 'Téléphone', 'Statut', 'Nombre de personnes', 'Présent', 'Date'];
  const rows = rsvps.map((rsvp) => [
    rsvp.nom || '',
    rsvp.prenom || '',
    rsvp.telephone || '',
    rsvp.statut_rsvp || '',
    String(rsvp.nombre_personnes || 0),
    rsvp.present_status || 'pending',
    rsvp.created_at ? new Date(rsvp.created_at).toLocaleDateString('fr-FR') : '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
}
