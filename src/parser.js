
function parseLimoLine(rawLine) {
  let line = rawLine.split(';')[0].trim();
  
  if (line === "") return null;
  let label = null;
  if (line.includes(':')) {
    let parts = line.split(':');
    label = parts[0].trim();
    line = parts[1].trim(); 
  }
  if (line === "") {
    return { label: label, mnemonic: null, operands: [] };
  }
  let tokens = line.split(/[\s,]+/);
  let mnemonic = tokens[0].toLowerCase();
  let operands = tokens.slice(1);

  return {
    label: label,
    mnemonic: mnemonic,
    operands: operands,
    originalText: rawLine.trim()
  };
}

function parseLimoProgram(fileContent) {
  let lines = fileContent.split('\n');
  let parsedInstructions = [];
  
  for (let i = 0; i < lines.length; i++) {
    let parsed = parseLimoLine(lines[i]);
    if (parsed) {
      parsed.lineNumber = i + 1; 
      parsedInstructions.push(parsed);
    }
  }
  
  return parsedInstructions;
}
