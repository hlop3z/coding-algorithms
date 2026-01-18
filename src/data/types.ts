// ============================================
// Complexity Types
// ============================================

export type ComplexityQuality = 'best' | 'good' | 'fair' | 'bad' | 'worst' | 'na';

export interface ComplexityOperations {
  access: string;
  search: string;
  insertion: string;
  deletion: string;
}

// ============================================
// Data Structure Types
// ============================================

export type DataStructureGroup = 'List' | 'Tree' | 'Other';

export interface DataStructure {
  name: string;
  shape: string;
  group: DataStructureGroup;
  description: string;
  time: {
    average: ComplexityOperations;
    worst: ComplexityOperations;
  };
  space: {
    worst: string;
  };
}

// ============================================
// Algorithm Types
// ============================================

export interface SortingAlgorithm {
  name: string;
  description: string;
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: {
    worst: string;
  };
}

export type SearchCategory = 'array' | 'graph';

export interface SearchAlgorithm {
  name: string;
  description: string;
  average: string;
  worst: string;
}

export interface SearchAlgorithms {
  array: SearchAlgorithm[];
  graph: SearchAlgorithm[];
}

// ============================================
// Big-O Types
// ============================================

export interface AsymptoticNotation {
  name: string;
  notation: string;
  description: string;
  note: string;
  simplified: string;
}

export interface TimeComplexity {
  name: string;
  notation: string;
  description: string;
  level: ComplexityQuality;
}

// ============================================
// Concept Types
// ============================================

export interface Concept {
  name: string;
  description: string;
}

export interface ConceptGroups {
  oop: Concept[];
  solid: Concept[];
  design: Concept[];
  paradigms: Concept[];
  principles: Concept[];
}

// ============================================
// Language-Specific Types
// ============================================

export interface PythonMethod {
  method: string;
  group: string;
  description: string;
}

export interface PythonDunder {
  name: string;
  description: string;
}

export interface SqlStatement {
  statement: string;
  description: string;
  example: string;
}

// ============================================
// API Types
// ============================================

export interface RestConstraint {
  name: string;
  description: string;
}

export interface RestMethod {
  method: string;
  crud: string;
}

export interface GraphQLOperation {
  operation: string;
  description: string;
}

// ============================================
// Resource Types
// ============================================

export interface Resource {
  name: string;
  url: string;
  description?: string;
}
