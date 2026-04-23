# Little Pines Studio — Website Plan
*Last updated: April 10, 2026*

---

## Context

**What we're building:** Pre-launch holding site (Phase 1), designed to grow into the full product launch site by holiday 2026.

**The character:** A bear cub — the same bear from the logo, rendered in the woodcut/linocut style, made in real life from real alpaca fur. Small, gentle, curious. Embroidered face. No plastic eyes. No parts that break off.

**The material:** Real alpaca fur. Not synthetic plush. This is one of the most distinctive product specifications in the entire children's product category and should be stated with the same plainspoken confidence as "No screen. No WiFi."

**GitHub:** https://github.com/dariazhao/Little-Pines (exists, currently empty — first commits matter, plan them intentionally)

**Platform:** Webflow (recommended)

**Visuals:** Commissioned woodcut/linocut illustration system for Phase 1. Real product photography for Phase 2 launch (alpaca fur photographs extraordinarily well in natural light — this is a feature, not a constraint).

---

## Part I: What the Website Must BE

The website must behave like the product.

The bear never speaks unprompted. The website has no entry pop-ups, no exit-intent modals, no notification permission requests, no chatbots, no sticky "BUY NOW" bars.

The bear doesn't maximize engagement. The website has no infinite scroll tricks, no algorithmic content feeds, no "you might also like" rabbit holes.

The bear is a quiet, unhurried presence. The website loads fast, is easy to leave, and doesn't feel like it's trying to keep you there.

This restraint is not a design limitation — it is the design. The parent who experiences a website that doesn't chase them will know, viscerally, that this company means what it says. The website's behavior is proof of concept.

A second principle: the website is a brand object first, a marketing site second, and an e-commerce site third. The concept paper already contains exceptional prose — much of the best copy is already written. The website's job is to surface and format that writing beautifully, not replace it with marketing language.

---

## Part II: Pre-Launch Site Architecture

### Pages (Phase 1)

```
/                  Home — Mission. Teaser. Waitlist.
/about             The founder. Three acts. The team we're building.
/the-approach      Pedagogy, research, intellectual lineage.
/safety-privacy    The hardware trust story. The 10 product principles.
/open-source       What we're sharing. GitHub. Community.
/for-educators     The B2B2C pilot invitation.
/journal           Long-form pieces. Founder letters. Research notes.
```

### Homepage Scroll Sequence

**NAV:** `[Bear logo mark] Little Pines Studio` left · `About  Approach  Safety  Open Source  For Educators` center · `Get updates →` right (ghost button — restraint is the brand)

**1 / HERO**
One large woodcut illustration of the bear cub. Not a product photo — the illustration is better at this stage because it creates desire without revealing the full object. The bear should be in a natural setting: forest floor, dappled light, present and peaceful.

Headline (large serif): *"A quiet friend who sits with your child through big feelings."*

Sub: *"The first screen-free emotional literacy coach for ages 3 to 7. Nothing leaves the toy. Coming holiday 2026."*

No CTA in the hero. Let the statement breathe. The scroll invites.

**2 / THE PROBLEM (prose, not bullets)**
Lift directly from the concept paper: *"Children are born with an extraordinary capacity to feel, notice, and express the full range of human emotion..."* Two paragraphs, beautifully typeset. A declaration, not marketing copy.

**3 / WHAT IT IS**
Four short lines with small woodcut vignettes: *Screen-free. Voice-first. On-device. Open-source.*

Below: *"Nothing ever leaves the toy. No WiFi required. No subscription required to use it. The microphone has a physical switch."*

Then the materials line — one sentence, stated simply: *"Fine Peruvian alpaca fiber. Embroidered face. No plastic. Designed to be hugged, slept with, and washed."*

**4 / HOW IT WORKS (the four sessions)**
Four small woodcut vignettes, one per session type. Name + 1–2 sentences from the dialogue examples. The Daily Check-In dialogue ("Okay is a nice place to be...") is particularly good here.

**5 / TRUST + RESEARCH**
Not an "As seen in" bar. Headshots and names of the child psychologists and Montessori/Waldorf educators involved, one-line descriptions of their role. The intellectual lineage (Montessori, Siegel, Delahooke, CASEL) abbreviated — a quiet signal to parents who know these names.

**6 / THE OPEN-SOURCE COMMITMENT**
Pull quote, set large: *"Any child in the world should be able to benefit from this work, regardless of whether their family can afford our product."*

