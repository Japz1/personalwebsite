# PERSONAL CREATIVE PORTFOLIO
## Product Requirements Document (PRD)

Version: 2.0  
Project Type: Personal Photography & Cinematography Portfolio  
Platform: Web Application  
Owner: Vallerian Dava Dayoh  
Development Approach: AI-Assisted Development (Vibecoding)

---

# 1. PROJECT OVERVIEW

## 1.1 Background

Personal Creative Portfolio merupakan website pribadi yang berfungsi sebagai pusat dokumentasi, showcase, dan personal branding untuk karya photography dan cinematography milik Vallerian Dava Dayoh.

Website dirancang untuk menampilkan identitas kreatif pemilik melalui pendekatan visual yang menggabungkan cinematic minimalism dan contemporary editorial design.

Website tidak hanya berfungsi sebagai galeri digital, tetapi juga sebagai representasi perjalanan, kreativitas, dan pengalaman pemilik dalam bidang visual arts.

Sistem harus memungkinkan pemilik mengunggah, mengedit, dan mengelola karya melalui dashboard CMS tanpa perlu mengubah source code.

## 1.2 Objectives

1. Membangun personal branding sebagai photographer dan cinematographer.
2. Menyediakan tempat untuk mengarsipkan karya visual.
3. Menampilkan photography dan cinematography secara profesional.
4. Memberikan pengalaman visual yang estetik dan immersive.
5. Mempermudah pengelolaan konten melalui CMS.
6. Membangun website yang mudah dikembangkan pada masa mendatang.

## 1.3 Target Audience

- Potential clients.
- Creative professionals.
- Recruiters dan perusahaan.
- Sesama photographer dan videographer.
- Pengunjung umum.

---

# 2. TECHNOLOGY STACK

## 2.1 Core Technology

| Technology | Purpose |
|---|---|
| React | Frontend library |
| TypeScript | Static typing |
| Vite | Development server dan build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animation |
| React Router | Client-side routing |
| Lucide React | Icon library |
| Sanity CMS | Content management |
| Vercel | Hosting dan deployment |
| Git & GitHub | Version control |

## 2.2 Media Management

| Technology | Purpose |
|---|---|
| Sanity Assets | Image dan video storage awal |
| Sanity Image URL Builder | Image transformation |
| Cloudinary | Optional advanced media optimization |

Cloudinary tidak menjadi dependency wajib pada MVP.

Gunakan Sanity Asset Storage terlebih dahulu agar arsitektur lebih sederhana.

## 2.3 Architecture

Menggunakan konsep Headless CMS.

Frontend:
React + TypeScript + Vite

Content Management:
Sanity Studio

Media Storage:
Sanity Assets

Deployment:
Vercel

Version Control:
GitHub

### System Architecture

OWNER
↓
SANITY STUDIO
↓
UPLOAD MEDIA
↓
SANITY CONTENT DATABASE
↓
SANITY API
↓
REACT + TYPESCRIPT
↓
PUBLIC PORTFOLIO WEBSITE
↓
VISITOR

### Architecture Requirements

- Frontend dan CMS harus terpisah.
- Konten website harus berasal dari Sanity.
- Jangan hardcode data photography dan cinematography.
- Gunakan TypeScript untuk komponen dan data structures.
- Gunakan environment variables untuk konfigurasi.
- Jangan menyimpan API secrets dalam frontend.
- Website harus mengambil konten yang sudah dipublikasikan.

---

# 3. WEBSITE STRUCTURE

Website memiliki lima halaman utama.

## 3.1 Homepage

Tujuan:
Memperkenalkan identitas pemilik dan menampilkan karya pilihan.

Components:

- Navigation bar.
- Fullscreen hero section.
- Personal name typography.
- Short introduction.
- Featured photography.
- Featured cinematography.
- Selected works.
- About preview.
- Contact section.
- Footer.

Hero Content:

VALLERIAN DAVA DAYOH

Photographer / Cinematographer / Visual Storyteller

Tagline:
Capturing moments, preserving stories.

CTA:
- Explore Works.
- Get in Touch.

Hero section harus memiliki visual utama berupa photograph atau cinematic video.

## 3.2 Photography

Tujuan:
Menampilkan seluruh karya fotografi.

Features:

