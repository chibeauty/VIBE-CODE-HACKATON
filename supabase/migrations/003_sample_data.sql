-- =====================================================
-- 100+ Global Career Paths Seed Data (PostgreSQL-ready)
-- =====================================================

INSERT INTO career_paths
(id, title, category, difficulty_level, required_skills, estimated_duration_months, salary_range_min, salary_range_max, job_outlook, is_featured, description)
VALUES
-- Technology / IT
('c0010000-0000-0000-0000-000000000001', 'Software Engineer', 'Technology', 'Intermediate', ARRAY['Programming','Algorithms','Data Structures','Version Control']::text[], 24, 60000, 150000, 'Excellent', true, 'Designs and develops software applications.'),
('c0010000-0000-0000-0000-000000000002', 'Data Scientist', 'Technology', 'Advanced', ARRAY['Python','R','SQL','Machine Learning','Statistics']::text[], 24, 70000, 160000, 'Excellent', true, 'Analyzes data to generate insights and predictive models.'),
('c0010000-0000-0000-0000-000000000003', 'Cybersecurity Specialist', 'Technology', 'Advanced', ARRAY['Network Security','Ethical Hacking','Risk Assessment']::text[], 20, 65000, 140000, 'Excellent', true, 'Protects systems and networks from security threats.'),
('c0010000-0000-0000-0000-000000000004', 'UX/UI Designer', 'Technology', 'Intermediate', ARRAY['Figma','Adobe XD','Prototyping','User Research']::text[], 16, 50000, 120000, 'Excellent', true, 'Designs user-friendly interfaces and experiences.'),
('c0010000-0000-0000-0000-000000000005', 'Cloud Engineer', 'Technology', 'Advanced', ARRAY['AWS','Azure','Docker','Kubernetes']::text[], 24, 70000, 150000, 'Excellent', true, 'Manages cloud infrastructure and deployments.'),
('c0010000-0000-0000-0000-000000000006', 'Frontend Developer', 'Technology', 'Intermediate', ARRAY['HTML','CSS','JavaScript','React']::text[], 18, 50000, 130000, 'Excellent', true, 'Builds and maintains user-facing web applications.'),
('c0010000-0000-0000-0000-000000000007', 'Backend Developer', 'Technology', 'Intermediate', ARRAY['Node.js','Databases','APIs']::text[], 18, 55000, 140000, 'Excellent', true, 'Develops server-side logic and APIs.'),
('c0010000-0000-0000-0000-000000000008', 'Mobile App Developer', 'Technology', 'Intermediate', ARRAY['iOS','Android','Flutter','React Native']::text[], 20, 60000, 135000, 'Excellent', true, 'Creates mobile applications for iOS and Android.'),
('c0010000-0000-0000-0000-000000000009', 'DevOps Engineer', 'Technology', 'Advanced', ARRAY['CI/CD','Docker','Kubernetes','Automation']::text[], 24, 65000, 145000, 'Excellent', true, 'Automates deployment pipelines and infrastructure.'),
('c0010000-0000-0000-0000-000000000010', 'AI/ML Engineer', 'Technology', 'Advanced', ARRAY['Python','TensorFlow','PyTorch','Data Modeling']::text[], 24, 70000, 160000, 'Excellent', true, 'Builds AI models and machine learning systems.');

-- =====================================================
-- Global Career Paths Seed Data (Remaining Entries)
-- =====================================================

