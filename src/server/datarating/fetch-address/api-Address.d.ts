export interface inputAddressObject {
  postalCode: string;
  City?: string;
  street: string;
}

/* Exmeple of a resultat adresseObject :
{
  type: 'Feature',
  geometry: { type: 'Point', coordinates: [ 4.849925, 45.75829 ] },
  properties: {
    label: '12 Rue Clos Suiphon 69003 Lyon',
    score: 0.9698954545454546,
    housenumber: '12',
    id: '69383_1765_00012',
    name: '12 Rue Clos Suiphon',
    postcode: '69003',
    citycode: '69383',
    x: 843786.85,
    y: 6519316.24,
    city: 'Lyon',
    district: 'Lyon 3e Arrondissement',
    context: '69, Rhône, Auvergne-Rhône-Alpes',
    type: 'housenumber',
    importance: 0.66885,
    street: 'Rue Clos Suiphon'
  }
  
}*/
export interface AddressObject {
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    properties: {
      label: string;
      score: number;
      housenumber: string;
      id: string;
      name: string;
      postcode: string;
      citycode: string;
      x: number;
      y: number;
      city: string;
      context: string;
      type: string;
      importance: number;
      street: string;
    };
  }