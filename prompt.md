# One-prompt PowerPoint brief: the complete Spill project

Act as an experienced presentation designer, university innovation advisor, product strategist, software architect, and academic project communicator. Build a complete, polished, editable PowerPoint presentation about **Spill**, using the project brief and slide specifications below. This is a request to create the actual presentation file, not merely to describe how someone could create it.

Present the full idea of Spill, including its intended completed product, even though the current implementation is unfinished. Explain what the application is, the problem it addresses, how it would work, why universities should consider adopting it, how trust and safety would be protected, and what remains necessary to move from a frontend prototype to a responsible university pilot.

Use this entire message as a self-contained brief. Do not ask follow-up questions. Make sensible choices where details are missing, identify material assumptions, and complete the work in one execution. Do not require a second prompt to continue, approve an outline, select a template, or generate the remaining slides.

## 1. The outcome I want

Create a presentation that makes an academic evaluator or university decision-maker understand the whole project and think: **“This addresses a meaningful gap in campus communication, and a carefully governed pilot is worth considering.”**

The deck must answer these questions clearly:

1. What is Spill, in one understandable sentence?
2. What university problem does it address?
3. Why might people hesitate to speak through existing channels?
4. Why are informal group chats and occasional surveys not always sufficient?
5. How do campus conversations become structured information that a university can use?
6. What benefits could students, teaching staff, administrators, and quality committees receive?
7. Why is pseudonymity useful, and what are its limits?
8. How would verification, moderation, reporting, and exceptional identity disclosure work?
9. What does AI help with, and which decisions must remain with people?
10. How would the university respond so that feedback leads to visible action?
11. What exists in the current prototype, and what is still planned?
12. How could the idea be adapted to different universities without treating them all as identical?
13. How would a pilot measure usefulness, safety, trust, operational workload, and fairness?
14. What technical, organizational, and privacy work is needed before a real launch?
15. What concrete next step should an interested university take?

The presentation should be persuasive because the mechanisms are clear and the proposal is credible. Do not rely on slogans, exaggerated promises, invented statistics, or generic startup language.

## 2. Audience, language, and presentation format

### Primary audience

- University leadership and faculty leadership considering a pilot.
- Academic quality committees and administrative decision-makers.
- Student representatives and campus community stakeholders.
- A bachelor's thesis evaluation committee reviewing a software project and its societal relevance.

### Secondary audience

- Teaching staff, teaching assistants, administrative staff, and potential implementation partners.
- Moderators, security reviewers, privacy reviewers, and technical evaluators who may inspect the appendix.

Assume the main audience is intelligent but does not know the project or its source code. Explain technical ideas in ordinary language before introducing technical names. Give technical reviewers enough depth in the appendix.

### Language and tone

- Write the complete presentation in professional, natural English.
- Keep the name **Spill** unchanged. Use the supplied lowercase **spill** wordmark when assets are available.
- Define unfamiliar abbreviations at first use.
- Use a confident, thoughtful tone suitable for a university project.
- Make the student experience relatable without sounding childish or sensational.
- Avoid unsupported claims that every institution has the same problems.
- Explain why the need is relevant across universities while treating adoption as a decision requiring local assessment.
- Do not invent the author's name, supervisor, degree program, department, university sponsorship, or presentation date. Omit unavailable cover metadata.

### Deck length and structure

Create **exactly 64 slides in total**:

- **Slides 1–44:** the complete main presentation.
- **Slides 45–64:** a clearly identified appendix for technical, governance, operational, and evaluation questions.

The cover counts as slide 1. Do not insert extra section divider slides or an extra closing slide outside this count. Introduce the appendix on slide 45 without adding a separate divider.

Design the main presentation for approximately **40–50 minutes**, with the appendix used selectively during questions. Include a shorter **12-slide presentation route** in the companion outline by referencing existing slide numbers. Do not create a second deck or duplicate slides for that route.

The long deck should feel like a coherent explanation, not a repeated argument stretched to fill a target. Put detail in notes and the appendix instead of crowding the main slides.

## 3. Required deliverables

### Essential deliverable

Create and attach a downloadable, editable file named:

**`Spill_Complete_Project_Presentation.pptx`**

The PowerPoint must include all 64 slides, consistent branding, readable layouts, speaker notes, and citations where required. Use native text, tables, charts, and explanatory diagrams where possible. Do not flatten each slide into a single image.

### Supporting deliverables

Also provide, when your tools support them:

1. **`Spill_Presentation_Outline.md`** — slide number, title, purpose, maturity status where relevant, and the recommended 12-slide route.
2. **`Spill_Presenter_Notes.md`** — the complete notes by slide, matching the notes embedded in the PowerPoint.
3. **`Spill_Sources_and_Assumptions.md`** — external references, the supplied project facts, assumptions, proposed features, and unresolved questions.
4. **`Spill_Complete_Project_Presentation.pdf`** — a PDF export, if a reliable export tool is available.

Prioritize the PPTX, complete content, and readable slides over optional exports. Do not consume the whole task building optional files while leaving the PowerPoint unfinished.

If your environment genuinely cannot generate or attach a PPTX, state that limitation accurately and provide the complete 64-slide content, notes, and visual specifications in a downloadable Markdown file. Do not claim to have created, attached, opened, rendered, or checked an artifact unless you actually did so. This is a fallback for unavailable tools, not permission to return an outline when file generation is available.

## 4. Project facts: use this as the authoritative supplied brief

The following information comes from the Spill project's documentation and frontend source. It is sufficient to create the presentation even if you cannot access the repository.

### 4.1 Product identity

Spill is a **pseudonymous campus community conversation and feedback application**. Its intended university purpose is to help people discuss real academic and campus issues, protect their public identity, keep conversations constructive, and turn recurring concerns into structured information that responsible university bodies can review.

Use this working definition:

> Spill is a verified university community where people can speak under a pseudonym, discuss campus issues, and help turn recurring concerns into structured, actionable feedback.

The full vision joins two complementary layers:

1. **The community layer:** an approachable place for campus conversations, questions, shared experiences, replies, reactions, polls, and peer support.
2. **The institutional feedback layer:** categorization, human moderation, privacy-preserving summaries, weekly and monthly reporting, and a proposed process for university response.

The current frontend communicates the community layer more strongly than the institutional reporting layer. The presentation must connect both without implying that the entire institutional workflow already exists.

The essential value loop is:

**Speak → clarify → review → discuss → identify patterns → route to responsible people → respond → show what changed.**

The last steps require university participation. Software alone cannot guarantee institutional action or trust.

### 4.2 Initial university context

The project documents initially target **UPT — Universitatea Politehnica Timișoara**, in Romania.

- Treat UPT as the initial design context and a possible pilot setting.
- Do not imply that UPT has commissioned, endorsed, deployed, funded, or formally approved Spill.
- Do not imply that real UPT credentials are already integrated.
- Do not state that a pilot has taken place or that any committee already receives reports.
- Explain that other universities could adapt the same core approach to their own structures, languages, policies, and identity systems.

### 4.3 Main user groups

The documented groups are:

- Students.
- Teachers and other teaching staff.
- Teaching assistants.
- Administrative staff.
- Quality Committee members.
- Administrative Bureau members.

For other universities, use generic equivalents such as academic quality team, faculty administration, student services, facilities team, and institutional leadership. Student representatives and independent oversight roles can be proposed governance participants, but are not confirmed current partners.

### 4.4 Documented issue categories

The institutional feedback concept includes:

- Teaching quality.
- Exams and grading.
- Administrative problems.
- Infrastructure issues.
- Safety concerns.
- Communication problems.

Explain each with a neutral, realistic example. Avoid accusing a real person, faculty, or institution of wrongdoing.

The current social prototype also uses broader demo topics such as **campus life**, **relationships**, **small wins**, and **questions**. These show the community interaction concept; they are not a finalized university issue taxonomy.

Make this distinction explicit: not every conversation should become an institutional complaint. Ordinary community discussion and formal feedback need clear boundaries, routing, and user expectations.

### 4.5 Intended end-to-end architecture

The documented intended sequence is:

1. A person signs in using a university verification process.
2. The backend checks membership in the university community.
3. The system creates or loads an app-facing pseudonymous identity.
4. The person writes a post.
5. AI assists with relevance, clarity, toxicity signals, and categorization.
6. Accepted posts appear in the appropriate feed.
7. Sensitive content can enter manual review.
8. Weekly and monthly reports summarize structured feedback without publicly exposing authors.