-- Business / Management
('c0020000-0000-0000-0000-000000000011', 'Project Manager', 'Business', 'Intermediate', ARRAY['Leadership','Communication','Agile','Risk Management']::text[], 14, 55000, 130000, 'Good', false, 'Oversees project planning and execution.'),
('c0020000-0000-0000-0000-000000000012', 'Product Manager', 'Business', 'Intermediate', ARRAY['Market Analysis','Roadmap Planning','Stakeholder Management']::text[], 18, 60000, 140000, 'Excellent', true, 'Defines product vision and strategy.'),
('c0020000-0000-0000-0000-000000000013', 'Business Analyst', 'Business', 'Intermediate', ARRAY['Data Analysis','Requirement Gathering','SQL']::text[], 16, 50000, 125000, 'Good', false, 'Analyzes business processes and requirements.'),
('c0020000-0000-0000-0000-000000000014', 'Operations Manager', 'Business', 'Intermediate', ARRAY['Process Optimization','Resource Planning']::text[], 14, 55000, 130000, 'Good', false, 'Manages day-to-day business operations.'),
('c0020000-0000-0000-0000-000000000015', 'Entrepreneur / Startup Founder', 'Business', 'Advanced', ARRAY['Leadership','Strategy','Fundraising']::text[], 24, 50000, 250000, 'Excellent', true, 'Starts and scales innovative businesses.'),
('c0020000-0000-0000-0000-000000000016', 'HR Manager', 'Business', 'Intermediate', ARRAY['Recruitment','Employee Engagement','Performance Management']::text[], 16, 50000, 120000, 'Good', false, 'Manages human resources and talent.'),
('c0020000-0000-0000-0000-000000000017', 'Financial Analyst', 'Business', 'Advanced', ARRAY['Financial Modeling','Excel','Analytics']::text[], 18, 60000, 145000, 'Excellent', true, 'Analyzes financial data and trends.'),
('c0020000-0000-0000-0000-000000000018', 'Sales Manager', 'Business', 'Intermediate', ARRAY['Negotiation','CRM','Communication']::text[], 14, 50000, 130000, 'Good', false, 'Leads sales teams to meet targets.'),
('c0020000-0000-0000-0000-000000000019', 'Marketing Manager', 'Business', 'Intermediate', ARRAY['Digital Marketing','Campaign Planning','Analytics']::text[], 16, 55000, 135000, 'Excellent', true, 'Plans and executes marketing strategies.'),
('c0020000-0000-0000-0000-000000000020', 'Supply Chain Manager', 'Business', 'Intermediate', ARRAY['Logistics','Inventory Management','ERP Systems']::text[], 16, 55000, 135000, 'Good', false, 'Manages product supply chains efficiently.'),

-- Marketing / Media
('c0030000-0000-0000-0000-000000000021', 'Digital Marketing Specialist', 'Marketing', 'Beginner', ARRAY['SEO','Content Marketing','Social Media']::text[], 12, 40000, 90000, 'Good', false, 'Executes online marketing campaigns.'),
('c0030000-0000-0000-0000-000000000022', 'Brand Manager', 'Marketing', 'Intermediate', ARRAY['Brand Strategy','Communication','Analytics']::text[], 16, 50000, 120000, 'Excellent', true, 'Maintains brand identity and reputation.'),
('c0030000-0000-0000-0000-000000000023', 'Content Creator', 'Marketing', 'Beginner', ARRAY['Copywriting','SEO','Video Production']::text[], 12, 35000, 85000, 'Good', false, 'Produces engaging digital content.'),
('c0030000-0000-0000-0000-000000000024', 'Social Media Manager', 'Marketing', 'Beginner', ARRAY['Social Media Platforms','Analytics','Content Scheduling']::text[], 12, 40000, 90000, 'Good', false, 'Manages social media accounts and engagement.'),
('c0030000-0000-0000-0000-000000000025', 'Advertising Specialist', 'Marketing', 'Intermediate', ARRAY['Media Planning','Creativity','Campaign Management']::text[], 14, 45000, 95000, 'Good', false, 'Plans and executes advertising campaigns.'),

