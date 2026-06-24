# ✈️ VistaraFinder: ex-Vistara Aircraft & Seat Layout Tracker

VistaraFinder is a mobile-first web application designed for travelers who prefer the premium, three-class cabin layouts and superior amenities of the former Air Vistara fleet. Following the Vistara-Air India merger, this application helps passengers determine with **100% accuracy** if their upcoming Air India flight is operated by an ex-Vistara airplane (featuring premium cabins, dedicated Premium Economy, and lie-flat Business Class seats on narrowbodies).

👉 **Live Deployment:** [https://vistarafinder.vercel.app/](https://vistarafinder.vercel.app/)

---

## 🌟 Key Features

*   **Live Tail Number Scraping:** Integrates a parallel, concurrent Python backend that scrapes live flight schedules from `FlightMapper` and verifies the actual assigned registration numbers (e.g., `VT-TNC`, `VT-TQK`) via `FlightStats`.
*   **Automatic ex-Vistara Classification:** Cross-references live tail numbers against Vistara’s registration databases and falls back to flight number prefixes (`AI 2xxx` series) when live assignments are pending.
*   **Detailed Cabin Configuration Comparison:** Spotlights specific layout advantages (e.g., Airbus A321neo narrowbody lie-flat business class beds vs. standard recliners).
*   **Interactive Seat Layout Maps:** Embeds dynamic, mobile-friendly SVG cabin maps to visualize Business Class, Premium Economy, and Economy layouts.
*   **Live Flight Tracking Integration:** Direct tracking link to **Flightradar24** (`https://www.flightradar24.com/data/aircraft/{registration}`) embedded right in the flight card drawer.
*   **Smart Fallbacks:** Gracefully falls back to route-based scheduling guides if live tail lookup fails.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend:** Vanilla HTML5, CSS3 (glassmorphic styling, custom animations), and ES6+ JavaScript.
*   **Backend Serverless API:** Python `BaseHTTPRequestHandler` deployed as a serverless function on **Vercel** (`api/search.py`).
*   **Concurrency:** Utilizes `ThreadPoolExecutor` to fetch and verify multiple flight registrations concurrently, rendering search results in under **0.4 seconds**.
*   **Caching Layer:** Thread-safe, in-memory caching (`TAIL_CACHE`) with a **3-hour TTL** to optimize API request limits.

---

## 🚀 Getting Started & Local Development

### Prerequisites
*   Python 3.9+
*   `pip` package manager

### Installation & Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/manojnagendra/vistara-finder.git
    cd vistara-finder
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the local development server:**
    ```bash
    python server.py
    ```

4.  **Access the application:**
    Open [http://localhost:8000/](http://localhost:8000/) in your browser.

---

## 📁 Repository Structure

```text
├── api/
│   └── search.py        # Vercel Serverless Function (Python backend)
├── index.html           # Main SPA UI (SEO optimized)
├── app.js               # Frontend layout, interactive filter controls, & state management
├── styles.css           # Custom CSS styling (Dark mode, glassmorphism, responsive grid)
├── server.py            # Local python development server (caches to local json)
├── vercel.json          # Deployment & routing configuration
├── requirements.txt     # Python dependencies for deployment
└── .vercelignore        # Exclusion configuration for serverless deployment
```

---

## 📈 SEO & Search Optimization

This repository is optimized for the following search queries:
*   *How to identify ex-Vistara flights on Air India*
*   *Air India ex-Vistara routes and tail numbers*
*   *Vistara Airbus A321neo lie-flat business class seats*
*   *Track Vistara aircraft registration after merger*
*   *Vistara three-class narrowbody seating layouts*
