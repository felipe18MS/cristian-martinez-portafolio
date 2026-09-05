export interface Layer {
  id: 'ui' | 'logic' | 'data' | 'foundation';
  name: string;
  color: string;
  hex: number;
  y: number;
  /** which 3D "tech shape" this layer's floating nodes use */
  shape: 'bracket' | 'ring' | 'dbstack' | 'server';
}

export const LAYERS: Layer[] = [
  { id: 'ui', name: 'Interface', color: '#4ed9c8', hex: 0x4ed9c8, y: 6.5, shape: 'bracket' },
  { id: 'logic', name: 'Logic', color: '#9c86f5', hex: 0x9c86f5, y: 1.2, shape: 'ring' },
  { id: 'data', name: 'Data', color: '#e8a23d', hex: 0xe8a23d, y: -4.2, shape: 'dbstack' },
  { id: 'foundation', name: 'Foundation', color: '#7c8ba3', hex: 0x7c8ba3, y: -9.6, shape: 'server' },
];

export type SectionId = 'hero' | 'about' | 'experience' | 'skills' | 'education' | 'contact';

export const SECTION_LAYER: Record<SectionId, number> = {
  hero: 0, about: 0, experience: 1, skills: 2, education: 3, contact: 3,
};

export const SECTION_IDS: SectionId[] = ['hero', 'about', 'experience', 'skills', 'education', 'contact'];

export const PROFILE = {
  name: 'Cristian Felipe Martínez Sánchez',
  role: 'Full Stack Web Developer',
  tagline: 'Building layered, maintainable web systems — Vue 3 interfaces on top of C# / .NET APIs and SQL Server.',
  location: 'Florencia, Huila, Colombia',
  address: 'Brisas Bajas, Florencia, 180001, Colombia',
  email: 'cristianmartinez4002@gmail.com',
  phone: '+57 311 562 6350',
  phoneHref: '+573115626350',
};

export const ABOUT_TEXT =
  "I'm a full stack developer with about two and a half years building and maintaining enterprise " +
  'web applications — mostly Vue 3 and Quasar on the frontend, C# and .NET Framework underneath. ' +
  'I care about clean, modular code: layered architecture, separation of concerns, and interfaces ' +
  "that hold up as a product grows. I work in Agile teams, ship real business features, and I'm " +
  'always picking up something new.';

export const ABOUT_FACTS = [
  { label: 'Experience', value: '~2.5 years, professional' },
  { label: 'Based in', value: 'Florencia, Huila, Colombia' },
  { label: 'Languages', value: 'Spanish (native), English' },
  { label: 'Practices', value: 'Clean Code, SOLID, Scrum' },
];

export const EXPERIENCE = {
  role: 'Full Stack Web Developer',
  company: 'ONEZIP S.A.S — Florencia',
  dates: 'Jan 2024 — Jul 2026',
  bullets: [
    'Built and maintained enterprise web applications end to end, owning both frontend and backend work.',
    'Implemented UI with Vue 3, Composition API, Vue Router, JavaScript and Quasar — modular, reusable components built with real UX in mind.',
    'Developed backend services in C# and .NET Framework using layered architecture and separation of concerns.',
    'Integrated REST APIs to connect frontend and backend, keeping data exchange efficient and structured.',
    'Managed SQL Server databases and shipped features for XML processing, PDF generation, Excel handling, and business reporting.',
    'Worked in Git and Azure DevOps under Scrum, applying SOLID principles and Clean Code practices.',
  ],
};

export const SKILL_GROUPS = [
  { title: 'Frontend', color: '#4ed9c8', items: ['Vue 3', 'Composition API', 'Vue Router', 'Quasar Framework', 'JavaScript', 'HTML5', 'CSS'] },
  { title: 'Backend', color: '#9c86f5', items: ['C#', '.NET Framework', 'REST APIs', 'Layered architecture'] },
  { title: 'Data & tooling', color: '#e8a23d', items: ['SQL Server', 'XML processing', 'PDF generation', 'Excel handling', 'Git', 'Azure DevOps', 'Agile / Scrum'] },
];

export const EDUCATION = [
  { year: '2021', school: 'Institución Educativa Nacional Dante Alighieri', place: 'San Vicente del Caguán', degree: 'Academic High School Diploma' },
  { year: '2024', school: 'SENA — Centro Tecnológico de la Amazonía', place: 'Florencia', degree: 'Technologist in Software Analysis and Development' },
  { year: '2024 – ongoing', school: 'CUN — Corporación Unificada Nacional de Educación Superior', place: 'Florencia', degree: 'Systems Engineering — 10 semesters completed, degree pending' },
];
