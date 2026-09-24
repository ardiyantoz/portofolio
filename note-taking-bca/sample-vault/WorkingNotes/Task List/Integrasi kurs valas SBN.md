---
id: "202609231600"
Status: Todo
Priority: High
Project:
  - "[[IPO SBN Valas]]"
Due: 2026-09-30
Created: 2026-09-23
tags:
  - task
  - track9
---

# Integrasi kurs valas SBN

## Description
Tampilkan kurs USD/IDR terkini di form pemesanan SBN Valas dan hitung estimasi nominal IDR.

## Acceptance Criteria
- [ ] Kurs diambil dari endpoint BE `/api/fx/usd-idr`
- [ ] Estimasi IDR ter-update saat nominal berubah
- [ ] Error state jika endpoint gagal

## Log
- 2026-09-23: Task dibuat dari kickoff.
