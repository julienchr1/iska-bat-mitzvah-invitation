'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';

interface FormData {
  nom: string;
  statut_rsvp: 'oui' | 'non';
  nombre_personnes: number;
}

interface RSVPFormProps {
  onSubmitSuccess: () => void;
}

export default function RSVPForm({ onSubmitSuccess }: RSVPFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    statut_rsvp: 'oui',
    nombre_personnes: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'nombre_personnes' ? parseInt(value) : value,
    }));
    setError('');
  };

  const handleStatusChange = (status: 'oui' | 'non') => {
    setFormData((prev) => ({
      ...prev,
      statut_rsvp: status,
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.3 },
      });
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.nom.trim()) {
      setError('Veuillez entrer votre nom');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du formulaire');
      }

      triggerConfetti();
      setTimeout(() => {
        onSubmitSuccess();
      }, 500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Une erreur est survenue'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-elegant p-6 md:p-8 animate-fade-in-up">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Confirmer votre présence
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Votre nom *
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Entrez votre nom complet"
            className="input-elegant"
            required
          />
        </div>

        {/* RSVP Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Je serai présente *
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            {(['oui', 'non'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange(status)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all transform ${
                  formData.statut_rsvp === status
                    ? 'bg-blue-500 text-white scale-105 shadow-lg'
                    : 'bg-white border-2 border-blue-200 text-gray-700 hover:border-blue-400'
                }`}
              >
                {status === 'oui' && '✅ Oui'}
                {status === 'non' && '❌ Non'}
              </button>
            ))}
          </div>
        </div>

        {/* Nombre de personnes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de personnes
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  nombre_personnes: Math.max(1, prev.nombre_personnes - 1),
                }))
              }
              className="w-12 h-12 flex items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-lg font-bold text-blue-600"
            >
              −
            </button>
            <input
              type="number"
              name="nombre_personnes"
              value={formData.nombre_personnes}
              onChange={handleChange}
              min="1"
              max="5"
              className="input-elegant flex-1 text-center text-lg font-semibold"
            />
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  nombre_personnes: Math.min(5, prev.nombre_personnes + 1),
                }))
              }
              className="w-12 h-12 flex items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-lg font-bold text-blue-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="button-primary"
        >
          {loading ? '⏳ Envoi en cours...' : '✨ Confirmer ma présence'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Les données sont stockées de manière sécurisée
        </p>
      </form>
    </div>
  );
}
