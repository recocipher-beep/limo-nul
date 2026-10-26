LIMO M2 Pipeline-Register Data Model

The five pipeline stages are IF (Instruction Fetch), ID (Instruction Decode), EX (Execute), MEM (Memory Access), and WB (Write Back). Four pipeline registers carry information between the stages.

State object
A serialisable top-level state object should contain:

| Field | Purpose |
|---|---|
| `cycle` | Number of completed cycles |
| `pc` | Address of the next instruction fetch |
| `imem` | Instruction words indexed by byte address or a documented word-address mapping |
| `dmem` | Data-memory words indexed by byte address |
| `regs` | 32 general-purpose registers; writes to R0 are ignored |
| `IF_ID` | Instruction and PC information between IF and ID |
| `ID_EX` | Decoded operands and control signals between ID and EX |
| `EX_MEM` | ALU result, store data, destination and memory/writeback controls |
| `MEM_WB` | Result selected for writeback and destination/control information |
| `stats` | Cycle, retired-instruction, stall and flush counters as implemented |
| `halted`, `error` | Execution status and any user-facing error |

Suggested pipeline-register fields

IF/ID
- `valid`: whether the slot contains a real instruction
- `pc`: address of the fetched instruction
- `pc4`: `pc + 4`
- `instr`: 32-bit instruction word

ID/EX
- `valid`, `pc`, `pc4`, `instr`
- `rs1`, `rs2`, `rd`
- `rs1Val`, `rs2Val`, `imm`
- `usesRs1`, `usesRs2`
- `ctrl`: decoded control bundle (EX, MEM and WB controls)

EX/MEM
- `valid`, `pc`, `pc4`, `rd`
- `aluResult`, `storeData`
- `ctrl`: memory and write-back controls needed by later stages

MEM/WB
- `valid`, `pc`, `pc4`, `rd`
- `aluResult`, `memData`
- `writebackValue` or enough fields to compute it
- `ctrl`: write-back controls

Control signals
The decoder in ID produces control bits and bundles them with the instruction. Typical fields include `RegWrite`, `ALUSrc`, `ALUControl`, `MemRead`, `MemWrite`, `MemToReg`, `Branch`, `Jump`, and `JumpR`, subject to the final approved LIMO ISA and implementation. `PCSrc` is a derived result of branch/jump evaluation in EX; it should not be treated as a decoded ID control bit.

Bubble and reset rules
- Reset clears the PC, registers/memories according to the project's agreed reset policy, pipeline registers, counters and status.
- A bubble is represented with `valid: false` and/or all side-effecting controls set to zero.
- Invalid pipeline slots must not write a register, write data memory or redirect the PC.
- Each cycle reads the old state and returns a new state; this makes stepping and back-stepping easier to test.

Decisions the team must confirm
Confirm address indexing, reset values, end-of-program behaviour, the exact control-bundle schema, and every instruction encoding against the frozen M1 ISA. This document defines a proposed data model; it is not proof that a pipeline implementation exists.