The verification mechanism remains a design decision. Possible approaches include university single sign-on or verified institutional email. Do not describe either as already implemented or imply that Spill should collect a university password directly.

### 4.6 Planned AI assistance

The AI concept includes:

- Checking whether a submission belongs in the university issue channel.
- Checking whether it is specific and understandable enough to be useful.
- Suggesting clearer wording for vague posts.
- Detecting possible spam, toxicity, threats, identifying details, and sensitive accusations.
- Suggesting a category.
- Helping prepare weekly and monthly summaries.

These are **planned capabilities**, not a deployed AI system or measured model performance.

The documentation includes examples such as a vague complaint needing a rewrite and a safety concern needing sensitive review. Preserve the intended function while refining the product logic:

- A personal relationship post may be unsuitable for the institutional issue channel but may belong in a permitted community space.
- A post does not become true merely because AI accepted its language.
- A critical statement about teaching or administration must not be rejected simply because it is negative.
- A threat or immediate safety concern needs human escalation and appropriate emergency guidance, not just a classification label.
- A rewrite should preserve the author's meaning and require the author's approval before publication.

### 4.7 Reporting model

The planned **weekly report** is for the Quality Committee and includes:

- Issue counts by category.
- Frequent problems.
- Carefully anonymized examples.
- Emerging concerns.

The planned **monthly report** is prepared with committee involvement and goes to the Administrative Bureau. It includes:

- Trends over time.
- Major recurring issues.
- Possible improvements.

Explain these as intended workflows. They are not currently produced by a working backend.

A complete response loop, action ownership, user-visible progress, and resolution tracking are sensible **proposed extensions**. They should be included in the full product vision and labeled accordingly.

### 4.8 Identity protection and exceptional disclosure

The project proposes protecting identity by default while retaining a private account relationship for serious safety or abuse cases.

The documented **three-key reveal mechanism** means:

- Three different responsible people each hold an approval role.
- Exceptional identity reveal requires all three approvals.
- A specific reason must be recorded.
- Every action is logged.
- Revealed identity is available only to authorized roles.

Present this as a **planned three-person authorization workflow**. The term “three-key” does not establish that cryptographic key splitting, secret sharing, threshold encryption, or a completed security system exists.

The public promise must be precise:

> Other users see a pseudonym or anonymous posting mode; verified account information is private and subject to restricted access and a defined exceptional disclosure process.

Do not promise absolute anonymity, untraceability, immunity from every legal obligation, or protection that has not been technically enforced.

Propose separate protected identity storage, narrowly scoped access, separation of duties, tamper-resistant audit records, notification rules, conflict-of-interest handling, and oversight as requirements for a real deployment. Keep these distinct from implemented facts.

Do not imply that three approvals automatically make disclosure ethical or lawful. The justification, authority, proportionality, and applicable obligations need review. Any legally necessary exception to the intended unanimous workflow must be explicitly governed rather than silently bypassing the privacy promise.

### 4.9 Current implementation state

Use **8 October 2026** as the supplied project snapshot date, unless attached newer project evidence clearly supersedes it. This date describes the brief, not a verified launch or audit date.

The repository currently contains a **working frontend prototype**. Backend/API work is intentionally deferred. It is not a production-ready university platform.

The documented frontend stack is:

- Next.js 16.
- React 19.
- TypeScript.
- CSS Modules.
- Local fixtures and client-side state.
- Browser `localStorage` for some prototype persistence.

The implemented frontend routes include:

- `/` — public landing page.
- `/login` and `/register` — frontend-only authentication screens and validation.
- `/feed` — feed and post composer.
- `/post/[id]` — conversations and threaded replies.
- `/explore` — supporting discovery surface.
- `/activity` — activity surface.
- `/saved` — saved posts.
- `/profile` — profile surface and editing.
- `/settings` — user preference controls.
- `/admin` — frontend-only moderation queue demonstration.
- `/community-rules`, `/privacy`, and `/terms` — draft public trust pages.

Implemented prototype behavior documented in the roadmap includes:

- Responsive desktop and mobile web layouts.
- Light/dark theme persistence with system preference support.
- Local creation of posts and replies.
- Post-specific nested reply relationships.
- Reply sorting, reaction state, and deletion that preserves child replies.
- Reactions and bookmarks within the local demonstration.
- Local photo selection, preview, and removal.
- Poll editing and locally persisted vote state.
- Content notes.
- Profile editing and local profile persistence.
- Exclusion of anonymous posts from public profile content in the prototype.
- Missing/deleted conversation states.
- Versioned local storage and migration handling.
- Moderation interface interactions using sample reports.
- Loading, empty, error, and feedback states.
- Brand assets, component tests, and desktop/mobile browser test coverage.

The roadmap records build, lint, type-check, component/unit tests, and browser tests. Report that verification exists; do not present previously recorded passing checks as if you just reran them. You may mention the documented counts in the appendix only if useful, with their source and snapshot context.

Important caveats:

- A visible screen is not proof of complete server functionality.
- Login and registration are not real university authentication.
- Local content is not shared between real users through a backend.
- Local browser storage is not a university database or a secure identity vault.
- Locally limiting a poll vote is not server-enforced one-person-one-vote protection.
- The moderation screen is not a secured production moderation service.
- Policy pages are draft interface content, not proof of privacy compliance.
- Fixture likes, replies, poll votes, topic counts, sample reports, and seeded activity are demonstration data, not real adoption or impact metrics.

### 4.10 Known unfinished frontend work

The roadmap identifies remaining refinements such as:

- Connecting the anonymous-by-default preference to composers.
- Persisting activity read/unread state and deriving badges from it.
- Adding report reasons and reviewable local report records.
- Making mute/block preferences reversible from settings.
- Confirming whole-post deletion.
- Completing account-recovery frontend screens.
- A further accessibility pass across tabs, menus, dialogs, focus, and themes.
- Final frontend sign-off before backend implementation.

Do not turn the main deck into a bug list. Use these details to make the implementation-status slide honest, and reserve detail for the appendix.

### 4.11 Planned technical foundation

The documented recommended direction is:

- A NestJS API in `apps/api`.
- PostgreSQL for persistent data.
- Prisma for schema, migrations, and database access.
- A typed API contract and client.
- Secure sessions, with the exact session strategy still to be finalized.
- S3-compatible object storage for uploaded images.
- Redis only when justified for rate limits, revocation, queues, or caching.
- A possible Expo/React Native mobile application after the responsive web MVP.
- Shared types, validation, API contracts, and design tokens where appropriate.

These are recommendations and scaffolds, not a completed backend.

The planned production work includes authentication, authorization, database migrations, shared persistence, uploads, search, notifications, reports, audited moderation, security controls, testing, CI, staging/production environments, monitoring, incident handling, and verified backups.

The intended institutional reporting, AI review, and three-person identity disclosure modules are central to the full concept and require explicit implementation work. Do not silently assume that a generic social API roadmap already delivers them.

### 4.12 Existing branding

The visual identity includes:

- White: `#FFFFFF`.
- Lavender-white supporting background: `#F7F6FF`.
- Main ink text: `#111019`.
- Muted ink: `#6D687D`.
- Soft border: `#DDD9E8`.
- Primary coral: `#FF514A`.
- Pressed/darker coral: `#E63E3A`.
- Secondary violet: `#6C4BF4`.
- Soft violet: `#EEEAFF`.
- Sparse lime accent: `#D9FF63`.
- Success green: `#16885F`.

The style uses an expressive serif for display typography, a clean warm sans serif for body text, open layouts, a coral droplet motif, and sparing hand-drawn accents.

Existing marketing language includes:

- “Say what everyone's thinking.”
- “Pseudonymous by default. Human by design.”
- “Keep it real. Keep it kind.”

Use these selectively as brand language. The university story needs a more specific subtitle, for example **“Honest campus conversations. Structured university feedback.”**

## 5. Source handling and research rules

### 5.1 Evidence hierarchy

Use this hierarchy:

1. Supplied project facts and any newer attached project files.
2. Actual attached screenshots and source assets for the current interface.
3. Credible external research for general university communication and participation context.
4. Explicitly labeled proposed designs, assumptions, examples, and pilot hypotheses.

Do not use external research to rewrite the project's actual implementation state. Do not use old setup instructions in a scaffold README to contradict newer root documentation or actual source code.

