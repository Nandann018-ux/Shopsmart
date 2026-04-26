import React from 'react';

const HERO_COPY = {
  All:         { heading: 'Operational\nGear',   sub: 'MEN\'S FIELD UNIFORMS · SS26' },
  Shirts:      { heading: 'Field\nShirts',        sub: 'TACTICAL TOPS · SS26' },
  Shoes:       { heading: 'Ground\nForce',        sub: 'COMBAT FOOTWEAR · SS26' },
  Watches:     { heading: 'Time\nPieces',         sub: 'FIELD CHRONOGRAPHS · SS26' },
  Tops:        { heading: 'City\nTops',           sub: 'URBAN LAYERS · SS26' },
  Sunglasses:  { heading: 'Eye\nWear',            sub: 'TACTICAL OPTICS · SS26' },
};

const CatalogHero = ({ category }) => {
  const hero = HERO_COPY[category] || HERO_COPY.All;

  return (
    <div className="border-b border-[var(--border)]">
      <div className="wrap pt-8 pb-10">
        <p className="t-label mb-4">
          Store / Men / {category === 'All' ? 'All Units' : category}
        </p>
        <h1 className="t-heading whitespace-pre-line">
          {hero.heading}
        </h1>
        <p className="t-label mt-3.5">{hero.sub}</p>
      </div>
    </div>
  );
};

export default CatalogHero;
