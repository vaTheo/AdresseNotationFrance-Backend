/*exemple response communes_udi:
{
  count: 24,
  first: 'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi?code_commune=38400&page=1&size=5000',
  last: null,
  prev: null,
  next: null,
  api_version: 'v1',
  data: [
    {
      code_commune: '38400',
      nom_commune: 'SAINT-JEAN-DE-MOIRANS',
      nom_quartier: 'archat',
      code_reseau: '038000273',
      nom_reseau: 'MOIRANS PRINCIPAL',
      debut_alim: '2012-10-03',
      annee: '2023'
    },
    {
      code_commune: '38400',
      nom_commune: 'SAINT-JEAN-DE-MOIRANS',
      nom_quartier: 'commune',
      code_reseau: '038000335',
      nom_reseau: 'COUBLEVIE ST JEAN LA BUISSE',
      debut_alim: '2010-09-10',
      annee: '2023'
    }
  ]
} */
export interface communes_udiDataItem {
  code_commune: string;
  nom_commune: string;
  nom_quartier: string;
  code_reseau: string;
  nom_reseau: string;
  debut_alim: string;
  annee: string;
}

export interface communes_udi {
  count: number;
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
  api_version: string;
  data: communes_udiDataItem[];
}

/*Exemple response resultat dis : 
{
  "count": 159,
  "first": "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_commune=59310&page=1&size=5000",
  "last": null,
  "prev": null,
  "next": null,
  "api_version": "v1",
  "data": [
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "5900",
      "code_parametre_se": "COULQ",
      "code_parametre_cas": null,
      "libelle_parametre": "Couleur (qualitatif)",
      "libelle_parametre_maj": "COULEUR (QUALITATIF)",
      "libelle_parametre_web": null,
      "code_type_parametre": "O",
      "code_lieu_analyse": "T",
      "resultat_alphanumerique": "Aucun changement anormal",
      "resultat_numerique": 0.0,
      "libelle_unite": "SANS OBJET",
      "code_unite": "X",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": null,
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1399",
      "code_parametre_se": "CL2TOT",
      "code_parametre_cas": null,
      "libelle_parametre": "Chlore total",
      "libelle_parametre_maj": "CHLORE TOTAL",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "T",
      "resultat_alphanumerique": "0,67",
      "resultat_numerique": 0.67,
      "libelle_unite": "mg(Cl2)/L",
      "code_unite": "165",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": null,
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "6489",
      "code_parametre_se": "ASP",
      "code_parametre_cas": null,
      "libelle_parametre": "Aspect (qualitatif)",
      "libelle_parametre_maj": "ASPECT (QUALITATIF)",
      "libelle_parametre_web": null,
      "code_type_parametre": "O",
      "code_lieu_analyse": "T",
      "resultat_alphanumerique": "Aspect normal",
      "resultat_numerique": 0.0,
      "libelle_unite": "SANS OBJET",
      "code_unite": "X",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": null,
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "5902",
      "code_parametre_se": "SAVQ",
      "code_parametre_cas": null,
      "libelle_parametre": "Saveur (qualitatif)",
      "libelle_parametre_maj": "SAVEUR (QUALITATIF)",
      "libelle_parametre_web": null,
      "code_type_parametre": "O",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "Aucun changement anormal",
      "resultat_numerique": 0.0,
      "libelle_unite": "SANS OBJET",
      "code_unite": "X",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1301",
      "code_parametre_se": "TEAU",
      "code_parametre_cas": null,
      "libelle_parametre": "Température de l'eau",
      "libelle_parametre_maj": "TEMPÉRATURE DE L'EAU",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "T",
      "resultat_alphanumerique": "19,6",
      "resultat_numerique": 19.6,
      "libelle_unite": "°C",
      "code_unite": "27",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": "<=25 °C",
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": null,
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1449",
      "code_parametre_se": "ECOLI",
      "code_parametre_cas": null,
      "libelle_parametre": "Escherichia coli /100ml - MF",
      "libelle_parametre_maj": "ESCHERICHIA COLI /100ML - MF",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<1",
      "resultat_numerique": 0.0,
      "libelle_unite": "n/(100mL)",
      "code_unite": "226",
      "limite_qualite_parametre": "<=0 n/(100mL)",
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1335",
      "code_parametre_se": "NH4",
      "code_parametre_cas": "14798-03-9",
      "libelle_parametre": "Ammonium (en NH4)",
      "libelle_parametre_maj": "AMMONIUM (EN NH4)",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<0,05",
      "resultat_numerique": 0.0,
      "libelle_unite": "mg/L",
      "code_unite": "162",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": "<=0,1 mg/L",
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1302",
      "code_parametre_se": "PH",
      "code_parametre_cas": null,
      "libelle_parametre": "pH",
      "libelle_parametre_maj": "PH ",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "T",
      "resultat_alphanumerique": "7,8",
      "resultat_numerique": 7.8,
      "libelle_unite": "unité pH",
      "code_unite": "264",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": ">=6,5 et <=9 unité pH",
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": null,
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "5901",
      "code_parametre_se": "ODQ",
      "code_parametre_cas": null,
      "libelle_parametre": "Odeur (qualitatif)",
      "libelle_parametre_maj": "ODEUR (QUALITATIF)",
      "libelle_parametre_web": null,
      "code_type_parametre": "O",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "Aucun changement anormal",
      "resultat_numerique": 0.0,
      "libelle_unite": "SANS OBJET",
      "code_unite": "X",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1303",
      "code_parametre_se": "CDT25",
      "code_parametre_cas": null,
      "libelle_parametre": "Conductivité à 25°C",
      "libelle_parametre_maj": "CONDUCTIVITÉ À 25°C",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "T",
      "resultat_alphanumerique": "705",
      "resultat_numerique": 705.0,
      "libelle_unite": "µS/cm",
      "code_unite": "147",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": ">=200 et <=1100 µS/cm",
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": null,
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1309",
      "code_parametre_se": "COULF",
      "code_parametre_cas": null,
      "libelle_parametre": "Coloration",
      "libelle_parametre_maj": "COLORATION",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<5",
      "resultat_numerique": 0.0,
      "libelle_unite": "mg(Pt)/L",
      "code_unite": "178",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": "<=15 mg(Pt)/L",
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1447",
      "code_parametre_se": "CTF",
      "code_parametre_cas": null,
      "libelle_parametre": "Bactéries coliformes /100ml-MS",
      "libelle_parametre_maj": "BACTÉRIES COLIFORMES /100ML-MS",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<1",
      "resultat_numerique": 0.0,
      "libelle_unite": "n/(100mL)",
      "code_unite": "226",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": "<=0 n/(100mL)",
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "6455",
      "code_parametre_se": "STRF",
      "code_parametre_cas": null,
      "libelle_parametre": "Entérocoques /100ml-MS",
      "libelle_parametre_maj": "ENTÉROCOQUES /100ML-MS",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<1",
      "resultat_numerique": 0.0,
      "libelle_unite": "n/(100mL)",
      "code_unite": "226",
      "limite_qualite_parametre": "<=0 n/(100mL)",
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1295",
      "code_parametre_se": "TURBNFU",
      "code_parametre_cas": null,
      "libelle_parametre": "Turbidité néphélométrique NFU",
      "libelle_parametre_maj": "TURBIDITÉ NÉPHÉLOMÉTRIQUE NFU",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<0,1",
      "resultat_numerique": 0.0,
      "libelle_unite": "NFU",
      "code_unite": "232",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": "<=2 NFU",
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "5441",
      "code_parametre_se": "GT36_44",
      "code_parametre_cas": null,
      "libelle_parametre": "Bact. aér. revivifiables à 36°-44h",
      "libelle_parametre_maj": "BACT. AÉR. REVIVIFIABLES À 36°-44H",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<1",
      "resultat_numerique": 0.0,
      "libelle_unite": "n/mL",
      "code_unite": "222",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "5440",
      "code_parametre_se": "GT22_68",
      "code_parametre_cas": null,
      "libelle_parametre": "Bact. aér. revivifiables à 22°-68h",
      "libelle_parametre_maj": "BACT. AÉR. REVIVIFIABLES À 22°-68H",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "L",
      "resultat_alphanumerique": "<1",
      "resultat_numerique": 0.0,
      "libelle_unite": "n/mL",
      "code_unite": "222",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": "05900313051",
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },
    {
      "code_departement": "59",
      "nom_departement": "Nord",
      "code_prelevement": "05900313051",
      "code_parametre": "1398",
      "code_parametre_se": "CL2LIB",
      "code_parametre_cas": null,
      "libelle_parametre": "Chlore libre",
      "libelle_parametre_maj": "CHLORE LIBRE",
      "libelle_parametre_web": null,
      "code_type_parametre": "N",
      "code_lieu_analyse": "T",
      "resultat_alphanumerique": "0,45",
      "resultat_numerique": 0.45,
      "libelle_unite": "mg(Cl2)/L",
      "code_unite": "165",
      "limite_qualite_parametre": null,
      "reference_qualite_parametre": null,
      "code_commune": "59310",
      "nom_commune": "HON-HERGIES",
      "nom_uge": "NOREADE C.E. LE QUESNOY",
      "nom_distributeur": "SIDEN-SIAN NOREADE LE QUESNOY",
      "nom_moa": "SIDEN SIAN NOREADE EAU",
      "date_prelevement": "2023-08-18T11:01:00Z",
      "conclusion_conformite_prelevement": "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
      "conformite_limites_bact_prelevement": "C",
      "conformite_limites_pc_prelevement": "C",
      "conformite_references_bact_prelevement": "C",
      "conformite_references_pc_prelevement": "C",
      "reference_analyse": null,
      "code_installation_amont": "059000440",
      "nom_installation_amont": "GOMMEGNIES",
      "reseaux": [
        { "code": "059000440", "nom": "GOMMEGNIES" },
        { "code": "059000615", "nom": "JENLAIN", "debit": "20 %" }
      ]
    },.....
     */
