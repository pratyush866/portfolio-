# 🐘 Supabase & PostgreSQL Credentials & Internships Architecture

This database schema stores all verified certifications, licenses, internships, and industrial training credentials for **Pratyush Mishra** (Founder & CEO, Kisan Market).

---

## 📊 Summary of Cataloged Credentials (13 Verified Records)

All 13 credentials are chronologically sequenced (latest date first) with dedicated separation for real work experience & internships:

| S.No | Title | Issuer / Company | Category | Exact Date | Credential ID / Verification |
|:---:|:---|:---|:---|:---:|:---|
| 1 | **45 Days Summer Training (Data Analytics)** | Techpile Technology (Govt of India/MSME) | Industrial Training | **26 July 2026** | `TechpileST260126` (Grade A++, Medal) |
| 2 | **Web Development Internship** | Thiranex (MSME Registered) | Internship | **20 June 2026** | `THX-MAY2226-532` (CEO Signed) |
| 3 | **AI Tools and ChatGPT Workshop** | be10x | AI & Automation | **20 June 2026** | Verified by Founders |
| 4 | **AI for Business Professionals** | HP LIFE \| HP Foundation | AI & Emerging Tech | **18 June 2026** | `e68a5c6e-aafd-49d6-84c8-9bf9c77d179a` |
| 5 | **Data Science & Analytics** | HP LIFE \| HP Foundation | Data Science | **18 June 2026** | `cec8c7b4-07e6-4c28-a70c-aebde4b13770` |
| 6 | **Personality Development Course** | Simplilearn SkillUp | Leadership | **16 June 2026** | `10354640` (CEO Signed) |
| 7 | **Python Essentials & App Dev** | DataCulture Technologies | Industrial Training | **10 June 2026** | QR Code Verified |
| 8 | **Cyber Job Simulation** | Deloitte / Forage | Cybersecurity | **29 May 2026** | `TGrPkqPci3uFmRzfe` |
| 9 | **Data Science Job Simulation** | Commonwealth Bank / Forage | Data Science | **29 May 2026** | `t5asjt85dLAGLTQzr` |
| 10 | **GenAI Data Analytics Simulation** | Tata / Forage | AI & Analytics | **28 May 2026** | `QsLuXSCPrxRsj6hvj` |
| 11 | **Alpha (DSA with Java)** | Apna College | Engineering | **15 May 2026** | `697b690adc6d211f4001fe76` |
| 12 | **2nd Position in Mimicry (Parampara)** | ITM GIDA Gorakhpur | Honors | **15 April 2026** | Dir. Dr. N. K. Singh Signed |
| 13 | **Event Head & Athletics Award** | ITM GIDA Gorakhpur | Leadership | **10 March 2026** | Dir. Dr. N. K. Singh Signed |

---

## 🚀 3-Step Setup on Supabase

### Step 1: Open Supabase Project
1. Go to [supabase.com](https://supabase.com) and log in.
2. Click **"New Project"** (Name: `pratyush-portfolio` or `kisan-market`).
3. Set your database password and choose your region (e.g. `Mumbai (ap-south-1)`).

### Step 2: Run SQL Schema
1. In the Supabase sidebar, click on **SQL Editor** (icon with `>_`).
2. Open [`schema.sql`](file:///c:/Users/HP/OneDrive/Desktop/pratyush-portfolio/database/schema.sql), copy everything, and paste it into the SQL Editor.
3. Click **RUN**.
   *(This creates the `certificates` table, automatic updated timestamps, chronological views `v_certificates_chronological` & `v_internships_chronological`, and public Row-Level Security policies).*

### Step 3: Insert Initial 12 Verified Credentials
1. In the same SQL Editor, open [`seed.sql`](file:///c:/Users/HP/OneDrive/Desktop/pratyush-portfolio/database/seed.sql), copy everything, and paste it.
2. Click **RUN**.
   *(All 12 verified credentials & internships are now stored in your live PostgreSQL cluster!)*

---

## 🔍 Useful SQL Queries

```sql
-- 1. All credentials sorted date-wise (Newest first)
SELECT title, issuer, issue_date, credential_id FROM public.v_certificates_chronological;

-- 2. Only Internships & Industrial Training
SELECT title, issuer, duration, credential_id FROM public.v_internships_chronological;

-- 3. AI & Data Science credentials
SELECT title, issuer, issue_date FROM public.certificates WHERE category ILIKE '%AI%' OR category ILIKE '%Data%';
```
