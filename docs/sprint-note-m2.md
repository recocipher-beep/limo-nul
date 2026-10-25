# Sprint Note — M2

**Team:** LIMO-NUL
**Milestone:** M2 — Simulator Design
**Submitted by:** Thato Lepitla (Scrum and release lead)

## Done
- ISA specification frozen based on D1 feedback
- Site live on GitHub Pages (UI draft)
- Assembler core: instruction dictionary (src/assembler.js), parser (src/parser.js), encoders (src/encoder.js), main assembly function with error handling (src/main.js)
- Automated unit tests for the assembler (tests/assembler.test.js)
- Initial HTML structure for the UI (index.html)
- Pipeline data model designed (IF, ID, EX, MEM, WB)
- Interface wireframes completed

## Not done
- M2 milestone PDF (block diagram, pipeline-register data model, wireframes) still to be assembled
- PR #11 (LIMO_ISA_M1.pdf) still open and unreviewed
- m2 release tag not yet created

## Next (M3)
- Pipeline core: five stages, pipeline registers, control unit
- Step/Run/Reset and register and memory views

## Who did what
| Name | GitHub | Role this sprint | Contribution |
|------|--------|------------------|--------------|
| Tshebetso | (add) | ISA architect | Carried out the ISA architect role: ISA specification frozen with D1 feedback |
| Setente | @Setente | Assembler lead | Assembler core (parser, encoders, main logic), unit tests, UI HTML structure |
| Thulo | @recocipher-beep | Test lead | Carried out the test lead role |
| Leputla | @TumeloLeputla2006 | Pipeline lead (and hazards) | Carried out the pipeline lead role: pipeline data model |
| Moeketsi | @qabamothe | Interface lead | Carried out the interface lead role: interface wireframes |
| Thato Lepitla | @Thatosh | Scrum and release lead | Rewrote the sprint note |
