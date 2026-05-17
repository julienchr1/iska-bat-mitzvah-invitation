import nodemailer from 'nodemailer';

const ADMIN_EMAIL_1 = process.env.ADMIN_EMAIL_1 || 'julienchriqui@gmail.com';
const ADMIN_EMAIL_2 = process.env.ADMIN_EMAIL_2 || 'laurachriqui@hotmail.com';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');

  if (!smtpUser || !smtpPassword) {
    console.warn('SMTP credentials not configured - email notifications will be skipped');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  return transporter;
}

interface RSVPData {
  nom: string;
  prenom: string;
  telephone: string;
  statut_rsvp: 'oui' | 'non';
  nombre_personnes: number;
}

export async function sendNotificationEmail(rsvpData: RSVPData): Promise<boolean> {
  const smtp = getTransporter();
  if (!smtp) return false;

  const statusText = rsvpData.statut_rsvp === 'oui' ? '✅ OUI' : '❌ NON';
  const htmlContent = `
    <h2>Nouvelle réponse RSVP - Bat Mitzvah d'Iska</h2>
    <p><strong>Nom:</strong> ${rsvpData.nom}</p>
    <p><strong>Prénom:</strong> ${rsvpData.prenom}</p>
    <p><strong>Téléphone:</strong> ${rsvpData.telephone}</p>
    <p><strong>Statut:</strong> ${statusText}</p>
    <p><strong>Nombre de personnes:</strong> ${rsvpData.nombre_personnes}</p>
    <p><small>Message généré automatiquement</small></p>
  `;

  try {
    await smtp.sendMail({
      from: process.env.SMTP_USER,
      to: `${ADMIN_EMAIL_1}, ${ADMIN_EMAIL_2}`,
      subject: `Nouvelle réponse RSVP - Bat Mitzvah d'Iska`,
      html: htmlContent,
      text: `Nouvelle réponse RSVP\nNom: ${rsvpData.nom}\nPrénom: ${rsvpData.prenom}\nTéléphone: ${rsvpData.telephone}\nStatut: ${rsvpData.statut_rsvp}\nNombre de personnes: ${rsvpData.nombre_personnes}`,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
