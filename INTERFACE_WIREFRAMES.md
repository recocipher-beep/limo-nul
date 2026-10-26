┌──────────────────────────────────────────────────────────────────────────────┐
│ CS3520 · LIMO ISA                                                           │
│ LIMO Compiler                                                               │
│ Translate LIMO assembly into 32-bit machine code.                            │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│ SOURCE CODE                                                                  │
│ Registers R0–R31 · Labels · Semicolon comments                               │
│                                        [Load example] [Clear] [Compile]      │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                          │ │
│ │ Assembly source editor (multiline text area)                             │ │
│ │                                                                          │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│ Supported formats: R, I, S, B and J. Immediates may be decimal or hexadecimal.│
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│ COMPILATION OUTPUT                                                           │
│ Compile source to see results.                                               │
│                                                                              │
│ [Compilation errors, if any, are shown here.]                               │
│                                                                              │
│ ┌──────┬─────────┬─────────────┬────────────────────────┬─────────────────┐  │
│ │ Line │ Address │ Instruction │ Binary (32 bits)       │ Hex             │  │
│ ├──────┼─────────┼─────────────┼────────────────────────┼─────────────────┤  │
│ │ Output rows appear here after a successful compilation.                  │  │
│ │ Before compilation: “No output yet.”                                      │  │
│ └──────┴─────────┴─────────────┴────────────────────────┴─────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘

Runs locally in your browser. Assembler only; it does not execute instructions.