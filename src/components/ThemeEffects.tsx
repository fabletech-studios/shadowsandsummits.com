import { useEffect, useState } from 'react';
import './ThemeEffects.css';

interface ThemeEffectsProps {
  type: 'mountain' | 'water' | 'feather' | 'echo' | 'lightning' | 'aurora' | 'golden';
}

export default function ThemeEffects({ type }: ThemeEffectsProps) {
  const [lightningFlash, setLightningFlash] = useState(false);

  useEffect(() => {
    if (type === 'lightning') {
      // Random lightning flashes
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setLightningFlash(true);
          setTimeout(() => setLightningFlash(false), 150);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [type]);

  return (
    <div className={`theme-effects theme-${type}`}>
      {type === 'mountain' && (
        <>
          <div className="mountain-fog fog-layer-1"></div>
          <div className="mountain-fog fog-layer-2"></div>
          <div className="mountain-silhouette"></div>
        </>
      )}

      {type === 'water' && (
        <>
          <div className="water-ripple ripple-1"></div>
          <div className="water-ripple ripple-2"></div>
          <div className="water-ripple ripple-3"></div>
          <div className="water-waves"></div>
        </>
      )}

      {type === 'feather' && (
        <>
          <div className="feather-glow"></div>
          <div className="wing-shimmer wing-left"></div>
          <div className="wing-shimmer wing-right"></div>
        </>
      )}

      {type === 'echo' && (
        <>
          <div className="echo-ring ring-1"></div>
          <div className="echo-ring ring-2"></div>
          <div className="echo-ring ring-3"></div>
          <div className="void-pulse"></div>
        </>
      )}

      {type === 'lightning' && (
        <>
          <div className={`lightning-flash ${lightningFlash ? 'active' : ''}`}></div>
          <div className="storm-clouds"></div>
          <div className="rain-overlay"></div>
        </>
      )}

      {type === 'aurora' && (
        <>
          <div className="aurora-wave wave-1"></div>
          <div className="aurora-wave wave-2"></div>
          <div className="aurora-wave wave-3"></div>
          <div className="northern-stars"></div>
        </>
      )}

      {type === 'golden' && (
        <>
          <div className="golden-rays"></div>
          <div className="summit-glow"></div>
          <div className="triumph-sparkles"></div>
        </>
      )}
    </div>
  );
}
