type CheckStatus = 'pass' | 'warning' | 'fail';

export type DeterministicCheck = {
  key: string;
  label: string;
  status: CheckStatus;
  detail: string;
};

export type GuardrailAnalysis = {
  checks: DeterministicCheck[];
  deterministicPros: string[];
  deterministicViolations: string[];
  securityFindings: string[];
  penaltyPoints: number;
  hasXmlTags: boolean;
  xmlTagNames: string[];
};

const SECURITY_PATTERNS: Array<{ pattern: RegExp; message: string }> = [
  {
    pattern: /ignore (all|any|the|previous|prior|above).*?(instructions|rules|judge|grader|system)/i,
    message: 'Contains language that tries to override the evaluator or ignore instructions.',
  },
  {
    pattern: /(give|assign|return).{0,20}(perfect score|100\/100|10\/10|full marks|highest score)/i,
    message: 'Contains direct score-manipulation language asking for an artificially high rating.',
  },
  {
    pattern: /(this is|treat this as).{0,20}(the best|perfect).{0,20}prompt/i,
    message: 'Contains self-declared quality claims designed to bias the evaluator.',
  },
  {
    pattern: /(do not|don\'t).{0,20}(criticize|critique|judge|score|mark down|list violations)/i,
    message: 'Contains language that tries to suppress honest assessment feedback.',
  },
  {
    pattern: /(reveal|show|print).{0,30}(system prompt|hidden instructions|grader instructions)/i,
    message: 'Contains prompt-injection language targeting hidden evaluator instructions.',
  },
];

const XML_TAG_PATTERN = /<([a-z][\w-]*)(?:\s[^>]*)?>/gi;

function hasAnyMatch(text: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(text));
}

function extractXmlTagNames(text: string) {
  const tags = new Set<string>();

  for (const match of text.matchAll(XML_TAG_PATTERN)) {
    const fullMatch = match[0];
    const tagName = match[1]?.toLowerCase();
    if (!tagName || fullMatch.startsWith('</')) continue;
    tags.add(tagName);
  }

  return Array.from(tags);
}

