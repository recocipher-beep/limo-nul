// Simple test runner for the LIMO assembler
function runAssemblerTests() {
  const tests = [
    { code: "kpn R7, R5, R6", expectedHex: "0x006283B3" },
    { code: "kpnh R5, R0, 1", expectedHex: "0x00100293" },
    { code: "bl R6, 4(R10)", expectedHex: "0x00652223" },
    { code: "khk R5, R7, +8", expectedHex: "0x0072D463" },
    { code: "tl -12", expectedHex: "0xFF5FF06F" }
  ];

  let passed = 0;
  let failed = 0;

  console.log("--- Running LIMO Assembler Tests ---");

  tests.forEach((test, index) => {
    // Run the main assembler function
    const result = assembleProgram(test.code);
    
    if (!result.success) {
      console.error(`❌ Test ${index + 1} FAILED: Assembly error -> ${result.errors.join(', ')}`);
      failed++;
      return;
    }

    const actualHex = result.machineCode[0].hex;
    
    if (actualHex === test.expectedHex) {
      console.log(`✅ Test ${index + 1} PASSED: "${test.code}" -> ${actualHex}`);
      passed++;
    } else {
      console.error(`❌ Test ${index + 1} FAILED: "${test.code}"`);
      console.error(`   Expected: ${test.expectedHex}`);
      console.error(`   Actual:   ${actualHex}`);
      failed++;
    }
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
}

// Call the function to run the tests
runAssemblerTests();
