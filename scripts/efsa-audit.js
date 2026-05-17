#!/usr/bin/env node

/**
 * EFSA Compliance Audit Script
 * Scans MD/MDX/TSX/TS/JSON files for forbidden health claim phrases
 * and generates a violations report.
 *
 * Usage: node scripts/efsa-audit.js [--fix]
 *   --fix    Attempt to auto-fix violations (writes to files)
 *   (no flag) Generate violation report only
 */

const fs = require('fs');
const path = require('path');

// ── Forbidden patterns with EFSA-compliant replacements ──────────────────
const FORBIDDEN_PATTERNS = [
  {
    id: 'F01',
    pattern: /verlaagt\s+cortisol/gi,
    severity: 'HIGH',
    reason: 'Specifieke medische claim over hormoonverlaging',
    replacement: 'kan helpen bij het ondersteunen van een normale stressrespons (op basis van gebruikerservaringen)',
    category: 'medische_claim',
  },
  {
    id: 'F02',
    pattern: /verlaagt\s+stress/gi,
    severity: 'HIGH',
    reason: 'Specifieke medische claim over stressverlaging',
    replacement: 'ondersteunt mentale veerkracht (volgens gebruikerservaringen)',
    category: 'medische_claim',
  },
  {
    id: 'F03',
    pattern: /versterkt\s+(het\s+)?immuunsysteem/gi,
    severity: 'HIGH',
    reason: 'Niet-toegestane gezondheidsclaim voor voedingssupplementen',
    replacement: 'ondersteunt de normale werking van het immuunsysteem (geclaimd door fabrikant)',
    category: 'gezondheidsclaim',
  },
  {
    id: 'F04',
    pattern: /\bgeneest\b/gi,
    severity: 'CRITICAL',
    reason: 'Verboden medische claim — producten genezen geen ziekten',
    replacement: null, // must be rewritten manually
    category: 'verboden_claim',
  },
  {
    id: 'F05',
    pattern: /\bbehandelt\b/gi,
    severity: 'CRITICAL',
    reason: 'Verboden medische claim — producten behandelen geen aandoeningen',
    replacement: null, // must be rewritten manually
    category: 'verboden_claim',
  },
  {
    id: 'F06',
    pattern: /klinisch\s+bewezen/gi,
    severity: 'HIGH',
    reason: 'Te stellige claim — moet worden genuanceerd',
    replacement: 'onderzocht in klinische studies (zie referenties)',
    category: 'overdreven_claim',
  },
  {
    id: 'F07',
    pattern: /voorkomt\s+ziekte/gi,
    severity: 'CRITICAL',
    reason: 'Verboden preventieclaim — supplementen voorkomen geen ziekten',
    replacement: null, // entire sentence must be removed
    category: 'verboden_claim',
  },
  {
    id: 'F08',
    pattern: /produceert\s+GABA/gi,
    severity: 'HIGH',
    reason: 'Specifieke biochemische claim zonder voldoende klinisch bewijs in vivo',
    replacement: 'In vitro onderzoek suggereert dat bepaalde bacteriestammen GABA kunnen produceren (bron: PubMed-studies naar darmflora)',
    category: 'biochemische_claim',
  },
  {
    id: 'F09',
    pattern: /verhoogt\s+serotonine/gi,
    severity: 'HIGH',
    reason: 'Specifieke biochemische claim zonder voldoende klinisch bewijs in vivo',
    replacement: 'Preklinisch onderzoek suggereert dat bepaalde bacteriestammen de serotonineproductie kunnen ondersteunen (bron: wetenschappelijke studies naar darm-hersen-as)',
    category: 'biochemische_claim',
  },
  {
    id: 'F10',
    pattern: /verbetert\s+(de\s+)?gezondheid\s+van\s+(het\s+)?hart/gi,
    severity: 'MEDIUM',
    reason: 'Te brede gezondheidsclaim — moet specifiek en genuanceerd',
    replacement: 'draagt bij aan de normale werking van het hart (EFSA-goedgekeurde claim bij voldoende EPA/DHA)',
    category: 'gezondheidsclaim',
  },
  {
    id: 'F11',
    pattern: /bestrijdt\s+ontstekingen/gi,
    severity: 'HIGH',
    reason: 'Medische claim — supplementen bestrijden geen ontstekingen',
    replacement: 'ondersteunt het lichaam bij normale ontstekingsprocessen (volgens gebruikerservaringen)',
    category: 'medische_claim',
  },
  {
    id: 'F12',
    pattern: /werkt\s+tegen\s+veroudering/gi,
    severity: 'MEDIUM',
    reason: 'Cosmetische claim zonder onderbouwing',
    replacement: 'ondersteunt de normale huidstructuur en collageenvorming',
    category: 'cosmetische_claim',
  },
  {
    id: 'F13',
    pattern: /garandeert\s+(gewicht|vet)verlies/gi,
    severity: 'CRITICAL',
    reason: 'Verboden gegarandeerde resultaatclaim',
    replacement: null, // must be rewritten
    category: 'verboden_claim',
  },
  {
    id: 'F14',
    pattern: /(100%|volledig)\s+(veilig|natuurlijk|effectief)/gi,
    severity: 'MEDIUM',
    reason: 'Absolute claims zijn misleidend',
    replacement: 'gemaakt met natuurlijke ingrediënten',
    category: 'overdreven_claim',
  },
  {
    id: 'F15',
    pattern: /(werkt|helpt)\s+(altijd| gegarandeerd| gegarandeert| bij iedereen)/gi,
    severity: 'HIGH',
    reason: 'Gegarandeerde resultaatclaim — individuele resultaten variëren',
    replacement: 'Veel gebruikers rapporteren positieve ervaringen, hoewel individuele resultaten kunnen variëren.',
    category: 'overdreven_claim',
  },
];

