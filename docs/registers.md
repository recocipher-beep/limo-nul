# A2 - LIMO Registers (32)

LIMO has 32 general-purpose registers (R0-R31). Each register field in an instruction (rd, rs1, rs2) is 5 bits wide (2^5 = 32), the same as RV32I.

| Register | Sesotho name | Role / Purpose |
|----------|--------------|----------------|
| R0 | Lefela | Always holds 0. Writing to it does not change its value. |
| R1 | Aterese ea Khutlo | Stores the address the program returns to after a function call. |
| R2 | Sesupa Pokello | Points to the current top of the stack in memory. |
| R3 | Sesupa Kakaretso | Points to the area used for the program's global data. |
| R4 | Sesupa Mola | Points to data related to the current thread of execution. |
| R5 | Nakoana1 | Temporary: short-term values during execution. |
| R6 | Nakoana2 | Temporary: short-term values during execution. |
| R7 | Nakoana3 | Temporary: short-term values during execution. |
| R8 | Bolokiloeng1 | Saved: values that must be kept across function calls. |
| R9 | Bolokiloeng2 | Saved: values that must be kept across function calls. |
| R10 | Khang1 | Argument to a function / return value. |
| R11 | Khang2 | Argument to a function / return value. |
| R12 | Khang3 | Argument to a function. |
| R13 | Khang4 | Argument to a function. |
| R14 | Khang5 | Argument to a function. |
| R15 | Khang6 | Argument to a function. |
| R16 | Khang7 | Argument to a function. |
| R17 | Khang8 | Argument to a function. |
| R18 | Bolokiloeng3 | Saved: values that must be kept across function calls. |
| R19 | Bolokiloeng4 | Saved: values that must be kept across function calls. |
| R20 | Bolokiloeng5 | Saved: values that must be kept across function calls. |
| R21 | Bolokiloeng6 | Saved: values that must be kept across function calls. |
| R22 | Bolokiloeng7 | Saved: values that must be kept across function calls. |
| R23 | Bolokiloeng8 | Saved: values that must be kept across function calls. |
| R24 | Bolokiloeng9 | Saved: values that must be kept across function calls. |
| R25 | Bolokiloeng10 | Saved: values that must be kept across function calls. |
| R26 | Bolokiloeng11 | Saved: values that must be kept across function calls. |
| R27 | Bolokiloeng12 | Saved: values that must be kept across function calls. |
| R28 | Nakoana4 | Temporary: short-term values during execution. |
| R29 | Nakoana5 | Temporary: short-term values during execution. |
| R30 | Nakoana6 | Temporary: short-term values during execution. |
| R31 | Nakoana7 | Temporary: short-term values during execution. |
| PC | Sesupa Taelo | Separate register (not in the register file). Holds the address of the next instruction. |

## Groups

- Special-purpose: R0-R4 and PC
- Arguments (Khang1-8): R10-R17
- Temporaries (Nakoana1-7): R5-R7, R28-R31
- Saved (Bolokiloeng1-12): R8-R9, R18-R27
