import { useState, useEffect } from 'react';
import { Track } from '../data/tracks';
import StreamingLinks from './StreamingLinks';
import ParticleEffects from './ParticleEffects';
import ThemeEffects from './ThemeEffects';
import './BookFlip.css';

interface BookFlipProps {
  tracks: Track[];
}

export default function BookFlip({ tracks }: BookFlipProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Get current theme based on page
  const getCurrentTheme = () => {
    if (currentPage === 0) {
      return {
        background: "linear-gradient(135deg, #0a1f2e 0%, #16384a 25%, #1a4d5e 50%, #16384a 75%, #0a1f2e 100%)",
        accent: "#2a6d7e"
      };
    }
    return tracks[currentPage - 1].theme;
  };

  const nextPage = () => {
    if (currentPage < tracks.length && !isFlipping) {
      setFlipDirection('forward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('backward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 800);
    }
  };

  const goToPage = (pageNum: number) => {
    if (pageNum !== currentPage && !isFlipping) {
      setFlipDirection(pageNum > currentPage ? 'forward' : 'backward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageNum);
        setIsFlipping(false);
      }, 800);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFlipping) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          nextPage();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevPage();
          break;
        case 'Home':
          e.preventDefault();
          goToPage(0);
          break;
        case 'End':
          e.preventDefault();
          goToPage(tracks.length);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFlipping, tracks.length]);

  // Touch/Swipe navigation
  const minSwipeDistance = 50; // Minimum distance for a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    // Only process horizontal swipes
    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        // Swiped left - go to next page
        nextPage();
      } else {
        // Swiped right - go to previous page
        prevPage();
      }
    }
  };

  const renderPage = (pageNum: number) => {
    if (pageNum === 0) {
      // Cover page with ethereal effects
      return (
        <div className="page-content cover-content">
          {/* Mystical background with album art */}
          <div className="cover-backdrop">
            <img
              src="/images/Album cover.jpg"
              alt="Shadows and Summits"
              className="cover-background-image"
            />
            <div className="cover-overlay"></div>
          </div>

          {/* Floating particles */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 15}s`,
                  opacity: 0.3 + Math.random() * 0.7
                }}
              ></div>
            ))}
          </div>

          {/* Main content */}
          <div className="cover-main-content">
            <div className="cover-glow-top"></div>
            <h1 className="album-title-epic">
              <span className="title-word">Shadows</span>
              <span className="title-and">and</span>
              <span className="title-word">Summits</span>
            </h1>
            <div className="title-underline"></div>
            <p className="album-subtitle-epic">A Symphonic Journey in Seven Movements</p>
            <StreamingLinks theme="dark" />
            <div className="cover-glow-bottom"></div>
          </div>

          <p className="tap-hint-epic">Click to begin your journey →</p>
        </div>
      );
    } else {
      // Track page
      const track = tracks[pageNum - 1];
      return (
        <div
          className="page-content"
          style={{
            fontFamily: track.textStyle.fontFamily
          }}
        >
          <div className="track-number">Movement {track.id}</div>
          <img
            src={track.imageUrl}
            alt={track.title}
            className="track-image"
          />
          <h2 className={`track-title text-${track.textStyle.animation}`}>{track.title}</h2>
          <p className="track-key">{track.key}</p>
          <p className="track-duration">{track.duration}</p>
          <p className={`track-description text-${track.textStyle.animation}`}>{track.description}</p>
          {track.lyrics && (
            <blockquote className={`track-lyrics text-${track.textStyle.animation}`}>
              {track.lyrics}
            </blockquote>
          )}
          <StreamingLinks theme="light" />
        </div>
      );
    }
  };

  const currentTheme = getCurrentTheme();

  return (
    <div
      className="book-container"
      style={{
        background: currentTheme.background,
        transition: 'background 1.2s ease-in-out'
      }}
    >
      {/* Atmospheric overlay */}
      <div
        className="atmosphere-overlay"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, ${currentTheme.accent}15 100%)`,
          transition: 'background 1.2s ease-in-out'
        }}
      ></div>

      {/* Particle Effects */}
      {currentPage > 0 && (
        <>
          <ParticleEffects type={tracks[currentPage - 1].particleType} />
          <ThemeEffects type={tracks[currentPage - 1].particleType} />
        </>
      )}

      <div
        className="book"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Current page being flipped */}
        <div
          className={`page ${currentPage === 0 ? 'cover' : ''} ${
            isFlipping
              ? (flipDirection === 'forward' ? 'flipping-forward' : 'flipping-backward')
              : ''
          }`}
        >
          <div className="page-face front">
            {renderPage(currentPage)}
          </div>
          <div className="page-face back">
            {/* Back side of the page (mirror for realism) */}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        {/* Page Dots */}
        <div className="page-dots">
          {[0, ...Array.from({ length: tracks.length }, (_, i) => i + 1)].map((pageNum) => (
            <div
              key={pageNum}
              className={`page-dot ${pageNum === 0 ? 'cover' : ''} ${pageNum === currentPage ? 'active' : ''}`}
              onClick={() => goToPage(pageNum)}
              title={pageNum === 0 ? 'Cover' : `Track ${pageNum}`}
            />
          ))}
        </div>

        {/* Main Navigation Controls */}
        <div className="nav-controls">
          <button
            className="nav-button prev"
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
          >
            Previous
          </button>
          <div className="page-indicator">
            {currentPage} / {tracks.length}
          </div>
          <button
            className="nav-button next"
            onClick={nextPage}
            disabled={currentPage >= tracks.length || isFlipping}
          >
            Next
          </button>
        </div>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="keyboard-hint">
        Use <kbd>←</kbd> <kbd>→</kbd> or <kbd>Space</kbd> to navigate
      </div>

      {/* Mobile Swipe Hint */}
      <div className="swipe-hint">
        ← Swipe to navigate →
      </div>

      {/* Click areas for easier navigation */}
      <div className="click-area left" onClick={prevPage}></div>
      <div className="click-area right" onClick={nextPage}></div>
    </div>
  );
}