// ── Medical disclaimer text ──────────────────────────────────────────────
const MEDICAL_DISCLAIMER =
  'Deze informatie is uitsluitend voor educatieve doeleinden en vervangt geen medisch advies. Raadpleeg altijd een arts bij gezondheidsklachten.';

const NVWA_DISCLAIMER =
  '* Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.';

// ── File extensions to scan ──────────────────────────────────────────────
const SCAN_EXTENSIONS = ['.mdx', '.md', '.tsx', '.ts', '.json'];

// ── Directories to scan ──────────────────────────────────────────────────
const SCAN_DIRS = ['content', 'app', 'components', 'lib'];

// ── Files/dirs to exclude ────────────────────────────────────────────────
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.next',
  '.claude',
  'package-lock.json',
  '.eslintrc.json',
  'tsconfig.json',
  'Amare Producten',
  'public',
  '.vercel',
];

// ── Helper functions ─────────────────────────────────────────────────────

function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some((p) => filePath.includes(p));
}

function hasValidExtension(filePath) {
  return SCAN_EXTENSIONS.some((ext) => filePath.endsWith(ext));
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (shouldExclude(fullPath)) return;

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (hasValidExtension(fullPath)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function hasDisclaimer(content) {
  return (
    content.includes('vervangt geen medisch advies') ||
    content.includes('vervangen geen medisch advies') ||
    content.includes('raadpleeg altijd een arts') ||
    content.includes('Raadpleeg altijd een arts')
  );
}

function hasNVWADisclaimer(content) {
  return (
    content.includes('niet beoordeeld door de NVWA') ||
    content.includes('Niet beoordeeld door de NVWA')
  );
}

// ── Main scan function ───────────────────────────────────────────────────

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations = [];

  FORBIDDEN_PATTERNS.forEach((rule) => {
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      // Reset regex lastIndex
      rule.pattern.lastIndex = 0;
      const match = rule.pattern.exec(line);
      if (match) {
        violations.push({
          file: filePath,
          line: lineNumber,
          column: match.index + 1,
          ruleId: rule.id,
          severity: rule.severity,
          category: rule.category,
          reason: rule.reason,
          matched: match[0],
          context: line.trim().substring(0, 120),
          hasReplacement: rule.replacement !== null,
        });
      }
    });
  });

  // Check for medical disclaimer
  const missingDisclaimer = !hasDisclaimer(content);
  const missingNVWA = !hasNVWADisclaimer(content);

  return { violations, missingDisclaimer, missingNVWA, content, filePath };
}