If repository access is available, prioritize `README.md`, `what_is_next.md`, `docs/product.md`, `docs/architecture.md`, `docs/ai-moderation.md`, `docs/reporting.md`, `docs/security-and-anonymity.md`, and `docs/design/system.md`. Inspect actual frontend code only as needed to confirm features. Do not alter application code.

### 5.2 External research

If browsing is available, perform a focused research pass to strengthen the institutional case. Seek approximately **6–10 credible sources**, favoring primary research, official education organizations, university guidance, and official privacy or accessibility material.

Useful research themes include:

- Student voice and participation in quality improvement.
- Psychological safety and the willingness to express concerns in hierarchical environments.
- Feedback mechanisms and closing the feedback loop.
- Limitations of self-selected online feedback and survey participation.
- Risks of anonymous or pseudonymous online communication.
- Human oversight and uncertainty in automated content moderation.
- Applicable data protection principles in a European university setting.
- Digital accessibility and inclusive participation.

Do not force a statistic into the deck. A clear sourced explanation may be more useful than a poorly transferable number. Distinguish evidence about anonymous communication generally from evidence about Spill specifically.

For any external number, give the population, context, year, unit, and source. Do not extrapolate a study from one university or country into a universal claim.

For legal or regulatory statements, consult authoritative current material if available and keep the deck at the level of design considerations. Do not declare compliance, a lawful basis, controller roles, or a legally approved disclosure procedure without an actual assessment.

If browsing is unavailable, use qualitative explanations grounded in the supplied concept. Do not invent citations, article titles, authors, research findings, market sizes, or usage figures. State in the sources document that external research was unavailable.

### 5.3 Required factual distinctions

Use consistent language to distinguish:

- **Implemented prototype:** directly demonstrated frontend behavior.
- **Planned capability:** documented intended functionality that is not complete.
- **Proposed extension:** your recommendation for the full product or pilot.
- **Illustrative example:** fictional content created to explain a workflow.
- **Research-supported context:** a general claim supported by an external source.
- **Pilot hypothesis:** an expected effect to be measured, not a proven benefit.

Use small visible qualifiers when the distinction affects interpretation. Explain the full context in notes. Do not cover every slide in repeated status labels when a clear section context is sufficient.

Never invent real users, testimonials, committee decisions, security audits, partnerships, institutional endorsements, funding, retention rates, AI accuracy, resolved complaints, or time savings.

## 6. The central argument about university adoption

The presentation should make a substantive case for why a platform like Spill could be useful across universities. Avoid the simplistic assertion that every university must install the same application.

Develop the argument through the following mechanisms.

### 6.1 Universities need more than one way to hear concerns

People can already use surveys, representatives, email, support services, formal complaints, and informal chats. These channels matter and should continue to exist. Spill proposes an additional ongoing channel with community discussion, identity protection, structure, and response visibility.

Explain the different roles of each channel. A formal grading appeal requires a formal process; a recurring scheduling concern may benefit from aggregate feedback; an immediate threat requires immediate assistance. Routing must reflect those differences.

### 6.2 Speaking can have a perceived cost

Some people may worry about embarrassment, social conflict, professional relationships, academic consequences, or being dismissed. Present these as plausible barriers that vary by context. Do not accuse a specific university of retaliation without evidence.

Pseudonymity may reduce some public exposure. Clear governance, fair moderation, and a credible response process matter just as much.

### 6.3 Individual experiences can reveal recurring patterns

One account may be incomplete or isolated. Multiple independent submissions can help identify a pattern worth reviewing. Similar posts are a signal for investigation, not proof that every allegation is true.

Discuss duplicate reports, selection bias, coordinated behavior, and the possibility that quiet groups remain underrepresented. More posts do not necessarily mean a higher incidence of problems.

### 6.4 Constructive structure can improve usefulness

Useful feedback describes the issue, context, effect, and possible improvement. AI-assisted clarification and a consistent taxonomy could help people express concerns without requiring them to write a formal report from scratch.

The original statement and the author's meaning must be preserved. Frustration should not be filtered out simply because it is emotionally expressed.

### 6.5 Universities need a response process

Data collection without action may weaken trust. Propose clear responsibility, acknowledgements, progress states, report review, and public explanations of what can or cannot change.

Show that **responsible participation by the institution is a prerequisite**, not an automatic product feature.

### 6.6 Adaptation makes the concept relevant across institutions

A large research university, a smaller teaching institution, an institution with multiple campuses, and a commuter-focused university may have different needs. Adapt membership rules, categories, languages, moderation staffing, routing, and integration accordingly.

Make the transferable proposition clear: a university community may benefit from a trusted way to express concerns, identify patterns, and see responses. The pilot should establish whether Spill is the appropriate tool for that institution.

## 7. Product boundaries and responsible framing

### 7.1 Community discussion versus institutional feedback

Explain a proposed separation between:

- A community conversation space for appropriate everyday campus discussion.
- An issue submission path for structured university feedback.
- A private or restricted path for sensitive cases.
- Formal institutional processes for matters needing official adjudication.

The boundary design is a proposal. The current frontend's topics do not already enforce this structure.

Do not present irrelevant-post rejection as a rule that automatically bans every personal experience. Relevance depends on the channel and whether the content concerns university life.

### 7.2 Student and staff value

Describe possible benefits such as easier question asking, discovering shared concerns, reduced public exposure, understandable issue status, constructive peer responses, and a clearer path to responsible offices.

For teaching staff, explain the possibility of contextual feedback and better understanding of recurring difficulties. Do not promise public popularity rankings, individual performance scoring, or automatic judgments about teaching quality.

### 7.3 Institutional value

Potential value includes organized feedback, visibility into recurring issues, contextual examples, better triage, cross-team coordination, and more transparent communication about responses.

These are expected benefits to validate. Do not describe them as proven savings or guaranteed improvement.

### 7.4 Safety and fairness

Discuss harassment, identity exposure, false allegations, brigading, spam, misleading summaries, privacy leaks, bias, and institutional misuse. For each, connect the concern to a practical control and a remaining limitation.

Explain that criticism of an institution should remain possible. Moderation should evaluate abuse, privacy, relevance, and threats rather than protect the institution from discomfort or embarrassment.

### 7.5 Emergency and formal-process boundaries

Spill must not be positioned as an emergency service, a replacement for professional support, a legal adjudicator, or the only way to make an official complaint.

Propose prominently available university-approved emergency and support routes. Do not invent a staffed 24/7 response service or a guaranteed moderation response time.

For serious allegations, show appropriate restricted review and referral instead of automatic public publication or automatic identity disclosure.

## 8. Visual design direction

Create a high-quality 16:9 presentation with a calm academic tone and recognizable Spill identity.

### 8.1 Overall art direction

- Use predominantly white or very light backgrounds.
- Use coral and violet for emphasis and meaningful distinctions.
- Use lime sparingly; do not use it for small text.
- Keep main text dark and readable.
- Use an expressive serif for a few major headings if a suitable font is available, paired with a clean sans serif for body text.
- Prefer dependable fonts if font availability or portability is uncertain.
- Keep margins generous and align elements consistently.
- Use occasional dark backgrounds only when they serve a clear narrative purpose.
- Avoid overdesigned gradients, heavy shadows, decorative 3D shapes, and repetitive card grids.
- Keep the cover minimal, with the project name and a specific subtitle.

### 8.2 Layout variation

Use content-appropriate variation:

- A clear statement with a relevant visual.
- A screenshot with two or three readable callouts.
- A before/after example.
- An editable process diagram.
- A restrained comparison table.
- A stakeholder value map.
- A roadmap or responsibility flow.
- A few short bullets where a list is genuinely useful.

Do not use the same “title plus three cards” composition for every slide. Do not turn the presentation into a dashboard. UI screenshots are appropriate when showing the product; the surrounding presentation should remain clean.

### 8.3 Readability

- Cover title: usually at least 42 pt.
- Slide titles: usually 30–36 pt or larger.
- Main body: normally 20–24 pt; avoid dropping below 18 pt.
- Supporting citations and necessary qualifiers: legible and unobtrusive.
- Keep most slides under approximately 50–65 visible words, excluding citations and essential diagram labels.
- Use three to five short points at most when bullets are needed.
- Use speaker notes for background, caveats, and technical explanation.
- Break large appendix tables across the assigned slides or simplify them rather than making text unreadable.
- Preserve contrast; coral or muted text on a pale background may need a darker variant for readability.