- Asymmetric editorial grid.
- Masonry gallery.
- Category filtering.
- Fullscreen image viewer.
- Lightbox navigation.
- Image captions.
- Project information.
- Lazy loading.

Initial Categories:

- Portrait.
- Street Photography.
- Landscape.
- Event.
- Architecture.
- Experimental.

Kategori dikelola melalui CMS.

## 3.3 Cinematography

Tujuan:
Menampilkan karya video dan cinematic projects.

Features:

- Video thumbnail gallery.
- Custom video player atau embedded player.
- Fullscreen playback.
- Project title.
- Project description.
- Production information.
- Production year.
- Category filtering.

Initial Categories:

- Cinematic Film.
- Event Documentation.
- Music Video.
- Commercial.
- Personal Project.

Video harus menggunakan format dan hosting yang mendukung streaming.

Hindari memuat seluruh video secara otomatis ketika halaman dibuka.

## 3.4 About

Tujuan:
Memperkenalkan pemilik secara personal dan profesional.

Components:

- Personal portrait.
- Biography.
- Creative background.
- Photography interests.
- Cinematography interests.
- Equipment.
- Software and tools.
- Skills and experience.
- Social media links.

## 3.5 Contact

Tujuan:
Mempermudah pengunjung menghubungi pemilik.

Components:

- Email.
- Instagram.
- WhatsApp.
- Social media links.
- Collaboration inquiry.

---

# 4. CONTENT MANAGEMENT SYSTEM

## 4.1 CMS Overview

Sanity Studio menjadi dashboard khusus owner.

Owner memiliki akses untuk mengelola seluruh konten website.

CMS harus memiliki interface yang sederhana dan mudah digunakan.

## 4.2 Photography Management

Owner dapat:

- Upload image.
- Edit image information.
- Delete image.
- Publish dan unpublish.
- Mengatur kategori.
- Mengatur featured works.
- Mengatur urutan galeri.

Photography Schema:

| Field | Type |
|---|---|
| Title | String |
| Slug | Slug |
| Image | Image |
| Description | Text |
| Category | Reference |
| Location | String |
| Capture Date | Date |
| Featured | Boolean |
| Published Date | Datetime |

## 4.3 Cinematography Management

Owner dapat:

- Menambahkan video.
- Mengunggah thumbnail.
- Menambahkan video URL.
- Mengedit informasi project.
- Menghapus project.
- Mengatur kategori.
- Mengatur featured projects.

Cinematography Schema:

| Field | Type |
|---|---|
| Title | String |
| Slug | Slug |
| Video Asset / URL | File / URL |
| Thumbnail | Image |
| Description | Text |
| Category | Reference |
| Production Date | Date |
| Credits | Array |
| Featured | Boolean |
| Published Date | Datetime |

## 4.4 Profile Management

Owner dapat mengelola:

- Full name.
- Professional title.
- Biography.
- Profile picture.
- Email.
- Instagram URL.
- WhatsApp URL.
- Other social media.

## 4.5 Upload Workflow

Contoh proses upload photography:

1. Owner membuka Sanity Studio.
2. Owner login.
3. Memilih Photography.
4. Klik Create New.
5. Upload gambar.
6. Mengisi informasi gambar.
7. Klik Publish.
8. Website mengambil data terbaru dari Sanity.
9. Gambar muncul di Photography Gallery.

Tidak membutuhkan perubahan source code atau deployment ulang.

Workflow yang sama berlaku untuk cinematography.

---

# 5. UI/UX DESIGN SYSTEM

## 5.1 Design Direction

Primary Concept:

CINEMATIC MINIMALISM × CONTEMPORARY EDITORIAL

Visual characteristics:

- Minimalist.
- Cinematic.
- Editorial.
- Elegant.
- Immersive.
- Photography-focused.

Website harus terasa seperti portfolio personal seorang visual artist.

## 5.2 Color Palette

| Color | Hex |
|---|---|
| Deep Black | #111111 |
| Charcoal | #1B1B1B |
| Warm Cream | #EAE6DF |
| Muted Gray | #999999 |
| Muted Blue | #52677C |
| Warm Accent | #9A8068 |

Gunakan dark background sebagai warna utama dengan warm cream sebagai warna teks.

## 5.3 Typography

Recommended fonts:

| Font | Usage |
|---|---|
| Cormorant Garamond | Display typography |
| Inter | Body text |
| Playfair Display | Optional editorial accent |

Typography harus memiliki hierarki visual yang jelas.

## 5.4 Layout Principles

- Large typography.
- Asymmetric layouts.
- Generous whitespace.
- Editorial image placement.
- Minimal navigation.
- Fullscreen visual sections.
- Consistent spacing.
- Responsive gallery.

## 5.5 Animation

Gunakan Framer Motion untuk:

- Page transitions.
- Fade-in effects.
- Image reveal.
- Hover interactions.
- Scroll animations.
- Navigation transitions.

Animasi harus ringan dan tidak mengganggu pengalaman melihat konten.

GSAP bersifat opsional untuk kebutuhan animasi yang lebih kompleks.

---

# 6. FUNCTIONAL REQUIREMENTS

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Homepage menampilkan identitas owner | High |
| FR-02 | Photography gallery | High |
| FR-03 | Cinematography gallery | High |
| FR-04 | Owner dapat upload photography | High |
| FR-05 | Owner dapat upload/manage video | High |
| FR-06 | Published content otomatis muncul | High |
| FR-07 | Owner dapat edit dan delete konten | High |
| FR-08 | Category filtering | Medium |
| FR-09 | Fullscreen image viewer | Medium |
| FR-10 | Video player | High |
| FR-11 | About page | Medium |
| FR-12 | Contact section | Medium |
| FR-13 | Responsive design | High |
| FR-14 | SEO metadata | Medium |
| FR-15 | Loading animation | Low |
| FR-16 | Featured works management | High |
| FR-17 | Project detail page | Medium |

---

# 7. NON-FUNCTIONAL REQUIREMENTS

## 7.1 Performance

- Image optimization.
- Lazy loading.
- Responsive image delivery.
- Video streaming optimization.
- Code splitting when appropriate.
- Minimal unnecessary dependencies.
- Smooth scrolling.
- Efficient API requests.

## 7.2 Responsiveness

Website harus mendukung:

- Desktop.
- Laptop.
- Tablet.
- Smartphone.

Prioritaskan pengalaman visual pada desktop dan mobile.

## 7.3 Security

- CMS hanya dapat diakses owner yang memiliki izin.
- Gunakan environment variables.
- Jangan expose private API tokens.
- Terapkan pembatasan akses CMS.
- Gunakan HTTPS.
- Validasi input dari CMS.

## 7.4 SEO

- Custom page title.
- Meta description.
- Open Graph metadata.
- Image alt text.
- Sitemap.
- Semantic HTML.
- Descriptive URL structure.

## 7.5 Accessibility

- Keyboard navigation.
- Descriptive alt text.
- Sufficient color contrast.
- Accessible buttons.
- Reduced-motion support.

---

# 8. PROJECT STRUCTURE

Recommended folder architecture:

personal-portfolio/

├── public/
│   ├── fonts/
│   └── favicon/

├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── gallery/
│   │   ├── media/
│   │   └── common/
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Photography.tsx
│   │   ├── Cinematography.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── sanity.ts
│   │   └── queries.ts
│   │
│   ├── types/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── sanity/
│   ├── schemas/
│   └── sanity.config.ts
│
├── docs/
│   ├── PRD.md
│   ├── DESIGN-SYSTEM.md
│   ├── TECH-STACK.md
│   └── DEVELOPMENT-ROADMAP.md
│
├── AGENTS.md
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts

Struktur dapat berkembang sesuai kebutuhan implementasi.

---

# 9. DEVELOPMENT APPROACH

Project dikembangkan menggunakan AI-assisted development atau vibecoding.

AI coding agent membantu implementasi, sedangkan owner bertanggung jawab atas:

- Product direction.
- Design decisions.
- Feature requirements.
- Content selection.
- Visual review.
- Testing dan approval.

## 9.1 Development Rules

1. Gunakan TypeScript untuk seluruh komponen React.
2. Hindari penggunaan `any` tanpa alasan teknis.
3. Gunakan reusable components.
4. Pisahkan business logic dari presentation components.
5. Gunakan modular architecture.
6. Jangan hardcode portfolio content.
7. Gunakan Sanity sebagai sumber data utama.
8. Pertahankan konsistensi design system.
9. Hindari dependency yang tidak diperlukan.
10. Jangan mengubah komponen yang sudah disetujui tanpa instruksi.
11. Jalankan TypeScript checks dan build sebelum menyelesaikan setiap fase.
12. Jangan mengimplementasikan semua fitur sekaligus.

