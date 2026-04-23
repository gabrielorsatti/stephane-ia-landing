import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500;600;700&display=swap');

:root {
  --bg: #F7F5F0;
  --bg-white: #FFFFFF;
  --bg-dark: #18161F;
  --text: #1A1814;
  --text-muted: #6B6560;
  --text-dim: #A8A39C;
  --border: #E2DDD6;
  --accent: #6D28D9;
  --accent-light: #EDE9FE;
  --amber: #D97706;
  --amber-light: #FEF3C7;
  --emerald: #059669;
  --emerald-light: #D1FAE5;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Barlow', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  font-size: 16px;
  line-height: 1.55;
  overflow-x: hidden;
}

.display {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
.display-xl { font-size: clamp(60px, 8vw, 112px); }
.display-lg { font-size: clamp(48px, 7vw, 96px); }
.display-md { font-size: clamp(36px, 5vw, 64px); }
.label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--text-dim);
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Barlow', sans-serif;
  font-weight: 600; font-size: 15px; cursor: pointer;
  border: none; text-decoration: none; transition: all 0.18s;
  border-radius: 4px;
}
.btn-primary { background: var(--accent); color: #fff; padding: 14px 28px; }
.btn-primary:hover { background: #5B21B6; transform: translateY(-1px); }
.btn-outline { background: transparent; color: var(--text); border: 1.5px solid var(--border); padding: 13px 27px; }
.btn-outline:hover { border-color: var(--text); }
.btn-white { background: #fff; color: var(--text); padding: 14px 28px; }
.btn-white:hover { background: #F0EEE9; }

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  transition: all 0.3s;
}
nav.scrolled {
  background: rgba(247,245,240,0.92); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 32px;
  display: flex; align-items: center; height: 68px; gap: 40px;
  white-space: nowrap;
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo-mark {
  width: 34px; height: 34px; border-radius: 6px; background: var(--accent);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.nav-logo-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800; font-size: 20px; letter-spacing: 0.02em;
  text-transform: uppercase; color: var(--text);
}
.nav-links { display: flex; gap: 28px; margin-left: auto; }
.nav-links a { font-size: 14px; font-weight: 500; color: var(--text-muted); text-decoration: none; transition: color 0.15s; }
.nav-links a:hover { color: var(--text); }

/* HERO */
#hero { padding-top: 68px; min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; position: relative; overflow: hidden; }
.hero-left {
  background: var(--bg-dark); padding: 80px 56px 80px;
  display: flex; flex-direction: column; justify-content: center;
  position: relative; overflow: hidden; min-width: 0;
}
.hero-left::after {
  content: ''; position: absolute; bottom: 0; right: 0;
  width: 200px; height: 200px; background: var(--accent); opacity: 0.15;
  border-radius: 50%; transform: translate(40%, 40%);
}
.hero-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
.hero-eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
.hero-eyebrow-text { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; text-transform: uppercase; }
.hero-title { color: #fff; margin-bottom: 28px; }
.hero-title .purple-line { color: #A78BFA; }
.hero-desc { font-size: 17px; color: rgba(255,255,255,0.55); line-height: 1.65; max-width: 420px; margin-bottom: 40px; }
.hero-ctas { display: flex; gap: 12px; }
.hero-stat-row {
  display: flex; gap: 40px; margin-top: 56px;
  padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08);
}
.hero-stat-val { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 32px; color: #fff; }
.hero-stat-label { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 2px; }

.hero-right {
  background: var(--bg); display: flex; align-items: center; justify-content: center;
  padding: 80px 48px; position: relative;
}
.hero-right::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 39px, var(--border) 39px, var(--border) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, var(--border) 39px, var(--border) 40px);
  opacity: 0.4;
}

/* PHONE (Capture 1) - AGRANDIE */
.phone {
  width: 100%;
  max-width: 330px; /* Augmenté pour équilibrer avec les autres blocs */
  background: var(--bg-white);
  border-radius: 32px;
  border: 5px solid rgba(167, 139, 250, 0.4); 
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 1px rgba(167, 139, 250, 0.2), 
              0 20px 40px rgba(109, 40, 217, 0.15), 
              0 8px 16px rgba(0,0,0,0.05);
}
.phone img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 27px; 
}

/* MARQUEE */
.marquee-wrap { background: var(--accent); overflow: hidden; padding: 14px 0; white-space: nowrap; }
.marquee-track { display: inline-flex; animation: marquee 30s linear infinite; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-item {
  display: inline-flex; align-items: center; gap: 16px; padding: 0 32px;
  font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px;
  letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.8);
}
.marquee-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.4); flex-shrink: 0; }

/* FEATURES */
#features { padding: 100px 0; }
.features-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; margin-bottom: 72px; }
.features-intro-desc { font-size: 18px; color: var(--text-muted); line-height: 1.7; max-width: 460px; }
.features-intro-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 20px; font-weight: 600; font-size: 15px; color: var(--accent); text-decoration: none; }
.features-intro-link:hover { text-decoration: underline; }
.feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1.5px solid var(--text); }
.feat-item { padding: 40px 32px 40px 0; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.feat-item:nth-child(3n) { border-right: none; padding-right: 0; }
.feat-item:nth-child(n+4) { border-bottom: none; }
.feat-num { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 48px; color: var(--border); line-height: 1; margin-bottom: 16px; }
.feat-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.feat-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; }
.feat-tag { display: inline-flex; margin-top: 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; }
.feat-tag-purple { background: var(--accent-light); color: var(--accent); }
.feat-tag-amber { background: var(--amber-light); color: var(--amber); }
.feat-tag-green { background: var(--emerald-light); color: var(--emerald); }