function autoFix(filePath, content, violations) {
  let fixed = content;
  let fixCount = 0;

  // Group violations by rule, fix from bottom to top to preserve line numbers
  const uniqueRules = [...new Set(violations.map((v) => v.ruleId))];

  uniqueRules.forEach((ruleId) => {
    const rule = FORBIDDEN_PATTERNS.find((r) => r.id === ruleId);
    if (!rule || !rule.replacement) return;

    const before = fixed;
    fixed = fixed.replace(rule.pattern, rule.replacement);
    if (fixed !== before) {
      fixCount++;
      console.log(`  ✓ [${ruleId}] Auto-fixed: "${rule.replacement.substring(0, 40)}..."`);
    }
  });

  // For CRITICAL violations without auto-replacement, add a comment marker
  const criticalNoFix = violations.filter((v) => v.severity === 'CRITICAL' && !v.hasReplacement);
  if (criticalNoFix.length > 0) {
    console.log(`  ⚠ ${criticalNoFix.length} CRITICAL violation(s) require manual rewrite:`);
    criticalNoFix.forEach((v) => {
      console.log(`     Line ${v.line}: "${v.context}"`);
    });
  }

  return { fixed, fixCount, manualFixesNeeded: criticalNoFix.length };
}

// ── Report generation ────────────────────────────────────────────────────

function generateReport(allResults, outputPath) {
  const totalViolations = allResults.reduce((sum, r) => sum + r.violations.length, 0);
  const filesWithViolations = allResults.filter((r) => r.violations.length > 0);
  const filesMissingDisclaimer = allResults.filter((r) => r.missingDisclaimer && r.filePath.endsWith('.tsx') || r.filePath.endsWith('.mdx'));
  const filesMissingNVWA = allResults.filter((r) => r.missingNVWA && r.filePath.endsWith('.tsx') || r.filePath.endsWith('.mdx'));

  let report = '';
  report += '# EFSA Compliance Audit Report\n';
  report += `> Generated: ${new Date().toISOString().split('T')[0]}\n`;
  report += `> Scanned: ${allResults.length} files\n`;
  report += `> Violations found: ${totalViolations}\n`;
  report += `> Files with violations: ${filesWithViolations.length}\n`;
  report += `> Missing medical disclaimer: ${filesMissingDisclaimer.length} pages\n`;
  report += `> Missing NVWA disclaimer: ${filesMissingNVWA.length} pages\n\n`;

  report += '---\n\n';
  report += '## Summary by Severity\n\n';
  report += '| Severity | Count |\n';
  report += '|----------|-------|\n';
  ['CRITICAL', 'HIGH', 'MEDIUM'].forEach((sev) => {
    const count = allResults.reduce((sum, r) => sum + r.violations.filter((v) => v.severity === sev).length, 0);
    report += `| ${sev} | ${count} |\n`;
  });
  report += '\n---\n\n';

  if (filesWithViolations.length > 0) {
    report += '## Violations by File\n\n';
    filesWithViolations.forEach((result) => {
      const shortPath = result.filePath.replace(/^.*?AmareNL\.com\//, '');
      report += `### ${shortPath} (${result.violations.length} violations)\n\n`;
      report += '| Line | Rule | Severity | Matched |\n';
      report += '|------|------|----------|--------|\n';
      result.violations.forEach((v) => {
        report += `| ${v.line} | ${v.ruleId} | ${v.severity} | \`${v.matched}\` |\n`;
      });
      report += '\n';
    });
  } else {
    report += '## ✅ No violations found\n\n';
  }

  if (filesMissingDisclaimer.length > 0 || filesMissingNVWA.length > 0) {
    report += '## Missing Disclaimers\n\n';
    if (filesMissingDisclaimer.length > 0) {
      report += '### Missing Medical Disclaimer\n';
      filesMissingDisclaimer.forEach((r) => {
        report += `- \`${r.filePath.replace(/^.*?AmareNL\.com\//, '')}\`\n`;
      });
      report += '\n';
    }
    if (filesMissingNVWA.length > 0) {
      report += '### Missing NVWA Disclaimer\n';
      filesMissingNVWA.forEach((r) => {
        report += `- \`${r.filePath.replace(/^.*?AmareNL\.com\//, '')}\`\n`;
      });
      report += '\n';
    }
  }

  // Write report
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, report);
  console.log(`\n📄 Report saved: ${outputPath}`);
}

