# x402 Endpoint Reference

Base: `https://contabo-vps.taild7e69a.ts.net` · Pay: USDC on Base (`eip155:8453`) · Protocol: x402 v2

## Market data

| Tool | Route | Method | Price | Params |
|------|-------|--------|-------|--------|
| tokenprice | `/tokenprice/api/token-price` | GET | $0.0008 | `?symbol=BTC` |
| marketdata | `/marketdata/api/market/overview` | GET | $0.01 | — |
| stocks | `/stocks/api/stocks` | POST | $0.003 | `{symbol, interval?, range?}` |
| perpfunding | `/perpfunding/api/perp-funding` | GET | $0.001 | `?symbol=BTC` |
| polymarket | `/polymarket/api/polymarket` | GET | $0.006 | `?market=...` |

## AI intelligence

| Tool | Route | Method | Price | Params |
|------|-------|--------|-------|--------|
| sbscore | `/sbscore/api/score` | POST | $0.05 | `{symbol}` |
| researchmemo | `/researchmemo/api/memo` | POST | $0.10 | `{symbol, query?}` |
| earningspack | `/earningspack/api/earnings` | POST | $0.35 | `{symbol}` |
| 13fintel | `/13fintel/api/13f` | GET | $0.10 | `?cik=0001067983` |
| aiverdict | `/aiverdict/api/verdict` | POST | $0.015 | `{address, chain?}` |
| aisearch | `/aisearch/api/aisearch` | POST | $0.015 | `{query, num_results?}` |
| sentiment | `/sentiment/api/sentiment` | POST | $0.03 | `{query}` |
| trendsintel | `/trendsintel/api/trends` | GET | $0.10 | `?keyword=...&geo=US` |

## Web / data

| Tool | Route | Method | Price | Params |
|------|-------|--------|-------|--------|
| websearch | `/websearch/api/websearch` | POST | $0.010 | `{query, num_results?}` |
| markdown | `/markdown/api/markdown` | POST | $0.002 | `{url}` |
| pdf | `/pdf/api/pdf` | POST | $0.002 | `{url}` (PDF URL) |
| docextract | `/docextract/api/extract` | POST | $0.30 | multipart `file` (PDF/PNG/JPG/WEBP ≤10MB) |
| news | `/news/api/news` | GET | $0.0008 | `?topic=...` |
| academic | `/academic/api/papers` | GET | $0.004 | `?query=...` |

## Chain / security

| Tool | Route | Method | Price | Params |
|------|-------|--------|-------|--------|
| chain | `/chain/api/chain` | POST | $0.002 | `{action, address?}` |
| chainread | `/chainread/api/chain/{balance\|tx\|gas}` | GET | $0.002 | `?address=...&chain=base` |
| rugcheck | `/rugcheck/api/rugcheck` | POST | $0.005 | `{address, chain?}` |
| contractaudit | `/contractaudit/api/audit` | POST | $1.00 | `{address, chain?}` |
| amlscreen | `/amlscreen/api/aml` | POST | $0.50 | `{address}` |
| gastracker | `/gastracker/api/gas` | GET | $0.001 | — |
| dnswhois | `/dnswhois/api/dns` | POST | $0.005 | `{domain}` |

## Money / macro

| Tool | Route | Method | Price | Params |
|------|-------|--------|-------|--------|
| defi | `/defi/api/defi` | POST | $0.0008 | `{query}` |
| defiyield | `/defiyield/api/yield` | GET | $0.001 | `?chain=...&limit=...` |
| fxrates | `/fxrates/api/fx` | GET | $0.0008 | `?base=USD&target=...` |
| macro | `/macro/api/macro` | GET | $0.002 | `?indicator=cpi\|fed_rate\|unemployment\|gdp` |
| sec8k | `/sec8k/api/sec-8k` | GET | $0.002 | `?cik=...` |

## Compute

| Tool | Route | Method | Price | Params |
|------|-------|--------|-------|--------|
| gpubroker | `/gpubroker/api/gpu` | POST | $1.00 | `{gpu_type, duration_hours, ssh_key}` |
| gpuoffers | `/gpubroker/api/gpu/offers` | GET | free | — |

## Utility

| Tool | Route | Method | Price | Params |
|------|-------|--------|-------|--------|
| weather | `/weather/api/weather` | GET | $0.001 | `?lat=..&lon=..` |
| random | `/random/api/random/{fact\|coinflip\|dice}` | GET | $0.001 | `?sides=6` |
| agentrecommend | `/agentrecommend/api/recommend` | POST | $0.008 | `{task}` |

Free-trial quota per IP/day: ≤$0.002 → 10 · $0.003–$0.01 → 5 · $0.05–$0.10 → 2 · ≥$0.35 → 1.
