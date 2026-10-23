# Original Site Inventory — techsfixr.in

Scanned on 2026-10-23. The site is WordPress (Astra theme + Elementor, SureForms, Click-to-Chat).
It blocks generic HTTP clients (Mod_Security 406), so it was fetched with browser request headers.

## 1. Pages discovered

Sources: `sitemap_index.xml` → `post-type-page-sitemap-1.xml`, `page-sitemap1.xml`, the WP REST API (`/wp-json/wp/v2/pages`) and every internal link on every page.

| Original URL | Page title | In nav? | Rebuilt as | Status |
|---|---|---|---|---|
| https://techsfixr.in/ | Home - techsfixr | Yes | `index.html` | Recreated |
| https://techsfixr.in/about/ | About - techsfixr | Yes | `about.html` | Recreated |
| https://techsfixr.in/services/ | Services - techsfixr | Yes | `services.html` | Recreated |
| https://techsfixr.in/contact/ | Contact - techsfixr | Yes | `contact.html` | Recreated |
| https://techsfixr.in/our-staff/ | Our Staff - techsfixr | **No** (sitemap only) | `our-staff.html` | Recreated (orphan page, as in the original) |
| https://techsfixr.in/form/3138/ | — | No | — | SureForms form post; redirects to the homepage. Its form is embedded on Home |
| `?elementor_library=default-kit(-2)` | — | No | — | Elementor internal templates, not content |

There is no blog, FAQ, product or portfolio content (`/feed/` has no posts).

## 2. Navigation

**Header (all pages):** Home · About · Services · Contact · [Get Estimate] (`href="#"` in the original)
**Footer "Our Services"** (all `href="#"` in the original): Laptop Repair · Desktop Repair · Hardware · System Diagnosis & Repair · Software Update
**Floating:** WhatsApp click-to-chat button, label "WhatsApp us", number 918088643818

## 3. Heading hierarchy (preserved in the rebuild)

### Home
- h1 Home *(theme page title; visually hidden in the rebuild)*
- h1 Laptop & Desktop Repair At Your Doorstep
- h2 We Repair All Laptop Brands
  - h3 💻 Laptop Repair Services · 🖥️ Desktop Repair Services · ⚙️ Hardware Upgrade · 🛠️ Software Support · 🏠 Doorstep Service · 🔐 Data Recovery
- h5 Make An Appointment · h5 Working Hours · h5 Emergency Calls 24/7
- h1 What We Do
- h2 Why Choose Us
  - h6 💻 Expert Technicians · 🛠️ Experienced Skills · Guarantee Service · Trusted Work
- h4 Request Call Back
- h2 What Our Customers Say
  - h4 Rahul Sharma · Ankit Verma · Priya Singh · Rohit Kumar · Sneha Patel · Amit Joshi
- h6 EMERGENCY CALL 24/7 · h2 8088643818 · h6 BOOK AN APPOINTMENT TODAY

### About
- h6 ABOUT US · h1 Expert Laptop & Desktop Repair Services You Can Trust
- h5 Make An Appointment · Working Hours · Emergency Calls 24/7
- h2 Why Choose Us
- h6 EMERGENCY CALL 24/7 · h2 8088643818 · h6 BOOK AN APPOINTMENT TODAY

### Services
- h1 Our Repair Services
- h3 💻 Laptop Repair · 🖥️ Desktop Repair · ⚙️ Hardware Upgrade · 🛠️ Software Support · 🏠 Doorstep Service · 🔐 Data Recovery
- h2 Laptop Repair Services · Desktop Repair Services · Hardware Upgrade & Performance Boost · Software & Data Recovery
- h2 Why Choose TechsFixr
- h2 500+ · 300+ · 5+ · 24/7
- h2 Need Laptop Repair Today?
- h2 Need a Assistance?

### Our Staff
- h6 OUR STAFF · h1 We Have Hard Working Team to Take Care of Your Car
- h2 Meet The Team
- h4 Tony Adam · h5 Kyle Morales · Frances Arnold · Alan Santos · Jonah Barret
- h6 EMERGENCY CALL 24/7 · h2 91-123-456-7890 · h6 BOOK AN APPOINTMENT TODAY

### Contact
- h1 Contact Us · h2 Contact TechsFixr · h3 Book a Repair

### Footer (all pages)
- h2 Contact Info · h2 Our Services

## 4. Contact details (exactly as shown on the original)

| Item | Value | Where |
|---|---|---|
| Phone | `+91 8088643818` | Home info box |
| Phone | `8088643818` | Home & About CTA, About info box, footer |
| Phone | `+91-8088643818` | Contact page |
| Phone | `91-123-456-7890` | Our Staff CTA *(template placeholder)* |
| WhatsApp | `https://wa.me/918088643818` | Hero, Services CTA, floating button, contact form |
| Email | `support@techfixr.in` | Footer |
| Email | `support@techsfixer.in` | Contact page + contact form `mailto:` |
| Address | 20/3, 1st Main, 3rd Cross Rd, S.G. Palya, Bengaluru, Karnataka 560029 | Footer |
| Location | Bangalore | Contact page (+ Google Maps embed `q=Bangalore`) |
| Hours (Home) | Week Days / Saturday 09:00 – 20:00, Sunday 09:00 - 20:00 | Home |
| Hours (About) | Week Days / Saturday / Sunday 09:00 – 22:00 | About |

