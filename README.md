# 🗳️ Secure Digital Voting System

[![Author](https://img.shields.io/badge/Author-Priyansh_Gandhi-darkgreen.svg?style=flat-square)](https://github.com/priyanshgandhi2509)
[![GitHub](https://img.shields.io/badge/GitHub-priyanshgandhi2509-181717.svg?style=flat-square&logo=github)](https://github.com/priyanshgandhi2509)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933.svg?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000.svg?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-010101.svg?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Face--API.js](https://img.shields.io/badge/Biometrics-Face--API.js-FF6F00.svg?style=flat-square)](https://github.com/justadudewhohacks/face-api.js)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

An enterprise-grade, privacy-preserving **Secure Digital Voting System** engineered with a **blockchain-inspired cryptographic ledger**, **biometric facial verification**, **multi-factor authentication (MFA)**, and **real-time WebSocket election telemetry**.

---

## 🌟 Core Architecture & Security Engineering

```
                                  VOTING TRANSACTION LIFECYCLE
                                  
   [Voter Registration & Login]  ──>  [Biometric Facial Match]  ──>  [6-Digit OTP Challenge]
                │                               │                              │
                │                               │                              │
                ▼                               ▼                              ▼
     Bcrypt Passwords (Salt 10)       Neural Face Descriptor         Nodemailer Time-to-Live
     JWT Bearer Token Auth            (face-api.js Landmarks)        (10-minute validity)
                                                                               │
                                                                               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 VOTE CASTING & LEDGER                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  1. Check Double-Voting Constraint (User Level & DB Compound Index)                    │
│  2. Compute Cryptographic Block:                                                       │
│     Current_Hash = HMAC-SHA256(Previous_Hash + CandidateID + Timestamp + Nonce)        │
│  3. Persist to Immutable VoteLedger Document Chain                                     │
│  4. Emit Real-Time Telemetry via Socket.io to Live Admin Dashboard                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Technical Modules

### 1. 🔗 Blockchain-Inspired Cryptographic Vote Ledger (`models/voteLedger.js`)
* **Chained Hash Integrity**: Every vote cast is recorded into an append-only digital audit ledger. Each entry cryptographically anchors the `previousHash` of the antecedent block.
* **Tamper-Evidence**: Any retroactive modification to database records breaks the cryptographic hash continuity.
* **Automated Verification Engine**: Built-in automated endpoint (`/api/v1/candidate/verify-ledger`) that traverses the entire voting history, recalculating hashes to pinpoint the exact block if any unauthorized alteration occurs.

### 2. 👁️ Biometric Verification & Multi-Factor Authentication
* **Client-Side Neural Biometrics**: Integrates **`face-api.js`** using pre-trained convolutional neural networks:
  - `tiny_face_detector`: Fast, low-latency facial localization.
  - `face_landmark_68`: 68-point spatial facial landmark alignment.
  - `face_recognition_model`: Generates 128-dimensional facial embedding vectors to verify voter identity against registered identity records.
* **Out-of-Band Email OTP**: Enforces secondary verification via a one-time 6-digit cryptographic passcode with strict 10-minute Time-To-Live (TTL).

### 3. 🛡️ Anti-Fraud, Anomaly Detection & Threat Defense
* **Layered Double-Voting Prevention**: Triple-gate protection preventing duplicate ballots across User model state, MongoDB unique indices, and ledger constraints.
* **Rate Limiting & Threat Shielding**: Hardened with **Helmet.js** security headers, CORS origin controls, and **Express-Rate-Limit** restricting suspicious IP clustering and automated brute-force attacks.

### 4. 📊 Real-Time WebSockets Telemetry (`Socket.io`)
* Instantaneous, bidirectional result broadcasts to the administrative command center.
* Real-time demographic breakdown streaming (state, constituency, age brackets) with zero page reloads.

### 5. 🤖 Google Gemini AI Integration
* Integrated with `@google/generative-ai` to power smart ballot assistance, election summaries, and conversational assistance.

### 6. 📑 Forensic Audit Logging (`models/auditLog.js`)
* Comprehensive audit logging tracking all administrative events, candidate additions, election state toggles, and authentication anomalies with source IP and timestamps.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies Used |
| :--- | :--- |
| **Backend Runtime** | Node.js (v18+), Express.js (v5) |
| **Database** | MongoDB, Mongoose ODM |
| **Biometrics & AI** | Face-api.js (TensorFlow.js-based), Google Gemini SDK |
| **Real-Time Communication** | Socket.io |
| **Security & Auth** | Bcrypt.js, Crypto (HMAC-SHA256), JSON Web Tokens (JWT), Helmet, Express-Rate-Limit |
| **Email & Delivery** | Nodemailer |
| **Frontend UI** | Modern HTML5, Responsive CSS3, JavaScript (ES6+), Face-API Canvas UI |

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/priyanshgandhi2509/Secure-Digital-Voting-System.git
cd Secure-Digital-Voting-System
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and populate your credentials:
```bash
cp .env.example .env
```
```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/voting-app
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
GOOGLE_API_KEY=your_gemini_api_key
```

### 4. Launch the Server
```bash
npm run server
```
Access the application at: **`http://localhost:3000`**

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/user/signup` | Register new voter with facial descriptor | No |
| `POST` | `/api/v1/user/login` | Authenticate voter & issue JWT token | No |
| `POST` | `/api/v1/user/send-otp` | Generate and dispatch 6-digit email OTP | Yes (JWT) |
| `POST` | `/api/v1/candidate/vote/:candidateID` | Cast verified ballot into cryptographic ledger | Yes (JWT + OTP) |
| `GET` | `/api/v1/candidate/verify-ledger` | Audit and verify SHA-256 ledger integrity | Admin |
| `GET` | `/api/v1/candidate/live-stats` | Fetch real-time election statistics | Admin |

---

## 👨‍💻 Author & Profile

* **Developer**: **Priyansh Gandhi**
* **Degree**: MSc in Cybersecurity (NFQ Level 9) — National College of Ireland (NCI)
* **GitHub**: [@priyanshgandhi2509](https://github.com/priyanshgandhi2509)
* **LinkedIn**: [Connect with Priyansh](https://linkedin.com)
