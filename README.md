# Civil Nexus

> **Digital Engineering Workbench for Infrastructure Projects**

🌐 **Languages / زبان‌ها:**
- [English (Current)](README.md)
- [فارسی (Persian)](README.fa.md)

---

Civil Nexus is an integrated, offline-first digital environment tailored for civil engineers, resident supervisors, and construction project teams.

It transforms scattered field logs, calculations, and technical documentation into structured, auditable, and immutable engineering records.

🚀 **Live Deployment:**  
https://sovereignnexus.github.io/

---

# 🎯 Core Vision

Construction and civil infrastructure sites generate vast amounts of mission-critical field data daily:

- Site volume takeoff minutes
- Soil compaction & in-situ density tests
- Daily supervision and executive logs
- Engineering revisions and variation orders
- Technical attachments and site photography

Civil Nexus consolidates these operations into an auditable digital lifecycle with strict versioning and local-first reliability.

---

# 🛠 Features

## 📁 Project Workspace & Metadata

Centralized management of project identification and hierarchy:

- Project title and contract metadata
- Stakeholder indexing: Client, Consultant, and Contractor
- Project geographic coordinates & chainages
- Technical history & audit log

---

## 📐 Earthwork & Quantity Takeoff Engine

Streamlined operational entry and volumetric calculations:

- Parameters:
  - Length
  - Width
  - Height
  - Count

Deterministic formula:

Volume = Length × Width × Height × Count

- Itemized breakdowns mapped to standardized contract items

---

## 🏗 Soil Compaction Quality Control (Sand Cone Method)

Field-level data capture for ASTM D1556 / AASHTO T 191 in-place density testing.

### Inputs:

- Initial sand weight
- Residual sand weight
- Cone/apparatus calibration weight
- Calibrated sand density
- Wet soil bulk weight
- Moisture content (%)
- Laboratory Maximum Dry Density (MDD)

### Calculated Outputs:

- Hole volume
- Wet unit weight
- Dry unit weight
- Relative Compaction (RC %)

---

## 🔄 Immutable History & Audit Trails

To prevent retroactive manipulation:

- Edits are committed as incremental revisions:

Rev 1 → Rev 2 → Rev 3

- Full historical preservation ensures forensic accountability for supervising consultants.

---

## 📄 Engineering Reports & Export

- Structured technical minutes
- Standardized, print-ready PDF reports

*In Active Development:*

- Cryptographic audit trails
- QR-code verification

---

# 🏛 Technical Architecture

React UI Layer ↓ Application Services ↓ Civil Domain Validation Engine ↓ Repository Layer ↓ IndexedDB (Local-First Persistence)

---

# Architectural Principles

## Local-First & Resilient

Fully functional on offline, remote construction sites.

## Data Integrity

Strict domain-level validation of soil mechanics and survey formulas.

## Modular Expansion

Decoupled design for future microservices and AI modules.

---

# 🗺 Roadmap

## Phase 1 — Civil Engineering Core (Current)

- [x] Project and stakeholder management
- [x] Volume takeoff and site minutes calculator
- [x] In-situ sand cone compaction module
- [x] Local-first IndexedDB storage
- [ ] Direct-to-PDF export pipeline
- [ ] Advanced audit logging

---

## Phase 2 — Data Integrity & Provenance

- [ ] SHA-256 audit chaining for site records
- [ ] Granular field revision tracking
- [ ] Export/Import database migration tools

---

## Phase 3 — Collaborative Workflow

- [ ] Distributed client-to-client / team sync
- [ ] Operational conflict resolution
- [ ] Encrypted cloud backups

---

## Phase 4 — Applied Engineering AI

- [ ] Document and laboratory invoice OCR
- [ ] Structural defect and crack inspection
- [ ] Automated resident engineering assistant

---

# 📜 License

© 2026 Sovereign Nexus / Civil Nexus. All rights reserved.
