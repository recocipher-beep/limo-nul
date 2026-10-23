const INSTRUCTIONS = {
  // R-Type
  "kpn": { format: "R", opcode: 0b0110011, funct3: 0b000, funct7: 0b0000000 }, // add
  "tls": { format: "R", opcode: 0b0110011, funct3: 0b000, funct7: 0b0100000 }, // sub
  "le":  { format: "R", opcode: 0b0110011, funct3: 0b111, funct7: 0b0000000 }, // and
  "kp":  { format: "R", opcode: 0b0110011, funct3: 0b110, funct7: 0b0000000 }, // or
  "kpe": { format: "R", opcode: 0b0110011, funct3: 0b100, funct7: 0b0000000 }, // xor
  "stts":{ format: "R", opcode: 0b0110011, funct3: 0b001, funct7: 0b0000000 }, // sll
  "stto":{ format: "R", opcode: 0b0110011, funct3: 0b101, funct7: 0b0000000 }, // srl

  // I-Type (Arithmetic)
  "kpnh":{ format: "I", opcode: 0b0010011, funct3: 0b000 }, // addi
  "kph": { format: "I", opcode: 0b0010011, funct3: 0b110 }, // ori
  "leh": { format: "I", opcode: 0b0010011, funct3: 0b111 }, // andi
  "kpeh":{ format: "I", opcode: 0b0010011, funct3: 0b100 }, // xori

  // Memory & Jumps (I, S, J)
  "tsl": { format: "I", opcode: 0b0000011, funct3: 0b010 }, // lw
  "bl":  { format: "S", opcode: 0b0100011, funct3: 0b010 }, // sw
  "tlkr":{ format: "I", opcode: 0b1100111, funct3: 0b000 }, // jalr
  "tlk": { format: "J", opcode: 0b1101111 },                 // jal
  "tl":  { format: "J", opcode: 0b1101111 },                 // j (jal x0)

  // Branches (B-Type)
  "khl": { format: "B", opcode: 0b1100011, funct3: 0b000 }, // beq
  "khsl":{ format: "B", opcode: 0b1100011, funct3: 0b001 }, // bne
  "khn": { format: "B", opcode: 0b1100011, funct3: 0b100 }, // blt
  "khk": { format: "B", opcode: 0b1100011, funct3: 0b101 }  // bge
};
