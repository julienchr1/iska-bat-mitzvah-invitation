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
  invite_id?: string;
  created_at: string;
}

interface Invite {
  id: string;
  nom: string;
  prenom: string;
  telephone?: string;
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
  const [invitesList, setInvitesList] = useState<Invite[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedRsvpId, setSelectedRsvpId] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<'create' | 'link'>('create');
  const [modalLoading, setModalLoading] = useState(false);
  const [newInviteForm, setNewInviteForm] = useState({ nom: '', prenom: '', telephone: '' });
  const [selectedInviteId, setSelectedInviteId] = useState<string>('');

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

    const fetchInvites = async () => {
      try {
        const response = await fetch('/api/admin/guests');
        if (response.ok) {
          const data = await response.json();
          setInvitesList(data || []);
        }
      } catch (err) {
        console.error('Error fetching invites:', err);
      }
    };

    fetchResponses();
    fetchInvites();
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

  const handleOpenInviteModal = (rsvpId: string) => {
    const rsvp = responses.find((r) => r.id === rsvpId);
    if (rsvp) {
      setSelectedRsvpId(rsvpId);
      setNewInviteForm({ nom: rsvp.nom, prenom: rsvp.prenom, telephone: rsvp.telephone || '' });
      setModalAction('create');
      setSelectedInviteId('');
      setShowInviteModal(true);
    }
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
    setSelectedRsvpId(null);
    setNewInviteForm({ nom: '', prenom: '', telephone: '' });
    setSelectedInviteId('');
  };

  const handleLinkInvite = async () => {
    if (!selectedRsvpId) return;

    setModalLoading(true);
    try {
      let body: Record<string, unknown>;

      if (modalAction === 'create') {
        body = {
          action: 'create',
          nom: newInviteForm.nom,
          prenom: newInviteForm.prenom,
          telephone: newInviteForm.telephone || null,
        };
      } else {
        body = {
          action: 'link',
          invite_id: selectedInviteId,
        };
      }

      const res = await fetch(`/api/admin/rsvp/${selectedRsvpId}/invite`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Link failed');

      const data = await res.json();
      setResponses(
        responses.map((r) => (r.id === selectedRsvpId ? { ...r, invite_id: data.data.invite_id } : r))
      );
      setFilteredResponses(
        filteredResponses.map((r) =>
          r.id === selectedRsvpId ? { ...r, invite_id: data.data.invite_id } : r
        )
      );

      handleCloseInviteModal();
      setError('');
    } catch (err) {
      setError('Erreur lors de la liaison');
    } finally {
      setModalLoading(false);
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
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Actions
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
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleOpenInviteModal(response.id)}
                            className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-semibold"
                            title="Lier à un invité"
                          >
                            🔗 Lier
                          </button>
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
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                        Aucune réponse trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Invite Link Modal */}
            {showInviteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Lier à un invité</h2>

                  {/* Action Selection */}
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-blue-50" style={{borderColor: modalAction === 'create' ? '#2563eb' : '#d1d5db'}}>
                      <input
                        type="radio"
                        name="action"
                        value="create"
                        checked={modalAction === 'create'}
                        onChange={(e) => setModalAction(e.target.value as 'create' | 'link')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-800 font-medium">Créer un nouvel invité</span>
                    </label>

                    <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-blue-50" style={{borderColor: modalAction === 'link' ? '#2563eb' : '#d1d5db'}}>
                      <input
                        type="radio"
                        name="action"
                        value="link"
                        checked={modalAction === 'link'}
                        onChange={(e) => setModalAction(e.target.value as 'create' | 'link')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-800 font-medium">Sélectionner un invité existant</span>
                    </label>
                  </div>

                  {/* Form Content */}
                  {modalAction === 'create' ? (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                        <input
                          type="text"
                          value={newInviteForm.nom}
                          onChange={(e) => setNewInviteForm({...newInviteForm, nom: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                        <input
                          type="text"
                          value={newInviteForm.prenom}
                          onChange={(e) => setNewInviteForm({...newInviteForm, prenom: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                          type="text"
                          value={newInviteForm.telephone}
                          onChange={(e) => setNewInviteForm({...newInviteForm, telephone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Téléphone"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sélectionner un invité</label>
                      <select
                        value={selectedInviteId}
                        onChange={(e) => setSelectedInviteId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- Choisir un invité --</option>
                        {invitesList.map((invite) => (
                          <option key={invite.id} value={invite.id}>
                            {invite.nom} {invite.prenom}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={handleCloseInviteModal}
                      disabled={modalLoading}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleLinkInvite}
                      disabled={
                        modalLoading ||
                        (modalAction === 'create' && (!newInviteForm.nom || !newInviteForm.prenom)) ||
                        (modalAction === 'link' && !selectedInviteId)
                      }
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {modalLoading ? 'Traitement...' : modalAction === 'create' ? 'Créer et lier' : 'Lier'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