### 8.4 Assets and screenshots

If project files are attached, look for:

- `long_logo.png` and `compact_logo.png`.
- `apps/web/public/brand/spill-long-light.png` and `spill-long-dark.png`.
- `apps/web/public/brand/spill-compact-light.png` and `spill-compact-dark.png`.
- `docs/design/spill-landing-concept.png`.
- `docs/design/spill-feed-concept.png`.
- `docs/design/spill-mobile-flow-concept.png`.
- Dark-theme concept counterparts.

Use actual brand assets without distorting their proportions. If you can access the running frontend or supplied screenshots, prefer current interface screenshots for implemented features.

Concept images are design references, not proof of completed functionality. A newly created screen for reporting, identity approvals, institutional status tracking, or AI assistance must be visibly identified as a **concept** or **proposed interface**.

If assets are unavailable, use a simple text wordmark and describe or create clearly labeled concept visuals. Do not claim to have used files you could not access. Avoid depending on missing screenshots to make a slide understandable.

Source decorative images from trustworthy sources or generate suitable illustrations if your tools support it. Do not use generated campus imagery as evidence of a real university, person, event, or deployment. Keep factual diagrams, tables, and charts editable.

Do not fabricate charts showing adoption, improved trust, reduced complaints, or model performance. Prefer qualitative diagrams and metric definitions. Any demonstration dataset must be explicitly marked **illustrative, not measured Spill data**.

### 8.5 Motion and accessibility

Use minimal, optional transitions. The presentation must remain understandable without animation. Include helpful alt text for meaningful visuals when supported. Do not use color as the only way to communicate implementation status, approval state, or risk severity.

## 9. Detailed slide-by-slide specification

Follow this 64-slide sequence. You may improve titles for clarity while preserving every slide's purpose, required content, and factual distinctions.

For each slide, create:

1. A concise, informative title.
2. Carefully edited visible content.
3. A visual that explains the subject, where useful.
4. Speaker notes that expand on the point rather than repeat the slide word for word.
5. Relevant sources and qualifiers.

### Main presentation — slides 1–44

#### Slide 1 — Spill

**Purpose:** Introduce the project clearly and establish its university relevance.

Use the project name and a subtitle such as **“Honest campus conversations. Structured university feedback.”** Keep the cover restrained. A small secondary phrase can identify it as a university platform concept with a working frontend prototype. Do not include invented author details or endorsement marks.

**Visual direction:** Supplied Spill wordmark or a clean text treatment, generous space, and a restrained coral accent.

**Notes:** Give a concise opening explanation: the project seeks to make it easier to speak, easier to understand recurring issues, and easier to connect feedback with a response.

#### Slide 2 — The project in one minute

**Purpose:** Give the audience the complete idea before detailed explanation.

Show the community layer, structured feedback layer, and university response layer. State who uses it and why public identity protection matters. Make clear that the current deliverable is a frontend prototype and the complete system is the intended direction.

**Visual direction:** A simple editable three-stage overview with one phrase per stage.

**Notes:** Explain how this overview connects the existing social interface to the full institutional vision. Avoid suggesting that all layers are deployed.

#### Slide 3 — Campus experiences that are hard to raise

**Purpose:** Make the problem concrete through everyday examples.

Use neutral scenarios such as unclear exam instructions, a delayed administrative response, inaccessible classroom equipment, or contradictory schedule announcements. Include a useful positive example, such as an effective explanation students want repeated.

**Visual direction:** A short narrative or restrained campus illustration with clearly labeled fictional examples.

**Notes:** Explain that these examples represent possible use cases, not documented allegations about UPT. Some need information sharing; others need a responsible office.

#### Slide 4 — Barriers to speaking

**Purpose:** Explain why relevant feedback may remain private or fragmented.

Cover perceived social exposure, power differences, uncertainty about where to report, and doubt that anything will happen. Treat these as context-dependent barriers. Use external research where available without claiming that it measures Spill users.

**Visual direction:** A simple barrier-to-participation diagram.

**Notes:** Explain that identity protection alone is insufficient: governance, accessibility, and visible responses influence trust.

#### Slide 5 — Existing feedback channels

**Purpose:** Show the current communication landscape fairly.

Compare surveys, representatives, email/support offices, formal complaints, and informal group chats. Identify strengths and common limitations. Avoid claiming that universities have no channels or that every existing tool is ineffective.

**Visual direction:** A readable editable table using qualitative descriptors rather than unsupported ratings.

**Notes:** Explain where Spill complements these channels and where a formal process should remain authoritative.

#### Slide 6 — The gap Spill aims to address

**Purpose:** Define the problem the project is specifically designed to solve.

Explain the need for ongoing participation, manageable identity exposure, structured issue information, and visible follow-up. Distinguish this gap from the need for another general social network.

**Visual direction:** A clear comparison between scattered feedback and an organized feedback loop.

**Notes:** State that the significance of this gap must be confirmed in a local needs assessment before adoption.

#### Slide 7 — Relevance across universities

**Purpose:** Address why the idea could matter in many institutions.

Connect recurring institutional needs: hearing community experiences, understanding patterns, coordinating responses, and communicating outcomes. Explain that institution size and local systems change the implementation, rather than removing the need to listen.

**Visual direction:** A restrained map of common needs with examples of different university contexts.

**Notes:** Make the case for assessment and a pilot, not universal mandatory adoption. Do not invent a market-size statistic.

#### Slide 8 — The community behind the platform

**Purpose:** Identify users and their different needs.

Show students, teaching staff, teaching assistants, administrators, and quality/leadership bodies. Keep discussion participants separate from those with moderation or report-review responsibilities.

**Visual direction:** A stakeholder map with readable role labels.

**Notes:** Explain why staff also benefit from constructive feedback and why institutional power differences require safeguards.

#### Slide 9 — Spill's proposed value

**Purpose:** State the product's promise in specific terms.

Explain four mechanisms: verified membership, protected public identity, constructive conversation, and structured reporting with a proposed response loop. Use “aims to” or “could” where outcomes are unproven.

**Visual direction:** A single coherent mechanism diagram, not a set of generic marketing panels.

**Notes:** Connect every claimed benefit to a feature or governance process that could produce it.

#### Slide 10 — Community conversation and institutional feedback

**Purpose:** Resolve the relationship between social engagement and formal feedback.

Present everyday campus discussion, structured issue submission, and restricted sensitive-case routing as distinct proposed paths. Explain that informal posts do not automatically become formal complaints or evidence of misconduct.

**Visual direction:** An editable routing diagram with clear boundaries.

**Notes:** Acknowledge the current prototype's broader demo topics and explain the proposed university-specific channel design.

#### Slide 11 — The full user journey

**Purpose:** Make the complete experience understandable from the user's perspective.

Show verification, pseudonymous identity, composing, clarity assistance, review, conversation, and status/response. Visibly distinguish the frontend demonstration from planned server and institutional steps.

**Visual direction:** A horizontal journey with short labels and a limited number of stages.

**Notes:** Explain that the proposed final stages depend on both backend development and agreed university operations.

#### Slide 12 — Verified membership

**Purpose:** Explain how the community can be campus-specific without exposing identity publicly.

Discuss institutional single sign-on or email verification as options. Show that membership verification and public display identity serve different purposes. Do not imply a confirmed UPT integration.

**Visual direction:** Separate private verification and public pseudonym views.

**Notes:** Explain that sharing a university password with Spill should not be assumed and that staff/student eligibility rules need local decisions.

#### Slide 13 — Pseudonymity and anonymity

**Purpose:** Make the privacy promise understandable and accurate.

Define an account identity, a public pseudonym, and anonymous posting mode. Explain what other users do and do not see. State that the backend would retain a protected account relationship.

**Visual direction:** A simple data-access boundary diagram.

**Notes:** Discuss contextual re-identification and metadata risks. Avoid the phrase “completely anonymous” unless explaining why it is an inaccurate promise.

#### Slide 14 — The current product experience

**Purpose:** Show tangible progress and the implemented interface.

Use a current feed screenshot or a clearly identified supplied design reference. Explain the feed, navigation, and primary actions. Make the frontend-only nature visible where necessary.

**Visual direction:** One large interface image with two or three callouts.

**Notes:** Explain that fixture counts and sample users illustrate behavior rather than real community activity.

#### Slide 15 — Creating a spill

**Purpose:** Explain the low-friction contribution flow.

