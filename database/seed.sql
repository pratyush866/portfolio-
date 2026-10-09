-- ====================================================================
-- PRATYUSH MISHRA - OFFICIAL 13 CERTIFICATES SEED DATA (POSTGRESQL / SUPABASE)
-- Target Engine: PostgreSQL 15+ / Supabase
-- Table: public.certificates
-- Chronological Sequence: Strict Reverse Chronological (Newest to Oldest)
-- Includes Dedicated Internship & Industrial Training Flag (is_internship)
-- ====================================================================

TRUNCATE TABLE public.certificates RESTART IDENTITY;

INSERT INTO public.certificates (
    title, 
    issuer, 
    category, 
    issue_date, 
    end_date,
    duration,
    is_internship,
    credential_id, 
    credential_url, 
    badge_image_url,
    skills, 
    description, 
    is_verified, 
    is_featured
) VALUES 
-- 1. Techpile Technology 45 Days Summer Training (26 July 2026 - LATEST)
(
    '45 Days Summer Training in Data Analytics (Grade A++)',
    'Techpile Technology Pvt. Ltd.',
    'Internship & Industrial Experience',
    '2026-07-26',
    '2026-07-26',
    '45 Days Intensive Summer Training',
    true,
    'TechpileST260126',
    'https://techpile.in/verify/TechpileST260126',
    './assets/certificates/cert-techpile-summer-training.jpg',
    ARRAY['Data Analytics', 'Outstanding Performer Medal', 'Grade A++', 'Python Analytics', 'Summer Industrial Training', 'MSME / Govt of India Registered'],
    'Awarded Outstanding Performer Medal and completed 45 Days Summer Training in Data Analytics with "A++" Grade from ITM Gida Gorakhpur. Certified by Director & Project Manager, Techpile Technology Pvt. Ltd. (Registered with Ministry of Corporate Affairs, MSME, ISO 9001:2015, Skill India).',
    true,
    true
),

-- 2. Thiranex Web Development Internship (20 June 2026)
(
    'Web Development Internship',
    'Thiranex (Skill Development & Future Tech)',
    'Internship & Industrial Experience',
    '2026-06-20',
    '2026-06-20',
    '21 May 2026 – 20 Jun 2026 (1 Month Intensive)',
    true,
    'THX-MAY2226-532',
    'https://thiranex.com/verify/THX-MAY2226-532',
    './assets/certificates/cert-thiranex-internship.jpg',
    ARRAY['Web Development', 'Frontend Architecture', 'Responsive UI Engineering', 'Component Systems', 'Client-Side State Management'],
    'Successfully completed an intensive industry internship in Web Development from 21 May 2026 to 20 Jun 2026. Certified by Hariharan M, Founder & CEO of Thiranex (MSME Registered). Demonstrated hands-on engineering execution in production web development.',
    true,
    true
),

-- 2. be10x AI Tools and ChatGPT Workshop (20 June 2026)
(
    'AI Tools and ChatGPT Workshop',
    'be10x',
    'AI & Automation',
    '2026-06-20',
    NULL,
    'Workshop & Practical Mastery',
    false,
    'BE10X-VERIFIED-PM866',
    'https://be10x.in',
    './assets/certificates/cert-be10x-ai-tools.jpg',
    ARRAY['Code & Debug using AI (<10 min)', 'Data Analysis using AI (<30 min)', 'Prompt Engineering', 'AI Productivity Automations'],
    'Certified by Aditya Goenka & Aditya Kachave, Co-founders of be10x (IIT Kharagpur alumni). Verified mastery in generative AI tools, rapid automated debugging, and prompt-driven engineering workflows.',
    true,
    true
),

