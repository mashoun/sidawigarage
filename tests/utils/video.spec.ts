import { describe, expect, it } from 'vitest';
import { resolveVideoUrl } from '../../shared/utils/video';

describe('Video Resolver Helper', () => {
  it('resolves YouTube watch URL into responsive iframe embed URL', () => {
    const res = resolveVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(res.platform).toBe('youtube');
    expect(res.isIframe).toBe(true);
    expect(res.embedUrl).toContain('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
    expect(res.aspectRatio).toBe('16/9');
  });

  it('resolves YouTube Shorts URL into 9/16 aspect ratio vertical format', () => {
    const res = resolveVideoUrl('https://youtube.com/shorts/dQw4w9WgXcQ');
    expect(res.platform).toBe('youtube');
    expect(res.isIframe).toBe(true);
    expect(res.aspectRatio).toBe('9/16');
  });

  it('resolves Instagram reel URL into embed URL', () => {
    const res = resolveVideoUrl('https://www.instagram.com/reel/C3_XYZ123/');
    expect(res.platform).toBe('instagram');
    expect(res.isIframe).toBe(true);
    expect(res.embedUrl).toContain('https://www.instagram.com/reel/C3_XYZ123/embed');
    expect(res.aspectRatio).toBe('9/16');
  });

  it('handles direct mp4 URLs as direct video elements', () => {
    const res = resolveVideoUrl('https://example.com/videos/transmission-flush.mp4');
    expect(res.platform).toBe('direct');
    expect(res.isIframe).toBe(false);
  });
});
