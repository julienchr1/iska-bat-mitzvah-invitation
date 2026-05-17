'use client';

import { useState } from 'react';
import Image from 'next/image';
import RSVPForm from '@/components/RSVPForm';
import Countdown from '@/components/Countdown';
import AudioPlayer from '@/components/AudioPlayer';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      <AudioPlayer />

      {/* Section 1: Invitation Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center">
        <Image
          src="/images/section-1-iska.jpg"
          alt="Invitation Bat Mitzvah"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 text-center text-white">
          <div className="space-y-8 text-lg md:text-xl leading-relaxed">
            {/* Grands-parents */}
            <div>
              <p className="text-base md:text-lg">
                M. et Mme Michel Chriqui<br />
                Mme Suzy Hazan
              </p>
            </div>

            {/* Parents et frères/soeurs */}
            <div className="space-y-2">
              <p className="font-semibold">
                Laura et Julien Chriqui
              </p>
              <p className="text-base md:text-lg">
                Raphael, Noa et Nathan
              </p>
            </div>

            {/* Invitation */}
            <div className="pt-6">
              <p>
                ont la joie de vous faire part<br />
                de la Bat Mitzvah de
              </p>
            </div>

            {/* Nom principal */}
            <h1 className="text-6xl md:text-7xl font-bold gradient-gold pt-4 animate-scale-in">
              Iska
            </h1>

            {/* Date */}
            <div className="pt-6">
              <p className="text-xl md:text-2xl font-semibold">
                Qui sera célébrée<br />
                le dimanche 28 juin 2026
              </p>
            </div>

            {/* Message Papi Haim */}
            <div className="pt-8 border-t border-white/50">
              <p className="text-sm md:text-base italic opacity-90">
                ✨ Nous avons une pensée très forte pour notre grand-père adoré, Papi Haim ✨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Countdown & Details */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <Image
          src="/images/image-1779027200817.jpg"
          alt="Détails événement"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-12">
          {/* Countdown */}
          <div className="w-full">
            <Countdown />
          </div>

          {/* Event Details */}
          <div className="bg-white/95 rounded-lg p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Détails de la Réception
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">📅 Date</h3>
                <p className="text-gray-700 font-semibold">Dimanche 28 Juin 2026</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">🕐 Heure</h3>
                <p className="text-gray-700 font-semibold">À partir de 12h30</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">📍 Lieu</h3>
                <p className="text-gray-700 font-semibold">Centre Moshe Yossef ve David</p>
                <p className="text-gray-600">6 bis rue Émile Allez</p>
                <p className="text-gray-600">75017 Paris</p>
                <a
                  href="https://share.google/K92oaR52a8i4NbdZ2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block"
                >
                  📍 Ouvrir dans Google Maps
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">👗 Dress Code</h3>
                <p className="text-gray-700">Une tenue conforme à la halakha participerait à la joie de cette journée</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm font-semibold text-gray-800">✨ Les Filles Seulement ✨</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Merci de confirmer votre présence avant le 15 juin 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: RSVP Form */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-12 px-4">
        <Image
          src="/images/image-1779027227962.jpg"
          alt="Formulaire RSVP"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-2xl mx-auto w-full">
          {submitted ? (
            <div className="bg-white/95 rounded-lg p-8 md:p-12 text-center shadow-lg animate-fade-in-up">
              <div className="text-6xl mb-4 animate-bounce">✨</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Merci beaucoup !</h2>
              <p className="text-lg text-gray-600 mb-4">
                Votre réponse a été enregistrée avec succès.
              </p>
              <p className="text-gray-600">
                À bientôt lors de cette belle célébration ! 🎉
              </p>
            </div>
          ) : (
            <RSVPForm onSubmitSuccess={() => setSubmitted(true)} />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-100 to-purple-100 py-8 px-4 text-center text-gray-700 text-sm">
        <p>Bat Mitzvah d'Iska • 28 Juin 2026</p>
      </footer>
    </main>
  );
}
