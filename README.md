# Smart SD-WAN Network Optimizer

A college project for Cloud Architecture Design (CAD) demonstrating **Relay Node Selection and Routing (RNSR)** to find optimal SD-WAN network routes satisfying maximum latency constraints while minimizing intermediate relay node hops.

---

## 📌 Project Overview

- **Concept**: Relay Node Selection and Routing (RNSR)
- **Goal**: Minimize total relay nodes used in routing paths while strictly guaranteeing end-to-end latency stays within a maximum specified threshold (\(L_{max}\)).
- **Architecture**: Decoupled Client-Server (React Frontend + Node.js Express Backend).

---

## 📁 Project Structure

```text
Smart SD-WAN Network Optimizer/
├── frontend/             # React + Vite + Tailwind CSS + React Flow App
│   ├── src/
│   │   ├── components/   # Header, Sidebar, Layout components
│   │   ├── pages/        # Dashboard, Network Topology, Optimization, Simulation, Reports
│   │   ├── services/     # API service client
│   │   ├── data/         # Mock topology network datasets
│   │   └── utils/        # Formatting utilities
│   ├── package.json
│   └── vite.config.js
│
├── backend/              # Node.js + Express REST API
│   ├── routes/           # Express API endpoints
│   ├── services/         # Service layer modules
│   ├── data/             # Network topology data definitions
│   ├── server.js         # Entry point server
│   └── package.json
│
└── README.md             # Project documentation and execution guide
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

### 1. Running the Backend Server

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   ```
   *or for auto-reload during development:*
   ```bash
   npm run dev
   ```
4. The backend will be running at: **`http://localhost:5000`**
   - Health check endpoint: `http://localhost:5000/health`
   - Topology endpoint: `http://localhost:5000/api/topology`

---

### 2. Running the Frontend Application

1. Open a second terminal window and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to: **`http://localhost:3000`**

---

## 💡 Available Pages & Navigation

1. **Dashboard**: High-level telemetry, key metrics, and RNSR problem formulation recap.
2. **Network Topology**: Interactive node and edge graph using React Flow showing Source, Relay Nodes, and Destination.
3. **Optimization**: Interface for setting maximum end-to-end latency constraints.
4. **Simulation**: Traffic load spike and node failure scenario controls.
5. **Reports**: Viva summary and analytical performance review layout.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 4, React Flow (`@xyflow/react`), Lucide Icons
- **Backend**: Node.js, Express, CORS
