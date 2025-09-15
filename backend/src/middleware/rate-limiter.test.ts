import { describe, it, expect, beforeEach } from 'vitest';
import { Hono } from 'hono';
import { rateLimiter } from 'hono-rate-limiter';

describe('Rate Limiter Middleware', () => {
  let app: Hono;

  beforeEach(() => {
    app = new Hono();

    // Configure rate limiter with 3 requests per window
    app.use(
      '/test',
      rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 3, // Allow only 3 requests
        keyGenerator: () => 'test-client', // Fixed key for testing
      })
    );

    app.get('/test', (c) => c.json({ message: 'success' }));
  });

  it('should allow requests within the limit', async () => {
    // First request should succeed
    const res1 = await app.request('/test');
    expect(res1.status).toBe(200);

    // Second request should succeed
    const res2 = await app.request('/test');
    expect(res2.status).toBe(200);

    // Third request should succeed
    const res3 = await app.request('/test');
    expect(res3.status).toBe(200);
  });

  it('should block requests after exceeding the limit', async () => {
    // Make 3 allowed requests
    await app.request('/test');
    await app.request('/test');
    await app.request('/test');

    // Fourth request should be rate limited
    const res4 = await app.request('/test');
    expect(res4.status).toBe(429);

    // The response might be text instead of JSON
    const responseText = await res4.text();
    expect(responseText).toBeTruthy();
  });

  it('should include rate limit headers', async () => {
    const res = await app.request('/test');

    expect(res.headers.get('RateLimit-Limit')).toBe('3');
    expect(res.headers.get('RateLimit-Remaining')).toBe('2');
    expect(res.headers.get('RateLimit-Reset')).toBeTruthy();
  });
});