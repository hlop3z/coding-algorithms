import type { ComplexityQuality } from './types';

// Map complexity notations to quality levels
const notationToQuality: Record<string, ComplexityQuality> = {
  // Constant - Best
  'O(1)': 'best',
  'Θ(1)': 'best',
  'Ω(1)': 'best',

  // Logarithmic - Good
  'O(log n)': 'good',
  'O(log(n))': 'good',
  'Θ(log n)': 'good',
  'Θ(log(n))': 'good',
  'Ω(log n)': 'good',
  'Ω(log(n))': 'good',

  // Linear - Fair
  'O(n)': 'fair',
  'Θ(n)': 'fair',
  'Ω(n)': 'fair',
  'O(n + k)': 'fair',
  'Θ(n + k)': 'fair',
  'Ω(n + k)': 'fair',
  'O(k)': 'fair',
  'O(nk)': 'fair',
  'Θ(nk)': 'fair',
  'Ω(nk)': 'fair',

  // Linearithmic - Fair (slightly worse)
  'O(n log n)': 'fair',
  'O(n log(n))': 'fair',
  'Θ(n log n)': 'fair',
  'Θ(n log(n))': 'fair',
  'Ω(n log n)': 'fair',
  'Ω(n log(n))': 'fair',

  // Quadratic - Bad
  'O(n²)': 'bad',
  'O(n^2)': 'bad',
  'Θ(n²)': 'bad',
  'Θ(n^2)': 'bad',
  'Ω(n²)': 'bad',
  'Ω(n^2)': 'bad',

  // Cubic - Bad
  'O(n³)': 'bad',
  'O(n^3)': 'bad',
  'Θ(n³)': 'bad',
  'Θ(n^3)': 'bad',

  // Shell sort specific
  'Θ((n log(n))^2)': 'bad',
  'O(n(log(n))^2)': 'bad',

  // Exponential - Worst
  'O(2^n)': 'worst',
  'O(2ⁿ)': 'worst',
  'Θ(2^n)': 'worst',
  'O(b ^ d)': 'worst',
  'Θ(b ^ d)': 'worst',

  // Factorial - Worst
  'O(n!)': 'worst',
  'Θ(n!)': 'worst',

  // Graph complexities
  'O(V + E)': 'fair',
  'Θ(V + E)': 'fair',
  'O(v + e)': 'fair',
  'Θ(v + e)': 'fair',
  'O(v * e)': 'bad',
  'Θ(v * e)': 'bad',
  'O((v + e) log v)': 'fair',
  'Θ((v + e) log v)': 'fair',

  // N/A
  'N/A': 'na',
};

// Map quality levels to Tailwind classes
export const qualityToClass: Record<ComplexityQuality, string> = {
  best: 'bg-complexity-best text-gray-900',
  good: 'bg-complexity-good text-gray-900',
  fair: 'bg-complexity-fair text-gray-900',
  bad: 'bg-complexity-bad text-gray-900',
  worst: 'bg-complexity-bad text-gray-900',
  na: 'bg-complexity-na text-gray-600',
};

// Map quality levels to text colors for labels
export const qualityToTextClass: Record<ComplexityQuality, string> = {
  best: 'text-green-600 dark:text-green-400',
  good: 'text-lime-600 dark:text-lime-400',
  fair: 'text-yellow-600 dark:text-yellow-400',
  bad: 'text-red-500 dark:text-red-400',
  worst: 'text-red-600 dark:text-red-500',
  na: 'text-gray-500 dark:text-gray-400',
};

// Map quality levels to display labels
export const qualityToLabel: Record<ComplexityQuality, string> = {
  best: 'Best',
  good: 'Good',
  fair: 'Fair',
  bad: 'Bad',
  worst: 'Worst',
  na: 'N/A',
};

/**
 * Get the quality level for a complexity notation
 */
export function getQuality(notation: string): ComplexityQuality {
  // Normalize the notation (handle variations)
  const normalized = notation.trim();

  // Direct lookup
  if (notationToQuality[normalized]) {
    return notationToQuality[normalized];
  }

  // Try to match patterns
  if (normalized.includes('n!')) return 'worst';
  if (normalized.includes('2^n') || normalized.includes('2ⁿ')) return 'worst';
  if (normalized.includes('n^3') || normalized.includes('n³')) return 'bad';
  if (normalized.includes('n^2') || normalized.includes('n²')) return 'bad';
  if (normalized.includes('n log') || normalized.includes('n*log')) return 'fair';
  if (normalized.includes('log')) return 'good';
  if (normalized === 'N/A' || normalized === '-') return 'na';
  if (normalized.includes('(1)')) return 'best';
  if (normalized.includes('(n)') || normalized.includes('n + ')) return 'fair';

  // Default to fair for unknown notations
  return 'fair';
}

/**
 * Get the Tailwind class for a complexity notation
 */
export function getComplexityClass(notation: string): string {
  const quality = getQuality(notation);
  return qualityToClass[quality];
}
