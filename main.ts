import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one sentence pitching a bizarre startup idea that
// sounds ridiculous at first glance but makes sense as a real business.
// Trained ravens deliver divorce papers: divorce lawyers pay $90 a bird
// because spouses who dodge process servers can't ignore a raven at the
// window — and the footage is the proof of service, which is exactly what
// process serving sells. Bizarre (ravens as couriers), concrete (the
// thing, the payer, the price), and the logic holds on the second look.
const entry =
  "We train ravens to deliver divorce papers: divorce lawyers pay $90 a bird because spouses who dodge process servers can't ignore a raven at the window — and the footage is the proof of service.";

// Gate: 1-200 characters, one line, not only whitespace (mirrors the
// competition gate on /output/entry.txt). Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text.
if (
  !/^[^\n]{1,200}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry must be 1-200 characters, one line, not only whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
