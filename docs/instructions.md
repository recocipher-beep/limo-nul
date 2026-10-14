# A3 - LIMO Instruction Set

LIMO has 20 instructions: 3 arithmetic, 6 logical, 2 shift, 2 memory (word load and store), 3 jump and 4 conditional branch. `tl` is an alias of `tlk` with rd = R0 (Lefela).

| Category | LIMO mnemonic | Sesotho full term | RV32I equivalent | Format | Syntax | Operation |
|----------|---------------|-------------------|------------------|--------|--------|-----------|
| Arithmetic | `kpn` | kopanya | `add` | R | `kpn rd, rs1, rs2` | rd = rs1 + rs2 |
| Arithmetic | `tls` | tlosa | `sub` | R | `tls rd, rs1, rs2` | rd = rs1 - rs2 |
| Arithmetic | `kpnh` | kopanya hang-hang | `addi` | I | `kpnh rd, rs1, imm` | rd = rs1 + imm |
| Logical | `le` | le | `and` | R | `le rd, rs1, rs2` | rd = rs1 AND rs2 |
| Logical | `kp` | kapa | `or` | R | `kp rd, rs1, rs2` | rd = rs1 OR rs2 |
| Logical | `kpe` | kapa e khethehileng | `xor` | R | `kpe rd, rs1, rs2` | rd = rs1 XOR rs2 |
| Logical | `leh` | le hang-hang | `andi` | I | `leh rd, rs1, imm` | rd = rs1 AND imm |
| Logical | `kph` | kapa hang-hang | `ori` | I | `kph rd, rs1, imm` | rd = rs1 OR imm |
| Logical | `kpeh` | kapa e khethehileng hang-hang | `xori` | I | `kpeh rd, rs1, imm` | rd = rs1 XOR imm |
| Shift | `stts` | Suthisa letsohong le letšehali | `sll` | R | `stts rd, rs1, rs2` | rd = rs1 << rs2[4:0] (shift left) |
| Shift | `stto` | Suthisa letsohong le letona | `srl` | R | `stto rd, rs1, rs2` | rd = rs1 >> rs2[4:0] (logical shift right) |
| Memory | `tsl` | Ts'ela lentsoe | `lw` | I | `tsl rd, imm(rs1)` | rd = Mem[rs1 + imm] (word) |
| Memory | `bl` | Boloka lentsoe | `sw` | S | `bl rs2, imm(rs1)` | Mem[rs1 + imm] = rs2 (word) |
| Jump | `tlk` | tlola u khutla | `jal` | J | `tlk rd, label` | rd = PC + 4; PC = PC + offset |
| Jump | `tlkr` | tlola u khutla ka registara | `jalr` | I | `tlkr rd, rs1, imm` | rd = PC + 4; PC = rs1 + imm |
| Jump | `tl` | tlola | `j` | J (alias) | `tl label` | PC = PC + offset (same as tlk with rd = R0) |
| Branch | `khl` | Kheloha ha li lekana | `beq` | B | `khl rs1, rs2, label` | if rs1 == rs2: PC = PC + offset |
| Branch | `khsl` | Kheloha ha li sa lekane | `bne` | B | `khsl rs1, rs2, label` | if rs1 != rs2: PC = PC + offset |
| Branch | `khn` | Kheloha ha e le nyane | `blt` | B | `khn rs1, rs2, label` | if rs1 < rs2 (signed): PC = PC + offset |
| Branch | `khk` | Kheloha ha e le kholo | `bge` | B | `khk rs1, rs2, label` | if rs1 >= rs2 (signed): PC = PC + offset |

Formats: R = register-register, I = immediate, S = store, B = branch, J = jump (RV32I-derived). Immediates are written in decimal or hex.
