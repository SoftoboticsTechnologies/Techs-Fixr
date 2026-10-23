# Verification Report

Date: 2026-10-23. The original pages were downloaded as raw HTML and compared with the rebuild automatically and by inspection.

## 1. Content verification (automated, verbatim)

Every visible text node, placeholder and image `alt` in each original page's `<body>` (theme chrome such as
"Skip to content" and slider arrow glyphs excluded) was extracted and searched for **verbatim** in the rebuilt page.

| Original page | Strings checked | Found verbatim | Not found | Explanation |
|---|---|---|---|---|
| Home | 119 | 118 | 1 | "This field is required." is in `js/main.js` and appears when validation fails (tested, see §3) |
| About | 43 | 43 | 0 | — |
| Services | 102 | 98 | 4 | The four auto-generated alts ("Photo 1517336714731 489689fd1ca8", etc.) were replaced with descriptive alt text |
| Our Staff | 56 | 56 | 0 | — |
| Contact | 36 | 36 | 0 | — |

**Reverse check** (text in the rebuild that isn't in the original): only decorative initials in avatars
(`aria-hidden`), "→" arrow glyphs on buttons and the descriptive image alt texts. No new copy was added.

**Client-requested change (after the check above):** in the footer bar, the original "Powered by techsfixr"
was replaced with a "Powered By" DripFunnel logo (`images/dripfunnel/DRIPFUNNEL white logo.png`) that links to
https://www.dripfunnel.com/in/ in a new tab. Verified on all 5 pages at 320 / 375 / 768 / 1440px: the logo
loads, the link target is correct, and there's no horizontal overflow.

Headings keep the original levels (including the original's several `h1`s on Home and its use of `h5`/`h6`).
Title, meta description, Open Graph, Twitter and canonical tags were copied programmatically from the original HTML.

## 2. Content issues in the original (preserved verbatim, flagged for the owner)

| # | Issue | Location |
|---|---|---|
| 1 | Two different support emails: `support@techfixr.in` (footer) vs `support@techsfixer.in` (Contact page). Neither matches the domain `techsfixr.in` | Footer / Contact |
| 2 | Footer text is cut off mid-word: "…high-quality repairs usin" | Footer |
| 3 | Car-repair template text: "keep your car running smoothly" (Home appointment box), "make car care simple" (Home Why Choose Us) | Home |
| 4 | The whole Our Staff page is car-workshop template content (names, "Take Care of Your Car", automotive bios, mechanic photos) | Our Staff |
| 5 | Placeholder phone number `91-123-456-7890` (not linked in the rebuild, so nobody dials it) | Our Staff CTA |
| 6 | Working hours differ: Home says 09:00 – 20:00, About says 09:00 – 22:00 | Home / About |
| 7 | About "Why Choose Us" icons are car icons (rotor, shocks, tyre service, AC repairs) | About |
| 8 | Typos: "Need a Assistance?", "A reliable technician to delivering…", JSON-LD "Best System Reapir Services" | Services / Our Staff / SEO |
| 9 | Our Staff isn't linked from any navigation | Site-wide |
| 10 | Software & Data Recovery image is broken (404) on the live site | Services |

## 3. Functional verification

Tested in headless Chrome (Playwright, local `file://`).

| Feature | Result |
|---|---|
| Header links (all 5 pages) | ✅ resolve to local pages; current page marked `aria-current="page"` |
| Mobile menu (375px) | ✅ opens, focus moves to first link, Esc closes, backdrop click closes, Tab is trapped |
| Testimonial slider | ✅ next/prev move the track, 4 dots at 3-up, autoplay advances, no errors |
| Request Call Back — empty submit | ✅ "This field is required." on Name, Email, Contact Number; message optional |
| Request Call Back — invalid email | ✅ "Enter a valid email address." |
| Request Call Back — valid submit | ✅ opens `wa.me/918088643818` with Name / Email / Contact Number / Your Message |
| Book a Repair (Contact) | ✅ opens `wa.me/918088643818` with "New Repair Request:" + fields; builds `mailto:support@techsfixer.in` (the email client launch itself can't be observed headless) |
| "Get Estimate" pop-up (all 5 pages, 1440px + 375px via mobile menu) | ✅ opens without leaving the page, focus goes to the first field; closes on ×, Esc and a backdrop click; submit opens WhatsApp with the request and closes the pop-up; on mobile the menu closes first and focus returns to the menu button |
| `tel:` / `mailto:` / WhatsApp links | ✅ present and correctly formed |
| Footer service links | ✅ go to `services.html#laptop-repair`, `#desktop-repair`, `#hardware-upgrade`, `#all-services`, `#software-data-recovery` (all IDs exist) |
| JavaScript console errors | ✅ none on any page |
| Server-side delivery of either form | ⚠️ **Not verified / not available.** Neither form sends anything from a server (see README "Known limitations") |

## 4. Responsive verification

All 5 pages were loaded at **320, 375, 425, 768, 1024, 1280, 1440 and 1920px** (40 combinations).
Each run checked: horizontal overflow (`scrollWidth` vs viewport, plus any element outside the viewport),
JS errors, failed local requests and broken images.

| Check | Result |
|---|---|
| Horizontal overflow | ✅ none, 40/40 |
| JS errors / failed local requests | ✅ none, 40/40 |
| Images load (each scrolled into view, at 375 and 1440) | ✅ all 25 images on all 5 pages |
| Image aspect ratios | ✅ none distorted (fixed boxes use `object-fit: cover`/`contain`) |
| Header at ≤960px | ✅ hamburger + off-canvas drawer; logo scales 190 → 160 → 136px |
| Footer | ✅ 3 columns → 2 (≤1100) → 1 (≤640); bottom bar stacks and centres |
| Multi-column sections | ✅ grids collapse 3/4 → 2 → 1; split layouts stack at ≤960 |
| Testimonials | ✅ 3 visible → 2 (≤960) → 1 (<768) |

During QA I found and fixed one bug: the closed mobile drawer, positioned with `translateX`, made the
page 323px wider than the viewport on phones. It now uses `clip-path`, and body width equals the viewport.
I visually reviewed full-page screenshots at 375, 768 and 1440.

## 5. Not verified

- Real iOS Safari / Android Chrome devices (only Chromium device emulation was used).
- Actual email-client launch from the `mailto:` hand-off.
- The Google Maps iframe content (third-party; it loads the same URL as the original).
