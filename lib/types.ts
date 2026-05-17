export interface RSVPResponse {
  id?: string;
  nom: string;
  prenom?: string;
  telephone?: string;
  statut_rsvp: 'oui' | 'non' | 'peut-être';
  nombre_personnes: number;
  present_status?: 'pending' | 'present' | 'absent';
  invite_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Invite {
  id?: string;
  nom: string;
  prenom: string;
  telephone?: string;
  message_envoye: boolean;
  created_at?: string;
  updated_at?: string;
}

export type RSVPStatus = 'oui' | 'non' | 'peut-être';
export type PresentStatus = 'pending' | 'present' | 'absent';