## 5. Interactive components

| Component | Page | Original behaviour | Rebuild |
|---|---|---|---|
| Header nav + mobile menu | all | Astra dropdown toggle | Off-canvas drawer, focus trap, Esc to close, backdrop |
| Brand logo scroller | Home | CSS marquee (HP DELL LENOVO ACER ASUS APPLE, duplicated) | CSS marquee, scrolls continuously (no pause on hover), static under reduced-motion |
| Testimonial slider | Home | 3/2/1 visible, prev/next, auto-advance 4 s, loops | Same + dots, swipe, arrow keys, pause on hover/focus |
| Request Call Back form | Home | SureForms → WP REST endpoint | Client-side validation → WhatsApp hand-off (see README) |
| Book a Repair form | Contact | JS: open WhatsApp with request, then `mailto:support@techsfixer.in` | Identical behaviour |
| Google Map | Contact | `maps.google.com/maps?q=Bangalore…&output=embed` | Same embed |
| WhatsApp floating button | all | Click-to-Chat plugin | Floating link, label expands on hover/focus |
| Contact-page 💬 floating link | Contact | Second WhatsApp float (duplicate) | Merged into the site-wide WhatsApp button |

## 6. Assets

| Local file | Original URL | Notes |
|---|---|---|
| `images/logo.png` | …/uploads/2026/04/cropped-TechsFixr-logo-with-laptop-and-globe.png | 1045×291 master |
| `images/logo-272x76.png` | …-272x76.png | header logo |
| `images/logo-300x84.png` | …-300x84.png | footer logo |
| `images/backgrounds/hero-laptop.jpg` | images.unsplash.com/photo-1593642532400-2682810df593 | Home hero background |
| `images/backgrounds/home-cta-bg.jpg` | …/uploads/2020/06/car-repair-engine-tnfd.jpg | Home "Why Choose Us" background |
| `images/backgrounds/about-bg.jpg` | …/uploads/2026/04/BRiPKmq5_….jpg | About hero background |
| `images/backgrounds/services-bg.jpg` | …/uploads/2026/04/FjGxNQLV….jpg | Services "Need a Assistance?" background |
| `images/backgrounds/our-staff-bg.jpg` | …/uploads/2020/07/our-staff-bg.jpg | Our Staff hero background |
| `images/backgrounds/contact-bg.jpg` | …/uploads/2026/04/zRpOpJR2….jpg | Contact hero background |
| `images/services/laptop-repair.jpg` | images.unsplash.com/photo-1517336714731-489689fd1ca8 | |
| `images/services/desktop-repair.jpg` | images.unsplash.com/photo-1593642532400-2682810df593 | |
| `images/services/hardware-upgrade.jpg` | images.unsplash.com/photo-1587202372775-e229f172b9d7 | |
| *(missing)* | images.unsplash.com/photo-1600267165686-4f7f0c10df6f | **HTTP 404 at the source**; placeholder panel used |
| `images/icons/setting-icon.png` | …/uploads/2021/03/setting-icon.png | About |
| `images/icons/rotor.png` | …/uploads/2021/03/rotor.png | About (used twice) |
| `images/icons/shocks.png` | …/uploads/2021/03/shocks.png | About |
| `images/icons/tyre-service.png` | …/uploads/2021/03/tyre-service.png | About |
| `images/icons/ac-repairs.png` | …/uploads/2021/03/ac-repairs.png | About |
| `images/team/worker-1.jpg` | …/uploads/2020/07/worker-1.jpg | Tony Adam |
| `images/team/worker-2.jpg` | …/elementor/thumbs/worker-2-….jpg | Kyle Morales |
| `images/team/image-9.png` | …/elementor/thumbs/image-9-….png | Frances Arnold |
| `images/team/image-8.png` | …/elementor/thumbs/image-8-….png | Jonah Barret |
| `images/team/image-9-demo.png` | websitedemos.net/car-repair-02/…/2025/11/image-9.png | standalone image after the team grid |
| *(none)* | https://techsfixr.in/favicon.ico | **HTTP 404**; the site has no favicon |

Alan Santos has no photo in the original, so the rebuild shows his initials.

## 7. SEO metadata preserved

On every page: `<title>`, `meta description`, `og:title`, `og:description`, `og:url`, `og:site_name`,
`og:locale`, `og:type`, `twitter:card`, `twitter:description` and `link rel="canonical"`, copied verbatim
from the original (canonicals still point to `https://techsfixr.in/…`).
JSON-LD: a cleaned `WebSite` + `Organization` graph on Home keeps the original values (name "techsfixr",
description/slogan "Best System Reapir Services"). The original's WordPress `SearchAction` was dropped
because there's no search on a static site.