Show text entry, posting identity choice, optional photo, poll, and content note. Separate local implemented input behavior from planned upload, AI, and backend persistence.

**Visual direction:** A composer screenshot or labeled concept sequence.

**Notes:** Explain the goal of helping people describe an issue with enough context while avoiding unnecessary identifying details.

#### Slide 16 — Conversations and participation

**Purpose:** Show how feedback can develop through discussion.

Cover threaded replies, reactions, saved posts, and polls. Explain how discussion adds context and helps users discover shared experiences. Make clear that popularity is not proof of truth or a proxy for seriousness.

**Visual direction:** A thread screenshot and a small explanation of the participation loop.

**Notes:** Explain local state limits and the need for server-side authorization and vote constraints in a real system.

#### Slide 17 — Designed for everyday access

**Purpose:** Show usability and inclusive access as adoption factors.

Present responsive desktop/mobile web behavior, theme options, readable interactions, and remaining accessibility work. Distinguish a responsive website from a released native mobile app.

**Visual direction:** Desktop and mobile views with a concise accessibility note.

**Notes:** Discuss low-bandwidth access, keyboard use, assistive technology, and language needs as production design requirements.

#### Slide 18 — Structured issue categories

**Purpose:** Explain how unstructured experiences become reviewable information.

Present the six documented categories: teaching, exams/grading, administration, infrastructure, safety, and communication. Add one short neutral example for each, with details in notes.

**Visual direction:** A clean category list with subtle visual cues; avoid a dense six-card grid.

**Notes:** Explain overlapping categories, campus-specific taxonomies, and the distinction between allegations and verified findings.

#### Slide 19 — AI assistance in the full vision

**Purpose:** Explain the planned AI role without exaggeration.

Show clarity suggestions, category suggestions, risk signals, and summary drafts. Distinguish assistance from judgment. State that an implemented model and evaluation results do not yet exist.

**Visual direction:** An editable flow showing where assistance enters the submission/reporting process.

**Notes:** Explain uncertainty, user agency, data minimization, and human review.

#### Slide 20 — A clearer post without changing its meaning

**Purpose:** Demonstrate a useful rewrite mechanism.

Use an illustrative before/after example: “The timetable is a mess” becomes a specific description of conflicting announcements, the affected course group, and the requested clarification. Keep identifying details out of the example.

**Visual direction:** Readable before/after text with a short author-confirmation step.

**Notes:** Explain that proposed wording is not automatically published and that criticism must remain intact.

#### Slide 21 — Moderation and human oversight

**Purpose:** Explain safe handling from submission to decision.

Show ordinary publication, requests for clarification, restricted sensitive review, and escalation paths. Give moderators responsibility for context and proportionate action. Do not present AI as an investigator or final authority.

**Visual direction:** A readable decision flow using native objects.

**Notes:** Explain appeals, decision reasons, impartiality, and avoiding unnecessary identity access.

#### Slide 22 — Community safety controls

**Purpose:** Describe protections that make public discussion viable.

Cover reporting, blocking/muting, privacy rules, spam controls, and the draft community rules. Distinguish demonstrated frontend controls from production enforcement still to be built.

**Visual direction:** A product image or simple safety workflow.

**Notes:** Explain that safety controls need operational staffing, secure APIs, auditability, and response policies.

#### Slide 23 — Sensitive cases need different handling

**Purpose:** Establish boundaries for serious concerns.

Use a neutral hypothetical case involving a potential threat or exposure of private information. Show restricted review, appropriate referral, and emergency/support routes rather than immediate public publication.

**Visual direction:** A short escalation flow with a clear non-emergency-service qualifier.

**Notes:** Explain that neither AI nor a crowd decides guilt, and that urgent safety response is separate from identity-disclosure approval.

#### Slide 24 — The planned three-person identity approval process

**Purpose:** Explain a distinctive safeguard accurately.

Show a justified request, three independent approvals, narrow authorized access, and an audit record. Label it planned. Explain that it is an approval mechanism, not proof of cryptographic secret sharing.

**Visual direction:** Three separate approval steps or approvers leading to restricted access.

**Notes:** Discuss eligible reasons, conflict-of-interest safeguards, refusal outcomes, role independence, and review of legal exceptions.

#### Slide 25 — Privacy and trust by design

**Purpose:** Explain the conditions needed to earn confidence.

Show separation of identity and public content, least-privilege access, understandable notices, limited retention, and careful report anonymization. Label these as production requirements where not implemented.

**Visual direction:** A clear private/public data boundary illustration.

**Notes:** Explain that aggregation does not always prevent identification, especially in small groups or detailed quotes.

#### Slide 26 — Weekly reporting

**Purpose:** Make the documented quality-committee workflow concrete.

Show a sample report structure: categories, recurring issues, emerging concerns, anonymized examples, and recommended review items. Avoid invented data; use field names or clearly labeled illustrative content.

**Visual direction:** A legible report concept, clearly marked as planned.

**Notes:** Explain human checking of summaries, restricted sensitive content, duplicate handling, and limitations of raw counts.

#### Slide 27 — Monthly review and improvement planning

**Purpose:** Explain the documented leadership reporting path.

Show committee review, trend interpretation, recurring concerns, possible improvements, and reporting to the Administrative Bureau or local equivalent. Label action ownership and progress tracking as proposed additions.

**Visual direction:** An editable reporting and responsibility flow.

**Notes:** Explain that committee involvement and institution-specific responsibilities must be agreed before a pilot.

#### Slide 28 — Closing the feedback loop

**Purpose:** Show the proposed process that connects participation with action.

Present acknowledgement, routing, review, progress update, outcome, and a user-visible explanation. Include the possibility that a request cannot be implemented and still deserves a reasoned response.

**Visual direction:** A loop with distinct institutional ownership and user communication stages.

**Notes:** Explain why reports alone are insufficient and why clear responsibilities are necessary.

#### Slide 29 — An illustrative campus issue from start to finish

**Purpose:** Bring the whole concept together in one believable scenario.

Use a non-sensitive issue such as repeated schedule inconsistencies or broken classroom equipment. Show submission, clarification, related feedback, review, routing, and a possible update. Mark the complete scenario illustrative.

**Visual direction:** A short sequence with a visible distinction between user, system, moderator, and university actions.

**Notes:** Make no claim that this happened at UPT or that a resolution has been measured.

#### Slide 30 — Value for students

**Purpose:** Explain the personal reason to use the product.

Connect easier participation, protected public identity, useful peer responses, and clearer follow-up. Include constructive suggestions and positive experiences, not only complaints.

**Visual direction:** A student-centered journey or short use-case comparison.

**Notes:** Describe benefits as hypotheses and explain that trust must be earned through use and governance.

#### Slide 31 — Value for teaching and administrative staff

**Purpose:** Show that the system can support staff rather than merely expose them to criticism.

Explain better contextual feedback, recurring information gaps, practical improvement suggestions, and fair review before conclusions. Do not propose automatic staff rankings or public accusation lists.

**Visual direction:** A few concrete feedback-to-improvement examples.

**Notes:** Discuss staff participation, workload, the ability to respond constructively, and confidentiality.

#### Slide 32 — Value for institutional decision-makers

**Purpose:** Explain why leadership might invest attention and resources.

Connect organized recurring concerns, clearer routing, coordinated action, and transparent communication. Make the dependence on operational ownership explicit.

**Visual direction:** A problem-pattern-response map.

**Notes:** Do not promise fewer incidents or lower costs without a pilot. Explain that visible feedback may initially increase reported issues.

#### Slide 33 — Adapting Spill to different universities

**Purpose:** Address the full multi-university vision.

Show configurable identity providers, membership rules, categories, languages, committees, and escalation routes. Present separated university environments as a proposed requirement.

**Visual direction:** A common core with institution-specific configuration around it.

**Notes:** Explain tenant isolation, local ownership, and why university data should not be freely pooled into cross-campus comparisons.

#### Slide 34 — How Spill compares with alternatives

**Purpose:** Explain differentiation without unfair claims.

Compare channel types rather than making unsupported assertions about current branded competitors. Dimensions may include ongoing discussion, verified membership, public identity choice, structured reporting, formal authority, and response workflow.

**Visual direction:** A qualitative comparison table with caveats.

**Notes:** Make clear that established systems may already provide some capabilities and that integration or non-adoption can be reasonable outcomes.

#### Slide 35 — What exists today

