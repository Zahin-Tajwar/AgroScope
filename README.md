# Agroscope

Agroscope is a web-based agricultural decision-support concept developed for the NASA Space Apps Challenge 2026 challenge:

**Field Shift: Adapting Farms with NASA Data**

## Overview

Agroscope aims to connect the view we get from space with what happens on the ground.

The project combines NASA Earth observations, agricultural knowledge, soil information, crop characteristics, and farmer priorities to help explore crop-rotation strategies that can protect soil, use resources effectively, and adapt to changing environmental conditions.

Agroscope is designed to support farmer in choosing crop rotation strategies.

## Current Prototype

This repository contains our current frontend prototype.

The prototype demonstrates:

- Field and location input
- Soil and crop information
- Farmer priorities
- 3D geospatial visualization
- Earth-observation visualization
- Climate and risk indicators
- Crop suitability comparisons
- Crop-rotation strategies
- English and Bangla interface support
- Interactive charts and visualizations

### Important Note

The current prototype uses structured sample data to demonstrate the intended user experience.

The Earth-observation values shown in the prototype are not currently retrieved live from NASA APIs.

## Technology

### Current Prototype

- HTML5
- CSS3
- JavaScript
- CesiumJS
- SVG-based visualizations
- English and Bangla rendering

### Planned Final System

The future system is planned to include:

- Python backend
- API-based frontend/backend communication
- NASA Earth-observation data
- Geospatial data processing
- Agricultural and soil data
- Crop-rotation decision logic
- Live and near-real-time data sources
- AI-assisted decision support

Potential NASA data sources include:

- MODIS
- SMAP
- Landsat
- GPM
- ECOSTRESS
- NASA POWER

These are planned data sources for the future system and are not all currently integrated into the prototype.

## Architecture

### Current

Browser → HTML/CSS/JavaScript → Sample Data → Visualizations

### Planned

Frontend
↓  
API  
↓  
Python Backend  
↓  
NASA + Agricultural Data  
↓  
Geospatial Processing & Analysis
↓  
Decision Engine  
↓  
Structured Results  
↓  
Maps / Charts / Comparisons/ Recommendations

## Project Structure

```text
index.html
css/
js/
README.md
