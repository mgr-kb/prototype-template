import { describe, it, expect } from 'vitest';
import { searchArticles } from './actions';

describe('searchArticles', () => {
  it('should return articles when valid query is provided', async () => {
    const formData = new FormData();
    formData.append('query', 'React');

    const result = await searchArticles(formData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.articles).toBeInstanceOf(Array);
      expect(result.data.query).toBe('React');
      expect(result.data.total).toBeGreaterThanOrEqual(0);
      expect(result.data.total).toBe(result.data.articles.length);
      expect(result.data.category).toBeUndefined();
    }
  });

  it('should return error when query is empty', async () => {
    const formData = new FormData();
    formData.append('query', '');

    const result = await searchArticles(formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.query).toBeInstanceOf(Array);
      expect(result.errors.query?.length).toBeGreaterThan(0);
      expect(result.errors.query?.[0]).toContain('2文字以上');
    }
  });

  it('should return error when query is too short', async () => {
    const formData = new FormData();
    formData.append('query', 'a');

    const result = await searchArticles(formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.query).toBeInstanceOf(Array);
      expect(result.errors.query?.length).toBeGreaterThan(0);
      expect(result.errors.query?.[0]).toContain('2文字以上');
    }
  });

  it('should filter by category when provided', async () => {
    const formData = new FormData();
    formData.append('query', 'test');
    formData.append('category', 'frontend');

    const result = await searchArticles(formData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.articles).toBeInstanceOf(Array);
      expect(result.data.query).toBe('test');
      expect(result.data.category).toBe('frontend');
      expect(result.data.total).toBeGreaterThanOrEqual(0);
      expect(result.data.total).toBe(result.data.articles.length);
    }
  });

  it('should handle invalid form data gracefully', async () => {
    const formData = new FormData();
    // Missing query field

    const result = await searchArticles(formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toBeDefined();
      expect(typeof result.errors).toBe('object');
      expect(result.errors.query).toBeInstanceOf(Array);
      expect(result.errors.query?.length).toBeGreaterThan(0);
    }
  });

  it('should handle query length validation', async () => {
    const formData = new FormData();
    formData.append('query', 'a'.repeat(101)); // 101文字

    const result = await searchArticles(formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.query).toBeInstanceOf(Array);
      expect(result.errors.query?.[0]).toContain('100文字以下');
    }
  });

  it('should handle empty category correctly', async () => {
    const formData = new FormData();
    formData.append('query', 'test');
    formData.append('category', '');

    const result = await searchArticles(formData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.category).toBeUndefined();
    }
  });
});
