#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting comprehensive test suite for Keploy API\n');

// Function to run command and log output
function runCommand(command, description) {
    console.log(`📋 ${description}...`);
    try {
        const output = execSync(command, { 
            encoding: 'utf8', 
            stdio: 'pipe' 
        });
        console.log('✅ Completed successfully\n');
        return output;
    } catch (error) {
        console.log(`❌ Failed: ${error.message}\n`);
        throw error;
    }
}

// Install dependencies if needed
try {
    if (!fs.existsSync('node_modules')) {
        runCommand('npm install', 'Installing dependencies');
    }
} catch (error) {
    console.log('Please run "npm install" first to install dependencies\n');
    process.exit(1);
}

console.log('🧪 Test Execution Plan:');
console.log('1. Unit Tests (Authentication & Validation)');
console.log('2. Integration Tests (Database Operations)'); 
console.log('3. API Tests (Endpoint Functionality)');
console.log('4. Coverage Report Generation\n');

try {
    // Run unit tests
    console.log('🔍 Running Unit Tests...');
    runCommand('npm run test:unit', 'Unit tests execution');

    // Run integration tests  
    console.log('🔗 Running Integration Tests...');
    runCommand('npm run test:integration', 'Integration tests execution');

    // Run API tests
    console.log('🌐 Running API Tests...');
    runCommand('npm run test:api', 'API tests execution');

    // Generate coverage report
    console.log('📊 Generating Coverage Report...');
    const coverageOutput = runCommand('npm run test:coverage', 'Coverage analysis');
    
    console.log('📈 Test Coverage Summary:');
    console.log(coverageOutput);

    // Check if coverage meets threshold
    if (coverageOutput.includes('All files')) {
        console.log('🎯 Coverage Analysis:');
        
        // Extract coverage percentages
        const lines = coverageOutput.split('\n');
        const coverageLine = lines.find(line => line.includes('All files'));
        
        if (coverageLine) {
            const coverageMatch = coverageLine.match(/(\d+(?:\.\d+)?)/g);
            if (coverageMatch && coverageMatch.length >= 4) {
                const [statements, branches, functions, lines] = coverageMatch;
                
                console.log(`   Statements: ${statements}%`);
                console.log(`   Branches: ${branches}%`);
                console.log(`   Functions: ${functions}%`);
                console.log(`   Lines: ${lines}%`);
                
                // Check if all coverage types meet 70% threshold
                const allAboveThreshold = [statements, branches, functions, lines]
                    .every(coverage => parseFloat(coverage) >= 70);
                
                if (allAboveThreshold) {
                    console.log('\n🏆 Excellent! All coverage metrics exceed 70% threshold');
                } else {
                    console.log('\n⚠️  Some coverage metrics are below 70% threshold');
                }
            }
        }
    }

    console.log('\n✨ All tests completed successfully!');
    console.log('\n📁 Coverage reports generated in:');
    console.log('   - coverage/lcov-report/index.html (HTML report)');
    console.log('   - coverage/lcov.info (LCOV format)');
    
    console.log('\n🎉 Test Summary:');
    console.log('   ✅ Unit Tests: Passed');
    console.log('   ✅ Integration Tests: Passed');
    console.log('   ✅ API Tests: Passed');
    console.log('   ✅ Coverage Report: Generated');

} catch (error) {
    console.log('\n❌ Test execution failed');
    console.log('Please check the error messages above and fix any issues');
    process.exit(1);
} 