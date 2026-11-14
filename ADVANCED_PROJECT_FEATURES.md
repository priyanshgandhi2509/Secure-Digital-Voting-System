# Secure Digital Voting System - Advanced Features Summary

This document outlines the advanced, complex modules added to the Voting App to make it suitable for a final-year (8th Sem) project presentation.

## 1. Blockchain-Inspired Voting Integrity (The Ledger)
- **Mechanism**: Every vote cast is recorded in a `VoteLedger` (Digital Audit Trail).
- **Chaining**: Each entry contains the hash of the previous vote, creating a cryptographic chain.
- **Tamper-Evidence**: Any modification to a previous vote will break the chain, making it impossible to alter records stealthily.
- **Digital Signatures**: Every transaction is signed using a server-side secret (HMAC-SHA256) to ensure authenticity.

## 2. Multi-Factor Authentication (OTP Verification)
- **Workflow**: Before a voter can submit their choice, they must request a 6-digit OTP.
- **Security**: This ensures that even if a session is compromised, the actual vote requires access to the voter's primary communication channel (Email/SMS).
- **TTL Logic**: OTP codes are valid for only 10 minutes and are unique to each transaction.

## 3. Real-Time Analytics & WebSocket Engine
- **Live Monitoring**: The system uses `Socket.io` to broadcast live voting stats.
- **Enriched Data**: Beyond just count updates, the backend emits demographic metadata (City, State, Age Groups) for dynamic visualization on the admin dashboard.

## 4. Voter Anomaly Detection & Anti-Fraud
- **IP Reputation**: Detects and blocks suspicious activity (e.g., more than 5 voting attempts from the same IP in one minute).
- **Double-Voting Prevention**: Multiple layers of checks (User level, Database level, and Ledger level) to ensure one-person-one-vote.

## 5. Automated Integrity Verification Engine
- **Admin Tool**: An endpoint (`/api/v1/candidate/verify-ledger`) that traverses the entire voting history.
- **Validation**: It recalculates every hash in the chain and verifies the links. If any tampering has occurred, it identifies the exact "block" where the chain broke.

## 6. Unified Audit System
- **Comprehensive Logging**: Tracks every critical action (Candidate creation, Election status updates, Voting, etc.) along with the user ID and IP address.
- **Forensic Ready**: Designed to provide an immutable trail of system activity for transparency.

---
### Technical Stack Used:
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: Bcrypt.js, Crypto (HMAC-SHA256), Helmet, Rate-Limit
- **Real-time**: Socket.io
- **Verification**: OTP-based MFA
