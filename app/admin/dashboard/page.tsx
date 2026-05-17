'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RSVPResponse {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  statut_rsvp: 'oui' | 'non';
  nombre_personnes: number;
  present_status?: 'pending' | 'present' | 'absent';
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'oui' | 'non'>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch('/api/admin/rsvp');

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || 'Erreur de chargement');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setResponses(data.data || []);
        setFilteredResponses(data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Erreur réseau');
        setLoading(false);
      }
    };

    fetchResponses();
  }, [router]);

  const handleFilterChange = (newFilter: 'all' | 'oui' | 'non') => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setFilteredResponses(responses);
    } else {
      setFilteredResponses(responses.filter((r) => r.statut_rsvp === newFilter));
    }
  };

  const handlePresenceUpdate = async (
    id: string,
    status: 'pending' | 'present' | 'absent'
  ) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/rsvp/${id}/presence`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ present_status: status }),
      });

      if (!res.ok) throw new Error('Update failed');

      setResponses(
        responses.map((r) => (r.id === id ? { ...r, present_status: status } : r))
      );
      setFilteredResponses(
        filteredResponses.map((r) => (r.id === id ? { ...r, present_status: status } : r))
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour');
    } finally {
      setUpdating(null);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch('/api/admin/rsvp/export');
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rsvp_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Erreur lors de l\'export');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const countConfirmed = responses.filter((r) => r.statut_rsvp === 'oui').length;
  const countConfirmedPersons = responses
    .filter((r) => r.statut_rsvp === 'oui')
    .reduce((sum, r) => sum + r.nombre_personnes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Tableau de Bord Admin</h1>
            <p className="text-gray-600 mt-2">Gestion des réponses RSVP - Bat Mitzvah d'Iska</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link
              href="/admin/guests"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Gestion invités
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Total des réponses</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{responses.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Confirmations (OUI)</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{countConfirmed}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">Total des personnes</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {countConfirmedPersons}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : (
          <>
            {/* Action Buttons & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Tous ({responses.length})
                </button>
                <button
                  onClick={() => handleFilterChange('oui')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === 'oui'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  OUI ({responses.filter((r) => r.statut_rsvp === 'oui').length})
                </button>
                <button
                  onClick={() => handleFilterChange('non')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === 'non'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  NON ({responses.filter((r) => r.statut_rsvp === 'non').length})
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                📥 Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Nom
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Prénom
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Téléphone
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Personnes
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Présence
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResponses.length > 0 ? (
                    filteredResponses.map((response) => (
                      <tr key={response.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{response.nom}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{response.prenom}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{response.telephone}</td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              response.statut_rsvp === 'oui'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {response.statut_rsvp === 'oui' ? '✓ OUI' : '✗ NON'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-800">
                          {response.nombre_personnes}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-1 justify-center">
                            <button
                              onClick={() => handlePresenceUpdate(response.id, 'present')}
                              disabled={updating === response.id}
                              className={`px-3 py-1 rounded text-sm font-semibold transition ${
                                response.present_status === 'present'
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              title="Présent"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handlePresenceUpdate(response.id, 'absent')}
                              disabled={updating === response.id}
                              className={`px-3 py-1 rounded text-sm font-semibold transition ${
                                response.present_status === 'absent'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              title="Absent"
                            >
                              ✗
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(response.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        Aucune réponse trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