-- 3. HP LIFE AI for Business Professionals (18 June 2026)
(
    'AI for Business Professionals',
    'HP LIFE | HP Foundation',
    'AI & Emerging Tech',
    '2026-06-18',
    NULL,
    'Professional Course',
    false,
    'e68a5c6e-aafd-49d6-84c8-9bf9c77d179a',
    'https://www.life-global.org',
    './assets/certificates/cert-hp-ai-business.jpg',
    ARRAY['Artificial Intelligence in Business', 'Prompt Engineering', 'Ethical AI Implementation', 'Standalone vs Integrated AI Tools', 'Strategic Growth'],
    'Presented by Michele Malejki, Executive Director, HP Foundation. Comprehensive qualification exploring AI role in business, crafting effective prompt architectures, ethical AI governance, and leveraging AI models for strategic business acceleration.',
    true,
    true
),

-- 4. HP LIFE Data Science & Analytics (18 June 2026)
(
    'Data Science & Analytics',
    'HP LIFE | HP Foundation',
    'Data Science & Analytics',
    '2026-06-18',
    NULL,
    'Professional Course',
    false,
    'cec8c7b4-07e6-4c28-a70c-aebde4b13770',
    'https://www.life-global.org',
    './assets/certificates/cert-hp-datascience.jpg',
    ARRAY['Data Science Methodologies', 'Business Analytics', 'Data-Driven Decision Making', 'Statistical Modeling'],
    'Presented by Michele Malejki, Executive Director, HP Foundation. Certified in leading data science and analytics practices, business impact examination, and core analytical methodologies for commercial operations.',
    true,
    true
),

-- 5. Simplilearn SkillUp Personality Development (16 June 2026)
(
    'Personality Development Course',
    'Simplilearn | SkillUp',
    'Executive Leadership & Communication',
    '2026-06-16',
    NULL,
    'Professional Executive Course',
    false,
    '10354640',
    'https://www.simplilearn.com',
    './assets/certificates/cert-simplilearn-personality.jpg',
    ARRAY['Executive Communication', 'Leadership Presence', 'Professional Stakeholder Management', 'Public Demeanor'],
    'Certified by Krishna Kumar, CEO of Simplilearn. Demonstrated initiative and commitment to high-impact professional communication, leadership presence, and executive interpersonal governance.',
    true,
    false
),

-- 6. DataCulture Technologies Python Essentials & App Dev (10 June 2026)
(
    'Python Essentials and Application Development',
    'DataCulture Technologies',
    'Internship & Industrial Experience',
    '2026-06-10',
    '2026-06-10',
    'Industrial Training (June 2026)',
    true,
    'DC-PYTHON-APP-2026',
    'https://dataculture.co.in',
    './assets/certificates/cert-dataculture-python.jpg',
    ARRAY['Python Programming', 'Application Development', 'Practical Scripting', 'Backend Implementation', 'Software Engineering'],
    'Certified by Priya Singh & Samriti Thakur, Program Co-ordinators. Industrial training completing Python programming essentials, backend application architecture, and practical production implementation with QR code credential validation.',
    true,
    true
),

-- 7. Deloitte Cyber Job Simulation (29 May 2026)
(
    'Cyber Job Simulation',
    'Deloitte / Forage',
    'Cybersecurity & Enterprise Systems',
    '2026-05-29',
    NULL,
    'Virtual Enterprise Simulation',
    false,
    'TGrPkqPci3uFmRzfe',
    'https://www.theforage.com/simulations/deloitte',
    './assets/certificates/cert-deloitte-cyber.jpg',
    ARRAY['Cybersecurity', 'Threat Analysis', 'Enterprise Infrastructure Defense', 'Incident Analysis & Governance'],
    'Issued by Tina McCreery, Chief Human Resources Officer, Deloitte. Practical tasks covering enterprise cyber security defense, system vulnerability analysis, and security incident governance.',
    true,
    true
),