/* NUMBERS */
#numbers { border-top: 1.5px solid var(--text); border-bottom: 1.5px solid var(--text); }
.numbers-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.number-item { padding: 56px 40px; border-right: 1px solid var(--border); }
.number-item:last-child { border-right: none; }
.number-val { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 72px; line-height: 1; letter-spacing: -0.02em; }
.number-val.accent { color: var(--accent); }
.number-val.amber { color: var(--amber); }
.number-val.emerald { color: var(--emerald); }
.number-label { font-size: 15px; color: var(--text-muted); margin-top: 8px; }

/* STEPHANE */
#stephane { background: var(--bg-dark); padding: 100px 0; position: relative; overflow: hidden; }
#stephane::before {
  content: ''; position: absolute; top: -200px; right: -200px;
  width: 600px; height: 600px; border-radius: 50%; background: var(--accent); opacity: 0.06;
}
.stephane-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.stephane-label { color: #A78BFA; margin-bottom: 16px; }
.stephane-title { color: #fff; margin-bottom: 24px; }
.stephane-desc { font-size: 17px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 40px; }
.stephane-points { display: flex; flex-direction: column; gap: 20px; }
.stephane-point { display: flex; gap: 16px; align-items: flex-start; }
.stephane-point-icon { width: 36px; height: 36px; border-radius: 6px; flex-shrink: 0; background: rgba(167,139,250,0.1); display: flex; align-items: center; justify-content: center; }
.stephane-point-icon svg { width: 18px; height: 18px; stroke: #A78BFA; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.stephane-point-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 2px; }
.stephane-point-desc { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.6; }

/* CHAT CARD (Capture 3) - HARMONISÉE */
.chat-card { 
  background: #232030; 
  border-radius: 12px; 
  border: 1px solid rgba(255,255,255,0.06); 
  overflow: hidden; 
  width: 100%;
  max-width: 440px; /* Fixé pour s'équilibrer avec le flux social */
  margin: 0 auto;
}
.chat-top { padding: 14px 18px; background: #1A1728; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 10px; }
.chat-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #7C3AED, #C084FC); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #fff; flex-shrink: 0; font-family: 'Barlow Condensed', sans-serif; }
.chat-name { font-size: 14px; font-weight: 600; color: #fff; }
.chat-status { font-size: 11px; color: #34D399; display: flex; align-items: center; gap: 4px; }
.chat-status::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #34D399; display: inline-block; }
.chat-msgs { padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.cmsg-bot { background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.12); border-radius: 10px 10px 10px 3px; padding: 10px 14px; font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.6; max-width: 88%; }
.cmsg-user { background: #2D2A3D; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px 10px 3px 10px; padding: 10px 14px; font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; max-width: 88%; align-self: flex-end; }
.cmsg-time { font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 4px; }
.chat-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 18px 18px; }
.chat-chip { background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.18); border-radius: 99px; padding: 5px 12px; font-size: 12px; color: #A78BFA; cursor: pointer; }
.chat-disclaimer { padding: 10px 18px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; color: rgba(255,255,255,0.25); display: flex; align-items: center; gap: 6px; }

/* SOCIAL */
#social { padding: 100px 0; background: var(--bg-white); }
.social-inner { 
  display: grid; 
  grid-template-columns: 1fr 1fr; /* Rétabli à part égale pour réduire l'image */
  gap: 60px; 
  align-items: center; 
}
.social-desc { font-size: 17px; color: var(--text-muted); line-height: 1.7; margin-bottom: 36px; max-width: 440px; }

/* REPRODUCTION DU FEED "FAKE APP" (Capture 2) - HARMONISÉE */
.fake-app-wrapper {
  border: 4px solid rgba(167, 139, 250, 0.3); 
  border-radius: 16px; 
  background: #F9FAFB; 
  box-shadow: 0 0 0 1px rgba(167, 139, 250, 0.15), 
              0 24px 48px rgba(109, 40, 217, 0.12);
  width: 100%;
  max-width: 440px; /* Limite de largeur pour s'équilibrer avec le chat IA */
  margin: 0 auto; /* Centre la capture dans sa colonne */
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.fake-app-header {
  padding: 16px 20px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  border-bottom: 1px solid #E5E7EB;
  background: #fff;
}
.fake-app-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.fake-post {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.fp-user-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.fp-user-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.fp-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}
.fp-avatar.marc { background: linear-gradient(135deg, #3B82F6, #2563EB); }
.fp-avatar.sophie { background: linear-gradient(135deg, #EC4899, #DB2777); }
.fp-user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fp-username {
  font-weight: 700;
  color: #111827;
  font-size: 14px;
}
.fp-level {
  background: #DBEAFE;
  color: #2563EB;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 99px;
}
.fp-time {
  font-size: 12px;
  color: #9CA3AF;
}
.fp-volume {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
}
.fp-title {
  font-weight: 700;
  font-size: 15px;
  color: #111827;
  margin-bottom: 12px;
}
.fp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.fp-ex-item {
  background: #F4F2F7; 
  border: 1px solid rgba(124, 58, 237, 0.08);
  border-radius: 8px;
  padding: 10px 12px;
}
.fp-ex-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fp-ex-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}
.fp-ex-cat {
  font-size: 11px;
  font-weight: 500;
  color: #7C3AED;
}
.fp-ex-stats {
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
}
.fp-desc {
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 14px;
}
.fp-divider {
  border-top: 1px solid #E5E7EB;
  margin: 0 -16px 12px -16px;
}
.fp-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fp-footer-left {
  display: flex;
  gap: 16px;
}
.fp-action {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: color 0.15s;
}
.fp-action:hover { color: #111827; }
.fp-action.active { color: #F59E0B; }

/* GREEN */
#green { padding: 100px 0; background: var(--bg); border-top: 1.5px solid var(--text); }
.green-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.green-desc { font-size: 17px; color: var(--text-muted); line-height: 1.7; margin-bottom: 40px; }
.green-feats { display: flex; flex-direction: column; gap: 0; border-top: 1px solid var(--border); }
.green-feat { display: flex; align-items: flex-start; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--border); }
.green-feat-icon { width: 32px; height: 32px; border-radius: 6px; flex-shrink: 0; margin-top: 2px; background: var(--emerald-light); display: flex; align-items: center; justify-content: center; }
.green-feat-icon svg { width: 16px; height: 16px; stroke: var(--emerald); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.green-feat-title { font-size: 15px; font-weight: 700; margin-bottom: 3px; }
.green-feat-desc { font-size: 14px; color: var(--text-muted); }
.green-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
.green-stat { background: var(--bg-white); padding: 28px; }
.green-stat-n { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 48px; color: var(--emerald); line-height: 1; }
.green-stat-l { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.green-stat-e { font-size: 12px; color: var(--text-dim); margin-top: 2px; }
.green-note { margin-top: 20px; padding: 16px 20px; background: var(--emerald-light); border-radius: 6px; font-size: 13px; color: var(--emerald); line-height: 1.6; display: flex; gap: 10px; align-items: flex-start; }

/* PRIVACY */
#privacy { padding: 100px 0; background: var(--bg-white); }
.privacy-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
.privacy-desc { font-size: 17px; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; }
.privacy-link { font-size: 14px; font-weight: 600; color: var(--accent); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; background: none; border: none; font-family: inherit; padding: 0; }
.privacy-row { display: flex; gap: 16px; align-items: flex-start; padding: 20px 0; border-bottom: 1px solid var(--border); }
.privacy-row:first-child { border-top: 1.5px solid var(--text); }
.privacy-row-icon { width: 32px; height: 32px; border-radius: 6px; flex-shrink: 0; margin-top: 2px; background: var(--accent-light); display: flex; align-items: center; justify-content: center; }
.privacy-row-icon svg { width: 16px; height: 16px; stroke: var(--accent); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.privacy-row-title { font-size: 15px; font-weight: 700; margin-bottom: 2px; }
.privacy-row-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* CTA */
#cta-final { background: var(--bg-dark); padding: 120px 0; position: relative; overflow: hidden; text-align: center; }
#cta-final::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 800px; height: 400px; background: var(--accent); opacity: 0.08; border-radius: 50%; filter: blur(80px);
}
.cta-label { color: rgba(255,255,255,0.3); margin-bottom: 24px; }
.cta-title { color: #fff; margin-bottom: 40px; }
.cta-actions { display: flex; gap: 12px; justify-content: center; }
.cta-note { margin-top: 24px; font-size: 13px; color: rgba(255,255,255,0.3); }

/* FOOTER */
footer { background: var(--bg-dark); padding: 32px 0; border-top: 1px solid rgba(255,255,255,0.06); }
.footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.footer-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.footer-logo-mark { width: 26px; height: 26px; border-radius: 4px; background: var(--accent); display: flex; align-items: center; justify-content: center; }
.footer-logo-text { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 16px; letter-spacing: 0.04em; text-transform: uppercase; color: rgba(255,255,255,0.7); }
.footer-links { display: flex; gap: 24px; }
.footer-links a, .footer-links button { font-size: 13px; color: rgba(255,255,255,0.3); text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; transition: color 0.15s; }
.footer-links a:hover, .footer-links button:hover { color: rgba(255,255,255,0.7); }
.footer-copy { font-size: 13px; color: rgba(255,255,255,0.2); }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); overflow-y: auto; padding: 40px 20px; animation: fdin 0.2s ease; }
@keyframes fdin { from { opacity: 0; } to { opacity: 1; } }
.modal-box { max-width: 680px; margin: 0 auto; background: var(--bg-white); border-radius: 8px; border: 1.5px solid var(--border); box-shadow: 0 24px 64px rgba(0,0,0,0.15); overflow: hidden; }
.modal-head { background: var(--bg); padding: 20px 28px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; }
.modal-head-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 22px; text-transform: uppercase; letter-spacing: 0.02em; }
.modal-head-sub { font-size: 12px; color: var(--text-dim); margin-top: 1px; }
.modal-close { width: 32px; height: 32px; border-radius: 4px; background: var(--border); border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: background 0.15s; }
.modal-close:hover { background: var(--text); color: #fff; }
.modal-body { padding: 28px; font-size: 14px; line-height: 1.8; color: var(--text-muted); }
.modal-section { margin-bottom: 28px; }
.modal-section-title { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
.modal-num { width: 22px; height: 22px; border-radius: 3px; background: var(--accent); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; flex-shrink: 0; }
.modal-list { margin-top: 6px; padding-left: 18px; display: flex; flex-direction: column; gap: 3px; }
.modal-box-green { margin-top: 10px; padding: 10px 14px; background: var(--emerald-light); border-radius: 4px; color: var(--emerald); font-size: 13px; }
.modal-box-purple { margin-top: 10px; padding: 10px 14px; background: var(--accent-light); border-radius: 4px; font-size: 13px; display: flex; gap: 8px; }
.modal-rights { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
.modal-right-row { display: flex; gap: 10px; padding: 10px 14px; background: var(--bg); border-radius: 4px; border: 1px solid var(--border); }
.modal-right-label { font-weight: 700; color: var(--text); white-space: nowrap; }
.modal-foot { padding: 16px 28px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }

/* REVEAL */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .nav-links { display: none; }
  #hero { grid-template-columns: 1fr; }
  .hero-left { padding: 60px 32px; }
  .hero-right { min-height: 400px; padding: 40px 32px; }
  
  .phone { max-width: 280px; } /* Téléphone un peu plus grand aussi sur mobile */
  
  .features-intro { grid-template-columns: 1fr; gap: 32px; }
  .feat-grid { grid-template-columns: 1fr 1fr; }
  .stephane-inner, .social-inner, .green-inner, .privacy-inner { grid-template-columns: 1fr; gap: 48px; }
  .numbers-grid { grid-template-columns: 1fr 1fr; }
  .footer-inner { flex-direction: column; text-align: center; }
  .footer-links { justify-content: center; flex-wrap: wrap; }
}

@media (max-width: 600px) {
  .feat-grid { grid-template-columns: 1fr; }
  .numbers-grid { grid-template-columns: 1fr; }
  .fp-grid { grid-template-columns: 1fr; }
}
`;

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const DumbbellIcon = ({ size = 18, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="12" r="1.5" /><circle cx="18.5" cy="12" r="1.5" />
    <path d="M7 12h10M2 10v4M22 10v4M5.5 10V8M18.5 10V8M5.5 14v2M18.5 14v2" />
  </svg>
);
const DownloadIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const InfoIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const RssIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" />
  </svg>
);
const KudoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const FlagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

/* ─────────────────────────────────────────────
   PRIVACY MODAL
───────────────────────────────────────────── */
function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <div className="modal-head-title">Politique de confidentialité</div>
            <div className="modal-head-sub">Dernière mise à jour : avril 2026</div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">×</button>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title"><span className="modal-num">1</span>Données collectées</div>
            <p>Stéphane-IA collecte les données suivantes :</p>
            <ul className="modal-list">
              <li><strong>Données d'entraînement</strong> : séances, exercices, séries, charges, durées.</li>
              <li><strong>Données corporelles</strong> : poids de corps (si renseigné).</li>
              <li><strong>Données nutritionnelles</strong> : descriptions de repas, macronutriments estimés.</li>
              <li><strong>Profil</strong> : pseudo, photo de profil, bio.</li>
              <li><strong>Interactions sociales</strong> : commentaires, kudos, relations d'amitié.</li>
            </ul>
          </div>
          <div className="modal-section">
            <div className="modal-section-title"><span className="modal-num">2</span>Finalité du traitement</div>
            <p>Vos données sont utilisées exclusivement pour afficher votre historique, alimenter le coach IA Stéphane et permettre les interactions sociales.</p>
            <div className="modal-box-green">Aucune donnée n'est vendue, louée ou partagée avec des tiers à des fins commerciales.</div>
          </div>
          <div className="modal-section">
            <div className="modal-section-title"><span className="modal-num">3</span>Stockage et sécurité</div>
            <p>Les données sont stockées sur <strong>Supabase (PostgreSQL)</strong>, hébergé en Europe (AWS eu-west). Chiffrées via HTTPS/TLS. Isolation garantie par <strong>Row Level Security (RLS)</strong>.</p>
          </div>
          <div className="modal-section">
            <div className="modal-section-title"><span className="modal-num">4</span>Intelligence artificielle</div>
            <p>Le coach Stéphane utilise l'<strong>API Claude (Anthropic)</strong>. Vos données sont transmises uniquement au moment de la génération. Anthropic ne les conserve pas après traitement.</p>
            <div className="modal-box-purple">
              <InfoIcon />
              <span>Stéphane est une IA, pas un professionnel de santé. Ses conseils ne remplacent pas l'avis d'un médecin.</span>
            </div>
          </div>
          <div className="modal-section">
            <div className="modal-section-title"><span className="modal-num">5</span>Vos droits (RGPD)</div>
            <div className="modal-rights">
              {[
                { label: "Accès", desc: "Exportez toutes vos données (Réglages > Données > Exporter)." },
                { label: "Rectification", desc: "Modifiez votre profil et vos séances à tout moment." },
                { label: "Suppression", desc: "Supprimez votre compte et toutes vos données (Réglages > Supprimer mon compte)." },
                { label: "Portabilité", desc: "L'export JSON contient l'intégralité de vos données dans un format réutilisable." },
              ].map((r) => (
                <div className="modal-right-row" key={r.label}>
                  <span className="modal-right-label">{r.label}</span><span>{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-section">
            <div className="modal-section-title"><span className="modal-num">6</span>Cookies et stockage local</div>
            <p>Stéphane-IA utilise le <strong>localStorage</strong> uniquement. Aucun cookie tiers, tracker ou pixel de suivi.</p>
          </div>
          <div className="modal-section" style={{ marginBottom: 0 }}>
            <div className="modal-section-title"><span className="modal-num">7</span>Contact</div>
            <p>Pour toute question, contactez le responsable via le <a href="https://github.com/gabrielorsatti/stephane-ia-app" style={{ color: "var(--accent)" }}>dépôt GitHub</a> ou par email à l'adresse indiquée dans les réglages.</p>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 14 }} onClick={onClose}>Fermer</button>
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
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <a className="nav-logo" href="#">
          <div className="nav-logo-mark"><DumbbellIcon size={18} color="white" /></div>
          <span className="nav-logo-text">Stéphane-IA</span>
        </a>
        <div className="nav-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#stephane">Coach IA</a>
          <a href="#social">Social</a>
          <a href="#green">Green IT</a>
          <a href="#privacy">Confidentialité</a>
        </div>
        <a href="https://gabrielorsatti.github.io/stephane-ia-app/" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 14 }}>
          Installer l'app
        </a>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot" />
          <span className="hero-eyebrow-text">App fitness Social-First · IA</span>
        </div>
        <h1 className="display display-xl hero-title">
          Suis.<br />
          <span className="purple-line">Dépasse.</span><br />
          Partage.
        </h1>
        <p className="hero-desc">
          Saisie en langage naturel, graphiques de progression, records personnels et Stéphane, ton coach IA bienveillant qui te pousse toujours à faire mieux.
        </p>
        <div className="hero-ctas">
          <a href="https://gabrielorsatti.github.io/stephane-ia-app/" className="btn btn-primary">Commencer gratuitement</a>
          <a href="#features" className="btn btn-outline" style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)" }}>Voir les fonctionnalités</a>
        </div>
        <div className="hero-stat-row">
          {[{ val: "100+", label: "exercices catalogués" }, { val: "10", label: "niveaux de progression" }, { val: "0", label: "trackers tiers" }].map((s) => (
            <div key={s.label}>
              <div className="hero-stat-val">{s.val}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="phone">
          <img src="./capture1.jpeg" alt="Capture d'écran de l'application Stéphane-IA" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
const marqueeItems = ["Langage naturel", "Records personnels", "Coach IA Stéphane", "Streaks & Challenges", "Social Feed", "Nutrition IA", "Green IT", "RGPD First", "PWA Offline"];

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">{item}<span className="marquee-dot" /></span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
const featuresList = [
  { num: "01", title: "Langage naturel", desc: 'Tape "3×12 Développé couché à 80 kg" ou "Course 5 km en 25 min" : l\'app comprend et enregistre instantanément.', tag: "Saisie IA", tagClass: "feat-tag-purple" },
  { num: "02", title: "Records Personnels", desc: "Détection automatique à chaque sauvegarde. Célébration trophée doré et estimation 1RM via la formule d'Epley.", tag: "🏆 PR", tagClass: "feat-tag-amber" },
  { num: "03", title: "Graphiques 12 sem.", desc: "Volume, intensité, allure cardio, poids de corps. Visualise tes progrès avec des courbes détaillées sur 3 mois glissants.", tag: "Données", tagClass: "feat-tag-purple" },
  { num: "04", title: "Streaks & Défis", desc: "Compteur de semaines actives et challenges hebdomadaires de Stéphane : fréquence, volume record, 150 minutes OMS.", tag: "🔥 Streak", tagClass: "feat-tag-amber" },
  { num: "05", title: "Nutrition IA", desc: "Saisis un repas en langage libre : Stéphane extrait automatiquement calories, protéines, glucides et lipides.", tag: "Macro", tagClass: "feat-tag-green" },
  { num: "06", title: "Gamification", desc: "10 niveaux de Débutant à Titan, barre XP animée et confettis level-up. Chaque séance rapporte de l'expérience.", tag: "XP", tagClass: "feat-tag-purple" },
];

function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className="features-intro">
          <div>
            <div className="label" style={{ marginBottom: 16 }}>Fonctionnalités</div>
            <h2 className="display display-lg">Tout<br />ce qu'il faut<br />pour progresser</h2>
          </div>
          <div>
            <p className="features-intro-desc">De la saisie en langage naturel aux graphiques avancés, une app pensée pour les sportifs qui veulent du concret, sans friction.</p>
            <a href="https://gabrielorsatti.github.io/stephane-ia-app/" className="features-intro-link">Essayer maintenant →</a>
          </div>
        </div>
        <div className="feat-grid">
          {featuresList.map((f) => (
            <div className="feat-item reveal" key={f.num}>
              <div className="feat-num">{f.num}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
              <span className={`feat-tag ${f.tagClass}`}>{f.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NUMBERS
───────────────────────────────────────────── */
function Numbers() {
  return (
    <section id="numbers">
      <div className="numbers-grid">
        {[
          { val: "100+", cls: "accent", label: "exercices avec fiches techniques" },
          { val: "10", cls: "amber", label: "niveaux de progression jouables" },
          { val: "0", cls: "emerald", label: "cookie tiers ni tracker externe" },
          { val: "12", cls: "", label: "semaines de mémoire longue IA" },
        ].map((n) => (
          <div className="number-item reveal" key={n.label}>
            <div className={`number-val${n.cls ? ` ${n.cls}` : ""}`}>{n.val}</div>
            <div className="number-label">{n.label}</div>
          </div>
        ))}
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
      <div className="container">
        <div className="stephane-inner">
          <div className="reveal">
            <div className="label stephane-label">Coach IA</div>
            <h2 className="display display-md stephane-title">Rencontre<br />Stéphane</h2>
            <p className="stephane-desc">Bienveillant mais exigeant : il analyse chaque séance, détecte tes patterns sur 12 semaines et te propose des ajustements actionnables.</p>
            <div className="stephane-points">
              {[
                { icon: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`, title: "Mémoire longue 12 semaines", desc: "Agrège volume, fréquence et progressions pour des conseils qui s'améliorent avec le temps." },
                { icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`, title: "Surcharge progressive", desc: "Suggère des ajustements de charges basés sur tes données réelles, pas des formules génériques." },
                { icon: `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>`, title: "Adapté à ta pratique", desc: "Muscu, cardio, yoga, cours collectifs : Stéphane adapte son discours à ton profil." },
              ].map((p) => (
                <div className="stephane-point" key={p.title}>
                  <div className="stephane-point-icon"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: p.icon }} /></div>
                  <div><div className="stephane-point-title">{p.title}</div><div className="stephane-point-desc">{p.desc}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-card reveal">
            <div className="chat-top">
              <div className="chat-avatar">S</div>
              <div><div className="chat-name">Stéphane</div><div className="chat-status">En ligne</div></div>
            </div>
            <div className="chat-msgs">
              <div><div className="cmsg-bot">Salut ! J'ai analysé ta séance Legs d'hier. Ton volume total (8 400 kg) est ton <strong style={{ color: "#A78BFA" }}>record de 12 semaines</strong> 🎉</div><div className="cmsg-time">Stéphane · il y a 2 h</div></div>
              <div><div className="cmsg-user">Super ! Tu me conseilles quoi pour la suite ?</div><div className="cmsg-time" style={{ textAlign: "right" }}>Toi · il y a 2 h</div></div>
              <div><div className="cmsg-bot">Augmente la charge au squat de +2.5 kg la semaine prochaine (surcharge progressive). Ton ratio Push/Pull est déséquilibré. Pense à ajouter une session Pull cette semaine.</div><div className="cmsg-time">Stéphane · il y a 2 h</div></div>
            </div>
            <div className="chat-chips">
              {["📊 Mon bilan", "🏋️ Prochain entraînement", "😴 Récupération", "🥗 Nutrition"].map((c) => <span key={c} className="chat-chip">{c}</span>)}
            </div>
            <div className="chat-disclaimer"><InfoIcon />Je suis une IA, pas un médecin. Mes conseils ne remplacent pas un avis professionnel.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL - FAKE FEED
───────────────────────────────────────────── */
function Social() {
  return (
    <section id="social">
      <div className="container">
        <div className="social-inner">
          <div className="reveal">
            <div className="label" style={{ marginBottom: 16 }}>Social</div>
            <h2 className="display display-md" style={{ marginBottom: 20 }}>La progression<br />se partage</h2>
            <p className="social-desc">Publie tes séances, encourage tes amis avec un ⚡ kudos, et vois qui a battu son record cette semaine.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Kudos ⚡ en un tap pour célébrer l'effort de tes amis", "Profil public : stats, streak, niveau et séances publiées", "Commentaires en temps réel sur les performances de tes amis", "Modération : signalement, blocage, filtrage automatique"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="fake-app-wrapper reveal">
            <div className="fake-app-header">
              <RssIcon /> Flux d'activité
            </div>
            
            <div className="fake-app-content">
              {/* POST MARC */}
              <div className="fake-post">
                <div className="fp-user-row">
                  <div className="fp-user-left">
                    <div className="fp-avatar marc">M</div>
                    <div className="fp-user-info">
                      <span className="fp-username">@marc_fit</span>
                      <span className="fp-level">Niv.4</span>
                      <span className="fp-time">il y a 24 minutes</span>
                    </div>
                  </div>
                  <div className="fp-volume">
                    <DumbbellIcon size={14} color="#6B7280" /> 4520 kg
                  </div>
                </div>

                <div className="fp-title">Séance Poussée / Jambes / Cardio</div>
                
                <div className="fp-grid">
                  <div className="fp-ex-item">
                    <div className="fp-ex-head">
                      <span className="fp-ex-name">Squat</span>
                      <span className="fp-ex-cat">Jambes</span>
                    </div>
                    <div className="fp-ex-stats">4x90 · 4x90 · 4x90</div>
                  </div>
                  <div className="fp-ex-item">
                    <div className="fp-ex-head">
                      <span className="fp-ex-name">Développé couché</span>
                      <span className="fp-ex-cat">Poussée</span>
                    </div>
                    <div className="fp-ex-stats">8x70 · 8x70</div>
                  </div>
                  <div className="fp-ex-item" style={{ gridColumn: "1 / -1" }}>
                    <div className="fp-ex-head">
                      <span className="fp-ex-name">Course à pied</span>
                      <span className="fp-ex-cat">Cardio</span>
                    </div>
                    <div className="fp-ex-stats">20 min · Zone 2</div>
                  </div>
                </div>

                <div className="fp-desc">Bonne congestion aujourd'hui !</div>
                <div className="fp-divider" />
                
                <div className="fp-footer">
                  <div className="fp-footer-left">
                    <div className="fp-action active"><KudoIcon /> Kudo (3)</div>
                    <div className="fp-action"><CommentIcon /> Commentaires</div>
                  </div>
                  <div className="fp-action"><FlagIcon /></div>
                </div>
              </div>

              {/* POST SOPHIE */}
              <div className="fake-post">
                <div className="fp-user-row">
                  <div className="fp-user-left">
                    <div className="fp-avatar sophie">S</div>
                    <div className="fp-user-info">
                      <span className="fp-username">@sophie_str</span>
                      <span className="fp-level" style={{ background: '#F3E8FF', color: '#7C3AED' }}>Niv.2</span>
                      <span className="fp-time">il y a 1 heure</span>
                    </div>
                  </div>
                  <div className="fp-volume">
                    <DumbbellIcon size={14} color="#6B7280" /> 2100 kg
                  </div>
                </div>

                <div className="fp-title">Séance Tirage / Bras</div>
                
                <div className="fp-grid">
                  <div className="fp-ex-item">
                    <div className="fp-ex-head">
                      <span className="fp-ex-name">Soulevé de terre</span>
                      <span className="fp-ex-cat">Tirage</span>
                    </div>
                    <div className="fp-ex-stats">5x80 · 5x80</div>
                  </div>
                  <div className="fp-ex-item">
                    <div className="fp-ex-head">
                      <span className="fp-ex-name">Tractions</span>
                      <span className="fp-ex-cat">Tirage</span>
                    </div>
                    <div className="fp-ex-stats">8xPDC · 7xPDC</div>
                  </div>
                  <div className="fp-ex-item" style={{ gridColumn: "1 / -1" }}>
                    <div className="fp-ex-head">
                      <span className="fp-ex-name">Curl biceps</span>
                      <span className="fp-ex-cat">Bras</span>
                    </div>
                    <div className="fp-ex-stats">12x10 · 12x10</div>
                  </div>
                </div>

                <div className="fp-desc">Le deadlift monte doucement 🚀</div>
                <div className="fp-divider" />
                
                <div className="fp-footer">
                  <div className="fp-footer-left">
                    <div className="fp-action"><KudoIcon /> Kudos</div>
                    <div className="fp-action"><CommentIcon /> Commentaires</div>
                  </div>
                  <div className="fp-action"><FlagIcon /></div>
                </div>
              </div>

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
  const feats = [
    { icon: `<path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 6v6l4 2"/>`, title: "Dashboard impact en temps réel", desc: "CO₂ (gCO₂e), énergie (Wh) et eau (ml) consommés par chaque interaction IA, visibles dans l'app." },
    { icon: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>`, title: "Économie de tokens", desc: "Résumés compacts (~150 tokens) au lieu de données brutes : même qualité, empreinte réduite." },
    { icon: `<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>`, title: "Équivalences pédagogiques", desc: "Sources ADEME : chaque requête traduite en km voiture ou charges de téléphone." },
  ];
  const stats = [
    { n: "0.8", l: "gCO₂e / requête", e: "≈ 6.7 m en voiture" },
    { n: "0.12", l: "Wh / requête", e: "≈ 1% charge téléphone" },
    { n: "150", l: "tokens max / résumé", e: "vs ~3 000 sans compression" },
    { n: "0", l: "cookies tiers", e: "Zéro tracking externe" },
  ];
  return (
    <section id="green">
      <div className="container">
        <div className="green-inner">
          <div className="reveal">
            <div className="label" style={{ color: "var(--emerald)", marginBottom: 16 }}>Green IT</div>
            <h2 className="display display-md" style={{ marginBottom: 20 }}>Une IA<br />responsable</h2>
            <p className="green-desc">Chaque requête IA affiche son impact environnemental en toute transparence, parce que la technologie doit aussi être durable.</p>
            <div className="green-feats">
              {feats.map((f) => (
                <div className="green-feat" key={f.title}>
                  <div className="green-feat-icon"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: f.icon }} /></div>
                  <div><div className="green-feat-title">{f.title}</div><div className="green-feat-desc">{f.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="green-stats-grid">
              {stats.map((s) => (
                <div className="green-stat" key={s.l}>
                  <div className="green-stat-n">{s.n}</div>
                  <div className="green-stat-l">{s.l}</div>
                  <div className="green-stat-e">{s.e}</div>
                </div>
              ))}
            </div>
            <div className="green-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Sources : ADEME (120 gCO₂e/km voiture), Luccioni et al. (coût énergétique LLM). Transparence totale, données en temps réel dans l'app.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRIVACY
───────────────────────────────────────────── */
function Privacy({ onOpenModal }: { onOpenModal: () => void }) {
  const rows = [
    { icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`, title: "Consentement explicite", desc: "Checkbox obligatoire à l'inscription. Aucune donnée de santé collectée sans accord clair." },
    { icon: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`, title: "Droit à l'oubli total", desc: "Suppression de compte avec effacement en cascade, irréversible, en 2 clics." },
    { icon: `<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`, title: "Isolation RLS", desc: "Row Level Security sur chaque table Supabase : tes données ne sont accessibles qu'à toi." },
    { icon: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`, title: "Export RGPD JSON", desc: "Télécharge l'intégralité de tes données à tout moment. Ta progression t'appartient." },
    { icon: `<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>`, title: "Zéro tracking", desc: "Aucun cookie tiers, pixel de suivi ni analytics externe." },
    { icon: `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`, title: "Données IA éphémères", desc: "Transmises à l'API Claude uniquement au moment du traitement, non conservées après.", noBorder: true },
  ];
  return (
    <section id="privacy">
      <div className="container">
        <div className="privacy-inner">
          <div className="reveal">
            <div className="label" style={{ marginBottom: 16 }}>Confidentialité RGPD</div>
            <h2 className="display display-md privacy-title" style={{ marginBottom: 20 }}>Tes données<br />t'appartiennent</h2>
            <p className="privacy-desc">Consentement explicite, droit à l'oubli complet, isolation Row Level Security. Ta santé reste privée, sans exception.</p>
            <button className="privacy-link" onClick={onOpenModal}>
              Lire la politique de confidentialité complète →
            </button>
          </div>
          <div className="reveal">
            {rows.map((r) => (
              <div className="privacy-row" key={r.title} style={r.noBorder ? { borderBottom: "none" } : undefined}>
                <div className="privacy-row-icon"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: r.icon }} /></div>
                <div><div className="privacy-row-title">{r.title}</div><div className="privacy-row-desc">{r.desc}</div></div>
              </div>
            ))}
          </div>
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
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="label cta-label">PWA · Aucun App Store requis</div>
        <h2 className="display display-lg cta-title">Prêt à<br />dépasser tes<br />limites ?</h2>
        <div className="cta-actions">
          <a href="https://gabrielorsatti.github.io/stephane-ia-app/" className="btn btn-white">
            <DownloadIcon />Installer Stéphane-IA
          </a>
          <a href="https://github.com/gabrielorsatti/stephane-ia-app" className="btn btn-outline" style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.15)" }}>
            <GitHubIcon />Voir sur GitHub
          </a>
        </div>
        <div className="cta-note">Fonctionne offline · Backup quotidien · RGPD · Gratuit</div>
      </div>
    </section>
  );
}

function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <a className="footer-logo" href="#">
            <div className="footer-logo-mark"><DumbbellIcon size={14} color="white" /></div>
            <span className="footer-logo-text">Stéphane-IA</span>
          </a>
          <div className="footer-links">
            <button onClick={onOpenModal}>Politique de confidentialité</button>
            <a href="https://github.com/gabrielorsatti/stephane-ia-app" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="footer-copy">© 2026 Stéphane-IA · Un projet de Gabriel Orsatti</div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT
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
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = privacyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [privacyOpen]);

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <Numbers />
      <Stephane />
      <Social />
      <GreenIT />
      <Privacy onOpenModal={() => setPrivacyOpen(true)} />
      <CTAFinal />
      <Footer onOpenModal={() => setPrivacyOpen(true)} />
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </>
  );
}