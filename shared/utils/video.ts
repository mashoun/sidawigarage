/**
 * Dynamic Video URL Resolver for Social Media & Direct Feeds
 * Supports YouTube (Standard, Shorts, youtu.be), Instagram Reels, TikTok, and Direct URLs.
 */
import type { VideoPlatform } from '../domain/models';

export interface ResolvedVideo {
  platform: VideoPlatform;
  embedUrl: string;
  directUrl: string;
  isIframe: boolean;
  aspectRatio: '16/9' | '9/16';
}

/**
 * Resolves a social media video URL or direct video into an embeddable format
 */
export function resolveVideoUrl(rawUrl: string, directVideoUrl?: string): ResolvedVideo {
  if (directVideoUrl) {
    return {
      platform: 'direct',
      embedUrl: directVideoUrl,
      directUrl: directVideoUrl,
      isIframe: false,
      aspectRatio: directVideoUrl.includes('reel') || directVideoUrl.includes('portrait') || directVideoUrl.includes('.mp4') ? '9/16' : '16/9',
    };
  }

  const url = rawUrl.trim();

  // 1. YouTube Shorts: https://youtube.com/shorts/{id} or https://www.youtube.com/shorts/{id}
  const ytShortMatch = url.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/i);
  if (ytShortMatch && ytShortMatch[1]) {
    const videoId = ytShortMatch[1];
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1`,
      directUrl: url,
      isIframe: true,
      aspectRatio: '9/16',
    };
  }

  // 2. YouTube Standard: https://www.youtube.com/watch?v={id} or https://youtu.be/{id}
  const ytStandardMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]+)/i);
  if (ytStandardMatch && ytStandardMatch[1]) {
    const videoId = ytStandardMatch[1];
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1`,
      directUrl: url,
      isIframe: true,
      aspectRatio: '16/9',
    };
  }

  // 3. Instagram Reels: https://www.instagram.com/reel/{id}/ or /p/{id}/
  const igMatch = url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/i);
  if (igMatch && igMatch[1]) {
    const reelId = igMatch[1];
    return {
      platform: 'instagram',
      embedUrl: `https://www.instagram.com/reel/${reelId}/embed`,
      directUrl: url,
      isIframe: true,
      aspectRatio: '9/16',
    };
  }

  // 4. TikTok: https://www.tiktok.com/@user/video/{id}
  const tiktokMatch = url.match(/tiktok\.com\/(?:@[^/]+\/video\/|v\/)([0-9]+)/i);
  if (tiktokMatch && tiktokMatch[1]) {
    const videoId = tiktokMatch[1];
    return {
      platform: 'tiktok',
      embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
      directUrl: url,
      isIframe: true,
      aspectRatio: '9/16',
    };
  }

  // 5. Direct MP4 / WebM video
  return {
    platform: 'direct',
    embedUrl: url,
    directUrl: url,
    isIframe: false,
    aspectRatio: url.includes('reel') || url.includes('portrait') ? '9/16' : '16/9',
  };
}
