'use client';

import { useState, useRef, useEffect } from 'react';
import { IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';
import Container from '../ui/Container';

interface VideoSectionProps {
  videos?: string[];    // array of video URLs (Strapi media or external)
  posterUrl?: string;   // poster image URL
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function VideoSection({
  videos = [],
  posterUrl,
  autoplay = true,
  loop = true,
  muted = true,
}: VideoSectionProps) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    if (loop && videos.length > 1) {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentVideo, isPlaying]);

  const currentSrc = videos[currentVideo];
  if (!currentSrc) return null;

  // Detect if the video is an external iframe embed (Mux, YouTube, Vimeo)
  const isExternalIframe = (url: string) => {
    return url.includes('player.mux.com') || 
           url.includes('youtube.com') || 
           url.includes('youtu.be') || 
           url.includes('vimeo.com');
  };

  // Convert standard YouTube URLs to embed URLs automatically
  const getEmbedUrl = (url: string) => {
    let base = url;
    let isYouTube = false;

    if (url.includes('youtube.com/watch?v=')) {
      base = url.replace('watch?v=', 'embed/');
      isYouTube = true;
    } else if (url.includes('youtu.be/')) {
      base = url.replace('youtu.be/', 'youtube.com/embed/');
      isYouTube = true;
    } else if (url.includes('youtube.com/embed')) {
      isYouTube = true;
    }

    try {
      const parsedUrl = new URL(base);
      
      // Append query parameters for autoplay, mute, and loop
      if (autoplay) {
        parsedUrl.searchParams.set('autoplay', isYouTube ? '1' : 'true');
      }
      if (muted) {
        parsedUrl.searchParams.set(isYouTube ? 'mute' : 'muted', isYouTube ? '1' : 'true');
      }
      if (loop) {
        parsedUrl.searchParams.set('loop', isYouTube ? '1' : 'true');
        if (isYouTube) {
          const videoId = parsedUrl.pathname.split('/').pop();
          if (videoId) parsedUrl.searchParams.set('playlist', videoId);
        }
      }
      
      // Hide controls
      parsedUrl.searchParams.set('controls', isYouTube ? '0' : 'false');
      
      return parsedUrl.toString();
    } catch {
      return base;
    }
  };

  const isIframe = isExternalIframe(currentSrc);
  const finalSrc = isIframe ? getEmbedUrl(currentSrc) : currentSrc;

  return (
    <Container>
      {isIframe ? (
        <iframe
          src={finalSrc}
          className="w-full aspect-video border-none pointer-events-none"
          allow="accelerometer; gyroscope; autoplay; clipboard-write; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          src={finalSrc}
          autoPlay={autoplay}
          muted={muted}
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="w-full aspect-video object-cover"
          poster={posterUrl}
        >
          Your browser does not support the video tag.
        </video>
      )}

      {/* Play/Pause Button - Only show for native video, iframes bring their own controls */}
      {!isIframe && !autoplay && (
        <button
          onClick={togglePlay}
          className="absolute bottom-6 right-6 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all z-10 flex items-center justify-center cursor-pointer shadow-lg"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <IconPlayerPause size={24} stroke={1.5} /> : <IconPlayerPlay size={24} stroke={1.5} />}
        </button>
      )}
    </Container>
  );
}