-- 8. Commonwealth Bank Introduction to Data Science (29 May 2026)
(
    'Introduction to Data Science Job Simulation',
    'Commonwealth Bank / Forage',
    'Data Science & Analytics',
    '2026-05-29',
    NULL,
    'Virtual Enterprise Simulation',
    false,
    't5asjt85dLAGLTQzr',
    'https://www.theforage.com/simulations/commbank',
    './assets/certificates/cert-commbank-datascience.jpg',
    ARRAY['Designing a Database', 'Data Aggregation & Analysis', 'Data Anonymisation', 'Financial Data Pipelines'],
    'Issued by Tom Brunskill, Co-Founder of Forage for Commonwealth Bank. Practical commercial tasks in relational database design, confidential data anonymisation, and financial pipeline aggregation.',
    true,
    true
),

-- 9. Tata / Forage GenAI Powered Data Analytics (28 May 2026)
(
    'GenAI Powered Data Analytics Job Simulation',
    'Tata / Forage',
    'Generative AI & Data Analytics',
    '2026-05-28',
    NULL,
    'Virtual Enterprise Simulation',
    false,
    'QsLuXSCPrxRsj6hvj',
    'https://www.theforage.com/simulations/tata',
    './assets/certificates/cert-tata-genai.jpg',
    ARRAY['Exploratory Data Analysis', 'Risk Profiling', 'Predicting Delinquency with AI', 'Business Reporting & AI Strategy'],
    'Issued by Tom Brunskill, Co-Founder of Forage for Tata. Practical simulation in exploratory data analysis, risk profiling, AI delinquency forecasting, and executive data storytelling for enterprise stakeholders.',
    true,
    true
),

-- 10. Apna College Alpha (DSA with Java) (15 May 2026)
(
    'Alpha (DSA with Java)',
    'Apna College',
    'Core Computer Science & Algorithms',
    '2026-05-15',
    NULL,
    'Complete Algorithmic Mastery',
    false,
    '697b690adc6d211f4001fe76',
    'https://www.apnacollege.in',
    './assets/certificates/cert-apnacollege-dsa.jpg',
    ARRAY['Data Structures & Algorithms', 'Java Programming', 'Dynamic Programming', 'Graph Theory', 'Time & Space Complexity'],
    'Certified by Shradha Khapra, Co-Founder of Apna College. Rigorous completion of advanced Data Structures and Algorithms with Java, problem-solving, and algorithmic optimization.',
    true,
    true
),

-- 11. ITM GIDA Parampara 2026 — 2nd Position in Mimicry (15 April 2026)
(
    '2nd Position in Mimicry — Parampara 2026',
    'ITM GIDA Gorakhpur',
    'Institutional & Cultural Leadership',
    '2026-04-15',
    NULL,
    'Annual Cultural Festival 2026',
    false,
    'ITM-PARAMPARA-2026-2ND',
    'https://itmgida.edu.in',
    './assets/certificates/cert-itm-mimicry.jpg',
    ARRAY['Stage Presentation', 'Public Speaking', 'Creative Arts', 'Campus Leadership'],
    'Certificate of Appreciation awarded by Dr. N. K. Singh, Director, ITM GIDA Gorakhpur for securing 2nd Position in Mimicry during annual college cultural festival Parampara 2026.',
    true,
    false
),

-- 12. ITM GIDA Event Head & Athletics Leadership Award (10 March 2026)
(
    'Event Head & Athletics Leadership Award',
    'ITM GIDA Gorakhpur',
    'Event Leadership & Athletics',
    '2026-03-10',
    NULL,
    'Annual Sports & Campus Governance',
    false,
    'ITM-EVENT-HEAD-2026',
    'https://itmgida.edu.in',
    './assets/certificates/cert-itm-event-head.jpg',
    ARRAY['Event Governance', 'Athletics & Long Jump', 'Team Coordination', 'Student Operations'],
    'Certificate of Appreciation awarded by Dr. N. K. Singh, Director, ITM GIDA Gorakhpur in recognition of leadership as Event Head and campus athletic participation.',
    true,
    false
);

-- ====================================================================
-- SUCCESS: All 12 verified credentials & internships inserted.
-- Query chronological order using: SELECT * FROM public.v_certificates_chronological;
-- Query internships using: SELECT * FROM public.v_internships_chronological;
-- ====================================================================
