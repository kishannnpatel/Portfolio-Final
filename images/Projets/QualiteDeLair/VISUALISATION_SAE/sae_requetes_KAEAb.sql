Afin de comparer les performances, nous avons testé 4 requêtes représentatives (2 OLAP : Q1 et Q2, et 2 requêtes classiques : Q19 et Q17) sur les deux modèles.
Cela permet de démontrer efficacement l’intérêt du modèle multidimensionnel sans répéter inutilement les mêmes analyses sur l’ensemble des 20 requêtes. 
Les autres requêtes ont été exécutées uniquement sur le modèle multidimensionnel.

1) Pollution par pays et par année avec totaux hiérarchiques
Multidimensionnel

EXPLAIN ANALYZE
SELECT d.nom_pays, f.annee, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_pays_economie d 
ON f.id_pays = d.id_pays AND f.annee = d.annee
GROUP BY ROLLUP (d.nom_pays, f.annee);

Relationnel 

EXPLAIN ANALYZE
SELECT p.nom_pays, COUNT(*) AS nb_mesures
FROM capteur c
INNER JOIN station s ON c.id_station = s.id_station
INNER JOIN pays p ON s.id_pays = p.id_pays
GROUP BY p.nom_pays;

2) Analyse des polluants par continent et catégorie

Multidimensionnel

EXPLAIN ANALYZE
SELECT l.continent, p.nom_polluant, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_localisation l ON f.id_localisation = l.id_localisation
INNER JOIN dim_polluant p ON f.id_polluant = p.id_polluant
GROUP BY CUBE (l.continent, p.nom_polluant);

Relationnel 

EXPLAIN ANALYZE
SELECT p.nom_polluant, COUNT(*) AS nb_mesures
FROM capteur c
INNER JOIN polluant p 
ON c.id_polluant = p.id_polluant
GROUP BY p.nom_polluant;


3) Analyse ciblée par ville, pays et saison

Multidimensionnel

EXPLAIN ANALYZE
SELECT l.nom_ville, l.nom_pays, t.saison, SUM(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_localisation l ON f.id_localisation = l.id_localisation
INNER JOIN dim_temps t ON f.id_temps = t.id_temps
GROUP BY GROUPING SETS (
(l.nom_ville),
(l.nom_pays),
(t.saison),
(l.nom_pays, t.saison),
(l.nom_ville, t.saison)
);

4) Analyse temporelle des mesures

Multidimensionnel

EXPLAIN ANALYZE
SELECT t.annee, t.trimestre, t.mois, COUNT(*)
FROM fait_mesure f
INNER JOIN dim_temps t ON f.id_temps = t.id_temps
GROUP BY ROLLUP (t.annee, t.trimestre, t.mois);

5) Analyse des indicateurs économiques

EXPLAIN ANALYZE
SELECT d.nom_pays, f.annee, i.nom_indicateur, AVG(f.valeur)
FROM fait_indicateur f
INNER JOIN dim_pays_economie d 
ON f.id_pays = d.id_pays AND f.annee = d.annee
INNER JOIN dim_indicateur i ON f.id_indicateur = i.id_indicateur
GROUP BY CUBE (d.nom_pays, f.annee, i.nom_indicateur);

6) Analyse pollution par continent, pays et année


EXPLAIN ANALYZE
SELECT l.continent, d.nom_pays, f.annee, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_localisation l ON f.id_localisation = l.id_localisation
INNER JOIN dim_pays_economie d 
ON f.id_pays = d.id_pays AND f.annee = d.annee
GROUP BY CUBE (l.continent, d.nom_pays, f.annee);

 7) Analyse hiérarchique par temps et polluant

EXPLAIN ANALYZE
SELECT t.annee, t.mois, p.nom_polluant, COUNT(*)
FROM fait_mesure f
INNER JOIN dim_temps t ON f.id_temps = t.id_temps
INNER JOIN dim_polluant p ON f.id_polluant = p.id_polluant
GROUP BY ROLLUP (t.annee, t.mois, p.nom_polluant);

8) Analyse ciblée des indicateurs économiques

