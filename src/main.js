// Make sure this file is loaded after assembler.js, parser.js, and encoder.js

function assembleProgram(sourceCode) {
  // 1. Parse the text into an array of instruction objects
  const parsedLines = parseLimoProgram(sourceCode);
  
  let machineCodeArray = [];
  let errors = [];
  let currentAddress = 0;

  // First pass: Calculate addresses for all labels
  const labels = {};
  for (let i = 0; i < parsedLines.length; i++) {
    const line = parsedLines[i];
    if (line.label) {
      labels[line.label] = currentAddress;
    }
    if (line.mnemonic) {
      currentAddress += 4; // Each instruction is 4 bytes
    }
  }

  // Second pass: Encode the instructions
  currentAddress = 0;
  for (let i = 0; i < parsedLines.length; i++) {
    const line = parsedLines[i];
    
    // Skip lines that are just labels
    if (!line.mnemonic) continue;

    const inst = INSTRUCTIONS[line.mnemonic];
    
    if (!inst) {
      errors.push(`Line ${line.lineNumber}: Unknown mnemonic '${line.mnemonic}'`);
      currentAddress += 4;
      continue;
    }

    try {
      let hexCode = 0;

      // Handle Labels for branches/jumps (convert label name to offset)
      let immValue = line.operands[line.operands.length - 1]; // Usually the last operand
      if (labels[immValue] !== undefined) {
         // Calculate offset = Target Address - Current Address
         // (Note: Real RISC-V calculates from the next instruction, we'll refine this later)
         immValue = labels[immValue] - currentAddress; 
      }
      
      // Remove parentheses for memory operands like 4(R10)
      let cleanOperands = line.operands.map(op => op.replace(/[()]/g, ' ').trim().split(/\s+/)).flat();

      switch (inst.format) {
        case "R":
          hexCode = encodeRFormat(inst, cleanOperands[0], cleanOperands[1], cleanOperands[2]);
          break;
        case "I":
          // Handle both kpnh (3 operands) and tsl (2 operands e.g., tsl rd, 0(rs1))
          if (line.mnemonic === 'tsl') {
             hexCode = encodeIFormat(inst, cleanOperands[0], cleanOperands[2] || cleanOperands[1], cleanOperands[1] || cleanOperands[2]);
          } else {
             hexCode = encodeIFormat(inst, cleanOperands[0], cleanOperands[1], cleanOperands[2]);
          }
          break;
        case "S":
          hexCode = encodeSFormat(inst, cleanOperands[0], cleanOperands[2] || cleanOperands[1], cleanOperands[1] || cleanOperands[2]);
          break;
        case "B":
          hexCode = encodeBFormat(inst, cleanOperands[0], cleanOperands[1], immValue);
          break;
        case "J":
          hexCode = encodeJFormat(inst, cleanOperands[0] || 'R0', immValue); // Default to R0 if just 'tl'
          break;
      }

      // Format as Hex and Binary for the UI
      const hexString = "0x" + hexCode.toString(16).toUpperCase().padStart(8, '0');
      const binString = hexCode.toString(2).padStart(32, '0');

      machineCodeArray.push({
        lineNumber: line.lineNumber,
        originalText: line.originalText,
        hex: hexString,
        binary: binString
      });

    } catch (error) {
      errors.push(`Line ${line.lineNumber}: ${error.message}`);
    }
    
    currentAddress += 4;
  }

  return {
    success: errors.length === 0,
    machineCode: machineCodeArray,
    errors: errors
  };
}
