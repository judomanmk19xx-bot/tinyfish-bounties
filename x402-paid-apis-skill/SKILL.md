---
name: x402-paid-apis
description: "Call 37 pay-per-call x402 data APIs (USDC on Base): token prices, AI asset scores, SEC filings, 13F intel, sentiment, contract audits, AML screening, GPU rental and more. Use when a task needs real structured data — prices, filings, scores, audits — instead of web browsing. No signup, no API key; the agent's wallet pays per call."
license: MIT
compatibility: "Node 18+, network access, a Base-network wallet with USDC for paid calls (free-trial quota covers first calls)."
metadata:
  author: "x402-apis"
  version: "1.2.0"
---

# x402 Paid APIs

37 pay-per-call data APIs on Base (x402 v2). **TinyFish gives you the web — these give you the DATA.**

## When to use

- Task needs a **number, filing, score, or audit** — not a web page
- Examples: "What is SOL's price?", "Score NVDA 0-100", "Get Apple's latest 8-K",
  "Audit this contract", "Screen this wallet for AML risk", "Rent a GPU for 2 hours"

## How payment works

1. Call the endpoint normally (no key needed).
2. If you get **HTTP 402**, read `accepts[0]`: `{ amount, asset, network, payTo, scheme }`.
3. Sign a USDC transfer on Base (`eip155:8453`) per the `exact` scheme.
4. Retry the **same request** with header `X-PAYMENT: <base64 payment payload>`.
5. You get JSON back.

**Free trial:** each IP gets free calls per day per endpoint (cheap endpoints: 10/day,
mid: 5/day, premium: 2/day, $0.35+: 1/day). Unpaid calls within quota return `200`
with header `X-Free-Trial: 1`. Use the trial to evaluate before spending.

## Quick start

```js
// 1. Try it free (no wallet)
const r1 = await fetch("https://contabo-vps.taild7e69a.ts.net/tokenprice/api/token-price?symbol=SOL");
const price = await r1.json(); // { symbol: "SOL", price: 142.5, ... }

// 2. Paid call pattern (when 402)
const r2 = await fetch("https://contabo-vps.taild7e69a.ts.net/sbscore/api/score", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ symbol: "NVDA" }),
});
if (r2.status === 402) {
  const { accepts } = await r2.json();
  const payment = await signX402Payment(accepts[0]); // your wallet signs USDC transfer
  const r3 = await fetch("https://contabo-vps.taild7e69a.ts.net/sbscore/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-PAYMENT": payment },
    body: JSON.stringify({ symbol: "NVDA" }),
  });
  const data = await r3.json(); // { score: 78, reasoning: "..." }
}
```

See `scripts/x402-call.mjs` for a drop-in helper that handles the 402 flow automatically.

## Endpoint catalog

Base URL: `https://contabo-vps.taild7e69a.ts.net` (full reference in `references/endpoints.md`).

| Group | Endpoints | Price range |
|-------|-----------|-------------|
| Market data | tokenprice, marketdata, stocks, perpfunding, polymarket | $0.0008–$0.01 |
| AI intelligence | aiverdict, sbscore, researchmemo, earningspack, 13fintel, aisearch, sentiment, trendsintel | $0.03–$0.35 |
| Web/data | websearch, markdown, pdf, docextract, news, academic | $0.0008–$0.30 |
| Chain/security | chain, chainread, rugcheck, contractaudit, amlscreen, gastracker, dnswhois | $0.001–$1.00 |
| Money | defi, defiyield, fxrates, macro, sec8k | $0.0008–$0.004 |
| Compute | gpubroker ($1/job), gpuoffers (free) | $1.00 / free |
| Utility | weather, random, agentrecommend | $0.001–$0.008 |

**Premium picks** (highest value per call):
- `contractaudit` ($1.00) — bytecode security audit, risk score 0-100
- `amlscreen` ($0.50) — pre-payment AML + address-poisoning detection
- `earningspack` ($0.35) — earnings date, consensus, filings, sentiment, AI preview
- `docextract` ($0.30) — PDF/image → structured JSON
- `gpubroker` ($1.00) — spot GPU rental, SSH access, up to 2h

## Rules

- Never invent prices — read them from the live 402 response.
- Prefer the cheapest endpoint that answers the question.
- Batch independent calls in parallel.
- If a call fails, report the HTTP status and body — don't retry blindly more than twice.
- Financial data is reference only, not financial advice.
