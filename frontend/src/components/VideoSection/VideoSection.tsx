'use client';

import { useState, useRef, useEffect } from 'react';
import { IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';

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

  if (videos.length === 0) return null;

  return (
    <div className="w-full relative overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={videos[currentVideo]}
        autoPlay={autoplay}
        muted={muted}
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="w-full h-[600px] object-cover"
        poster={posterUrl}
      >
        Your browser does not support the video tag.
      </video>

      <button
        onClick={togglePlay}
        className="absolute bottom-6 right-6 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all z-10 flex items-center justify-center cursor-pointer shadow-lg"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <IconPlayerPause size={24} stroke={1.5} /> : <IconPlayerPlay size={24} stroke={1.5} />}
      </button>
    </div>
  );
}
