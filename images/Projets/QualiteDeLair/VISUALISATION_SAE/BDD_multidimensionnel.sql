
DROP TABLE IF EXISTS FAIT_MESURE CASCADE;
DROP TABLE IF EXISTS FAIT_INDICATEUR CASCADE;

DROP TABLE IF EXISTS DIM_TEMPS CASCADE;
DROP TABLE IF EXISTS DIM_LOCALISATION CASCADE;
DROP TABLE IF EXISTS DIM_POLLUANT CASCADE;
DROP TABLE IF EXISTS DIM_INDICATEUR CASCADE;
DROP TABLE IF EXISTS DIM_PAYS_ECONOMIE CASCADE;



CREATE TABLE DIM_TEMPS (
    id_temps SERIAL PRIMARY KEY,
    date_complete DATE,
    annee INT,
    mois INT,
    jour INT,
    semaine INT,
    trimestre INT,
    saison VARCHAR(20)
);


CREATE TABLE DIM_LOCALISATION (
    id_localisation SERIAL PRIMARY KEY,
    id_station INT,
    nom_station VARCHAR(100),
    nom_ville VARCHAR(100),
    admin_name VARCHAR(100),
    nom_pays VARCHAR(100),
    code_pays VARCHAR(5),
    continent VARCHAR(50),
    latitude FLOAT,
    longitude FLOAT,
    population INT
);


CREATE TABLE DIM_POLLUANT (
    id_polluant SERIAL PRIMARY KEY,
    code_polluant VARCHAR(20),
    nom_polluant VARCHAR(100),
    categorie VARCHAR(50),
    unite VARCHAR(20),
    impact_sante TEXT
);


CREATE TABLE DIM_INDICATEUR (
    id_indicateur SERIAL PRIMARY KEY,
    code_indicateur VARCHAR(50),
    nom_indicateur VARCHAR(100),
    unite VARCHAR(50)
);


CREATE TABLE DIM_PAYS_ECONOMIE (
    id_pays INT,
    annee INT,
    nom_pays VARCHAR(100),
    eco_iso3 VARCHAR(5),
    PRIMARY KEY (id_pays, annee)
);


CREATE TABLE FAIT_MESURE (
    id_mesure SERIAL PRIMARY KEY,
    id_temps INT NOT NULL,
    id_localisation INT NOT NULL,
    id_polluant INT NOT NULL,
    id_pays INT NOT NULL,
    annee INT NOT NULL,
    valeur_pollution FLOAT,

    FOREIGN KEY (id_temps)
        REFERENCES DIM_TEMPS(id_temps),

    FOREIGN KEY (id_localisation)
        REFERENCES DIM_LOCALISATION(id_localisation),

    FOREIGN KEY (id_polluant)
        REFERENCES DIM_POLLUANT(id_polluant),

    FOREIGN KEY (id_pays, annee)
        REFERENCES DIM_PAYS_ECONOMIE(id_pays, annee)
);


CREATE TABLE FAIT_INDICATEUR (
    id_pays INT,
    annee INT,
    id_indicateur INT,
    valeur FLOAT,

    PRIMARY KEY (id_pays, annee, id_indicateur),

    FOREIGN KEY (id_pays, annee)
        REFERENCES DIM_PAYS_ECONOMIE(id_pays, annee),

    FOREIGN KEY (id_indicateur)
        REFERENCES DIM_INDICATEUR(id_indicateur)
);


-- DIM_TEMPS
INSERT INTO DIM_TEMPS 
(id_temps, date_complete, annee, mois, jour, semaine, trimestre, saison)
VALUES
(1, '2020-01-15', 2020, 1, 15, 3, 1, 'hiver'),
(2, '2020-06-10', 2020, 6, 10, 23, 2, 'été');


-- DIM_LOCALISATION
INSERT INTO DIM_LOCALISATION 
(id_localisation, id_station, nom_station, nom_ville, admin_name, nom_pays, code_pays, continent, latitude, longitude, population)
VALUES
(1, 8723, 'Paris - FR04014', 'Paris', 'Ile-de-France', 'France', 'FR', 'Europe', 48.8566, 2.3522, 2148000),
(2, 10234, 'NY Manhattan Downtown', 'New York', 'New York', 'USA', 'US', 'North America', 40.7128, -74.0060, 8419000);


-- DIM_POLLUANT
INSERT INTO DIM_POLLUANT 
(id_polluant, code_polluant, nom_polluant, categorie, unite, impact_sante)
VALUES
(1, 'pm25', 'PM2.5', 'Particules', 'µg/m3', 'Respiratory issues'),
(2, 'no2', 'NO2', 'Gaz', 'µg/m3', 'Lung irritation');


-- DIM_INDICATEUR (AJOUT IMPORTANT 🔥)
INSERT INTO DIM_INDICATEUR 
(id_indicateur, code_indicateur, nom_indicateur, unite)
VALUES
(1, 'GDP', 'PIB', 'USD'),
(2, 'POP', 'Population', 'habitants');


-- DIM_PAYS_ECONOMIE
INSERT INTO DIM_PAYS_ECONOMIE 
(id_pays, annee, nom_pays, eco_iso3)
VALUES
(1, 2020, 'France', 'FRA'),
(2, 2020, 'USA', 'USA');


-- FAIT_MESURE
INSERT INTO FAIT_MESURE 
(id_mesure, id_temps, id_localisation, id_polluant, id_pays, annee, valeur_pollution)
VALUES
(1, 1, 1, 1, 1, 2020, 18.5),
(2, 1, 2, 2, 2, 2020, 42.3);


-- FAIT_INDICATEUR
INSERT INTO FAIT_INDICATEUR 
(id_pays, annee, id_indicateur, valeur)
VALUES
(1, 2020, 1, 41463),
(2, 2020, 1, 63543);