EXPLAIN ANALYZE
SELECT d.nom_pays, i.nom_indicateur, f.annee, SUM(f.valeur)
FROM fait_indicateur f
INNER JOIN dim_pays_economie d 
ON f.id_pays = d.id_pays AND f.annee = d.annee
INNER JOIN dim_indicateur i ON f.id_indicateur = i.id_indicateur
GROUP BY GROUPING SETS (
(d.nom_pays),
(i.nom_indicateur),
(f.annee),
(d.nom_pays, i.nom_indicateur),
(d.nom_pays, f.annee)
);

9) Pollution moyenne par pays

EXPLAIN ANALYZE
SELECT d.nom_pays, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_pays_economie d 
ON f.id_pays = d.id_pays AND f.annee = d.annee
GROUP BY d.nom_pays;

10) Pollution moyenne par année

EXPLAIN ANALYZE
SELECT annee, AVG(valeur_pollution)
FROM fait_mesure
GROUP BY annee;

11) Pollution moyenne par type de polluant

EXPLAIN ANALYZE
SELECT p.nom_polluant, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_polluant p ON f.id_polluant = p.id_polluant
GROUP BY p.nom_polluant;

12) Nombre de mesures par station

EXPLAIN ANALYZE
SELECT l.nom_station, COUNT(*)
FROM fait_mesure f
INNER JOIN dim_localisation l ON f.id_localisation = l.id_localisation
GROUP BY l.nom_station;

13) Pollution moyenne par ville

EXPLAIN ANALYZE
SELECT l.nom_ville, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_localisation l ON f.id_localisation = l.id_localisation
GROUP BY l.nom_ville;

14) Pollution maximale enregistrée

EXPLAIN ANALYZE
SELECT MAX(valeur_pollution)
FROM fait_mesure;

15) Pollution minimale enregistrée

EXPLAIN ANALYZE
SELECT MIN(valeur_pollution)
FROM fait_mesure;

16) Nombre de mesures par polluant

EXPLAIN ANALYZE
SELECT p.nom_polluant, COUNT(*)
FROM fait_mesure f
INNER JOIN dim_polluant p ON f.id_polluant = p.id_polluant
GROUP BY p.nom_polluant;

17) Pollution moyenne par pays et par polluant

Multidimensionnel

EXPLAIN ANALYZE
SELECT d.nom_pays, p.nom_polluant, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_pays_economie d 
ON f.id_pays = d.id_pays AND f.annee = d.annee
INNER JOIN dim_polluant p ON f.id_polluant = p.id_polluant
GROUP BY d.nom_pays, p.nom_polluant;

Relationnel

EXPLAIN ANALYZE
SELECT p.nom_pays, pol.nom_polluant, AVG(c.unite::FLOAT)
FROM capteur c
INNER JOIN station s ON c.id_station = s.id_station
INNER JOIN pays p ON s.id_pays = p.id_pays
INNER JOIN polluant pol ON c.id_polluant = pol.id_polluant
GROUP BY p.nom_pays, pol.nom_polluant;

18) Pollution moyenne par saison

EXPLAIN ANALYZE
SELECT t.saison, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_temps t ON f.id_temps = t.id_temps
GROUP BY t.saison;

19) Indicateurs économiques moyens par pays

Multidimensionnel

EXPLAIN ANALYZE
SELECT d.nom_pays, AVG(f.valeur)
FROM fait_indicateur f
INNER JOIN dim_pays_economie d 
ON f.id_pays = d.id_pays AND f.annee = d.annee
GROUP BY d.nom_pays;

Relationnel 

EXPLAIN ANALYZE
SELECT p.nom_pays, AVG(v.valeur)
FROM valeur_indicateur v
INNER JOIN pays p 
ON v.id_pays = p.id_pays
GROUP BY p.nom_pays;

20) Pollution moyenne par continent

EXPLAIN ANALYZE
SELECT l.continent, AVG(f.valeur_pollution)
FROM fait_mesure f
INNER JOIN dim_localisation l ON f.id_localisation = l.id_localisation
GROUP BY l.continent;