One short paragraph. GitHub link: https://github.com/dariazhao/Little-Pines

**7 / FOUNDER**
Portrait of Daria (natural light, not corporate). Three-act story compressed. Link to full About page.

**8 / EMAIL CAPTURE**
Heading: *"Get updates from the workshop."*
Footnote: *"We write infrequently. Only when there's something worth sharing."*
This footnote is the product principle — no engagement maximization — applied to the newsletter itself.

**FOOTER:** Logo · pages · Instagram · GitHub · press@littlepinesstudio.com · © 2026 Little Pines Studio, PBC

---

## Part III: Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary / Forest | Deep pine green | `#2A4A30` |
| Background | Warm cream / ecru | `#F4EFE2` |
| Text | Warm charcoal-brown | `#2B2218` |
| Accent / Warmth | Honey amber | `#C8904A` |
| Secondary | Soft sage | `#7A9E7E` |
| Tertiary | Muted terracotta | `#C4785E` |

Pure white only in text-on-dark contexts. The cream background reads as warm paper — right for a brand this literary.

### Typography

- **Headlines:** Canela (Display weight) — premium lifestyle register, used by Kinfolk, Away, and Patagonia editorial, without being overexposed in the children's space.
- **Body:** Neue Montreal — humanist sans, warm at small sizes, never clinical.
- The serif + humanist sans pairing is the typographic language of Lovevery, Aesop, and Kinfolk: *written by people who read.*
- No icon fonts, no bounce animations, no rounded system fonts. Warmth comes from color and illustration, not border-radius.

### Illustration System

Commission a full woodcut/linocut illustration system consistent with the logo. This is the pre-launch visual strategy and the single most distinctive thing the site can do.

**What to commission:**
- The bear cub in at least 6 poses: resting, listening, with a child's hand reaching in, in the nest, looking up curiously, eyes closed in wind-down
- 4 session-type vignettes (check-in / big feelings / curiosity / wind-down)
- Forest vignettes for section breaks: pine branch, acorn, mushroom, moth, stream
- A nest illustration for the charging cradle
- A cross-section illustration of the bear itself: alpaca fur exterior → organic cotton inner → sealed electronics pod → speaker (see Bellroy "what to steal" below)

**Illustrator profile:** Someone who works in woodblock print, linocut, or scratchboard. Look at illustrators for literary fiction covers, classic children's picture books (not cartoon), or natural history illustration. The Folio Society illustrators or McSweeney's cover artists are directionally right.

### Materials Story (new — driven by alpaca fur)

Real alpaca fur is not a detail — it is a headline. It should be stated at least three times on the site in different contexts:

1. In the product description (plainly, with fiber specifics)
2. In the materials cross-section illustration (visually)
3. In a dedicated materials note on the product page (the Aesop ingredient-transparency model)

**A note on "baby alpaca" — do not use this term.** It is an unregulated industry marketing term (not from baby animals — it refers to a fiber grade of ~20–23 microns) and your target parent will google it. Finding out the term is essentially soft marketing language is a trust-damaging moment for a brand whose premise is radical honesty. State the micron count instead — that is the actual fact, and it is far more compelling.

**The materials note template — Version A (before supply chain is certified):**
*"The bear is made from fine Peruvian alpaca fiber — one of the softest natural fibers in the world, with deep roots in Andean culture, where alpaca has been central to highland family life for thousands of years. Embroidered face. No plastic. No synthetics."*

**Version B (at launch, once supply chain is locked and certified):**
*"The bear's exterior is [22-micron] Peruvian alpaca fiber, sourced from small family farms in the Andean highlands through [cooperative/network name], certified to the Responsible Alpaca Standard. The inner lining is organic cotton. The face is hand-embroidered. No plastic parts. Designed to be held, slept with, and washed."*

