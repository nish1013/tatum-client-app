# tatum-client-app

A **full-stack blockchain balance checker** using **NestJS (Backend)** and **Vite + Preact (Frontend)**, deployed via **Docker Compose**.

## Deployed App

https://tatum-client-app.vercel.app/

<img width="691" alt="b-g" src="https://github.com/user-attachments/assets/5927f1a6-7192-4a13-bb3e-0acf3a72bce9" />


<img width="693" alt="b-r" src="https://github.com/user-attachments/assets/656becc7-ae8e-48c6-8641-43d1aa704b6e" />

## **Environment Variables**

1. **Duplicate `.env.example` to `.env` in both frontend and backend directories.**
2. **Populate the following variables:**
   - `VITE_TATUM_{CHAIN}_{NETWORK}_API_KEY` → **Tatum API Key**
   - `BACKEND_API` → **Backend URL**
   - Other necessary config options for frontend/backend.

---

## **Getting Started (Without Docker)**

### **Frontend**
```sh
cd frontend
npm install
npm run dev
```
- Runs a **Vite** dev server at **`http://localhost:5173/`**.
- Configure API URL in `.env` (`VITE_BACKEND_API=http://localhost:4000`).

### **Backend**
```sh
cd backend
npm install
npm run start:dev
```
- Starts a **NestJS** dev server at **`http://localhost:4000/`**.
- API exposed at `http://localhost:4000/v1/balance?network={network}&address={address}`.

---

## **Using Docker Compose (Recommended)**

This will spin up **both frontend and backend**.

### **Run Entire App**
```sh
docker-compose up --build
```
- Frontend: **`http://localhost:8080/`**
- Backend: **`http://localhost:4000/`**

### **Stop Containers**
```sh
docker-compose down
```

---

## **Project Structure**

```
/tatum-client-app
├── backend/        # NestJS Backend (Handles API requests)
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/       # Vite + Preact Frontend (UI)
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── docker/         # Docker-related config
│   ├── docker-compose.yml
│
├── .gitignore      # Ignores node_modules, env files, build output
├── LICENSE         # Project license
├── README.md       # This documentation
```

---

## **Default Local URLs**

| Service   | URL                      | Description |
|-----------|--------------------------|-------------|
| **Frontend** | `http://localhost:8080/` | UI to enter wallet address and check balance |
| **Backend** | `http://localhost:4000/` | API to fetch balances from Tatum SDK |
| **Balance API** | `http://localhost:4000/v1/balance?network=ethereum-mainnet&address={wallet}` | Fetch balance |

---

## **Notes**

- Uses **Docker Compose** for full app setup.
- **API keys must be set in `.env` before running**.
- Make sure `CORS` is enabled in the backend (`main.ts`).
