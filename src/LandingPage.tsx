import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   STYLES (injected as a <style> tag)
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --c-bg: #0F0D19;
  --c-bg-soft: #171424;
  --c-bg-card: #1C192A;
  --c-bg-elev: #242036;
  --c-border: #322C48;
  --c-accent: #818CF8;
  --c-accent-soft: #8B5CF6;
  --c-powder: #818CF8;
  --c-lavender: #C084FC;
  --c-text: #EEEEF8;
  --c-text-muted: #AEAAC4;
  --c-text-dim: #78728E;
  --c-amber: #FBBF24;
  --c-emerald: #10B981;
  --c-rose: #FB7185;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  font-size: 15px;
  line-height: 1.6;
  overflow-x: hidden;
}
.container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 9999px;
  font-size: 12px; font-weight: 500; letter-spacing: 0.02em;
}
.badge-accent { background: rgba(167,139,250,0.12); color: var(--c-accent); border: 1px solid rgba(167,139,250,0.2); }
.badge-emerald { background: rgba(16,185,129,0.1); color: var(--c-emerald); border: 1px solid rgba(16,185,129,0.2); }
.badge-amber { background: rgba(251,191,36,0.1); color: var(--c-amber); border: 1px solid rgba(251,191,36,0.2); }
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: 12px;
  font-size: 15px; font-weight: 600; cursor: pointer;
  border: none; text-decoration: none; transition: all 0.2s;
}
.btn-primary {
  background: linear-gradient(135deg, #7C3AED, #8B5CF6);
  color: #fff;
  box-shadow: 0 4px 16px rgba(124,58,237,0.4);
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(124,58,237,0.5); }
.btn-ghost {
  background: rgba(255,255,255,0.06); color: var(--c-text-muted);
  border: 1px solid var(--c-border);
}
.btn-ghost:hover { background: rgba(255,255,255,0.1); color: var(--c-text); }
.section-label {
  font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--c-accent); margin-bottom: 12px;
}
.section-title {
  font-size: clamp(28px, 4vw, 42px); font-weight: 700; line-height: 1.15;
  letter-spacing: -0.02em;
}
.section-sub {
  font-size: 17px; color: var(--c-text-muted); line-height: 1.7;
  max-width: 540px; margin-top: 12px;
}

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  border-bottom: 1px solid transparent;
  transition: all 0.3s; padding: 0 24px;
}
nav.scrolled {
  background: rgba(15,13,25,0.85); backdrop-filter: blur(20px);
  border-color: var(--c-border);
}
.nav-inner {
  max-width: 1120px; margin: 0 auto;
  display: flex; align-items: center; gap: 32px; height: 64px;
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo-icon {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #7C3AED, #A78BFA);
  display: flex; align-items: center; justify-content: center;
}
.nav-logo-text { font-weight: 700; font-size: 16px; color: var(--c-text); }
.nav-links { display: flex; gap: 24px; margin-left: auto; }
.nav-links a { font-size: 14px; color: var(--c-text-muted); text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: var(--c-text); }
.nav-cta { margin-left: 16px; }

/* HERO */
#hero {
  min-height: 100vh;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%),
              linear-gradient(180deg, #0F0D19 0%, #1C192A 100%);
  display: flex; align-items: center;
  padding: 120px 24px 80px;
  position: relative; overflow: hidden;
}
#hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle 600px at 70% 50%, rgba(167,139,250,0.06) 0%, transparent 70%);
}
.hero-inner {
  max-width: 1120px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
  align-items: center; position: relative; z-index: 1;
}
.hero-title {
  font-size: clamp(36px, 5.5vw, 64px); font-weight: 700;
  line-height: 1.08; letter-spacing: -0.03em; margin-bottom: 20px;
}
.hero-title .accent { color: var(--c-accent); }
.hero-title .accent-lavender { color: var(--c-lavender); }
.hero-sub { font-size: 18px; color: var(--c-text-muted); line-height: 1.7; margin-bottom: 36px; max-width: 440px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* PHONE */
.app-mockup { position: relative; }
.phone-frame {
  width: 280px; margin: 0 auto;
  background: var(--c-bg-card); border-radius: 36px;
  border: 1.5px solid var(--c-border); overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
}
.phone-notch { width: 100px; height: 28px; background: var(--c-bg); border-radius: 0 0 16px 16px; margin: 0 auto; }
.phone-screen { padding: 12px; }
.app-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.app-greeting { font-size: 13px; color: var(--c-text-muted); }
.app-greeting strong { display: block; font-size: 16px; color: var(--c-text); font-weight: 700; }
.xp-pill {
  background: rgba(167,139,250,0.15); border: 1px solid rgba(167,139,250,0.25);
  border-radius: 9999px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: var(--c-accent);
}
.app-card {
  background: var(--c-bg-elev); border-radius: 14px; padding: 12px;
  border: 1px solid var(--c-border); margin-bottom: 10px;
}
.app-card-label { font-size: 11px; color: var(--c-text-dim); margin-bottom: 4px; font-weight: 500; }
.app-card-val { font-size: 22px; font-weight: 700; font-variant-numeric: tabular-nums; }
.app-card-sub { font-size: 11px; color: var(--c-text-muted); margin-top: 2px; }
.mini-chart { display: flex; align-items: flex-end; gap: 3px; height: 36px; margin-top: 8px; }
.mini-bar { flex: 1; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, var(--c-accent) 0%, var(--c-accent-soft) 100%); opacity: 0.7; }
.mini-bar.active { opacity: 1; }
.pr-badge {
  display: inline-flex; align-items: center; gap: 4px;
  background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.25);
  border-radius: 9999px; padding: 3px 8px; font-size: 11px; font-weight: 600; color: var(--c-amber);
}
.xp-bar-wrap { background: var(--c-border); border-radius: 9999px; height: 6px; margin-top: 8px; overflow: hidden; }
.xp-bar-fill {
  height: 100%; border-radius: 9999px;
  background: linear-gradient(90deg, var(--c-accent-soft), var(--c-lavender));
  width: 62%; animation: xpfill 1.5s ease-out forwards;
}
@keyframes xpfill { from { width: 0%; } to { width: 62%; } }
.coach-bubble {
  background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.2);
  border-radius: 12px 12px 12px 4px; padding: 10px 12px;
  font-size: 12px; color: var(--c-text-muted); line-height: 1.5; margin-bottom: 10px;
}
.coach-bubble .coach-name { font-size: 11px; font-weight: 600; color: var(--c-accent); margin-bottom: 4px; }
.phone-glow {
  position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.msg-disclaimer {
  font-size: 11px; color: var(--c-text-dim);
  border-top: 1px solid var(--c-border); padding: 10px 16px;
  display: flex; align-items: center; gap: 6px;
}

/* FEATURES */
#features { padding: 96px 24px; background: var(--c-bg-soft); }
.features-header { text-align: center; margin-bottom: 60px; }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.feature-card {
  background: var(--c-bg-card); border-radius: 16px; padding: 28px;
  border: 1px solid var(--c-border); transition: border-color 0.2s, transform 0.2s;
  position: relative; overflow: hidden;
}
.feature-card:hover { border-color: rgba(167,139,250,0.4); transform: translateY(-2px); }
.feature-icon {
  width: 44px; height: 44px; border-radius: 12px; margin-bottom: 16px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(167,139,250,0.12);
}
.feature-icon svg { width: 22px; height: 22px; stroke: var(--c-accent); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.feature-icon.emerald { background: rgba(16,185,129,0.1); }
.feature-icon.emerald svg { stroke: var(--c-emerald); }
.feature-icon.amber { background: rgba(251,191,36,0.1); }
.feature-icon.amber svg { stroke: var(--c-amber); }
.feature-icon.powder { background: rgba(129,140,248,0.12); }
.feature-icon.powder svg { stroke: var(--c-powder); }
.feature-icon.lavender { background: rgba(192,132,252,0.12); }
.feature-icon.lavender svg { stroke: var(--c-lavender); }
.feature-title { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
.feature-desc { font-size: 14px; color: var(--c-text-muted); line-height: 1.65; }

/* STEPHANE */
#stephane {
  padding: 96px 24px;
  background: radial-gradient(ellipse 70% 50% at 20% 50%, rgba(124,58,237,0.1) 0%, transparent 60%), var(--c-bg);
}
.stephane-inner { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.stephane-chat {
  background: var(--c-bg-card); border-radius: 20px;
  border: 1px solid var(--c-border); overflow: hidden;
  box-shadow: 0 24px 48px rgba(0,0,0,0.3);
}
.chat-header {
  background: var(--c-bg-elev); padding: 14px 16px;
  border-bottom: 1px solid var(--c-border);
  display: flex; align-items: center; gap: 10px;
}
.chat-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, #7C3AED, #C084FC);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; color: #fff; flex-shrink: 0;
}
.chat-name { font-weight: 600; font-size: 14px; }
.chat-status { font-size: 12px; color: var(--c-emerald); display: flex; align-items: center; gap: 4px; }
.chat-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--c-emerald); display: inline-block; }
.chat-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.msg-bot {
  background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.15);
  border-radius: 12px 12px 12px 4px; padding: 10px 14px;
  font-size: 13px; color: var(--c-text); line-height: 1.6; max-width: 85%;
}
.msg-user {
  background: var(--c-bg-elev); border: 1px solid var(--c-border);
  border-radius: 12px 12px 4px 12px; padding: 10px 14px;
  font-size: 13px; color: var(--c-text-muted); line-height: 1.6;
  max-width: 85%; align-self: flex-end; margin-left: auto;
}
.msg-meta { font-size: 11px; color: var(--c-text-dim); margin-top: 4px; }
.quick-replies { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px 16px; }
.quick-reply {
  background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.2);
  border-radius: 9999px; padding: 5px 12px; font-size: 12px;
  color: var(--c-accent); cursor: pointer; transition: background 0.2s;
}
.quick-reply:hover { background: rgba(167,139,250,0.16); }
.stephane-feature { display: flex; gap: 14px; margin-bottom: 20px; align-items: flex-start; }
.stephane-feature-icon {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  background: rgba(167,139,250,0.12); display: flex; align-items: center; justify-content: center;
}
.stephane-feature-icon svg { width: 18px; height: 18px; stroke: var(--c-accent); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.stephane-feature-text .title { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
.stephane-feature-text .desc { font-size: 14px; color: var(--c-text-muted); }

/* PROGRESS */
#progress { padding: 96px 24px; background: var(--c-bg-soft); }
.progress-inner { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.levels-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 28px; }
.level-chip {
  background: var(--c-bg-card); border-radius: 10px; padding: 8px 6px;
  text-align: center; border: 1px solid var(--c-border); transition: all 0.2s;
}
.level-chip.active { border-color: var(--c-accent); background: rgba(167,139,250,0.08); }
.level-dot { width: 10px; height: 10px; border-radius: 50%; margin: 0 auto 5px; }
.level-num { font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; }
.level-name { font-size: 10px; color: var(--c-text-dim); font-weight: 500; }
.streak-card {
  background: var(--c-bg-card); border-radius: 16px; padding: 20px;
  border: 1px solid var(--c-border); margin-bottom: 16px;
}
.streak-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.streak-title { font-size: 14px; font-weight: 600; }
.streak-count { font-size: 28px; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--c-accent); }
.streak-sub { font-size: 13px; color: var(--c-text-muted); }
.week-dots { display: flex; gap: 6px; margin-top: 12px; }
.week-dot {
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--c-bg-elev); border: 1px solid var(--c-border);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 500; color: var(--c-text-dim);
}
.week-dot.done { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.3); color: var(--c-accent); }
.week-dot.today { background: rgba(167,139,250,0.25); border-color: var(--c-accent); color: var(--c-accent); font-weight: 700; }
.challenge-card { background: var(--c-bg-card); border-radius: 16px; padding: 18px; border: 1px solid var(--c-border); }
.challenge-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.challenge-desc { font-size: 13px; color: var(--c-text-muted); margin-bottom: 12px; }
.challenge-progress { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.progress-bar-wrap { flex: 1; background: var(--c-border); border-radius: 9999px; height: 6px; overflow: hidden; }
.progress-bar-fill { height: 100%; border-radius: 9999px; background: linear-gradient(90deg, #10B981, #34D399); }

/* SOCIAL */
#social { padding: 96px 24px; background: var(--c-bg); }
.social-inner { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.feed-card { background: var(--c-bg-card); border-radius: 16px; border: 1px solid var(--c-border); overflow: hidden; box-shadow: 0 24px 48px rgba(0,0,0,0.3); }
.feed-header { background: var(--c-bg-elev); padding: 12px 16px; border-bottom: 1px solid var(--c-border); font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.feed-post { padding: 16px; border-bottom: 1px solid var(--c-border); }
.feed-post:last-child { border-bottom: none; }
.post-user { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.post-avatar { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
.post-name { font-size: 14px; font-weight: 600; }
.post-time { font-size: 12px; color: var(--c-text-dim); }
.post-content { font-size: 13px; color: var(--c-text-muted); line-height: 1.6; margin-bottom: 10px; }
.post-workout { background: var(--c-bg-elev); border-radius: 10px; padding: 10px 12px; font-size: 12px; margin-bottom: 10px; display: flex; gap: 16px; }
.post-stat { text-align: center; }
.post-stat-val { font-weight: 700; font-variant-numeric: tabular-nums; color: var(--c-text); }
.post-stat-key { color: var(--c-text-dim); font-size: 11px; }
.post-actions { display: flex; gap: 12px; }
.post-action { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--c-text-dim); cursor: pointer; transition: color 0.2s; }
.post-action:hover { color: var(--c-accent); }
.post-action svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.kudos-active { color: var(--c-accent) !important; }

/* GREEN */
#green {
  padding: 96px 24px; background: var(--c-bg-soft); position: relative; overflow: hidden;
}
#green::before {
  content: ''; position: absolute; top: -100px; right: -100px; width: 400px; height: 400px;
  border-radius: 50%; background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%);
}
.green-inner { max-width: 1120px; margin: 0 auto; position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.green-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.green-stat-card { background: var(--c-bg-card); border-radius: 14px; padding: 18px; border: 1px solid rgba(16,185,129,0.15); }
.green-stat-val { font-size: 28px; font-weight: 700; color: var(--c-emerald); font-variant-numeric: tabular-nums; }
.green-stat-label { font-size: 13px; color: var(--c-text-muted); margin-top: 2px; }
.green-stat-equiv { font-size: 12px; color: var(--c-text-dim); margin-top: 4px; }
.green-feature { display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start; }
.green-feature-icon { width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0; background: rgba(16,185,129,0.1); display: flex; align-items: center; justify-content: center; }
.green-feature-icon svg { width: 16px; height: 16px; stroke: var(--c-emerald); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.green-feature-text .title { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
.green-feature-text .desc { font-size: 13px; color: var(--c-text-muted); }

/* PRIVACY SECTION */
#privacy { padding: 96px 24px; background: var(--c-bg); }
.privacy-inner { max-width: 1120px; margin: 0 auto; }
.privacy-header { text-align: center; margin-bottom: 48px; }
.privacy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.privacy-card { background: var(--c-bg-card); border-radius: 16px; padding: 24px; border: 1px solid var(--c-border); display: flex; flex-direction: column; gap: 10px; }
.privacy-icon { width: 38px; height: 38px; border-radius: 10px; background: rgba(129,140,248,0.1); display: flex; align-items: center; justify-content: center; }
.privacy-icon svg { width: 18px; height: 18px; stroke: var(--c-powder); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.privacy-title { font-size: 15px; font-weight: 600; }
.privacy-desc { font-size: 13px; color: var(--c-text-muted); line-height: 1.6; }

/* PRIVACY MODAL */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(10,8,20,0.85); backdrop-filter: blur(8px);
  overflow-y: auto; padding: 40px 20px;
  animation: fadein 0.2s ease;
}
@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
.modal-box {
  max-width: 720px; margin: 0 auto;
  background: var(--c-bg-card); border-radius: 20px;
  border: 1px solid var(--c-border); overflow: hidden;
  box-shadow: 0 32px 64px rgba(0,0,0,0.5);
}
.modal-header {
  background: var(--c-bg-elev); padding: 20px 28px;
  border-bottom: 1px solid var(--c-border);
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 1;
}
.modal-header-left { display: flex; align-items: center; gap: 12px; }
.modal-header-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(129,140,248,0.12);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.modal-header-title { font-size: 16px; font-weight: 700; }
.modal-header-sub { font-size: 12px; color: var(--c-text-dim); }
.modal-close-btn {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid var(--c-border);
  color: var(--c-text-muted); cursor: pointer; font-size: 20px;
  display: flex; align-items: center; justify-content: center;
  line-height: 1; transition: background 0.2s;
}
.modal-close-btn:hover { background: rgba(255,255,255,0.12); color: var(--c-text); }
.modal-body { padding: 28px; font-size: 14px; line-height: 1.8; color: var(--c-text-muted); }
.modal-section { margin-bottom: 28px; }
.modal-section:last-child { margin-bottom: 0; }
.modal-section-title {
  font-size: 15px; font-weight: 700; color: var(--c-text);
  margin-bottom: 10px; display: flex; align-items: center; gap: 8px;
}
.modal-section-num {
  width: 24px; height: 24px; border-radius: 6px;
  background: rgba(129,140,248,0.12);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: var(--c-powder); flex-shrink: 0;
}
.modal-list { margin-top: 8px; padding-left: 20px; display: flex; flex-direction: column; gap: 4px; }
.modal-highlight-green {
  margin-top: 10px; padding: 10px 14px;
  background: rgba(16,185,129,0.07); border: 1px solid rgba(16,185,129,0.15);
  border-radius: 10px; color: var(--c-emerald); font-size: 13px;
}
.modal-highlight-purple {
  margin-top: 10px; padding: 10px 14px;
  background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.15);
  border-radius: 10px; font-size: 13px;
  display: flex; align-items: flex-start; gap: 8px;
}
.modal-rights-grid { margin-top: 10px; display: flex; flex-direction: column; gap: 8px; }
.modal-right-row {
  display: flex; gap: 10px; padding: 10px 14px;
  background: var(--c-bg-elev); border-radius: 10px; border: 1px solid var(--c-border);
}
.modal-right-label { font-weight: 600; color: var(--c-text); white-space: nowrap; }
.modal-footer {
  padding: 16px 28px; border-top: 1px solid var(--c-border);
  display: flex; justify-content: flex-end;
}

/* CTA */
#cta-final {
  padding: 100px 24px;
  background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.15) 0%, transparent 60%), var(--c-bg-soft);
  text-align: center;
}
.cta-title { font-size: clamp(32px, 5vw, 56px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
.cta-sub { font-size: 18px; color: var(--c-text-muted); margin-bottom: 40px; }
.cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn-large { padding: 16px 32px; font-size: 16px; }
.cta-note { margin-top: 20px; font-size: 13px; color: var(--c-text-dim); }

/* FOOTER */
footer { padding: 40px 24px; background: var(--c-bg); border-top: 1px solid var(--c-border); }
.footer-inner { max-width: 1120px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.footer-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.footer-logo-icon { width: 28px; height: 28px; border-radius: 7px; background: linear-gradient(135deg, #7C3AED, #A78BFA); display: flex; align-items: center; justify-content: center; }
.footer-logo-text { font-weight: 700; font-size: 14px; color: var(--c-text); }
.footer-links { display: flex; gap: 20px; }
.footer-links a, .footer-links button {
  font-size: 13px; color: var(--c-text-dim); text-decoration: none;
  background: none; border: none; cursor: pointer; padding: 0; font-family: inherit;
  transition: color 0.2s;
}
.footer-links a:hover, .footer-links button:hover { color: var(--c-text-muted); }
.footer-copy { font-size: 13px; color: var(--c-text-dim); }

/* ANIMATIONS */
@keyframes xpfill { from { width: 0%; } to { width: 62%; } }
.fadein { animation: fadeInUp 0.5s ease forwards; }
.fadein-d2 { animation-delay: 0.2s; opacity: 0; }
.fadein-d3 { animation-delay: 0.3s; opacity: 0; }
.fadein-d4 { animation-delay: 0.4s; opacity: 0; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.float { animation: float 4s ease-in-out infinite; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hero-inner { grid-template-columns: 1fr; gap: 48px; text-align: center; }
  .hero-sub { margin: 0 auto 36px; }
  .hero-actions { justify-content: center; }
  .features-grid { grid-template-columns: 1fr; }
  .stephane-inner, .progress-inner, .social-inner, .green-inner { grid-template-columns: 1fr; gap: 48px; }
  .privacy-grid { grid-template-columns: 1fr; }
  .green-stats { grid-template-columns: 1fr 1fr; }
  .footer-inner { flex-direction: column; text-align: center; }
  .footer-links { justify-content: center; flex-wrap: wrap; }
}
@media (max-width: 900px) and (min-width: 769px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .privacy-grid { grid-template-columns: repeat(2, 1fr); }
}
`;

/* ─────────────────────────────────────────────
   ICON COMPONENTS
───────────────────────────────────────────── */
const DumbbellIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="12" r="1.5" /><circle cx="18.5" cy="12" r="1.5" />
    <path d="M7 12h10M2 10v4M22 10v4M5.5 10V8M18.5 10V8M5.5 14v2M18.5 14v2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InfoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-powder)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ─────────────────────────────────────────────
   PRIVACY MODAL
───────────────────────────────────────────── */
function PrivacyModal({ onClose }: { onClose: () => void }) {
  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={handleBackdrop}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-header-icon"><ShieldIcon /></div>
            <div>
              <div className="modal-header-title" id="modal-title">Politique de confidentialité</div>
              <div className="modal-header-sub">Dernière mise à jour : avril 2026</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">×</button>
        </div>

        {/* Body */}
        <div className="modal-body">

          <div className="modal-section">
            <div className="modal-section-title">
              <span className="modal-section-num">1</span>Données collectées
            </div>
            <p>Gym Track collecte les données suivantes dans le cadre de son fonctionnement :</p>
            <ul className="modal-list">
              <li><strong style={{ color: "var(--c-text)" }}>Données d'entraînement</strong> : séances, exercices, séries, charges, durées.</li>
              <li><strong style={{ color: "var(--c-text)" }}>Données corporelles</strong> : poids de corps (si renseigné).</li>
              <li><strong style={{ color: "var(--c-text)" }}>Données nutritionnelles</strong> : descriptions de repas, macronutriments estimés.</li>
              <li><strong style={{ color: "var(--c-text)" }}>Profil</strong> : pseudo, photo de profil, bio.</li>
              <li><strong style={{ color: "var(--c-text)" }}>Interactions sociales</strong> : commentaires, kudos, relations d'amitié.</li>
            </ul>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">
              <span className="modal-section-num">2</span>Finalité du traitement
            </div>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="modal-list">
              <li>Afficher votre historique d'entraînement et vos statistiques de progression.</li>
              <li>Alimenter le coach IA « Stéphane » avec votre contexte de performance pour des conseils personnalisés.</li>
              <li>Permettre les interactions sociales (flux d'activité, kudos, commentaires) avec vos amis.</li>
            </ul>
            <div className="modal-highlight-green">
              Aucune donnée n'est vendue, louée ou partagée avec des tiers à des fins commerciales.
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">
              <span className="modal-section-num">3</span>Stockage et sécurité
            </div>
            <p>Les données sont stockées sur <strong style={{ color: "var(--c-text)" }}>Supabase (PostgreSQL)</strong>, hébergé en Europe (AWS eu-west). Toutes les communications sont chiffrées via HTTPS/TLS. L'isolation des données est garantie par des politiques <strong style={{ color: "var(--c-text)" }}>Row Level Security (RLS)</strong> : chaque utilisateur ne peut accéder qu'à ses propres données.</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">
              <span className="modal-section-num">4</span>Intelligence artificielle
            </div>
            <p>Le coach Stéphane utilise l'<strong style={{ color: "var(--c-text)" }}>API Claude (Anthropic)</strong> pour générer des commentaires et recommandations. Vos données de séance sont transmises à l'API uniquement au moment de la génération. Anthropic ne conserve pas les données des appels API au-delà du traitement immédiat.</p>
            <div className="modal-highlight-purple">
              <InfoIcon />
              <span>Stéphane est une IA, pas un professionnel de santé. Ses conseils sont purement informatifs et ne remplacent en aucun cas l'avis d'un médecin ou d'un professionnel du sport.</span>
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">
              <span className="modal-section-num">5</span>Vos droits (RGPD)
            </div>
            <p>Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :</p>
            <div className="modal-rights-grid">
              {[
                { label: "Accès", desc: "Exportez toutes vos données (Réglages > Données > Exporter)." },
                { label: "Rectification", desc: "Modifiez votre profil et vos séances à tout moment." },
                { label: "Suppression", desc: "Supprimez votre compte et toutes vos données (Réglages > Supprimer mon compte)." },
                { label: "Portabilité", desc: "L'export JSON contient l'intégralité de vos données dans un format réutilisable." },
              ].map((r) => (
                <div className="modal-right-row" key={r.label}>
                  <span className="modal-right-label">{r.label}</span>
                  <span>{r.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">
              <span className="modal-section-num">6</span>Cookies et stockage local
            </div>
            <p>Gym Track utilise le <strong style={{ color: "var(--c-text)" }}>localStorage</strong> du navigateur pour conserver vos préférences (thème, cache de bilan, etc.) et un mode hors-ligne. Aucun cookie tiers, tracker ou pixel de suivi n'est utilisé.</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">
              <span className="modal-section-num">7</span>Contact
            </div>
            <p>Pour toute question relative à vos données personnelles, contactez le responsable du traitement via le <a href="https://github.com/gabrielorsatti/Personnal-gym-tracker" style={{ color: "var(--c-accent)" }}>dépôt GitHub du projet</a> ou par email à l'adresse indiquée dans les réglages.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 14 }} onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <a className="nav-logo" href="#">
          <div className="nav-logo-icon"><DumbbellIcon /></div>
          <span className="nav-logo-text">Gym Track</span>
        </a>
        <div className="nav-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#stephane">Coach IA</a>
          <a href="#social">Social</a>
          <a href="#green">Green IT</a>
          <a href="#privacy">Confidentialité</a>
        </div>
        <a href="https://gabrielorsatti.github.io/Personnal-gym-tracker/" className="btn btn-primary nav-cta" style={{ padding: "9px 18px", fontSize: "14px" }}>
          Installer l'app
        </a>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className="app-mockup float fadein fadein-d3">
      <div className="phone-glow" />
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="app-header">
            <div className="app-greeting">
              <span>Bonjour</span>
              <strong>Alexandre 👋</strong>
            </div>
            <div className="xp-pill">⚡ Lv.4 Athlète</div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--c-text-dim)", marginBottom: 4 }}>
              <span>Progression</span><span style={{ fontVariantNumeric: "tabular-nums" }}>1 240 / 1 600 XP</span>
            </div>
            <div className="xp-bar-wrap"><div className="xp-bar-fill" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <div className="app-card" style={{ padding: 10 }}>
              <div className="app-card-label">Volume semaine</div>
              <div className="app-card-val" style={{ fontSize: 18 }}>12 400<span style={{ fontSize: 12, fontWeight: 400, color: "var(--c-text-dim)" }}> kg</span></div>
              <div className="app-card-sub">↑ +8% vs moy.</div>
            </div>
            <div className="app-card" style={{ padding: 10 }}>
              <div className="app-card-label">Streak</div>
              <div className="app-card-val" style={{ fontSize: 18, color: "var(--c-accent)" }}>🔥 7</div>
              <div className="app-card-sub">semaines actives</div>
            </div>
          </div>
          <div className="app-card" style={{ padding: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div className="app-card-label" style={{ margin: 0 }}>Développé couché</div>
              <div className="pr-badge">🏆 PR</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>100 kg<span style={{ fontSize: 12, fontWeight: 400, color: "var(--c-text-dim)" }}> × 5</span></div>
            <div className="mini-chart">
              {[40, 55, 50, 65, 60, 75, 80].map((h, i) => (
                <div key={i} className="mini-bar" style={{ height: `${h}%` }} />
              ))}
              <div className="mini-bar active" style={{ height: "100%" }} />
            </div>
          </div>
          <div className="coach-bubble">
            <div className="coach-name">Stéphane IA</div>
            Excellente séance ! Ton volume Push est en hausse de 12% sur 4 semaines. Pense à intégrer une journée de récupération active demain.
          </div>
        </div>
        <div className="msg-disclaimer">
          <InfoIcon />
          Je suis une IA, pas un médecin.
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title fadein fadein-d2">
            Suis ta progression.<br />
            <span className="accent">Dépasse</span> tes<br />
            <span className="accent-lavender">limites.</span>
          </h1>
          <p className="hero-sub fadein fadein-d3">
            Saisie en langage naturel, graphiques de progression, records personnels et Stéphane, ton coach IA bienveillant qui te pousse toujours à faire mieux.
          </p>
          <div className="hero-actions fadein fadein-d4">
            <a href="https://gabrielorsatti.github.io/Personnal-gym-tracker/" className="btn btn-primary btn-large">
              <DownloadIcon />
              Installer gratuitement
            </a>
            <a href="#features" className="btn btn-ghost btn-large">Découvrir les fonctionnalités</a>
          </div>
        </div>
        <PhoneMockup />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
interface Feature {
  icon: string;
  variant?: string;
  title: string;
  desc: string;
}

const features: Feature[] = [
  { icon: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`, title: "Saisie en langage naturel", desc: 'Tape "3×12 Développé couché à 80 kg" ou "Course 5 km en 25 min" : l\'app comprend et enregistre instantanément.' },
  { icon: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>`, variant: "amber", title: "Records Personnels", desc: "Détection automatique à chaque sauvegarde. Célébration avec overlay trophée doré et historique 1RM via formule d'Epley." },
  { icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`, variant: "powder", title: "Graphiques de progression", desc: "Volume, intensité, allure cardio, poids de corps. Visualise tes progrès sur 12 semaines avec des courbes détaillées." },
  { icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`, variant: "lavender", title: "Feed Social", desc: "Partage tes séances, reçois des kudos ⚡ de tes amis, commente en temps réel. La progression se fête en communauté." },
  { icon: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>`, title: "Nutrition IA", desc: "Saisis un repas en langage libre : Stéphane extrait automatiquement calories, protéines, glucides et lipides." },
  { icon: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`, variant: "emerald", title: "Streaks & Challenges", desc: "Compteur de semaines actives avec badge flamme. Challenges hebdomadaires : fréquence, volume, OMS 150 min." },
];

function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className="features-header">
          <div className="section-label">Fonctionnalités</div>
          <h2 className="section-title">Tout ce qu'il faut pour progresser</h2>
          <p className="section-sub">De la saisie en langage naturel aux graphiques avancés, une app pensée pour les sportifs sérieux.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className={`feature-icon${f.variant ? ` ${f.variant}` : ""}`}>
                <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: f.icon }} />
              </div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STEPHANE
───────────────────────────────────────────── */
function Stephane() {
  return (
    <section id="stephane">
      <div className="stephane-inner">
        <div className="stephane-chat">
          <div className="chat-header">
            <div className="chat-avatar">S</div>
            <div>
              <div className="chat-name">Stéphane</div>
              <div className="chat-status">En ligne</div>
            </div>
          </div>
          <div className="chat-body">
            <div><div className="msg-bot">Salut ! J'ai analysé ta séance Legs d'hier. Ton volume total (8 400 kg) est ton <strong>record de 12 semaines</strong> 🎉</div><div className="msg-meta">Stéphane · il y a 2 h</div></div>
            <div><div className="msg-user">Super ! Tu me conseilles quoi pour la suite ?</div><div className="msg-meta" style={{ textAlign: "right" }}>Toi · il y a 2 h</div></div>
            <div><div className="msg-bot">Sur la base de ta tendance sur 12 semaines, je te suggère d'augmenter la charge au squat de +2.5 kg la semaine prochaine (surcharge progressive). Ton ratio Push/Pull est déséquilibré. Pense à ajouter une session Pull cette semaine.</div><div className="msg-meta">Stéphane · il y a 2 h</div></div>
          </div>
          <div className="quick-replies">
            {["📊 Mon bilan", "🏋️ Prochain entraînement", "😴 Récupération", "🥗 Nutrition"].map((q) => (
              <span key={q} className="quick-reply">{q}</span>
            ))}
          </div>
          <div className="msg-disclaimer"><InfoIcon />Je suis une IA, pas un médecin. Mes conseils ne remplacent pas un avis professionnel.</div>
        </div>
        <div className="stephane-content">
          <div className="section-label">Coach IA</div>
          <h2 className="section-title">Rencontre Stéphane,<br />ton coach personnel</h2>
          <p className="section-sub">Bienveillant mais exigeant : il analyse chaque séance, détecte tes patterns sur 12 semaines et te propose des ajustements concrets.</p>
          <div style={{ marginTop: 32 }}>
            {[
              { icon: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`, title: "Mémoire longue 12 semaines", desc: "Analyse les tendances volume, fréquence et top progressions pour des conseils personnalisés dans le temps." },
              { icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`, title: "Surcharge progressive", desc: "Suggère des ajustements de charges basés sur tes données réelles, pas des formules génériques." },
              { icon: `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>`, title: "Adapté à ta pratique", desc: "Muscu, cardio, yoga, cours collectifs : Stéphane adapte son discours à ton profil et tes objectifs." },
            ].map((f) => (
              <div className="stephane-feature" key={f.title}>
                <div className="stephane-feature-icon"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: f.icon }} /></div>
                <div className="stephane-feature-text"><div className="title">{f.title}</div><div className="desc">{f.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS & GAMIFICATION
───────────────────────────────────────────── */
const levels = [
  { num: 1, name: "Débutant", color: "#71717a" }, { num: 2, name: "Régulier", color: "#10b981" },
  { num: 3, name: "Sportif", color: "#3b82f6" }, { num: 4, name: "Athlète", color: "#a78bfa", active: true },
  { num: 5, name: "Confirmé", color: "#7c3aed" }, { num: 6, name: "Expert", color: "#fbbf24" },
  { num: 7, name: "Elite", color: "#f97316" }, { num: 8, name: "Champion", color: "#fb7185" },
  { num: 9, name: "Légende", color: "#ef4444" }, { num: 10, name: "Titan", color: "#fbbf24" },
];
const weekDays = [
  { label: "L", state: "done" }, { label: "M", state: "done" }, { label: "M", state: "done" },
  { label: "J", state: "done" }, { label: "V", state: "today" }, { label: "S", state: "" }, { label: "D", state: "" },
];

function Progress() {
  return (
    <section id="progress">
      <div className="progress-inner">
        <div className="progress-content">
          <div className="section-label">Gamification</div>
          <h2 className="section-title">La progression<br />se mérite</h2>
          <p className="section-sub">10 niveaux, des défis hebdomadaires et un compteur de streak pour que chaque séance compte.</p>
          <div className="levels-grid" style={{ marginTop: 32 }}>
            {levels.map((l) => (
              <div key={l.num} className={`level-chip${l.active ? " active" : ""}`}>
                <div className="level-dot" style={{ background: l.color }} />
                <div className="level-num">{l.num}</div>
                <div className="level-name">{l.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="streak-card">
            <div className="streak-header">
              <div><div className="streak-title">🔥 Streak actif</div><div className="streak-sub">semaines consécutives</div></div>
              <div className="streak-count">7</div>
            </div>
            <div className="week-dots">
              {weekDays.map((d, i) => (<div key={i} className={`week-dot${d.state ? ` ${d.state}` : ""}`}>{d.label}</div>))}
            </div>
          </div>
          <div className="challenge-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="badge badge-accent">Défi Stéphane</span>
              <span style={{ fontSize: 12, color: "var(--c-text-dim)" }}>Cette semaine</span>
            </div>
            <div className="challenge-title">150 minutes actives</div>
            <div className="challenge-desc">Atteins la recommandation OMS hebdomadaire. Tu es sur la bonne voie !</div>
            <div className="challenge-progress">
              <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: "72%" }} /></div>
              <span style={{ color: "var(--c-emerald)", fontWeight: 600, whiteSpace: "nowrap" }}>108 / 150 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL
───────────────────────────────────────────── */
function Social() {
  return (
    <section id="social">
      <div className="social-inner">
        <div className="social-content">
          <div className="section-label">Social</div>
          <h2 className="section-title">La progression<br />se partage</h2>
          <p className="section-sub">Publie tes séances, encourage tes amis avec un ⚡ kudos, et vois qui a battu son record cette semaine.</p>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { title: "Kudos instantanés", desc: "Un ⚡ pour célébrer l'effort de tes amis. Simple, rapide, motivant.", iconBg: "rgba(192,132,252,0.12)", iconColor: "var(--c-lavender)", icon: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>` },
              { title: "Profil public", desc: "Stats, streak, niveau et séances publiées : ton identité de sportif, en un coup d'œil.", iconBg: "rgba(129,140,248,0.12)", iconColor: "var(--c-powder)", icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>` },
              { title: "Commentaires en temps réel", desc: "Échange sur les techniques, les charges, les ressentis : la communauté comme source de motivation.", iconBg: "rgba(251,191,36,0.1)", iconColor: "var(--c-amber)", icon: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>` },
            ].map((f) => (
              <div className="stephane-feature" key={f.title}>
                <div className="stephane-feature-icon" style={{ background: f.iconBg }}>
                  <svg viewBox="0 0 24 24" style={{ stroke: f.iconColor }} dangerouslySetInnerHTML={{ __html: f.icon }} />
                </div>
                <div className="stephane-feature-text"><div className="title">{f.title}</div><div className="desc">{f.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="feed-card">
          <div className="feed-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Feed amis
          </div>
          <div className="feed-post">
            <div className="post-user">
              <div className="post-avatar" style={{ background: "linear-gradient(135deg,#7C3AED,#A78BFA)" }}>ML</div>
              <div><div className="post-name">Marie L.</div><div className="post-time">Il y a 1 h · <span className="badge badge-amber" style={{ padding: "1px 7px", fontSize: 11 }}>🏆 PR</span></div></div>
            </div>
            <div className="post-content">Nouveau record au soulevé de terre ! 120 kg × 3. Les 3 mois de travail paient enfin 💪</div>
            <div className="post-workout">
              <div className="post-stat"><div className="post-stat-val">120 kg</div><div className="post-stat-key">Charge max</div></div>
              <div className="post-stat"><div className="post-stat-val">4 800 kg</div><div className="post-stat-key">Volume</div></div>
              <div className="post-stat"><div className="post-stat-val">52 min</div><div className="post-stat-key">Durée</div></div>
            </div>
            <div className="post-actions">
              <div className="post-action kudos-active"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> 14 kudos</div>
              <div className="post-action"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> 3 commentaires</div>
            </div>
          </div>
          <div className="feed-post">
            <div className="post-user">
              <div className="post-avatar" style={{ background: "linear-gradient(135deg,#10B981,#34D399)" }}>SR</div>
              <div><div className="post-name">Samuel R.</div><div className="post-time">Il y a 3 h</div></div>
            </div>
            <div className="post-content">Run du matin en zone 2, méditation en mouvement. La régularité avant tout.</div>
            <div className="post-workout">
              <div className="post-stat"><div className="post-stat-val">8.2 km</div><div className="post-stat-key">Distance</div></div>
              <div className="post-stat"><div className="post-stat-val">5'12"/km</div><div className="post-stat-key">Allure</div></div>
              <div className="post-stat"><div className="post-stat-val">42 min</div><div className="post-stat-key">Durée</div></div>
            </div>
            <div className="post-actions">
              <div className="post-action"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> 7 kudos</div>
              <div className="post-action"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> 1 commentaire</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GREEN IT
───────────────────────────────────────────── */
function GreenIT() {
  const stats = [
    { val: "0.8", label: "gCO₂e / requête", equiv: "≈ 6.7 m en voiture" },
    { val: "0.12", label: "Wh / requête", equiv: "≈ 1% de charge téléphone" },
    { val: "150", label: "tokens max / résumé", equiv: "vs ~3 000 sans compression" },
    { val: "0", label: "cookies tiers", equiv: "Zéro tracking externe" },
  ];
  const feats = [
    { icon: `<path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 6v6l4 2"/>`, title: "Dashboard impact en temps réel", desc: "CO₂ (gCO₂e), énergie (Wh) et eau (ml) consommés par chaque interaction IA, visibles dans l'app." },
    { icon: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>`, title: "Économie de tokens", desc: "Résumés compacts (~150 tokens) au lieu de données brutes : moins de puissance, même qualité de coaching." },
    { icon: `<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>`, title: "Équivalences pédagogiques", desc: "Sources ADEME : chaque requête traduite en km voiture ou charges de téléphone pour comprendre l'impact réel." },
  ];
  return (
    <section id="green">
      <div className="green-inner">
        <div>
          <div className="section-label" style={{ color: "var(--c-emerald)" }}>Green IT</div>
          <h2 className="section-title">Une IA<br />responsable</h2>
          <p className="section-sub" style={{ marginBottom: 32 }}>Chaque requête IA affiche son impact environnemental en toute transparence, parce que la technologie doit aussi être durable.</p>
          {feats.map((f) => (
            <div className="green-feature" key={f.title}>
              <div className="green-feature-icon"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: f.icon }} /></div>
              <div className="green-feature-text"><div className="title">{f.title}</div><div className="desc">{f.desc}</div></div>
            </div>
          ))}
        </div>
        <div className="green-stats">
          {stats.map((s) => (
            <div className="green-stat-card" key={s.label}>
              <div className="green-stat-val">{s.val}</div>
              <div className="green-stat-label">{s.label}</div>
              <div className="green-stat-equiv">{s.equiv}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRIVACY SECTION
───────────────────────────────────────────── */
function Privacy({ onOpenModal }: { onOpenModal: () => void }) {
  const cards = [
    { icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`, title: "Consentement explicite", desc: "Checkbox obligatoire à l'inscription pour le traitement des données de santé. Aucune donnée collectée sans accord." },
    { icon: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`, title: "Droit à l'oubli total", desc: "Suppression de compte avec effacement en cascade de toutes tes données, irréversible, sans friction, en 2 clics." },
    { icon: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`, title: "Isolation RLS", desc: "Row Level Security sur chaque table Supabase : tes données ne sont accessibles qu'à toi, au niveau base de données." },
    { icon: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`, title: "Export RGPD", desc: "Télécharge toutes tes données au format JSON à tout moment. Ta progression t'appartient." },
    { icon: `<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>`, title: "Zéro tracking", desc: "Aucun cookie tiers, aucun pixel de suivi, aucun analytics externe. Ta vie numérique reste privée." },
    { icon: `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`, title: "Données IA éphémères", desc: "Transmises à l'API Claude uniquement au moment du traitement, non conservées par Anthropic après la requête." },
  ];
  return (
    <section id="privacy">
      <div className="privacy-inner">
        <div className="privacy-header">
          <div className="section-label" style={{ color: "var(--c-powder)" }}>Confidentialité</div>
          <h2 className="section-title">Tes données t'appartiennent</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>RGPD : consentement explicite, droit à l'oubli complet, isolation des données. Ta santé reste privée.</p>
          <button onClick={onOpenModal} style={{ marginTop: 20, background: "none", border: "none", color: "var(--c-accent)", cursor: "pointer", fontSize: 13, textDecoration: "underline", textUnderlineOffset: 3, fontFamily: "inherit" }}>
            Lire la politique de confidentialité complète →
          </button>
        </div>
        <div className="privacy-grid">
          {cards.map((c) => (
            <div className="privacy-card" key={c.title}>
              <div className="privacy-icon"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: c.icon }} /></div>
              <div className="privacy-title">{c.title}</div>
              <div className="privacy-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA + FOOTER
───────────────────────────────────────────── */
function CTAFinal() {
  return (
    <section id="cta-final">
      <div className="container">
        <div className="badge badge-accent" style={{ marginBottom: 24 }}>
          <DownloadIcon />
          PWA · Aucun App Store requis
        </div>
        <h2 className="cta-title">Prêt à dépasser<br />tes limites ?</h2>
        <p className="cta-sub">Installe Gym Track en 10 secondes. Gratuit, sans carte bancaire.</p>
        <div className="cta-actions">
          <a href="https://gabrielorsatti.github.io/Personnal-gym-tracker/" className="btn btn-primary btn-large">
            <DownloadIcon />
            Installer Gym Track
          </a>
          <a href="https://github.com/gabrielorsatti/Personnal-gym-tracker" className="btn btn-ghost btn-large">
            <GitHubIcon />
            Voir sur GitHub
          </a>
        </div>
        <div className="cta-note">Fonctionne offline · Backup quotidien · Tes données restent les tiennes</div>
      </div>
    </section>
  );
}

function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer>
      <div className="footer-inner">
        <a className="footer-logo" href="#">
          <div className="footer-logo-icon"><DumbbellIcon /></div>
          <span className="footer-logo-text">Gym Track</span>
        </a>
        <div className="footer-links">
          <button onClick={onOpenModal}>Politique de confidentialité</button>
          <a href="https://github.com/gabrielorsatti/Personnal-gym-tracker" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="footer-copy">© 2026 Gym Track · Un projet de Gabriel Orsatti</div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function LandingPage() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".feature-card, .privacy-card, .green-stat-card");
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          setTimeout(() => { el.style.opacity = "1"; el.style.transform = "none"; }, i * 60);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = privacyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [privacyOpen]);

  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Stephane />
      <Progress />
      <Social />
      <GreenIT />
      <Privacy onOpenModal={() => setPrivacyOpen(true)} />
      <CTAFinal />
      <Footer onOpenModal={() => setPrivacyOpen(true)} />
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </>
  );
}