-- Creative / Design
('c0040000-0000-0000-0000-000000000026', 'Graphic Designer', 'Creative', 'Beginner', ARRAY['Adobe Photoshop','Adobe Illustrator','Creativity']::text[], 12, 35000, 80000, 'Good', false, 'Designs visual content for digital and print.'),
('c0040000-0000-0000-0000-000000000027', 'Interior Designer', 'Creative', 'Intermediate', ARRAY['AutoCAD','Sketching','Creativity']::text[], 18, 45000, 90000, 'Good', false, 'Plans and designs interior spaces.'),
('c0040000-0000-0000-0000-000000000028', 'Fashion Designer', 'Creative', 'Intermediate', ARRAY['Sketching','Creativity','Pattern Making']::text[], 18, 40000, 85000, 'Good', false, 'Designs clothing and accessories.'),
('c0040000-0000-0000-0000-000000000029', 'Animator', 'Creative', 'Advanced', ARRAY['Animation Software','Creativity','Storytelling']::text[], 24, 50000, 110000, 'Excellent', true, 'Creates animations for media and entertainment.'),
('c0040000-0000-0000-0000-000000000030', 'Photographer / Videographer', 'Creative', 'Beginner', ARRAY['Camera Skills','Editing','Composition']::text[], 12, 30000, 80000, 'Good', false, 'Captures photos and videos for various projects.');

-- Healthcare / Life Sciences
('c0050000-0000-0000-0000-000000000031', 'Medical Doctor', 'Healthcare', 'Advanced', ARRAY['Clinical Knowledge','Diagnostics','Patient Care']::text[], 72, 80000, 200000, 'Excellent', true, 'Diagnoses and treats patients in medical practice.'),
('c0050000-0000-0000-0000-000000000032', 'Nurse', 'Healthcare', 'Intermediate', ARRAY['Patient Care','Medical Procedures','Record Keeping']::text[], 36, 45000, 95000, 'Good', true, 'Provides patient care and support.'),
('c0050000-0000-0000-0000-000000000033', 'Pharmacist', 'Healthcare', 'Advanced', ARRAY['Pharmacology','Chemistry','Patient Safety']::text[], 48, 60000, 130000, 'Excellent', true, 'Dispenses medications and advises patients.'),
('c0050000-0000-0000-0000-000000000034', 'Public Health Specialist', 'Healthcare', 'Advanced', ARRAY['Epidemiology','Statistics','Policy']::text[], 36, 50000, 120000, 'Good', false, 'Develops public health programs and policies.'),
('c0050000-0000-0000-0000-000000000035', 'Physiotherapist', 'Healthcare', 'Intermediate', ARRAY['Rehabilitation','Anatomy','Patient Care']::text[], 24, 45000, 90000, 'Good', false, 'Helps patients improve mobility and function.'),

-- Education / Academia
('c0060000-0000-0000-0000-000000000036', 'Teacher', 'Education', 'Beginner', ARRAY['Communication','Subject Knowledge','Classroom Management']::text[], 12, 35000, 80000, 'Good', false, 'Educates students in a classroom environment.'),
('c0060000-0000-0000-0000-000000000037', 'Instructional Designer', 'Education', 'Intermediate', ARRAY['Curriculum Design','eLearning Tools','Content Creation']::text[], 18, 45000, 95000, 'Good', false, 'Designs effective educational materials.'),
('c0060000-0000-0000-0000-000000000038', 'Research Scientist', 'Education', 'Advanced', ARRAY['Research','Analysis','Writing']::text[], 36, 60000, 150000, 'Excellent', true, 'Conducts academic or scientific research.'),
('c0060000-0000-0000-0000-000000000039', 'Corporate Trainer', 'Education', 'Intermediate', ARRAY['Presentation','Training Design','Communication']::text[], 18, 40000, 95000, 'Good', false, 'Trains employees and professionals in corporate settings.'),
('c0060000-0000-0000-0000-000000000040', 'University Lecturer', 'Education', 'Advanced', ARRAY['Subject Expertise','Teaching','Research']::text[], 36, 50000, 130000, 'Excellent', true, 'Teaches university-level courses and conducts research.'),