## 9.2 AI Development Workflow

PRD
↓
DESIGN REFERENCES
↓
AI CODING AGENT
↓
IMPLEMENTATION
↓
LOCAL TESTING
↓
VISUAL REVIEW
↓
REVISION
↓
APPROVAL
↓
NEXT DEVELOPMENT PHASE

Setiap fase harus memiliki hasil yang bisa diuji sebelum melanjutkan.

---

# 10. DEVELOPMENT ROADMAP

## Phase 1: Project Initialization

- Setup React.
- Setup Vite.
- Setup TypeScript.
- Setup Tailwind CSS.
- Setup React Router.
- Setup GitHub repository.
- Setup project structure.

Output: Functional development environment.

## Phase 2: Design System

- Setup color palette.
- Setup typography.
- Setup spacing.
- Setup reusable components.
- Setup responsive breakpoints.
- Setup animation foundation.

Output: Consistent design foundation.

## Phase 3: Frontend Development

- Navigation.
- Homepage.
- Hero section.
- Photography page.
- Cinematography page.
- About page.
- Contact page.
- Footer.

Output: Complete frontend prototype using temporary content.

## Phase 4: CMS Integration

- Setup Sanity project.
- Configure schemas.
- Connect Sanity API.
- Create TypeScript data types.
- Implement GROQ queries.
- Connect photography data.
- Connect cinematography data.
- Connect profile information.

Output: Website connected to CMS.

## Phase 5: Content Management

- Configure Sanity Studio.
- Implement upload workflow.
- Implement edit and delete.
- Implement publishing workflow.
- Implement featured works.
- Test automatic content updates.

Output: Functional owner content management system.

## Phase 6: Animation & Interaction

- Page transitions.
- Image reveal.
- Hover effects.
- Lightbox.
- Video player.
- Scroll animations.

Output: Refined visual experience.

## Phase 7: Optimization

- Image optimization.
- Video optimization.
- SEO.
- Accessibility.
- Responsive testing.
- Performance testing.
- Error handling.

Output: Production-ready website.

## Phase 8: Deployment

- GitHub integration.
- Vercel deployment.
- Environment configuration.
- Domain configuration.
- Production testing.

Output: Public personal portfolio.

---

# 11. ACCEPTANCE CRITERIA

Website dianggap memenuhi MVP apabila:

1. Website berhasil diakses melalui domain publik.
2. Homepage menampilkan identitas owner.
3. Photography gallery mengambil data dari Sanity.
4. Cinematography gallery mengambil data dari Sanity.
5. Owner berhasil login ke Sanity Studio.
6. Owner berhasil mengunggah foto.
7. Owner berhasil menambahkan video.
8. Published content otomatis muncul di website.
9. Owner berhasil mengedit dan menghapus konten.
10. Featured works dapat dikelola melalui CMS.
11. Website berjalan pada desktop dan mobile.
12. TypeScript checks berhasil.
13. Production build berhasil.
14. Tidak ada API secret yang terekspos di frontend.

---

# 12. FUTURE DEVELOPMENT

Fitur yang dapat ditambahkan setelah MVP:

- Password-protected galleries.
- Client-specific portfolio.
- Client inquiry form.
- Blog / Journal.
- Behind-the-scenes section.
- Equipment and workflow page.
- Photography collections.
- Advanced filtering.
- Analytics dashboard.
- Custom domain email.

---

# 13. FINAL PRODUCT VISION

Personal Creative Portfolio menjadi representasi identitas kreatif Vallerian Dava Dayoh.

Website menggabungkan photography, cinematography, dan personal storytelling dalam satu pengalaman visual.

Pengunjung dapat menjelajahi karya melalui interface yang minimalis, cinematic, dan editorial.

Owner memiliki dashboard CMS yang sederhana untuk mengelola seluruh karya tanpa melakukan perubahan kode.

Prinsip utama pengembangan:

1. Visual quality first.
2. Simple content management.
3. Consistent design system.
4. Maintainable TypeScript architecture.
5. Optimized media delivery.
6. Scalable development structure.

END OF DOCUMENT