export interface ResultatDis {
  count: number;
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
  api_version: string;
  data: Array<DataItemResultatDis>;
}

export interface DataItemResultatDis {
  code_departement: string;
  nom_departement: string;
  code_prelevement: string;
  code_parametre: string;
  code_parametre_se: string;
  code_parametre_cas: string | null;
  libelle_parametre: string;
  libelle_parametre_maj: string;
  libelle_parametre_web: string | null;
  code_type_parametre: string;
  code_lieu_analyse: string;
  resultat_alphanumerique: string;
  resultat_numerique: number;
  libelle_unite: string;
  code_unite: string;
  limite_qualite_parametre: string | null;
  reference_qualite_parametre: string | null;
  code_commune: string;
  nom_commune: string;
  nom_uge: string;
  nom_distributeur: string;
  nom_moa: string;
  date_prelevement: string;
  conclusion_conformite_prelevement: string;
  conformite_limites_bact_prelevement: string;
  conformite_limites_pc_prelevement: string;
  conformite_references_bact_prelevement: string;
  conformite_references_pc_prelevement: string;
  reference_analyse: string | null;
  code_installation_amont: string;
  nom_installation_amont: string;
  reseaux: Array<ReseauResultatDis>;
}

export interface ReseauResultatDis {
  code: string;
  nom: string;
  debit?: string;
}
