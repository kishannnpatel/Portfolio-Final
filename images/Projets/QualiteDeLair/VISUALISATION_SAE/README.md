# SAE S4.C.01 — Développement avec une base de données et visualisation

**Qualité de l'air : de la donnée brute à l'analyse décisionnelle**

BUT Informatique — IUT de Montreuil, Université Paris 8 — 2ᵉ année, 2025-2026

**Auteurs :** Kishan Patel, Alpay Soran, Edvin Thileepan, Abdelraouf Boulfrad

## Objectif

Structurer, nettoyer et analyser des données de qualité de l'air provenant de plusieurs sources, afin de mieux comprendre les facteurs qui influencent la pollution. Le projet couvre l'ensemble d'une chaîne data : modélisation relationnelle, modélisation multidimensionnelle, comparaison de performance entre les deux, puis visualisation sous Qlik Sense.

## Sources de données

| Source | Contenu | Pourquoi |
|---|---|---|
| **OpenAQ** | Mesures de qualité de l'air par station (PM2.5, PM10, NO2, CO, O3, SO2), horodatées | Source principale, permet une analyse temporelle précise |
| **World Cities** | Données géographiques et démographiques des villes | Contextualise les mesures de pollution |
| **World Bank** | Indicateurs économiques et environnementaux par pays et par année (PIB, CO2, urbanisation, véhicules) | Permet d'étudier le lien entre pollution et contexte économique |

## Modélisation

**Modèle relationnel** (normalisé, orienté OLTP) : `PAYS`, `VILLE`, `STATION`, `CAPTEUR`, `POLLUANT`, `INDICATEUR`, `VALEUR_INDICATEUR`.

**Modèle multidimensionnel en constellation** (dénormalisé, orienté OLAP) : deux tables de faits — `FAIT_MESURE` et `FAIT_INDICATEUR` — reliées à cinq dimensions : `DIM_TEMPS`, `DIM_LOCALISATION`, `DIM_POLLUANT`, `DIM_INDICATEUR`, `DIM_PAYS_ECONOMIE`.

Schémas disponibles dans le dépôt : `MLD_SAE.pdf` (modèle relationnel) et `Modele_constellation.pdf` (modèle en constellation).

## Comparaison des performances

Quatre requêtes représentatives (2 OLAP avec `ROLLUP`/`CUBE`, 2 classiques) ont été exécutées sur les deux modèles et mesurées avec `EXPLAIN ANALYZE` :

| Requête | Relationnel | Multidimensionnel |
|---|---|---|
| Q1 | 0.183 ms | 0.107 ms |
| Q2 | 0.073 ms | 0.112 ms |
| Q19 | 0.066 ms | 0.070 ms |
| Q17 | 0.150 ms | 0.095 ms |

Le détail complet des 20 requêtes est dans `sae_requetes_KAEAb.sql`. Le modèle multidimensionnel réduit le nombre de jointures et se montre globalement plus adapté aux analyses décisionnelles, même si les temps restent proches sur ce volume de données de test.

## Stratégie d'analyse et visualisation

Les visualisations Qlik se concentrent sur trois pays représentant des niveaux de pollution contrastés : **Norvège** (faible pollution), **Allemagne** (pollution moyenne), **Chine** (forte pollution) — pour rendre les écarts et tendances plus lisibles qu'une analyse globale.

Cette approche a permis de repérer une anomalie : la pollution moyenne en Chine passe de 66,84 µg/m³ (2021) à 27,23 µg/m³ (2022), une baisse de plus de 50 % en un an, bien plus marquée que l'évolution stable observée en Allemagne et en Norvège sur la même période. Plusieurs hypothèses sont envisagées (données manquantes, changement de méthode de mesure, événement ponctuel — dont un possible effet des confinements liés au COVID-19).

## Conclusion

Le modèle multidimensionnel en constellation s'est montré mieux adapté à l'analyse décisionnelle que le modèle relationnel : requêtes plus lisibles, moins de jointures, meilleure adéquation aux besoins d'agrégation. Le projet a aussi mis en évidence l'importance de confronter les données à leur cohérence globale avant d'en tirer des conclusions.

## Contenu du dépôt

- `Rendu_Final_SAE_Visualisation_KAEAB.pdf` — rapport complet
- `MLD_SAE.pdf` — modèle logique de données (schéma relationnel)
- `Modele_constellation.pdf` — schéma en constellation
- `BDD_relationnel.sql` — script de création du modèle relationnel
- `BDD_multidimensionnel.sql` — script de création du modèle multidimensionnel
- `sae_requetes_KAEAb.sql` — les 20 requêtes comparées entre les deux modèles

## Outils

PostgreSQL · SQL · Qlik Sense
