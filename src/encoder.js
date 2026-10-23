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