// ── CLI ──────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const shouldFix = args.includes('--fix');
  const projectRoot = path.resolve(__dirname, '..');

  console.log('🔍 EFSA Compliance Audit');
  console.log(`   Root: ${projectRoot}`);
  console.log(`   Mode: ${shouldFix ? 'SCAN + FIX' : 'SCAN ONLY'}\n`);

  // Collect all files
  let allFiles = [];
  SCAN_DIRS.forEach((dir) => {
    const fullPath = path.join(projectRoot, dir);
    allFiles = getAllFiles(fullPath, allFiles);
  });

  console.log(`📁 Scanning ${allFiles.length} files across ${SCAN_DIRS.join(', ')}...\n`);

  // Scan each file
  const results = [];
  let totalFixed = 0;
  let totalManualFixes = 0;

  for (const filePath of allFiles) {
    const result = scanFile(filePath);
    results.push(result);

    if (result.violations.length > 0) {
      const shortPath = filePath.replace(projectRoot + '/', '');
      console.log(`\n📝 ${shortPath} — ${result.violations.length} violation(s)`);

      result.violations.forEach((v) => {
        console.log(`  [${v.ruleId}] L${v.line}:${v.column} ${v.severity} — "${v.matched}"`);
      });

      if (result.missingDisclaimer) {
        console.log(`  ⚠ Missing medical disclaimer`);
      }
      if (result.missingNVWA) {
        console.log(`  ⚠ Missing NVWA disclaimer`);
      }

      if (shouldFix) {
        // Try auto-fix
        const { fixed, fixCount, manualFixesNeeded } = autoFix(filePath, result.content, result.violations);

        if (fixCount > 0) {
          fs.writeFileSync(filePath, fixed);
          console.log(`  ✅ Applied ${fixCount} auto-fix(es)`);
          totalFixed += fixCount;
        }

        // Add missing disclaimers — only for MDX content files (TSX pages get them via layout/components)
        let contentWithDisclaimer = fixed;
        if (result.missingDisclaimer && filePath.endsWith('.mdx')) {
          contentWithDisclaimer += `\n\n> ${MEDICAL_DISCLAIMER}\n`;
          console.log(`  ✅ Added medical disclaimer`);
        }
        if (result.missingNVWA && filePath.endsWith('.mdx')) {
          contentWithDisclaimer += `\n\n${NVWA_DISCLAIMER}\n`;
          console.log(`  ✅ Added NVWA disclaimer`);
        }
        if (contentWithDisclaimer !== fixed) {
          fs.writeFileSync(filePath, contentWithDisclaimer);
        }

        totalManualFixes += manualFixesNeeded;
      }
    }
  }

  // Generate report
  const reportPath = path.join(projectRoot, 'docs', 'efsa-violations.md');
  generateReport(results, reportPath);

  // Summary
  const grandTotal = results.reduce((sum, r) => sum + r.violations.length, 0);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 AUDIT SUMMARY`);
  console.log(`${'='.repeat(60)}`);
  console.log(`  Files scanned:      ${allFiles.length}`);
  console.log(`  Total violations:   ${grandTotal}`);
  console.log(`  Auto-fixed:         ${totalFixed}`);
  console.log(`  Needs manual fix:   ${totalManualFixes}`);
  console.log(`  Missing disclaimer: ${results.filter((r) => r.missingDisclaimer).length}`);
  console.log(`  Missing NVWA:       ${results.filter((r) => r.missingNVWA).length}`);

  if (shouldFix && grandTotal === 0) {
    console.log(`\n✅ All clear — 0 EFSA violations`);
  } else if (!shouldFix && grandTotal > 0) {
    console.log(`\n💡 Run with --fix to auto-correct violations: node scripts/efsa-audit.js --fix`);
  }

  process.exit(grandTotal > 0 && !shouldFix ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(2);
});
