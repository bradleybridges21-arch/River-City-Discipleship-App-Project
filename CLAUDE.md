# CLAUDE.md — River City Discipleship App

> Read this first, every session. These are the standing rules for the whole project.

## What we're building

A discipleship app for River City Church — helping a leader walk with 8–12 people,
and helping every disciple walk with God and with each other toward Jesus.
**Everyone is both a disciple and a disciple-maker.** Three pillars:

- **Know Christ** — the Word, teaching, the catechism and creeds
- **Seek Christ** — prayer, fasting, the private daily walk
- **Imitate Christ** — obedience, and discipling the next person

This is the PILOT: one church, one or two real groups, one season.

## THE NON-NEGOTIABLES (never violate — if a feature would break one, STOP and flag it)

1. **The inner room is private.** `journal_entries` readable ONLY by owner.
   Enforced at the database layer with RLS. No leader, pastor, or admin can ever read them.
2. **Nothing is scored.** No streaks, tallies, counts, points, or leaderboards — ever.
3. **Anything leaving the inner room is opt-in and owner-initiated.**
4. **Point to people, never replace them.** No AI chatbot. No generated spiritual content.
5. **The Holy Spirit is the Teacher.** The app surfaces Scripture; it never speaks as the teacher.
6. **Grace, not performance.** Design and copy always assume the user is already loved.
7. **A real-human path for anything heavy.** Crisis → real person, immediately.

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + auth + RLS)
- Deployed to Vercel, auto-deploy from GitHub

## Design language

- Background: `#f2efe8` (warm paper). Text: `#2c2824` (warm charcoal). Never stark white or pure black.
- **Plus Jakarta Sans** for all UI chrome.
- **Newsreader** (serif) for the Word — teachings, Scripture, prayers only.
- Accent: `#c0654a` (terracotta), used sparingly. Secondary: `#8f9d84` (sage).
- Soft rounded cards (`rounded-2xl`), generous whitespace, calm scroll.
- No badges, no numbered markers, no streaks.

## Key files

- `supabase/schema.sql` — run in Supabase SQL Editor to set up all tables + RLS
- `src/lib/supabase/client.ts` — browser Supabase client
- `src/lib/supabase/server.ts` — server Supabase client
- `src/middleware.ts` — auth redirect logic
- `src/components/KnowChrist.tsx` — teachings + responses
- `src/components/SeekChrist.tsx` — journal (inner room) + prayer requests
- `src/components/ImitateChrist.tsx` — obedience space (coming soon)

## Build order (current progress)

- [x] Next.js PWA scaffold
- [x] Supabase client + server + middleware
- [x] Auth page (sign in / sign up)
- [x] Home with Know / Seek / Imitate tabs
- [x] Know Christ: teaching display + response (leader-visible)
- [x] Seek Christ: private journal (owner-only RLS) + prayer requests
- [ ] Run schema.sql in Supabase — verify inner room floor
- [ ] Leader view: read responses, post teachings
- [ ] Imitate Christ: obedience invitations
- [ ] Group messaging
- [ ] Deploy to Vercel

## Don'ts

- Don't add any metric, score, streak, or leaderboard.
- Don't expose `journal_entries` to any role but the owner.
- Don't build an AI chatbot or generate spiritual content.
- Don't use stark white, pure black, or a serif for UI chrome.
- Don't ship auth/privacy changes without a manual who-can-see-what test.