-- Legal / Governance
('c0070000-0000-0000-0000-000000000041', 'Lawyer', 'Legal', 'Advanced', ARRAY['Legal Knowledge','Research','Negotiation']::text[], 36, 60000, 180000, 'Excellent', true, 'Provides legal advice and representation.'),
('c0070000-0000-0000-0000-000000000042', 'Policy Advisor', 'Legal', 'Advanced', ARRAY['Policy Analysis','Research','Communication']::text[], 24, 50000, 120000, 'Good', false, 'Advises on policy development and strategy.'),
('c0070000-0000-0000-0000-000000000043', 'Judge', 'Legal', 'Advanced', ARRAY['Legal Knowledge','Decision Making','Integrity']::text[], 36, 80000, 200000, 'Excellent', true, 'Presides over court proceedings and rulings.'),
('c0070000-0000-0000-0000-000000000044', 'Paralegal', 'Legal', 'Intermediate', ARRAY['Legal Research','Documentation','Communication']::text[], 18, 35000, 80000, 'Good', false, 'Supports lawyers with legal research and documentation.'),
('c0070000-0000-0000-0000-000000000045', 'Compliance Specialist', 'Legal', 'Intermediate', ARRAY['Regulations','Auditing','Ethics']::text[], 18, 45000, 110000, 'Good', false, 'Ensures organizational compliance with laws and regulations.'),

-- Engineering / Physical Sciences
('c0080000-0000-0000-0000-000000000046', 'Civil Engineer', 'Engineering', 'Intermediate', ARRAY['AutoCAD','Structural Analysis','Project Management']::text[], 24, 55000, 130000, 'Good', true, 'Designs and oversees construction projects.'),
('c0080000-0000-0000-0000-000000000047', 'Mechanical Engineer', 'Engineering', 'Intermediate', ARRAY['CAD','Problem Solving','Thermodynamics']::text[], 24, 55000, 130000, 'Good', true, 'Designs mechanical systems and machinery.'),
('c0080000-0000-0000-0000-000000000048', 'Electrical Engineer', 'Engineering', 'Intermediate', ARRAY['Circuit Design','Mathematics','Problem Solving']::text[], 24, 55000, 130000, 'Good', true, 'Designs and maintains electrical systems.'),
('c0080000-0000-0000-0000-000000000049', 'Chemical Engineer', 'Engineering', 'Advanced', ARRAY['Chemistry','Process Engineering','Safety']::text[], 24, 60000, 140000, 'Excellent', true, 'Develops chemical processes and products.'),
('c0080000-0000-0000-0000-000000000050', 'Aerospace Engineer', 'Engineering', 'Advanced', ARRAY['Aerodynamics','Math','CAD']::text[], 36, 70000, 160000, 'Excellent', true, 'Designs aircraft and spacecraft systems.'),

-- Emerging / Future Careers
('c0090000-0000-0000-0000-000000000051', 'Blockchain Developer', 'Technology', 'Advanced', ARRAY['Solidity','Ethereum','Smart Contracts']::text[], 24, 65000, 160000, 'Excellent', true, 'Develops decentralized applications and blockchain systems.'),
('c0090000-0000-0000-0000-000000000052', 'AI Ethics Consultant', 'Technology', 'Advanced', ARRAY['AI Knowledge','Ethics','Policy']::text[], 18, 60000, 140000, 'Excellent', true, 'Guides ethical AI implementation in organizations.'),
('c0090000-0000-0000-0000-000000000053', 'Renewable Energy Specialist', 'Engineering', 'Intermediate', ARRAY['Sustainability','Solar','Wind']::text[], 24, 55000, 130000, 'Good', true, 'Designs and manages renewable energy solutions.'),
('c0090000-0000-0000-0000-000000000054', 'E-sports Professional', 'Creative', 'Intermediate', ARRAY['Gaming Skills','Strategy','Teamwork']::text[], 12, 30000, 120000, 'Good', false, 'Competes professionally in e-sports tournaments.'),
('c0090000-0000-0000-0000-000000000055', 'Remote Work Consultant', 'Business', 'Intermediate', ARRAY['Remote Tools','Productivity','Communication']::text[], 12, 40000, 90000, 'Good', false, 'Advises organizations on remote work strategies.');
