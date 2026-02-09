# Aquae Europae – Spa Towns of Europe

Aquae Europae is a static, data-driven website presenting an overview of European spa towns. It is developed as part of a master's thesis in Digital Humanities at the University of Vienna. The website visualises spa towns on an interactive map and provides a searchable table with structured metadata. It has been vibecoded with GPT-5.2

🌐 Live site: https://icrimedkarub.github.io/aquae_europae/

## Project structure
```php
aquae_europae/
│
├── index.html              # Homepage (GitHub Pages entry point)
├── about.html
├── contact.html
├── imprint.html
│
├── static/
│   ├── style.css           # Shared styling
│   └── script.js           # Map, table, filtering logic
│
├── data/
│   ├── towns.json          # Generated spa town data
│   └── metadata.json       # Contains last_updated date
│
├── assets/
│   └── favicon.ico
│
├── excel_to_json.py        # Converts Excel → JSON
├── towns.xlsx              # Source data
│
├── .gitignore
└── README.md
```

## Data source
The seed dataset is based on the data collected within The European Spa Project (2019–2022). The project team allowed for the data to be used.
Project website: https://www.theeuropeanspa.eu/
Dataset: https://doi.org/10.5281/zenodo.18482816

This dataset will be expanded over time, especially with regard to *Kurlisten* (spa guest lists) data. The website uses pre-generated JSON files. 
The underlying Excel source file and conversion scripts are maintained
in a separate [repository](https://github.com/icrimedkarub/kurlisten_masterarbeit) as part of the thesis workflow.
Only the processed data required for the website is included here.

## Data workflow

The website is fully static. Data updates follow this workflow:

1. Update `towns.xlsx`

2. Run the conversion script:

    `python excel_to_json.py`

3. This automatically updates:

        data/towns.json

        data/metadata.json (last update date)

4. Commit and push to GitHub

5. GitHub Pages updates automatically

## Technologies used

* HTML5 / CSS3

* Vanilla JavaScript

* Leaflet (interactive maps)

* OpenStreetMap tiles

* Python (Pandas) for data preparation

* GitHub Pages for hosting


## Privacy & data protection

This website does not collect personal data, does not use cookies, does not use analytics or tracking tools.

## Author

Burak Demirci (icrimedkarub)

Contact:
aquae[dot]europae[at]gmail[dot]com

## License

This project is intended for scientific and educational use.