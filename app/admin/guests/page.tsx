'use client';

import { useState, useEffect } from 'react';
import { Invite } from '@/lib/types';

export default function GuestsPage() {
  const [guests, setGuests] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState<'all' | 'sent' | 'unsent'>('all');

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      const res = await fetch('/api/admin/guests');
      if (!res.ok) throw new Error('Failed to load guests');
      const data = await res.json();
      setGuests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load guests');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/guests/import', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      setSuccess(`${data.imported} invités importés avec succès`);
      await loadGuests();
      e.target.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const filteredGuests = guests.filter((guest) => {
    if (filter === 'sent') return guest.message_envoye;
    if (filter === 'unsent') return !guest.message_envoye;
    return true;
  });

  const sentCount = guests.filter((g) => g.message_envoye).length;
  const unsentCount = guests.length - sentCount;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-6xl mx-auto text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion des invités</h1>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Import Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Importer une liste CSV</h2>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <span className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400">
                {uploading ? 'Upload en cours...' : 'Sélectionner un fichier CSV'}
              </span>
            </label>
            <p className="mt-2 text-gray-600 text-sm">
              Format: colonnes nom, prenom, telephone (optionnel)
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm">Total invités</div>
            <div className="text-3xl font-bold text-blue-600">{guests.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm">Invitations envoyées</div>
            <div className="text-3xl font-bold text-green-600">{sentCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm">Non envoyées</div>
            <div className="text-3xl font-bold text-orange-600">{unsentCount}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Tous ({guests.length})
          </button>
          <button
            onClick={() => setFilter('sent')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'sent'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Envoyés ({sentCount})
          </button>
          <button
            onClick={() => setFilter('unsent')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'unsent'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Non envoyés ({unsentCount})
          </button>
        </div>

        {/* Guests Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prénom</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Téléphone
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Invitation envoyée
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{guest.nom}</td>
                    <td className="px-6 py-4 text-gray-800">{guest.prenom}</td>
                    <td className="px-6 py-4 text-gray-600">{guest.telephone || '-'}</td>
                    <td className="px-6 py-4">
                      {guest.message_envoye ? (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          ✓ Oui
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                          ✗ Non
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {guest.created_at
                        ? new Date(guest.created_at).toLocaleDateString('fr-FR')
                        : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Aucun invité à afficher
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
