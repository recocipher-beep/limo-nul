
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


function encodeRFormat(inst, rd, rs1, rs2) {
  const rdNum = getRegNumber(rd);
  const rs1Num = getRegNumber(rs1);
  const rs2Num = getRegNumber(rs2);

  
  const machineCode = 
    (inst.funct7 << 25) | 
    (rs2Num << 20) | 
    (rs1Num << 15) | 
    (inst.funct3 << 12) | 
    (rdNum << 7) | 
    inst.opcode;

  return machineCode >>> 0; 
}


function encodeIFormat(inst, rd, rs1, immStr) {
  const rdNum = getRegNumber(rd);
  const rs1Num = getRegNumber(rs1);
  const imm = parseInt(immStr, 10); 

  
  if (isNaN(imm) || imm < -2048 || imm > 2047) {
    throw new Error(`Immediate out of bounds for I-format: ${immStr}`);
  }

  
  const immMasked = imm & 0xFFF;

  const machineCode = 
    (immMasked << 20) | 
    (rs1Num << 15) | 
    (inst.funct3 << 12) | 
    (rdNum << 7) | 
    inst.opcode;

  return machineCode >>> 0;
}
