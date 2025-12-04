// ============================================================================
// BASE COMPONENT TYPES
// ============================================================================

export interface BaseHeading {
  type: 'Heading';
  value?: string; // Populated in pages
}

export interface BaseText {
  type: 'Text';
  value?: string; // Populated in pages
}

export interface BaseImage {
  type: 'Image';
  value?: {
    src?: string;
    alt?: string;
    [key: string]: unknown;
  }; // Populated in pages
}

export interface BaseURL {
  type: 'URL';
  value?: {
    href?: string;
    text?: string;
    [key: string]: unknown;
  }; // Populated in pages
}

export interface BaseFile {
  type: 'File';
  value?: {
    url?: string;
    filename?: string;
    [key: string]: unknown;
  }; // Populated in pages
}

export type BaseComponent = BaseHeading | BaseText | BaseImage | BaseURL | BaseFile;

// ============================================================================
// COMPONENT LIST TYPE
// ============================================================================

export interface ComponentList {
  type: 'ComponentList';
  rigid: boolean; // If false, can add excess components; if true, cannot add excess
  components: Component[]; // List of components within this list
  value?: Component[]; // Populated in pages (actual component instances)
}

// ============================================================================
// COMPONENT TYPE (Base Component or Component List)
// ============================================================================

export interface Component {
  required: boolean; // If true, must be populated; if false, may be left empty
  component: BaseComponent | ComponentList;
}

// ============================================================================
// SLUG LAYOUT TYPE (Structure/Template)
// ============================================================================

export interface SlugLayout {
  title: string;
  url: string; // Slug URL
  components: Component[]; // List of components that define the structure
}

// ============================================================================
// PAGE TYPE (Slug Layout with Populated Data)
// ============================================================================

export interface Page {
  title: string;
  url: string; // Slug URL
  slugLayout: string; // Reference to which slug layout this page follows
  components: Component[]; // Same structure as slug layout, but with populated values
}

// ============================================================================
// COPY DATA STRUCTURES
// ============================================================================

export interface SlugData {
  [slugId: string]: SlugLayout;
}

export interface PageData {
  [pageId: string]: Page;
}

// Legacy combined structure for backwards compatibility
export interface CopyData {
  slugLayouts: SlugData;
  pages: PageData;
  [key: string]: unknown;
}
