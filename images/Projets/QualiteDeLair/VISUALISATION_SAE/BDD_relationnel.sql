
DROP TABLE IF EXISTS VALEUR_INDICATEUR CASCADE;
DROP TABLE IF EXISTS CAPTEUR CASCADE;
DROP TABLE IF EXISTS STATION CASCADE;
DROP TABLE IF EXISTS VILLE CASCADE;
DROP TABLE IF EXISTS PAYS CASCADE;
DROP TABLE IF EXISTS POLLUANT CASCADE;
DROP TABLE IF EXISTS INDICATEUR CASCADE;

CREATE TABLE PAYS (
    id_pays SERIAL PRIMARY KEY,
    nom_pays VARCHAR(100),
    iso2 VARCHAR(5),
    iso3 VARCHAR(5)
);

CREATE TABLE VILLE (
    id_ville SERIAL PRIMARY KEY,
    nom_ville VARCHAR(100),
    nom_ville_ascii VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    admin_name VARCHAR(100),
    capital_type VARCHAR(50),
    population INT,
    id_pays INT,
    FOREIGN KEY (id_pays) REFERENCES PAYS(id_pays)
);

CREATE TABLE STATION (
    id_station SERIAL PRIMARY KEY,
    openaq_location_id INT,
    nom_station VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    id_pays INT,
    id_ville INT,
    FOREIGN KEY (id_pays) REFERENCES PAYS(id_pays),
    FOREIGN KEY (id_ville) REFERENCES VILLE(id_ville)
);

CREATE TABLE POLLUANT (
    id_polluant SERIAL PRIMARY KEY,
    code_polluant VARCHAR(20),
    nom_polluant VARCHAR(100),
    description TEXT,
    unite_defaut VARCHAR(20)
);

CREATE TABLE CAPTEUR (
    id_capteur SERIAL PRIMARY KEY,
    openaq_sensor_id INT,
    unite VARCHAR(20),
    id_station INT,
    id_polluant INT,
    FOREIGN KEY (id_station) REFERENCES STATION(id_station),
    FOREIGN KEY (id_polluant) REFERENCES POLLUANT(id_polluant)
);

CREATE TABLE INDICATEUR (
    id_indicateur SERIAL PRIMARY KEY,
    code_indicateur VARCHAR(50),
    nom_indicateur VARCHAR(100),
    description TEXT,
    unite VARCHAR(50)
);

CREATE TABLE VALEUR_INDICATEUR (
    id_pays INT,
    id_indicateur INT,
    annee INT,
    valeur FLOAT,
    PRIMARY KEY (id_pays, id_indicateur, annee),
    FOREIGN KEY (id_pays) REFERENCES PAYS(id_pays),
    FOREIGN KEY (id_indicateur) REFERENCES INDICATEUR(id_indicateur)
);

INSERT INTO PAYS (nom_pays, iso2, iso3) VALUES 
('France', 'FR', 'FRA'),
('United States', 'US', 'USA');

INSERT INTO VILLE 
(nom_ville, nom_ville_ascii, latitude, longitude, admin_name, capital_type, population, id_pays) 
VALUES 
('Paris', 'Paris', 48.8566, 2.3522, 'Ile-de-France', 'primary', 2148000, 1),
('Lyon', 'Lyon', 45.7640, 4.8357, 'Auvergne-Rhône-Alpes', 'admin', 515695, 1),
('New York', 'New York', 40.7128, -74.0060, 'New York', 'primary', 8419000, 2),
('Los Angeles', 'Los Angeles', 34.0522, -118.2437, 'California', 'admin', 3980000, 2);

INSERT INTO STATION 
(openaq_location_id, nom_station, latitude, longitude, id_pays, id_ville) 
VALUES 
(8723, 'Paris - FR04014', 48.8566, 2.3522, 1, 1),
(9845, 'Lyon Centre', 45.7640, 4.8357, 1, 2),
(10234, 'NY Manhattan Downtown', 40.7128, -74.0060, 2, 3),
(11021, 'LA Central Station', 34.0522, -118.2437, 2, 4);

INSERT INTO POLLUANT 
(code_polluant, nom_polluant, description, unite_defaut) 
VALUES 
('pm25', 'PM2.5', 'Fine particulate matter', 'µg/m3'),
('no2', 'Nitrogen dioxide', 'Traffic-related gas', 'µg/m3'),
('o3', 'Ozone', 'Secondary pollutant', 'µg/m3');

INSERT INTO CAPTEUR 
(openaq_sensor_id, unite, id_station, id_polluant) 
VALUES 
(50001, 'µg/m3', 1, 1),
(50002, 'µg/m3', 1, 2),
(50003, 'µg/m3', 2, 1),
(50004, 'µg/m3', 3, 2),
(50005, 'µg/m3', 4, 3);