**Purpose:** Give a credible account of implementation progress.

Show implemented frontend surfaces and local interactions. Give one concise qualifier: **working frontend prototype; shared backend, university verification, AI, and institutional reporting are not yet implemented**.

**Visual direction:** A current product screenshot beside a concise maturity summary.

**Notes:** Mention tests recorded in the roadmap without implying a new audit or a production guarantee.

#### Slide 36 — What must be built next

**Purpose:** Make the unfinished work concrete and manageable.

Group remaining work into frontend completion, API/database/authentication, production safety, AI/reporting/identity approvals, and release operations. Include institutional agreements as work alongside software.

**Visual direction:** A dependency-oriented work map.

**Notes:** Explain that the reporting and governance differentiators need their own delivery milestones.

#### Slide 37 — The proposed system architecture

**Purpose:** Explain technical feasibility in language leadership can follow.

Show web client, verified identity service, API, protected database, media storage, AI assistance, moderation, and report generation. Use different labels for current versus planned components.

**Visual direction:** An editable architecture diagram with limited technical detail.

**Notes:** Explain the recommended NestJS/PostgreSQL/Prisma direction and that final infrastructure choices remain open.

#### Slide 38 — A phased delivery roadmap

**Purpose:** Show a credible route from prototype to a working university system.

Use milestones: frontend sign-off; contracts and data model; backend/authentication; persistent community features; audited moderation; institutional reporting and AI evaluation; staging/pilot readiness; pilot learning; broader deployment assessment.

**Visual direction:** A staged roadmap based on dependencies, not invented calendar commitments.

**Notes:** Identify decision gates and optional later mobile work. Any duration must be labeled a planning assumption.

#### Slide 39 — A proposed university pilot

**Purpose:** Turn the adoption case into a small, reviewable next step.

Propose one bounded community, a needs assessment, named operational owners, explicit privacy/safety rules, user orientation, and feedback collection. Label an 8–12-week pilot duration as optional and illustrative if used.

**Visual direction:** A concise pilot sequence and responsibilities.

**Notes:** Explain that a pilot requires approval and readiness; this presentation does not authorize real deployment or data collection.

#### Slide 40 — Measuring whether Spill helps

**Purpose:** Define evidence of success without relying on vanity metrics.

Include participation coverage, useful/clear submissions, acknowledgement time, issue routing, visible response, trust feedback, moderation workload, appeal outcomes, and privacy/safety incidents. Choose a few for the slide and expand in notes.

**Visual direction:** A metric framework with definitions, not fabricated performance charts.

**Notes:** Explain baseline comparisons, selection bias, missing groups, and the limits of causal attribution.

#### Slide 41 — Resources and sustainable operation

**Purpose:** Show that a serious platform needs people and operating capacity.

Cover moderation, committee review, privacy/security support, user support, hosting, storage, and AI processing. Present institutional funding or a partnership/service model as options, not confirmed revenue.

**Visual direction:** An editable resource breakdown without invented prices.

**Notes:** Explain that human workload may dominate costs and that identity/content monetization would conflict with the trust proposition.

#### Slide 42 — Risks and adoption conditions

**Purpose:** Demonstrate responsible planning and set realistic expectations.

Address harassment, identity leaks, low trust, misleading summaries, unrepresentative participation, and lack of institutional follow-through. Pair priority risks with controls and remaining limitations.

**Visual direction:** A concise risk-control table; avoid arbitrary numeric risk scores.

**Notes:** Explain conditions for pausing, limiting, or declining a pilot if safeguards or operational ownership are inadequate.

#### Slide 43 — Academic contribution and learning goals

**Purpose:** Position the project appropriately for a thesis or academic review.

Describe the integration of a community interface, public identity protection, structured feedback, moderation, and institutional workflow as an applied software design contribution. Explain what a future evaluation could test.

**Visual direction:** A concise contribution-to-evaluation mapping.

**Notes:** Do not claim novel algorithms, completed experiments, validated outcomes, or a literature contribution without evidence.

#### Slide 44 — The case for a governed pilot

**Purpose:** End the main presentation with a concrete invitation.

Restate the core proposal in one sentence. Ask for a needs assessment, governance owner, technical/privacy review, pilot scope, and evaluation criteria. Make clear why the next step is useful and proportionate to the project's maturity.

**Visual direction:** A clean closing composition, optionally using the wordmark.

**Notes:** Provide a strong closing statement about making campus voices easier to hear and institutional responses easier to see. Avoid a generic “Thank you” slide with no substance.

### Appendix — slides 45–64

#### Slide 45 — Appendix: assumptions and open decisions

**Purpose:** Establish what remains undecided without interrupting the main story.

List the key unresolved decisions: identity integration, eligible membership, roles and oversight, channel boundaries, hosting, data retention, moderation capacity, disclosure authority, reporting ownership, and pilot scope.

**Visual direction:** A concise decision register with “decision needed” rather than invented answers.

**Notes:** Explain that a complete concept can still contain deliberate open decisions. These are inputs to responsible implementation, not proof that the idea is invalid.

#### Slide 46 — Feature maturity matrix

**Purpose:** Provide an accurate implementation inventory.

Create a readable table distinguishing implemented local frontend, remaining frontend refinements, planned backend, planned institutional modules, and proposed extensions. Include authentication, feed, replies, polls, media, reports, moderation, AI, identity approvals, and response tracking.

**Visual direction:** Native table using words and symbols as well as color.

**Notes:** Explain why frontend screens and scaffold directories are not completed services. Do not mark CI, database, native mobile, or real verification as implemented.

#### Slide 47 — Proposed role and permission model

**Purpose:** Explain access separation.

Show community members, moderators, administrators, report reviewers, and identity-approval roles. The current roadmap suggests `USER`, `MODERATOR`, and `ADMIN`; additional institutional roles are proposed refinements.

**Visual direction:** An editable permission matrix with only the most important operations.

**Notes:** Explain server-side enforcement, least privilege, conflict of interest, and why an administrator should not automatically have unrestricted identity access.

#### Slide 48 — Proposed data model

**Purpose:** Show the information foundation needed for the full idea.

Include accounts/private identity references, public profiles, communities, posts, replies, reactions, bookmarks, polls, media, notifications, reports, moderation actions, issue categories, institutional reports, reveal requests/approvals, and audit events.

**Visual direction:** A simplified editable relationship diagram with protected identity records visibly separated.

**Notes:** Explain that the Prisma schema is not complete. Avoid claiming deployed foreign keys, encryption, or audit immutability.

#### Slide 49 — Authentication and university integration

**Purpose:** Explain the principal identity choices.

Compare institutional SSO and verified university email at a qualitative level. Include session management, account lifecycle, membership changes, recovery, and suspension. Distinguish planned university verification from the prototype's mock auth flow.

**Visual direction:** An integration flow and a short trade-off table.

**Notes:** Explain that integration requires institutional support and privacy review. Do not imply email-domain verification proves ongoing enrollment in every context.

#### Slide 50 — API and persistent application state

**Purpose:** Explain the transition from local demonstration to shared service.

Show typed contracts, validated requests, authorization, database persistence, paginated retrieval, and client caching. Include posts, replies, votes, reports, and notifications as representative resources.

**Visual direction:** A client-request-server-data-response diagram.

**Notes:** Explain idempotent interactions, authorization checks, safe error handling, and why browser state cannot enforce shared safety rules.

#### Slide 51 — AI review workflow and user control

**Purpose:** Provide deeper detail on planned AI assistance.

Show policy context, minimal required input, model suggestions, uncertainty, user confirmation of rewrites, and human review of sensitive decisions. Include records of model version and decision context as proposed operational requirements.

**Visual direction:** An editable flow with distinct user, AI, and moderator responsibilities.

**Notes:** Discuss prompt injection from submitted text, invented details in rewrites, privacy-aware provider selection, and treating user content as data rather than instructions.

#### Slide 52 — Evaluating AI assistance

**Purpose:** Define how AI usefulness and harms would be measured.

Include category agreement, false positives for constructive criticism, missed dangerous content, preservation of meaning in rewrites, summary faithfulness, language coverage, subgroup performance, latency, and cost.

**Visual direction:** An evaluation plan table with metric definitions and no invented results.

**Notes:** Propose labeled evaluation samples, human review, separate test sets, disagreement handling, and a process for revising policies rather than blindly optimizing one score.

