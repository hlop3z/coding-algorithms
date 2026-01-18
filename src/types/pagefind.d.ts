declare module '@pagefind/default-ui' {
  export interface PagefindUIOptions {
    element: string | HTMLElement;
    bundlePath?: string;
    baseUrl?: string;
    pageSize?: number;
    resetStyles?: boolean;
    showImages?: boolean;
    showSubResults?: boolean;
    excerptLength?: number;
    processResult?: (result: unknown) => unknown;
    processTerm?: (term: string) => string;
    showEmptyFilters?: boolean;
    debounceTimeoutMs?: number;
    mergeIndex?: Array<{
      bundlePath: string;
      baseUrl?: string;
    }>;
    translations?: Record<string, string>;
  }

  export class PagefindUI {
    constructor(options: PagefindUIOptions);
    triggerSearch(term: string): void;
    destroy(): void;
  }
}
