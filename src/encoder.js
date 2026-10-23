// --- Register Helper ---
// Converts "R7" to the number 7, and throws an error if it's invalid.
function getRegNumber(regStr) {
  if (!regStr || !regStr.toUpperCase().startsWith('R')) {
    throw new Error(`Invalid register: ${regStr}`);
  }
  const num = parseInt(regStr.substring(1), 10);
  if (isNaN(num) || num < 0 || num > 31) {
    throw new Error(`Register out of bounds: ${regStr}`);
  }
  return num;
}

// --- R-Format Encoder ---
// Syntax: kpn rd, rs1, rs2
// Bits: funct7 (7) | rs2 (5) | rs1 (5) | funct3 (3) | rd (5) | opcode (7)
function encodeRFormat(inst, rd, rs1, rs2) {
  const rdNum = getRegNumber(rd);
  const rs1Num = getRegNumber(rs1);
  const rs2Num = getRegNumber(rs2);

  // Use bitwise shifts to push everything into the correct position
  const machineCode = 
    (inst.funct7 << 25) | 
    (rs2Num << 20) | 
    (rs1Num << 15) | 
    (inst.funct3 << 12) | 
    (rdNum << 7) | 
    inst.opcode;

  return machineCode >>> 0; // Force it to be an unsigned 32-bit integer
}

// --- I-Format Encoder ---
// Syntax: kpnh rd, rs1, imm
// Bits: imm[11:0] (12) | rs1 (5) | funct3 (3) | rd (5) | opcode (7)
function encodeIFormat(inst, rd, rs1, immStr) {
  const rdNum = getRegNumber(rd);
  const rs1Num = getRegNumber(rs1);
  const imm = parseInt(immStr, 10); // Convert string to integer

  // Check the range for a 12-bit signed integer (-2048 to 2047)
  if (isNaN(imm) || imm < -2048 || imm > 2047) {
    throw new Error(`Immediate out of bounds for I-format: ${immStr}`);
  }

  // Mask the immediate to ensure it is exactly 12 bits
  const immMasked = imm & 0xFFF;

  const machineCode = 
    (immMasked << 20) | 
    (rs1Num << 15) | 
    (inst.funct3 << 12) | 
    (rdNum << 7) | 
    inst.opcode;

  return machineCode >>> 0;
}

// --- S-Format Encoder (Store) ---
// Syntax: bl rs2, imm(rs1)
// Bits: imm[11:5] (7) | rs2 (5) | rs1 (5) | funct3 (3) | imm[4:0] (5) | opcode (7)
function encodeSFormat(inst, rs2, rs1, immStr) {
  const rs2Num = getRegNumber(rs2);
  const rs1Num = getRegNumber(rs1);
  const imm = parseInt(immStr, 10);

  if (isNaN(imm) || imm < -2048 || imm > 2047) {
    throw new Error(`Immediate out of bounds for S-format: ${immStr}`);
  }

  // Split the immediate into two pieces
  const imm11_5 = (imm >> 5) & 0x7F; // Top 7 bits
  const imm4_0 = imm & 0x1F;         // Bottom 5 bits

  const machineCode = 
    (imm11_5 << 25) | 
    (rs2Num << 20) | 
    (rs1Num << 15) | 
    (inst.funct3 << 12) | 
    (imm4_0 << 7) | 
    inst.opcode;

  return machineCode >>> 0;
}

// --- B-Format Encoder (Branch) ---
// Syntax: khk rs1, rs2, imm
// Bits: imm[12] | imm[10:5] | rs2 | rs1 | funct3 | imm[4:1] | imm[11] | opcode
function encodeBFormat(inst, rs1, rs2, immStr) {
  const rs1Num = getRegNumber(rs1);
  const rs2Num = getRegNumber(rs2);
  const imm = parseInt(immStr, 10);

  // B-format reach is 13 bits (-4096 to 4094, steps of 2)
  if (isNaN(imm) || imm < -4096 || imm > 4094 || imm % 2 !== 0) {
    throw new Error(`Invalid branch offset: ${immStr}. Must be even and within range.`);
  }

  // Scramble the immediate into its 4 pieces
  const imm12    = (imm >> 12) & 0x1;
  const imm11    = (imm >> 11) & 0x1;
  const imm10_5  = (imm >> 5) & 0x3F;
  const imm4_1   = (imm >> 1) & 0xF;

  const machineCode = 
    (imm12 << 31) | 
    (imm10_5 << 25) | 
    (rs2Num << 20) | 
    (rs1Num << 15) | 
    (inst.funct3 << 12) | 
    (imm4_1 << 8) | 
    (imm11 << 7) | 
    inst.opcode;

  return machineCode >>> 0;
}

// --- J-Format Encoder (Jump) ---
// Syntax: tlk rd, imm or tl imm
// Bits: imm[20] | imm[10:1] | imm[11] | imm[19:12] | rd | opcode
function encodeJFormat(inst, rd, immStr) {
  const rdNum = getRegNumber(rd);
  const imm = parseInt(immStr, 10);

  // J-format reach is 21 bits (-1048576 to 1048574, steps of 2)
  if (isNaN(imm) || imm < -1048576 || imm > 1048574 || imm % 2 !== 0) {
    throw new Error(`Invalid jump offset: ${immStr}. Must be even and within range.`);
  }

  // Scramble the immediate into its 4 pieces
  const imm20    = (imm >> 20) & 0x1;
  const imm19_12 = (imm >> 12) & 0xFF;
  const imm11    = (imm >> 11) & 0x1;
  const imm10_1  = (imm >> 1) & 0x3FF;

  const machineCode = 
    (imm20 << 31) | 
    (imm10_1 << 21) | 
    (imm11 << 20) | 
    (imm19_12 << 12) | 
    (rdNum << 7) | 
    inst.opcode;

  return machineCode >>> 0;
}