#### Slide 53 — Moderation decisions and appeals

**Purpose:** Explain fairness and accountability in enforcement.

Show reported content, context review, decision reasons, notice, proportionate action, appeal, and audit trail. Include content restoration when an appeal succeeds.

**Visual direction:** A moderation-and-appeal process.

**Notes:** Explain moderator training, escalation, consistency checks, and protecting criticism of university leadership from conflicted enforcement.

#### Slide 54 — Detailed identity-disclosure safeguards

**Purpose:** Explain the planned three-person mechanism beyond the headline.

Cover eligible requests, independent roles, unanimous approval, explicit purpose, narrow access, time limits, logs, and oversight. Distinguish ordinary content review from exceptional identity access.

**Visual direction:** A state flow: requested, under review, approved or denied, narrowly accessed, closed and audited.

**Notes:** Discuss recusals, availability, refusal handling, user notification where appropriate, and reviewed handling of legal obligations. Make clear that this is not an implemented cryptographic protocol.

#### Slide 55 — Privacy and data lifecycle

**Purpose:** Explain what responsible handling of information requires.

Show collection, use, access, reporting, retention, deletion, backups, and exceptional preservation. Include privacy notices, account rights, processor/provider assessment, and possible impact assessment as matters to review.

**Visual direction:** A lifecycle diagram with separate identity, public content, and audit/report data.

**Notes:** Discuss the applicable European setting without declaring GDPR compliance or choosing legal roles on behalf of the institution. Explain limits to deletion where justified obligations exist.

#### Slide 56 — Threats and security controls

**Purpose:** Show a proportionate security plan.

Cover account takeover, role misuse, identity correlation, tenant leakage, malicious uploads, spam/brigading, exposed logs, and AI-provider data exposure. Pair these with proposed controls such as access checks, rate limits, safe uploads, redacted logs, isolation, and monitored audit access.

**Visual direction:** A native threat-control table with qualitative priority.

**Notes:** Explain that a planned control requires implementation and verification. Do not imply a completed penetration test or “military-grade” protection.

#### Slide 57 — Reporting quality and interpretation

**Purpose:** Explain how reports avoid turning activity into misleading conclusions.

Include duplicate handling, source linkage, selection bias, uncertainty, privacy checks, denominator context, human validation, and distinction between issue mentions and unique affected people.

**Visual direction:** A report-quality checklist with one clear illustrative example.

**Notes:** Explain that likes and post counts are not prevalence estimates and that summaries must preserve disagreement and minority concerns.

#### Slide 58 — A proposed issue response model

**Purpose:** Make the extension for institutional action precise.

Define proposed states such as submitted, reviewed, routed, acknowledged, in progress, resolved, and closed with explanation. Include responsible owner, visibility level, next update, and referral when a formal process is required.

**Visual direction:** An editable state diagram with user-visible and restricted information separated.

**Notes:** Explain that a platform status does not equal an official legal or academic finding. Avoid inventing service-level guarantees.

#### Slide 59 — Pilot operations and responsibilities

**Purpose:** Show who would do the recurring work.

Assign proposed responsibilities for platform operations, moderation, report validation, issue ownership, privacy/security review, student communication, and evaluation. Use role names rather than fictional people.

**Visual direction:** A compact responsibility table.

**Notes:** Discuss moderator workload, backup coverage, stakeholder representation, independent escalation, and communication when support is unavailable.

#### Slide 60 — Pilot evaluation and decision gates

**Purpose:** Explain how to decide whether to continue, change, or stop.

Show a baseline needs assessment, bounded pilot, mixed-method evaluation, safety review, and a continuation decision. Define minimum readiness and qualitative stop/pause conditions without unsupported numerical thresholds.

**Visual direction:** A decision-gate timeline.

**Notes:** Discuss voluntary participation, sampling limitations, privacy-aware measurement, negative feedback, and avoiding incentives that maximize complaints or engagement at the expense of safety.

#### Slide 61 — Cost drivers and deployment options

**Purpose:** Provide planning detail without fictional budgets.

Show hosting, database, storage, email/identity integration, AI usage, monitoring, backups, support, and human moderation. Explain institution-hosted and managed-service options as alternatives to assess.

**Visual direction:** A qualitative cost-driver table and simple deployment-option comparison.

**Notes:** Explain the need for real workload estimates and current provider quotes before budgeting. Do not invent prices, grants, purchasing commitments, or revenue forecasts.

#### Slide 62 — Multi-university and mobile expansion

**Purpose:** Explain the longer-term vision without making it a launch dependency.

Cover tenant isolation, local governance, language/category customization, shared platform maintenance, and an optional Expo/React Native client after a successful responsive web MVP. Treat cross-campus analytics as a separately reviewed proposal.

**Visual direction:** A phased expansion map.

**Notes:** Explain that expansion should follow validated usefulness and operational capacity, and that raw university content should not be exposed to other institutions.

#### Slide 63 — Questions decision-makers are likely to ask

**Purpose:** Prepare the presenter to address difficult concerns directly.

Use concise answers to questions such as: “Will this become a place for attacks?”, “Why not use existing surveys?”, “Can leadership identify a critic?”, “Who responds?”, “What if AI gets it wrong?”, and “What exists now?” Put full answers in notes.

**Visual direction:** A restrained question-and-answer layout with very short visible answers.

**Notes:** Include additional questions about low participation, false claims, data protection, emergency handling, costs, staff fairness, and independence of moderation.

#### Slide 64 — References and project evidence

**Purpose:** Make the deck's evidence traceable.

List the most important external references and the supplied project documentation. Keep visible text readable and place full URLs, access dates where relevant, and remaining references in notes and the sources document.

**Visual direction:** Clean text, not a wall of tiny URLs.

**Notes:** Distinguish project documentation, general research, illustrative scenarios, proposed designs, and untested pilot hypotheses. If external research was unavailable, say so accurately instead of inventing a bibliography.

## 10. Speaker notes requirements

Write useful notes for every slide.

- Main slides: generally **90–150 words per slide**, with a shorter opening/closing if appropriate.
- Appendix slides: generally **80–140 words per slide**, expanding technical or governance detail where necessary.
- Include the main point, explanation, relevant caveat, and a natural transition for the main presentation.
- Make notes sound like a presenter speaking to the audience.
- Do not repeat every visible bullet word for word.
- Include external citations and source details in the relevant notes.
- Identify fictional scenarios as illustrative.
- Distinguish planned features and proposed controls from existing behavior.
- Keep production instructions, tool failures, rendering logs, and artifact-generation commentary out of presenter notes.

For the opening, explain the problem through a relatable campus experience and then introduce the proposition. For the close, return to the practical next step: a governed pilot, after readiness review, with clear owners and evaluation criteria.

## 11. Suggested content examples to adapt

Use these as optional fictional material. They are not real posts or reported events.

### Example A — Communication issue

**Initial message:** “Nobody knows when the exam is.”

**Clearer suggested message:** “Our course group received different exam dates through two channels this week. Could the faculty publish one confirmed date and identify the official channel for future changes?”

**Category:** Communication problems; possibly exams and grading.

**Possible next step:** Review the conflicting notices and route the issue to the responsible course or faculty office.

**Interpretation:** The post describes a coordination problem; it does not establish who is at fault.

### Example B — Infrastructure issue

**Initial message:** “The classroom equipment never works.”

**Clearer suggested message:** “The projector in one teaching room failed during several recent sessions, making it difficult to follow demonstrations. Could facilities check the equipment and share a maintenance update?”

**Category:** Infrastructure issues.

**Possible next step:** Gather appropriate location details through a controlled form and route the maintenance request. Avoid publishing unnecessary class schedules or identifying personal details.

### Example C — Constructive teaching feedback

**Message:** “Worked examples before the lab helped me understand the task. It would be useful to have a short example at the start of future sessions too.”

**Category:** Teaching quality.

**Interpretation:** Spill can capture what works well and suggested improvements, not only dissatisfaction.

### Example D — Administrative process

**Message:** “Students have received different instructions about the documents required for a routine request. Could the office publish a current checklist and explain where questions should go?”

**Category:** Administrative problems; communication problems.

**Interpretation:** A recurring information gap may be easier to resolve than individual messages suggest. Do not invent real wait-time reductions.

### Example E — Sensitive concern

**Message:** “An interaction during a campus activity made me feel unsafe, and I need to know how to report it confidentially.”

