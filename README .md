# Weather App

Weather App made in TypeScript.

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Architecture](#architecture)
- [Notice](#notice)

---

## About the Project

Weather Application made using TypeScript.

### Built With

Built with modern tooling.

- TypeScript
- Compiled using Vite
- Styled with Bulma.io

---

## Getting Started

### Prerequisites

Latest Node runtime environment.

### Installation

Steps to get the project started

1. Clone the repo:
   ```sh
   git clone https://github.com/braynier/weather-app-typescript.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-app-typescript
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the project:
   ```sh
   npm run dev
   ```

---

## Features

Highlight key features of the project:

- Weather forecast fetching by city name, ZIP or coordinates
- Adding forecasts to table
- Removing forecasts from table
- Persistence with localStorage

---

## Architecture

The project is built using MVC architecture for a modular approach and keeping seperation of concerns in their modules.

- A model for the API fetching, and a single state object for managing state in the application
- Views - for everything DOM related
- A single controller file in which views and model interacts using a publisher-subsriber solution

---

## Notice

The project is still in development phase, therefore it's still without proper error handling, buggy and not polished.

---
