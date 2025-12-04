import slugData from '@/data/slugs.json';
import pageData from '@/data/pages.json';
import { Page, PageData, SlugData, SlugLayout } from '@/types/copy';

class CopyService {
  private slugs: SlugData = slugData as SlugData;
  private pages: PageData = pageData as PageData;

  /**
   * Get a page by pageId
   */
  getPage({ pageId }: { pageId: string }): Page | undefined {
    return this.pages?.[pageId];
  }

  /**
   * Get a slug layout by slugId
   */
  getSlugLayout({ slugId }: { slugId: string }): SlugLayout | undefined {
    return this.slugs?.[slugId];
  }

  /**
   * Get a page by URL slug
   */
  getPageByUrl({ url }: { url: string }): Page | undefined {
    if (!this.pages) return undefined;

    return Object.values(this.pages).find((page) => page.url === url);
  }

  /**
   * Get all slug layouts
   */
  getAllSlugLayouts(): Record<string, SlugLayout> {
    return this.slugs || {};
  }

  /**
   * Get all pages
   */
  getAllPages(): Record<string, Page> {
    return this.pages || {};
  }

  /**
   * Legacy method for backwards compatibility
   * @deprecated Use getPage() instead
   */
  getPageContent({ pageId }: { pageId: string }) {
    return this.getPage({ pageId });
  }
}

export const copyService = new CopyService();