export function analyzePromptGuardrails(promptText: string, modelProvider: string) {
  const normalizedText = promptText.trim();
  const lowerProvider = modelProvider.toLowerCase();
  const xmlTagNames = extractXmlTagNames(normalizedText);
  const hasXmlTags = xmlTagNames.length > 0;
  const hasRoleSignal = hasAnyMatch(normalizedText, [/<role>/i, /\bact as\b/i, /^you are\b/im]);
  const hasContextSignal = hasAnyMatch(normalizedText, [/<context>/i, /\bcontext\s*:/i, /\bbackground\b/i, /\baudience\b/i]);
  const hasFormatSignal = hasAnyMatch(normalizedText, [/<output_format>/i, /\breturn the answer as\b/i, /\boutput\s+as\b/i, /\bformat\s*:/i]);
  const hasConstraintSignal = hasAnyMatch(normalizedText, [/<constraints>/i, /\bconstraints?\s*:/i, /\bmust\b/i, /\bexactly\b/i, /\bdo not\b/i]);
  const hasExampleSignal = hasAnyMatch(normalizedText, [/<examples?>/i, /\bexample\b/i, /\bfew-shot\b/i]);

  const securityFindings = SECURITY_PATTERNS.filter(({ pattern }) => pattern.test(normalizedText)).map(({ message }) => message);

  const checks: DeterministicCheck[] = [
    {
      key: 'role',
      label: 'Role signal',
      status: hasRoleSignal ? 'pass' : 'warning',
      detail: hasRoleSignal ? 'A role or clear actor instruction is present.' : 'No obvious role framing was detected.',
    },
    {
      key: 'context',
      label: 'Context signal',
      status: hasContextSignal ? 'pass' : 'warning',
      detail: hasContextSignal ? 'Context or background markers were detected.' : 'No strong context markers were detected.',
    },
    {
      key: 'format',
      label: 'Output format signal',
      status: hasFormatSignal ? 'pass' : 'warning',
      detail: hasFormatSignal ? 'The prompt asks for a specific output format.' : 'No explicit output-format request was detected.',
    },
    {
      key: 'constraints',
      label: 'Constraint signal',
      status: hasConstraintSignal ? 'pass' : 'warning',
      detail: hasConstraintSignal ? 'Constraint language was detected.' : 'No strong constraint language was detected.',
    },
  ];

  if (lowerProvider === 'anthropic') {
    checks.unshift({
      key: 'xml',
      label: 'XML structure',
      status: hasXmlTags ? 'pass' : 'fail',
      detail: hasXmlTags
        ? `XML-style tags were detected (${xmlTagNames.join(', ')}).`
        : 'No XML-style tags were detected for this Anthropic-targeted prompt.',
    });
  } else if (hasXmlTags) {
    checks.unshift({
      key: 'xml',
      label: 'Structured tags',
      status: 'pass',
      detail: `XML-style tags were detected (${xmlTagNames.join(', ')}).`,
    });
  }

  if (hasExampleSignal) {
    checks.push({
      key: 'examples',
      label: 'Example signal',
      status: 'pass',
      detail: 'Examples or few-shot markers were detected.',
    });
  }

  if (securityFindings.length > 0) {
    checks.unshift({
      key: 'security',
      label: 'Prompt safety',
      status: 'fail',
      detail: `${securityFindings.length} suspicious evaluator-targeting pattern(s) detected.`,
    });
  } else {
    checks.unshift({
      key: 'security',
      label: 'Prompt safety',
      status: 'pass',
      detail: 'No obvious prompt-injection or score-manipulation phrases were detected.',
    });
  }

  const deterministicPros: string[] = [];
  const deterministicViolations: string[] = [];

  if (hasXmlTags) {
    deterministicPros.push(`Structured tags detected${xmlTagNames.length ? `: ${xmlTagNames.join(', ')}` : ''}.`);
  }

  if (hasRoleSignal) {
    deterministicPros.push('A clear role signal is present, which usually improves task framing.');
  }

  if (hasFormatSignal) {
    deterministicPros.push('A concrete output-format request was detected.');
  }

  if (lowerProvider === 'anthropic' && !hasXmlTags) {
    deterministicViolations.push('Anthropic-targeted prompt is missing XML-style structure such as <context> or <instructions>.');
  }

  if (!hasContextSignal) {
    deterministicViolations.push('No strong context/background marker was detected.');
  }

  if (!hasFormatSignal) {
    deterministicViolations.push('No explicit output-format instruction was detected.');
  }

  if (securityFindings.length > 0) {
    deterministicViolations.push(`Prompt-injection / score-manipulation warning: ${securityFindings.join(' ')}`);
  }

  const penaltyPoints = Math.min(18, securityFindings.length * 6);

  return {
    checks,
    deterministicPros,
    deterministicViolations,
    securityFindings,
    penaltyPoints,
    hasXmlTags,
    xmlTagNames,
  } satisfies GuardrailAnalysis;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function uniqueLines(items: string[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const normalized = item.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

export function reconcileAssessmentResult(
  rawResult: unknown,
  analysis: GuardrailAnalysis,
  modelProvider: string,
) {
  const source = (rawResult && typeof rawResult === 'object' ? rawResult : {}) as Record<string, unknown>;
  const rawSubscores = (source.subscores && typeof source.subscores === 'object' ? source.subscores : {}) as Record<string, unknown>;

  let clarity = clamp(Number(rawSubscores.clarity) || 0, 0, 30);
  let context = clamp(Number(rawSubscores.context) || 0, 0, 30);
  let intentAlignment = clamp(Number(rawSubscores.intentAlignment) || 0, 0, 40);

  let violations = Array.isArray(source.violations) ? source.violations.filter((item): item is string => typeof item === 'string') : [];
  const pros = Array.isArray(source.pros) ? source.pros.filter((item): item is string => typeof item === 'string') : [];
  const rewrittenPrompt = typeof source.rewrittenPrompt === 'string' ? source.rewrittenPrompt : 'No rewrite was returned.';

  if (modelProvider.toLowerCase() === 'anthropic' && analysis.hasXmlTags) {
    violations = violations.filter((item) => !/missing xml|no xml|lacks xml|without xml/i.test(item));
  }

  violations = uniqueLines([...violations, ...analysis.deterministicViolations]);
  const finalPros = uniqueLines([...pros, ...analysis.deterministicPros]);

  if (analysis.penaltyPoints > 0) {
    let remainingPenalty = analysis.penaltyPoints;

    const penaltyOrder: Array<{ key: 'intentAlignment' | 'clarity' | 'context'; value: number }> = [
      { key: 'intentAlignment', value: intentAlignment },
      { key: 'clarity', value: clarity },
      { key: 'context', value: context },
    ];

    for (const bucket of penaltyOrder) {
      if (remainingPenalty <= 0) break;
      const deduction = Math.min(bucket.value, remainingPenalty);
      remainingPenalty -= deduction;

      if (bucket.key === 'intentAlignment') intentAlignment -= deduction;
      if (bucket.key === 'clarity') clarity -= deduction;
      if (bucket.key === 'context') context -= deduction;
    }
  }

  const score = clarity + context + intentAlignment;

  return {
    score,
    subscores: {
      clarity,
      context,
      intentAlignment,
    },
    violations,
    pros: finalPros,
    rewrittenPrompt,
    deterministicChecks: analysis.checks,
    securityReview: {
      status: analysis.securityFindings.length ? 'flagged' : 'clean',
      findings: analysis.securityFindings,
      penaltyApplied: analysis.penaltyPoints,
    },
  };
}