**Routing:** Restricted human review and appropriate institutional support or reporting routes. Do not publish identifying accusations automatically.

**Interpretation:** A serious report deserves attention without treating it as proven or requiring public exposure. Immediate danger needs immediate appropriate help outside the ordinary feed workflow.

### Example F — Ordinary community question

**Message:** “Does anyone know a quiet study space that stays open later during exams?”

**Routing:** Community discussion.

**Interpretation:** Ordinary helpful conversation supports the community layer without automatically entering an institutional complaint report.

## 12. Proposed pilot measurement framework

Use this framework to inform slides 39, 40, 59, and 60. Do not invent results or treat the following as finalized targets.

| Area | Useful question | Possible measure | Interpretation caution |
| --- | --- | --- | --- |
| Reach | Which groups participate? | Eligible population context and participation by appropriately broad groups | Small groups may be identifiable; avoid collecting unnecessary personal attributes |
| Contribution quality | Is feedback understandable and useful? | Human-reviewed clarity/actionability samples | Do not reward only polished language or exclude legitimate emotion |
| Institutional response | Are issues acknowledged and routed? | Time to acknowledgement, routing completeness, progress updates | A quick acknowledgement is not the same as resolution |
| Trust | Do people understand and believe the privacy promise? | Voluntary surveys and interviews | Self-selected participants may not represent non-users |
| Safety | Are harms recognized and managed? | Reports, review outcomes, appeals, privacy incidents | More reports can reflect awareness or reporting access rather than more harm |
| AI usefulness | Does assistance help without distorting meaning? | Reviewer agreement, rewrite acceptance with meaning checks, summary faithfulness | User acceptance alone does not prove accuracy |
| Workload | Can the institution sustain operations? | Moderator time, queue age, committee review effort | Automation can create additional checking work |
| Follow-through | Do users see understandable outcomes? | Status completeness and explanations for closure | The platform cannot force an institution to implement every request |

Recommend a combination of platform measures, qualitative interviews, privacy review, and operational feedback. Avoid claiming causal effects from a small uncontrolled pilot.

## 13. Scope and roadmap discipline

The presentation must not make every possible future feature sound like a requirement for the first release.

### Minimum foundations for a safe shared university pilot

- A defined community and membership verification approach.
- Real authentication and server-enforced permissions.
- Persistent posts, replies, and necessary community interactions.
- Clear public identity rules and protected account relationships.
- Functional reporting, moderation, and appropriate escalation.
- A reviewed policy and data-handling framework.
- Operational owners and a workable institutional response path.
- Accessible core flows and a reviewed interface.
- Secure uploads if media is enabled.
- Monitoring, backups, incident procedures, and tested recovery.
- Clear limits on what is public, restricted, or referred elsewhere.

### Capabilities that may be introduced cautiously after foundations

- Automated category suggestions and clarity assistance, once evaluated.
- AI-drafted reports with human checking.
- More advanced trend grouping.
- Additional media and richer polls where justified.
- Native mobile applications.
- Multi-university administration.
- Privacy-preserving comparative insights, only after separate review.

Core protections cannot be deferred simply to make a launch faster. Optional features can be deferred to reduce risk and workload.

Explain that the project roadmap currently prioritizes finishing the frontend and obtaining sign-off before backend implementation. The deck can propose subsequent stages, but it must not imply that presenting this roadmap starts development or authorizes deployment.

## 14. Writing quality requirements

Every visible sentence should help the audience understand the project or assess it.

- Prefer specific nouns and verbs.
- Use direct topic titles for explanatory slides.
- Use takeaway titles only where the slide supports the conclusion.
- Avoid repeated rhetorical questions.
- Avoid exaggerated superlatives and unsupported “first,” “only,” or “best” claims.
- Do not repeatedly say “revolutionary,” “game-changing,” “seamless,” “empowering,” “transformative,” “next-generation,” or “ecosystem.”
- Avoid treating “engagement” as an end in itself.
- Do not force all ideas into groups of three.
- Do not repeat the same adoption argument on student, staff, and leadership slides; give each a distinct reason.
- Do not fill slides with implementation folder names or internal task commentary.
- Do not repeat “not implemented” in every paragraph; establish the maturity distinction clearly and use targeted qualifiers.
- Do not hide an important limitation only in notes if the slide would otherwise mislead.
- Use plain explanations for AI, pseudonymity, aggregation, authorization, and tenant isolation.
- Keep human dignity, fair treatment, and meaningful institutional action central to the story.

Use careful benefit language. For example:

- Prefer **“could make recurring concerns easier to identify”** over **“eliminates communication problems.”**
- Prefer **“designed to protect public identity”** over **“guarantees total anonymity.”**
- Prefer **“AI-assisted category suggestions, planned”** over **“AI understands every student.”**
- Prefer **“a pilot would test whether participation and follow-up improve”** over **“proven to increase trust.”**
- Prefer **“a proposed three-person authorization safeguard”** over **“unbreakable three-key encryption.”**

## 15. Work autonomously from brief to finished artifact

Use your available presentation, file, research, and visual tools to complete the task. Follow any applicable tool requirements. Do not ask me to choose a template or supply a missing asset when a sensible fallback is possible.

Work through this sequence internally:

1. Extract the narrative and factual constraints from this brief.
2. Inspect any attached project materials that materially improve accuracy or visual fidelity.
3. Perform bounded external research if available.
4. Develop the full slide content and notes with the required 64-slide structure.
5. Establish a consistent theme using Spill's visual identity.
6. Build the actual editable PowerPoint.
7. Add citations, notes, appropriate maturity qualifiers, and alt text where supported.
8. Render or export slides for visual inspection if tools allow.
9. Inspect the deck, fix overlaps, clipping, small text, inconsistent spacing, unreadable tables, and inaccurate labels.
10. Verify that the presentation tells the complete story and does not overstate the prototype.
11. Create the companion documents and optional PDF after the essential PPTX is complete.
12. Return the finished files with a concise description.

Do not modify the Spill application, create a deployment, contact a university, email anyone, create accounts, or collect real student data. The requested action is presentation creation only.

## 16. Final quality checklist

Before delivery, verify each item below.

### Completeness

- Exactly 64 slides, with the cover included in the count.
- Slides 1–44 form a coherent main presentation.
- Slides 45–64 provide useful appendix detail.
- Every assigned slide purpose is covered.
- Speaker notes exist for every slide.
- The complete intended product is explained, not just the current frontend.
- The case for universities is specific and balanced.
- The current implementation state is accurate and clearly distinguished from plans.
- The proposed pilot has scope, ownership, readiness criteria, and evaluation.

### Accuracy

- No invented statistics, testimonials, partnerships, endorsements, launches, or pilot results.
- No sample UI counts presented as real usage.
- No claim of production authentication, secure identity storage, AI moderation, or reporting where these are planned.
- No claim that the three-person approval mechanism is already implemented or cryptographically secured.
- No unsupported assertion of privacy-law compliance.
- No fictional scenario presented as a real university incident.
- No implication that crowd support verifies an allegation.
- No unqualified promise that a platform can guarantee institutional action.
- Sources support the claims to which they are attached.

### Visual quality

- Fonts remain readable at presentation size.
- Titles, body text, diagrams, and screenshots fit without accidental overlap.
- Tables are native and readable.
- Diagram arrows and labels are clear.
- Logos are not distorted.
- Concept interfaces are identified as concepts.
- Status distinctions do not rely solely on color.
- Images are appropriate, sharp enough, and correctly cropped.
- Layouts vary naturally and maintain consistent branding.
- The main deck is not dominated by dense technical tables.

### Artifact quality

- The PPTX exists and is attached or linked through the environment's supported file mechanism.
- Text, tables, and major explanatory diagrams remain editable where possible.
- Notes and source information survive export.
- The Markdown companion files agree with the deck.
- The PDF, if supplied, is an actual usable export.
- Any unavailable export or checking step is disclosed accurately.
- No temporary build files or tool logs are delivered as presentation content.

## 17. Final response format

Lead with the downloadable **PowerPoint file**. Then provide the companion files and PDF if created. Use a short paragraph explaining that the deck covers Spill's full university vision while distinguishing the implemented frontend from planned capabilities.

Keep the final chat response concise. The detailed explanation belongs in the deck and presenter notes. Do not replace the files with a long chat summary, ask whether I would like you to generate the deck next, or stop after a partial outline.

**Create the complete presentation now, using this single prompt.**
