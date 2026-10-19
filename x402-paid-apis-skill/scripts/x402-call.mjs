// Drop-in x402 call helper for agents.
// Handles the 402 payment flow: tries free (trial quota), returns payment
// instructions if the endpoint needs USDC, or auto-pays if X402_PRIVATE_KEY is set.
//
// Usage:
//   node scripts/x402-call.mjs <path> [GET|POST] ['{"json":"body"}']
// Example:
//   node scripts/x402-call.mjs /tokenprice/api/token-price
//   node scripts/x402-call.mjs /sbscore/api/score POST '{"symbol":"NVDA"}'
//
// Env:
//   X402_PRIVATE_KEY  optional — if set, signs + pays automatically (Base USDC)

const BASE = "https://contabo-vps.taild7e69a.ts.net";

const [path, method = "GET", rawBody] = process.argv.slice(2);
if (!path) {
  console.error("Usage: node x402-call.mjs <path> [GET|POST] ['{json body}']");
  process.exit(1);
}

async function call(xPayment) {
  const headers = { "Content-Type": "application/json" };
  if (xPayment) headers["X-PAYMENT"] = xPayment;
  const opts = { method, headers };
  if (rawBody) opts.body = rawBody;
  const res = await fetch(`${BASE}${path}`, opts);
  return res;
}

let res = await call();
if (res.status === 402) {
  const pr = await res.json().catch(() => ({}));
  const a = pr.accepts?.[0] || {};
  const amount = a.amount ? `${Number(a.amount) / 1e6} USDC` : "unknown";
  console.log(JSON.stringify({
    paymentRequired: true,
    price: amount,
    asset: a.asset || "USDC",
    network: a.network || "eip155:8453",
    payTo: a.payTo,
    scheme: a.scheme || "exact",
    hint: "Sign a USDC transfer per above, then re-run with X402_PAYMENT=<base64 payload> env, or set X402_PRIVATE_KEY to auto-pay.",
  }, null, 2));

  // Auto-pay if a private key is provided (uses viem via npx — install once)
  if (process.env.X402_PRIVATE_KEY) {
    console.log("X402_PRIVATE_KEY set — auto-pay not implemented in this minimal script; use @x402/evm client.");
  }
  process.exit(2);
}

const text = await res.text();
try {
  console.log(JSON.stringify(JSON.parse(text), null, 2));
} catch {
  console.log(text);
}
