'use client';

import Image from 'next/image';

export default function Gallery() {
  const images = [
    {
      src: '/images/placeholder-1.svg',
      alt: 'Save the Date 1 - Thème Neon Street',
      title: 'Invitation Moderne'
    },
    {
      src: '/images/placeholder-2.svg',
      alt: 'Save the Date 2 - Avec amies',
      title: 'Avec les Amies'
    },
    {
      src: '/images/placeholder-3.svg',
      alt: 'Save the Date 3 - Dvar Torah',
      title: 'Le Dvar Torah'
    },
    {
      src: '/images/placeholder-4.svg',
      alt: 'Save the Date 4 - Avec vue Jérusalem',
      title: 'Jérusalem'
    },
  ];

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
        <span className="gradient-gold">Nos Save the Date</span>
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Découvrez les différents designs de l'invitation
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="card-elegant overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index < 2}
                onError={(e) => {
                  // Image placeholder si fichier n'existe pas
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%2387ceeb' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='white'%3E${image.title}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-800">{image.title}</h3>
              <p className="text-sm text-gray-600 mt-1">28 Juin 2026</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-8">
        📸 Remplacez les images dans <code className="bg-gray-100 px-2 py-1 rounded">public/images/</code>
      </p>
    </section>
  );
}
