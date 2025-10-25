import { describe, it, expect } from 'vitest';
import { sleep } from '@/helpers/sleep';

describe('sleep helper', () => {
  it('should pause execution for the specified duration', async () => {
    const start = Date.now();
    const duration = 1;
    await sleep(duration);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(duration);
  });
});
