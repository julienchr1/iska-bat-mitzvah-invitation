export default function EventDetails() {
  return (
    <div className="card-elegant p-6 md:p-8 mb-8 animate-fade-in-up">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Détails de l'événement
      </h2>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <span className="text-3xl">📅</span>
          <div>
            <p className="font-semibold text-gray-800">Date</p>
            <p className="text-gray-600">Dimanche 28 Juin 2026</p>
            <p className="text-sm text-gray-500">À partir de 12h30</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-3xl">📍</span>
          <div>
            <p className="font-semibold text-gray-800">Lieu</p>
            <p className="text-gray-600">Centre Moshe Yossef ve David</p>
            <p className="text-sm text-gray-500">6 bis rue Émile Allez</p>
            <p className="text-sm text-gray-500">75017 Paris</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-3xl">👗</span>
          <div>
            <p className="font-semibold text-gray-800">Dress Code</p>
            <p className="text-gray-600">Tenue de gala - Couleurs bleu et or</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-3xl">✨</span>
          <div>
            <p className="font-semibold text-gray-800">Invitations</p>
            <p className="text-gray-600">Les Filles Seulement</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Merci de confirmer votre présence</span> avant le 15 juin 2026
        </p>
      </div>
    </div>
  );
}
