# Sprint Note — M2

**Team:** LIMO-NUL
**Milestone:** M2 — Simulator Design

## Done
- ISA specification frozen based on D1 feedback
- Site live on GitHub Pages (UI draft)
- Assembler core developed:
  - Dictionary of 20 instructions (`src/assembler.js`)
  - Parser for labels, comments, and operands (`src/parser.js`)
  - Encoders for R, I, S, B, and J formats (`src/encoder.js`)
  - Main assembly function and error handling (`src/main.js`)
  - Automated unit tests using hand-encoded ISA examples (`tests/assembler.test.js`)
  - Initial HTML structure for the UI (`index.html`)
- Pipeline data model designed (stages: IF, ID, EX, MEM, WB)
- Interface wireframes completed

## Who did what
| Name | GitHub | Contribution this sprint |
|------|--------|--------------------------|
| Setente | @Setente | Built assembler core (parser, encoders, main logic), unit tests, and UI HTML structure. |
| Thulo | @recocipher-beep | (e.g., Pipeline data model, team coordination) |
| Qaba | @qabamothe | (e.g., Control unit design) |
| Lepitla | @Thatosh | (e.g., Test strategy) |
| Leputla | @... | (Add what they did) |
| Jaden | @... | (Add what they did) |
