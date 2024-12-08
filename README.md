# 🍷 📊 Geschmack trifft Algorithmus​: Weinqualität vorhersagen mit Daten

## 💡 📚 Projektbeschreibung

In diesem Projekt dreht sich alles um die Frage: **Wie können wir mithilfe von Daten vorhersagen, wie gut ein Wein schmeckt?**  
Dazu arbeiten wir mit einem umfangreichen Datensatz zur Weinqualität, den wir auf Kaggle gefunden haben:  
[Wine Quality Data Set (Red & White Wine)](https://www.kaggle.com/datasets/ruthgn/wine-quality-data-set-red-white-wine).

Der Datensatz enthält rund **78'000 Datenpunkte**, die verschiedene chemische Eigenschaften von Rot- und Weissweinen beschreiben, sowie eine Qualitätsbewertung auf einer Skala von **0 bis 10**. Ziel des Projekts ist es, mithilfe von Machine-Learning-Methoden eine möglichst präzise Vorhersage der Weinqualität zu ermöglichen.

---

## 🔍 🎯 Ziel des Projekts

Das Hauptziel ist es, einen robusten Algorithmus zu entwickeln, der auf Basis chemischer Eigenschaften vorhersagt, wie ein Wein bewertet wird. Dabei setzen wir nicht nur auf die technischen Aspekte der Modellierung, sondern auch auf eine **anschauliche Präsentation** der Ergebnisse.

---

## ⚙️ 📈 Aufbau des Projekt

1.  **Datenbeschaffung**
      - Der Datensatz wurde von Kaggle bereitgestellt und kann hier heruntergeladen werden [Wine Quality Data Set](https://www.kaggle.com/datasets/ruthgn/wine-quality-data-set-red-white-wine)

3.  **Explorative Datenanalyse (EDA)**

    - Daten beschreiben, Identifizierung und Verstehen von Beziehungen und Gruppen,
Hypothesentest

4.  **Unifying & Transformation**

    - Datentypen und Formate analysieren und bei Bedarf vereinheitlichen,
Daten sinnvoll zusammenführen

    - Die Skala von 0 bis 10 wird in fünf Kategorien eingeteilt:
      - Sehr schlecht
      - Schlecht
      - Okay
      - Gut
      - Sehr gut  
        Dies macht die Ergebnisse anschaulicher und besser interpretierbar.

5.  **Data Cleansing + Analysis & Validation**

    - Beurteilung der Datenqualität und erforderliche Bereinigung der Daten
    - Analyse der Verteilungen, Abweichungen & Kennzahlen

6.  **Feature Selection & Engineering**

    - Analyse der Korrelationen und Kausalitäten, Identifikation der Features

7.  **Anwendung in Machine Learning**

    - Entwicklung von Regressions- oder Klassifikationsmodellen,
Performance-Vergleich und –Interpretation

8.  **Anwendung von XAI – Techniken**

    - Anwendung von XAI – Techniken, um die entwickelten Modelle
in Bezug auf die Fallstudie zu erkläre

---
# 📥 🛠️ Installation & Nutzung
## Ausführen der Applikation

## Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass die folgende Software installiert ist:

- [Docker](https://www.docker.com/products/docker-desktop) (für die Containerisierung)
- [Git](https://git-scm.com/downloads) (zum Klonen des Repositories)
- [Google Account](https://gmail.com/) (zum Ausführen der Notebooks)

## Projektstruktur

- **app**: Enthält den gesamten Frontend- und Backend-Code.
  - **frontend**: Enthält die Vue.js-App und deren Build-Dateien.
  - **backend**: Enthält Python-Skripte, maschinelle Lernmodelle und Flask-Backend-Code.
  - **app.py**: Haupt-Einstiegspunkt für die Flask-App.

## Schritte zur Einrichtung

### 1 Repository klonen

```bash
git clone https://github.com/ZHAWZHAWZHAW/wine-quality-project.git
cd wine-quality-project
```

### 2 Docker Image erstellen - Wichtig: Docker Dekstop starten

```bash
docker build -t wine-quality-app .
```

### 3 Docker container ausführen

```bash
docker run -d -p 5000:5000 wine-quality-app
```

### 4 Applikation aufrufen

- [Wine Quality Checker](http://localhost:5000/) - localhost:5000
- Befolgen Sie die Schritte auf der Instructions page.
