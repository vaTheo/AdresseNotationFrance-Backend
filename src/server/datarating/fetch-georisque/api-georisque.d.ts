export interface GasprAPIResponse {
    results: number;
    page: number;
    total_pages: number;
    data:
      | AZIData[]
      | CatnatData[]
      | CaviteData[]
      | InstallationsClasseesData[]
      | MVTData[]
      | PAPIData[]
      | PCSData[]
      | RadonData[]
      | RisquesData[]
      | SISData[]
      | TIMData[]
      | TRIData[]
      | ZonageSismiqueData[];
    response_code: number;
    message: string | null;
    next: string | null;
    previous: string | null;
  }
  

  
  /*Exemple response resultat API GASPAR AZI :
  {
    results: 2,
    page: 1,
    total_pages: 1,
    data: [
      {
        code_national_azi: '38DDT20010007',
        libelle_azi: "Atlas des zones inondables de l'Isère en aval de Grenoble dans le département de l'Isère",
        liste_libelle_risque: [Array],
        libelle_bassin_risques: "L'Isère",
        libelle_commentaire: null,
        date_debut_programmation: '28/02/2001',
        date_fin_programmation: '28/02/2001',
        date_debut_etude: null,
        date_fin_etude: null,
        date_debut_information: null,
        date_fin_information: null,
        date_realisation: null,
        date_diffusion: '28/02/2001',
        date_publication_web: null,
        code_insee: '38400',
        libelle_commune: 'SAINT-JEAN-DE-MOIRANS'
      },
      {
        code_national_azi: '38DDT20040002',
        libelle_azi: 'Atlas des zones inondables de la Morge',
        liste_libelle_risque: [Array],
        libelle_bassin_risques: 'La Morge',
        libelle_commentaire: null,
        date_debut_programmation: '22/03/2004',
        date_fin_programmation: '22/03/2004',
        date_debut_etude: null,
        date_fin_etude: null,
        date_debut_information: null,
        date_fin_information: null,
        date_realisation: null,
        date_diffusion: '22/03/2004',
        date_publication_web: null,
        code_insee: '38400',
        libelle_commune: 'SAINT-JEAN-DE-MOIRANS'
      },
      {
        code_national_azi: '38DDT20040002',
        libelle_azi: 'Atlas des zones inondables de la Morge',
        liste_libelle_risque: [Array],
        libelle_bassin_risques: 'La Morge',
        libelle_commentaire: null,
        date_debut_programmation: '22/03/2004',
        date_fin_programmation: '22/03/2004',
        date_debut_etude: null,
        date_fin_etude: null,
        date_debut_information: null,
        date_fin_information: null,
        date_realisation: null,
        date_diffusion: '22/03/2004',
        date_publication_web: null,
        code_insee: '38563',
        libelle_commune: 'VOIRON'
      }
    ],
    response_code: 200,
    message: null,
    next: null,
    previous: null
  }
  */
  
  export interface AZIData {
    code_national_azi: string;
    libelle_azi: string;
    liste_libelle_risque: LibelleRisque[];
    libelle_bassin_risques: string;
    libelle_commentaire: string | null;
    date_debut_programmation: string | null;
    date_fin_programmation: string | null;
    date_debut_etude: string | null;
    date_fin_etude: string | null;
    date_debut_information: string | null;
    date_fin_information: string | null;
    date_realisation: string | null;
    date_diffusion: string | null;
    date_publication_web: string | null;
    code_insee: string;
    libelle_commune: string;
  }
  
  export interface LibelleRisque {
    num_risque: string;
    libelle_risque_long: string;
  }
  /*Exemple for API response of Catnat: 
  {
    results: 4,
    page: 1,
    total_pages: 1,
    data: [
      {
        code_national_catnat: 'INTE1240954A',
        date_debut_evt: '01/11/2012',
        date_fin_evt: '03/11/2012',
        date_publication_arrete: '30/11/2012',
        date_publication_jo: '06/12/2012',
        libelle_risque_jo: 'Inondations et/ou Coulées de Boue',
        code_insee: '62711',
        libelle_commune: 'RINXENT'
      },
      {
        code_national_catnat: 'INTE1917051A',
        date_debut_evt: '01/10/2018',
        date_fin_evt: '31/12/2018',
        date_publication_arrete: '18/06/2019',
        date_publication_jo: '17/07/2019',
        libelle_risque_jo: 'Sécheresse',
        code_insee: '62711',
        libelle_commune: 'RINXENT'
      },
      {
        code_national_catnat: 'INTE9900627A',
        date_debut_evt: '25/12/1999',
        date_fin_evt: '29/12/1999',
        date_publication_arrete: '29/12/1999',
        date_publication_jo: '30/12/1999',
        libelle_risque_jo: 'Inondations et/ou Coulées de Boue',
        code_insee: '62711',
        libelle_commune: 'RINXENT'
      },
      {
        code_national_catnat: 'INTE9900627A',
        date_debut_evt: '25/12/1999',
        date_fin_evt: '29/12/1999',
        date_publication_arrete: '29/12/1999',
        date_publication_jo: '30/12/1999',
        libelle_risque_jo: 'Mouvement de Terrain',
        code_insee: '62711',
        libelle_commune: 'RINXENT'
      },
      {
        code_national_catnat: 'IOME2221479A',
        date_debut_evt: '17/02/2022',
        date_fin_evt: '20/02/2022',
        date_publication_arrete: '24/07/2022',
        date_publication_jo: '10/08/2022',
        libelle_risque_jo: 'Vents Cycloniques',
        code_insee: '62711',
        libelle_commune: 'RINXENT'
      }
    ],
    response_code: 200,
    message: null,
    next: null,
    previous: null
  }
  */
  export interface CatnatData {
    code_national_catnat: string;
    date_debut_evt: string;
    date_fin_evt: string;
    date_publication_arrete: string;
    date_publication_jo: string;
    libelle_risque_jo: string;
    code_insee: string;
    libelle_commune: string;
  }
  
  /*Exemple for API response of Cavite: 
  *{
    results: 29,
    page: 1,
    total_pages: 3,
    data: [
      {
        identifiant: 'RHA0000053AA',
        type: 'carrière',
        nom: 'site_53',
        reperage_geo: 'autre',
        region: [Object],
        departement: [Object],
        code_insee: '38337',
        longitude: 5.512844,
        latitude: 45.353653
      },
      {
        identifiant: 'RHAAA0003039',
        type: 'carrière',
        nom: null,
        reperage_geo: 'autre',
        region: [Object],
        departement: [Object],
        code_insee: '38337',
        longitude: 5.5067034,
        latitude: 45.353897
      },
      {
        identifiant: 'RHAAA0003040',
        type: 'carrière',
        nom: null,
        reperage_geo: 'autre',
        region: [Object],
        departement: [Object],
        code_insee: '38337',
        longitude: 5.5086894,
        latitude: 45.355354
      },
      {
        identifiant: 'RHAAA2002858',
        type: 'naturelle',
        nom: 'saint-aupre',
        reperage_geo: 'orifice visible',
        region: [Object],
        departement: [Object],
        code_insee: '38362',
        longitude: 5.535102,
        latitude: 45.40276
      },
      {
        identifiant: 'RHAAA2002902',
        type: 'naturelle',
        nom: 'midi',
        reperage_geo: 'orifice visible',
        region: [Object],
        departement: [Object],
        code_insee: '38395',
        longitude: 5.6602254,
        latitude: 45.321568
      },
      {
        identifiant: 'RHAAA2002922',
        type: 'naturelle',
        nom: 'pan',
        reperage_geo: 'orifice visible',
        region: [Object],
        departement: [Object],
        code_insee: '38442',
        longitude: 5.7084146,
        latitude: 45.32254
      },
      {
        identifiant: 'RHAAA2003017',
        type: 'naturelle',
        nom: 'malossane',
        reperage_geo: 'orifice visible',
        region: [Object],
        departement: [Object],
        code_insee: '38565',
        longitude: 5.5536165,
        latitude: 45.307457
      },
      {
        identifiant: 'RHAAA2003037',
        type: 'carrière',
        nom: 'chemin-des-vignes',
        reperage_geo: 'autre',
        region: [Object],
        departement: [Object],
        code_insee: '38337',
        longitude: 5.49674,
        latitude: 45.349365
      },
      {
        identifiant: 'RHAAA2003038',
        type: 'carrière',
        nom: null,
        reperage_geo: 'autre',
        region: [Object],
        departement: [Object],
        code_insee: '38337',
        longitude: 5.512844,
        latitude: 45.353653
      },
      {
        identifiant: 'RHAAA2003039',
        type: 'carrière',
        nom: null,
        reperage_geo: 'autre',
        region: [Object],
        departement: [Object],
        code_insee: '38337',
        longitude: 5.5067034,
        latitude: 45.353897
      }
    ],
    response_code: 200,
    message: null,
    next: 'https://api-georisques.bike-prod.brgm.fr/api/v1/cavites?latlon=+5.586415,45.327006&rayon=10000&page=2',
    previous: null
  }
  */
  
  export interface CaviteData {
    identifiant: string;
    type: string;
    nom: string | null;
    reperage_geo: string;
    region: CaviteRegionOrDepartement;
    departement: CaviteRegionOrDepartement;
    code_insee: string;
    longitude: number;
    latitude: number;
  }
  
  export interface CaviteRegionOrDepartement {
    code: string;
    nom: string;
  }
  
  /*
   *InstallationsClassees SEVESO
   */
  export interface InstallationsClasseesData {
    adresse1: string;
    adresse2: string;
    adresse3: string;
    bovins: boolean;
    carriere: boolean;
    codeAIOT: string;
    codeInsee: string;
    codeNaf: string;
    codePostal: string;
    commune: string;
    coordonneeXAIOT: number;
    coordonneeYAIOT: number;
    date_maj: string;
    documentsHorsInspection: InstallationsClasseesDocument[];
    eolienne: boolean;
    etatActivite: string;
    ied: boolean;
    industrie: boolean;
    inspections: InstallationsClasseesInspection[];
    latitude: number;
    longitude: number;
    porcs: boolean;
    prioriteNationale: boolean;
    raisonSociale: string;
    regime: string;
    rubriques: InstallationsClasseesRubrique[];
    serviceAIOT: string;
    siret: string;
    statutSeveso: string;
    systemeCoordonneesAIOT: string;
    volailles: boolean;
  }
  
  export interface InstallationsClasseesDocument {
    dateFichier: string;
    identifiantFichier: string;
    nomFichier: string;
    typeFichier: string;
    urlFichier: string;
  }
  
  export interface InstallationsClasseesInspection {
    dateInspection: string;
    fichierInspection: Document;
  }
  
  export interface InstallationsClasseesRubrique {
    alinea: string;
    nature: string;
    numeroRubrique: string;
    quantiteTotale: string;
    regimeAutoriseAlinea: string;
    unite: string;
  }
  
  /*
   *MVT
   */
  
  export interface MVTData {
    code_insee: string;
    commentaire_lieu: string;
    commentaire_mvt: string;
    date_debut: string;
    date_maj: string;
    departement: MVTCodedEntity;
    fiabilite: string;
    identifiant: string;
    latitude: number;
    longitude: number;
    precision_date: string;
    precision_lieu: string;
    region: MVTCodedEntity;
    type: string;
  }
  
  export interface MVTCodedEntity {
    code: string;
    nom: string;
  }
  
  /*
   *PAPI
   */
  
  export interface PAPIData {
    code_insee: string;
    code_national_papi: string;
    date_fin_realisation: string;
    date_labellisation: string;
    date_signature: string;
    libelle_bassin_risques: string;
    libelle_commentaire: string;
    libelle_commune: string;
    libelle_papi: string;
    liste_libelle_risque: LibelleRisque[];
  }
  
  export interface LibelleRisque {
    libelle_risque_long: string;
    num_risque: string;
  }
  
  /*
   *PCS
   */
  
  export interface PCSData {
    code_insee: string;
    code_national_pcs: string;
    date_debut_etude: string;
    date_fin_etude: string;
    date_notification: string;
    libelle_bassin_risques: string;
    libelle_commentaire: string;
    libelle_commune: string;
    libelle_pcs: string;
    liste_libelle_risque: LibelleRisque[];
  }
  
  /*
   *Radon
   */
  
  export interface RadonData {
    classe_potentiel: string;
    code_insee: string;
    libelle_commune: string;
  }
  
  /*
   *RGA
   */
  export interface RGAResponse {
    codeExposition: string;
    exposition: string;
  }
  
  /*
   *Risques
   */
  export interface RisquesData {
    code_insee: string;
    libelle_commune: string;
    risques_detail: RisqueDetail[];
  }
  
  export interface RisqueDetail {
    libelle_risque_long: string;
    num_risque: string;
    zone_sismicite: string;
  }
  
  /*
   *SIS
   */
  export interface SISData {
    adresse: string;
    adresse_lieudit: string;
    code_insee: string;
    fiche_risque: string;
    geom: Geom;
    id_sis: string;
    nom: string;
    nom_commune: string;
    superficie: number;
  }
  
  export interface Geom {
    bbox: number[];
    crs: {
      properties: any;
      type: string;
    };
  }
  
  /*
   *TIMD
   */
  export interface TIMData {
    code_insee: string;
    date_transmission: string;
    libelle_commune: string;
  }
  
  /*
   *TRID
   */
  export interface TRIData {
    code_insee: string;
    code_national_tri: string;
    date_arrete_approbation: string;
    date_arrete_carte: string;
    date_arrete_national: string;
    date_arrete_pcb: string;
    date_arrete_pcb_local: string;
    date_arrete_prefet_parties_prenantes: string;
    libelle_bassin_risques: string;
    libelle_commentaire: string;
    libelle_commune: string;
    libelle_tri: string;
    liste_libelle_risque: LibelleRisque[];
  }
  /*
   *ZonageSismique
   */
  export interface ZonageSismiqueData {
    code_insee: string;
    code_zone: string;
    libelle_commune: string;
    zone_sismicite: string;
  }
  