**The certification to pursue:** The [Responsible Alpaca Standard (RAS)](https://textileexchange.org/responsible-alpaca-standard/) from Textile Exchange — full chain of custody from farm to product, covering animal welfare, land management, and worker social welfare. This is the Patagonia Traceable Down equivalent for alpaca, and it's what makes "honoring tradition" a real claim rather than a decorative one. The Peruvian farming tradition is real and thousands of years old (~86,000 farms averaging 60–90 animals each, supporting ~82,000 families), but the industry faces real pressures — climate change, rural-urban migration, insufficient farmer compensation — and the sourcing relationship should actively address these, not just invoke the heritage. Stated once, with confidence, never repeated as a marketing claim.

**Photography direction for Phase 2 (product exists):**
Real alpaca fur in natural morning light is extraordinarily photogenic. It catches and diffuses light the way synthetic fibers cannot. Key shots to prioritize in the product shoot:
- Extreme close-up of the fur texture (macro lens, natural light, warm tones)
- The bear in a child's hands — the scale relationship matters
- The bear in situ in a child's bedroom (on a wooden shelf, next to books and a lamp)
- The nest cradle on a natural wood surface
- The bear being carried under a small arm

For Phase 1 (illustration), stock photography should show: natural light, real homes, children in the 3–7 age range playing (not posed), warm tones, no screens. Getty's Blend Images collection and Stocksy are better than generic Shutterstock/Unsplash for this.

---

## Part IV: Reference Library

### Section A — Named Competitors

---

**Lovevery** (`lovevery.com`)

Current hero: *"Experience the joy of learning through play."* Trust through volume: "millions of families," "hundreds of hours of play studies." Age-segmented navigation. Candid photography in natural light. Warm cream + lime accent palette.

**What to steal:**

- **Age-window framing.** Every Lovevery product is organized around a specific developmental window with specific goals. LPS equivalent: *"for the window when emotional vocabulary is built — ages 3 to 7."* Frame around the developmental moment, not the product.

- **The Guide (parent education hub).** Lovevery's editorial section reads like a pediatrician's notes, not a toy catalog. Parents seek it out. LPS's /journal should do the same: "What your 4-year-old is experiencing in a tantrum, and what actually helps" — specific, research-backed, not promotional.

- **The printed developmental booklet shipped with every kit.** This is their single highest-value non-product marketing. LPS equivalent: a beautifully designed parent booklet with every bear — the four session types, the pedagogical lineage, what to do when the bear flags a serious disclosure. Physical, beautifully designed, kept.

- **Materials specificity as trust.** Lovevery says "premium, natural materials" — without specificity. LPS can be dramatically more precise: *"Real alpaca fur. Organic cotton. Embroidered face."* Named materials with no weasel words. In a category where "premium" means nothing, specificity means everything. This is a direct competitive advantage over Lovevery on the materials claim.

**What NOT to steal:** The subscription-box primary revenue model. The breadth of parallel product lines for multiple age groups at launch.

---

**Yoto** (`us.yotoplay.com`)

Current hero: *"From First Words to First Playlists."* Trust through statistics: "22 billion minutes listened in 2025," "98% of parents agree Yoto grows with their child." Age-segmented card navigation.

**What to steal:**

- **The hardware privacy claim as a feature.** Yoto markets "no microphone" prominently as a trust signal. LPS's equivalent is stronger: not just "no microphone" but a *physical switch that cuts power to the microphone preamp at the circuit level.* That's a claim no competitor can currently make. State it with the same Yoto directness — not buried in FAQ, but in the product description itself.

- **Statistics framed around outcomes parents care about.** Yoto uses "made bedtime easier" (89% agreement) rather than technical specs. LPS equivalent — once the efficacy study runs: specific, outcome-focused statistics. "X% of parents reported fewer tantrums after 12 weeks." Not "clinically proven" (too clinical) — just the number, the outcome, the timeframe.

- **The "screen-free as a feature" language.** Yoto has made "screen-free" feel like a positive capability rather than a restriction. Study exactly how they phrase it. It's warm, not preachy. LPS needs the same tone for "on-device" and "no WiFi" — these should feel like gifts to the child, not limitations on the product.

**What NOT to steal:** The Trustpilot-heavy trust architecture (feels generic e-commerce at launch). The commerce-first homepage structure.

---

**Tonies** (`tonies.com`)

Playful, license-heavy, entertainment-first. Not an aesthetic reference.

**What to steal:**

- **The content subscription architecture.** Hardware sets the base; the content catalog is the recurring revenue. The framework for how to structure content packs on top of a one-time hardware purchase. Study the Tonies content page structure (not the visual design) to understand how to present content pack upsells without making the base product feel incomplete.

**What NOT to steal:** Almost everything visual. The primary colors, the licensed character branding, the entertainment-first framing.

---

### Section B — Adjacent Businesses I'm Adding

These are non-obvious references. For each, the specific mechanism worth borrowing is identified.

---

**Aesop** (`aesop.com`)

Premium grooming brand. The gold standard for a values-driven physical product company that communicates trust through restraint.

**What to steal:**

- **Ingredient-level materials transparency applied to a physical object.** Aesop lists every botanical ingredient with its source and function. LPS equivalent: a materials note on the product page that reads: *"The bear's exterior: 100% [baby] alpaca fiber, sourced from [origin]. Inner lining: organic cotton, GOTS certified. Face: hand-embroidered, no plastic components. Electronics housing: sealed recycled ABS module, accessible only via hidden zipper for washing."* This level of specificity — applied to a plush toy — is completely unprecedented in the children's product category. It's an Aesop move, and it will stop the right parent cold.

- **Trust through omission.** Aesop never shouts "Award-Winning!" The restraint creates more trust than any claim would. LPS should adopt this: no exclamation points, no "amazing," no "revolutionary." Let the facts speak. *"Real alpaca fur. Hardware microphone switch. Nothing leaves the toy."* These are facts. They don't need adjectives.

- **Copy written for people who read.** Aesop product pages are long-form, use precise vocabulary, and treat the reader as intelligent. The concept paper already writes this way. The website should continue this register throughout — never condescend, never simplify, never bullet-point what can be a sentence.

- **Navigation as philosophy.** Aesop's navigation is text-only, unhurried. No mega-menus, no visual overload in the nav. The structure signals: this company is not trying to sell you something in the first 5 seconds.

---

**The Citizenry** (`the-citizenry.com`)

Artisan home goods. Hero: *"The world's most gorgeous goods for your home. All thoughtfully designed & ethically crafted."* Geographic provenance, artisan partner index, Fair Trade certification throughout.

**What to steal:**

- **Alpaca photography direction specifically.** The Citizenry sells Peruvian alpaca goods extensively — throws, pillows, blankets. Their photography of alpaca textiles uses: extreme close-up texture shots in warm natural light, hands touching the fiber to convey softness, products in actual home interiors (not styled sets), warm amber and cream tones that match the fiber's natural color. This is the exact photography reference for how the bear's fur should be photographed when the product exists. Pull their alpaca section as a photography brief for your product shoot.

- **Provenance as the primary trust signal.** Not "our products are well-made" — but "this was made by Zapotec weavers in Oaxaca." The maker IS the trust story. LPS equivalent: the bear's alpaca fiber has a source, the voice was performed by a named voice actor from the children's audiobook world, the curriculum was authored by named child psychologists. Make the provenance of every layer visible: *who made this, with what, where.* The artisan partner index (`/pages/artisan-index`) is a model for LPS's own `/our-team` — featuring every child psychologist, Montessori educator, and voice performer by name and role.

- **"Unlock early access" mid-page email capture.** They embed their email signup partway down the homepage — after you've read enough to be convinced, not at the top before you know what the brand is. This is the right approach: earn the email, don't demand it upfront.

---

**Bellroy** (`bellroy.com`)

Premium bags and wallets. B Corp certified. Exceptional at explaining what's inside a physical product.

**What to steal:**

- **The "Show inside" interactive reveal.** Bellroy uses a toggle on product images — click "Show inside," see an exploded interior view of exactly how the pockets and compartments are organized. For LPS, this becomes an interactive cross-section illustration of the bear itself, with labeled layers:

  ```
  ① 100% alpaca fur exterior
  ② Organic cotton inner lining
  ③ Sealed electronics pod (accessible via hidden zipper)
  ④ 2-mic MEMS array, tuned for children's voices
  ⑤ Physical microphone switch (when off, recording is physically impossible)
  ⑥ Full-range speaker, tuned for warmth
  ⑦ USB-C battery module
  ```

  A parent who can *see* the hardware mute switch in a beautiful illustrated cross-section understands the privacy story in their body, not just their mind. This is the most powerful trust-building UI technique available for this specific product, and it costs nothing beyond a good illustration.

- **Materials guarantee language.** Bellroy states their materials with calm confidence ("we use this leather because...") and backs it with specific guarantees. LPS equivalent: state the alpaca fiber sourcing plainly, and commit publicly to what you'll never change — no synthetic fibers, ever.

---

**Native Union** (`nativeunion.com`)

Premium tech accessories. Tagline: *"Tech Accessories Reimagined."* Zero border-radius, monochromatic palette, generous vertical spacing (80px at desktop), museo-sans typography.

**What to steal:**

- **The philosophy of tech that earns its place in a beautiful home.** Native Union photographs their products on marble, linen, oak, concrete — never on white backgrounds, never as isolated gadgets. The product looks like it belongs. LPS equivalent: the nest cradle on a natural wood shelf, the bear on a linen pillow, the charging indicator glowing amber on a bedside table at dusk. The electronics inside the bear should never be the story; the object in the home is the story.

- **Close-up material photography as product photography.** Native Union's product images often lead with surface texture — the weave of a cable braid, the grain of a leather tag. For LPS: the alpaca fur close-up is a hero image in its own right. Real alpaca fiber catches and diffuses light in a way synthetic plush cannot. A well-shot macro of the fur in morning light tells the materials story without a word of copy. Commission this shot as the first product image.

- **Generous whitespace as a luxury signal.** 80px of vertical breathing room between sections is not wasted space — it's the visual equivalent of speaking slowly and confidently. The LPS site should be as spacious as Native Union's. Never cram content together.

---

**The School of Life** (`theschooloflife.com`)

Sells books, card sets, and objects for emotional intelligence and self-knowledge for adults. Directly in the emotional literacy category, one generation up.

**What to steal:**

- **The copy register for normalizing emotional conversations in consumer language.** They've made it acceptable — even desirable — to buy products that help you understand your feelings. Study their product description language: gentle, inclusive, non-clinical, non-patronizing. *"For those who find..."* and *"When life feels..."* is the adult template; adapt the register for parents talking about their children. The LPS journal should write in a similar voice.

- **Physical card products as a natural adjacent offering.** The School of Life sells beautifully designed card sets for emotional exercises — gifts, conversation starters, reflection prompts. These translate directly to a future LPS product line: *Big Feelings Cards*, *Wind-Down Prompts*, *Curiosity Questions* — physical sets that extend the plush's curriculum into a tangible object that can live on a family's kitchen table. Not a v1 product, but a natural Year 2 expansion. Study their card product pages for how to price, package, and position physical card sets in a premium context.

---

**Patagonia** (`patagonia.com`)

Outdoor apparel. The definitive example of a commercial company that wears its values without being preachy.

**What to steal:**

- **Mission as a first-class navigation item.** Patagonia puts "Activism" in the primary nav at equal weight to "Shop." LPS should put "Open Source" and "Research" at visual parity with "The Bear" — not buried in a footer. A parent who sees "Open Source" in the primary navigation understands something important about this company before they've read a word.

- **Supply chain transparency as a brand asset.** Patagonia's Traceable Down Standard and Responsible Wool Standard — specific, named, third-party verified sourcing commitments — are a direct model for how LPS should talk about its alpaca fiber sourcing. Not just "ethically sourced" (meaningless) — but the specific standard, the origin country, the farm practice, the certifying body. When this information exists, publish it with Patagonia-level specificity on the product page.

- **Anti-commercial honesty as the best commercial strategy.** "Don't Buy This Jacket" sold jackets. LPS equivalent: *"This bear works forever with no subscription. We will never gate the core experience behind a paywall."* Saying the quiet part out loud — that you've designed against your own commercial incentives — builds the kind of trust no marketing budget can buy.

---

**Mela** (`melablanket.com`)

Weighted blanket brand targeting sleep-anxious parents. Exceptional visual design, directly adjacent customer.

**What to steal:**

- **Lead with the parent's emotional outcome, not the product feature.** Mela's hero is not "our blanket is weighted" — it's "Wake up rested." The product feature is subordinated to the feeling it produces. LPS equivalent: *"Imagine your child having the words for what they feel"* — not *"A voice-responsive plush with on-device AI."* The parent doesn't want the technology; they want the outcome the technology makes possible.

- **Calm as a visual register.** Mela's entire visual language — palette, typography spacing, photography — communicates the feeling of the product before a single word is read. The LPS site should do the same: the pace of the scroll, the space between sections, the unhurried typography — all of it should feel like taking a slow breath.

---

**Sonos** (`sonos.com`)

Premium home audio. The best example of consumer tech positioned as a home object rather than a gadget.

**What to steal:**

- **"In your space" product photography.** Sonos consistently shows their speakers integrated into beautiful home interiors — on bookshelves next to actual books, on kitchen counters next to fruit bowls, in living rooms with plants and art. The product belongs. For LPS: when the product exists, every photograph should show the bear *in a real child's room* — on a wooden shelf next to books, under a lamp, in a child's arm in a morning light bedroom. Never isolated on a surface, never on white. The nest cradle should be photographed the way Sonos photographs the Move: as something you'd want in your home.

- **Audio hardware copy register.** Sonos describes their products in terms of how they feel to live with ("designed to disappear into your home," "sounds like being there") rather than specs. LPS equivalent: describe the bear's voice in terms of what the child experiences, not what the model size is. *"A voice warm enough to sit with."*

---

**August** (`august.co`)

Period care brand. Unexpected but precise: they've normalized speaking plainly about a topic made unnecessarily taboo.

**What to steal:**

- **The directness.** Periods were medicalized and euphemized in product marketing for decades. August made them ordinary and dignified with direct, non-clinical copy. LPS faces a parallel challenge: children's emotional struggles are often medicalized (therapy, diagnosis, treatment) or avoided in consumer marketing. Copy should be direct: "Your child will have tantrums. This is what they sound like from the inside. Here's what actually helps." No hedging. No clinical euphemism. No "challenging behaviors." Just honesty.

- **The "for us, by us" trust signal.** August is founded by people who menstruate, for people who menstruate. LPS's equivalent trust signal: designed with child psychologists, for children. Not "clinically validated" (too clinical) but *"every interaction reviewed by child psychologists who work with children this age"* — the expertise is specific and human, not institutional.

---

**Coyuchi / Boll & Branch** (organic textile brands — new addition driven by alpaca fur)

Luxury organic bedding brands that have made materials sourcing feel premium rather than preachy.

**What to steal:**

- **The materials claim stated once, with calm confidence.** Coyuchi says "100% organic cotton, GOTS certified" — once, plainly, in the product description. They don't repeat it as a marketing claim or bury it in FAQ. LPS equivalent: state the alpaca sourcing once, with the same calm confidence, in the product description. *"100% baby alpaca fiber, sourced from [origin/standard]."* Said once. Believed.

- **The certification ecosystem.** Coyuchi and Boll & Branch align with GOTS (Global Organic Textile Standard), Fair Trade, and OEKO-TEX certifications. LPS should identify the alpaca fiber equivalent certifications early — whatever the Alpaca Owners Association, GOTS, or similar bodies certify — and pursue them before launch. Not to plaster certification badges everywhere, but so you can make the claim with the same plainspoken authority.

---

## Part V: Platform Recommendation

**Webflow** for Phase 1 (pre-launch) and the marketing frontend of Phase 2.

- Full design control — no template constraints
- CMS for journal, research page, open-source updates
- Beautiful animation for the "inside the bear" cross-section reveal
- Integrates with Klaviyo/ConvertKit for the waitlist
- Phase 2 path: Webflow as marketing frontend + Shopify as e-commerce backend (headless) — the approach used by premium DTC brands who want design control without losing Shopify's commerce infrastructure

**For open-source:** The GitHub repo (`https://github.com/dariazhao/Little-Pines`) is the home for code, curriculum, and safety protocols. The Webflow site links to it from the `/open-source` page. Since the repo is currently empty, the website can pre-announce it with the URL and a note that first commits are coming — building anticipation in the developer/researcher community. *The timing of the first commit matters: it should be meaningful, not a placeholder.*

**Domain:** Secure `littlepinesstudio.com` as canonical. Redirect any variations.

---

## Part VI: Decisions Pending Your Approval

1. ~~Character~~ **Confirmed:** Bear cub from the logo, real alpaca fur.

2. **The hero headline** — which lands?
   - *"A quiet friend who sits with your child through big feelings."*
   - *"The first screen-free emotional literacy coach for ages 3 to 7."*
   - *"Helping young children find words for what they feel."*
   - Something else from the concept paper?

3. ~~Illustration direction~~ **Confirmed:** Woodcut/linocut system, bear from logo as the character. Commission is the critical path.

4. ~~Typography~~ **Recommendation:** Canela (Display) + Neue Montreal. Pending your sign-off.

5. **Open-source page:** Repo pre-announced now, or wait for first commit? (I'd vote: pre-announce the URL now, commit something meaningful — even just a README and the safety protocol framework — before site launch.)

6. **Educator page:** Actual pilot program with a form, or "reach out" placeholder?

7. **Alpaca sourcing:** What's the specific fiber grade (baby alpaca? royal alpaca?) and origin? This determines the materials copy precision — the most powerful sentence in the product description.

---

*Next step: illustration commission (critical path), then Webflow build, then copy finalization.*
