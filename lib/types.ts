export interface RSVPResponse {
  id?: string;
  nom: string;
  statut_rsvp: 'oui' | 'non' | 'peut-être';
  nombre_personnes: number;
  created_at?: string;
  updated_at?: string;
}

export type RSVPStatus = 'oui' | 'non' | 'peut-être';
