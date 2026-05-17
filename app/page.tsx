'use client';

import { useState } from 'react';
import RSVPForm from '@/components/RSVPForm';
import EventDetails from '@/components/EventDetails';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-blue-100 via-white to-purple-50 pt-8 pb-12 px-4 md:pt-16 md:pb-20">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Bat Mitzvah de
            <span className="gradient-gold block mt-2">Iska</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            🌟 Les Filles Seulement 🌟
          </p>
          <div className="text-blue-500 text-3xl mb-6">✨</div>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-1 px-4 py-8 md:py-12 max-w-2xl mx-auto w-full">
        {submitted ? (
          <div className="card-elegant p-8 md:p-12 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Merci beaucoup !</h2>
            <p className="text-lg text-gray-600 mb-6">
              Votre réponse a été enregistrée avec succès.
            </p>
            <p className="text-gray-600">
              À bientôt lors de cette belle célébration !
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Nouvelle réponse
            </button>
          </div>
        ) : (
          <>
            <EventDetails />
            <RSVPForm onSubmitSuccess={() => setSubmitted(true)} />
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-100 to-purple-100 py-8 px-4 text-center text-gray-700 text-sm">
        <p>Bat Mitzvah d'Iska • 28 Juin 2026</p>
      </footer>
    </main>
  );
}
