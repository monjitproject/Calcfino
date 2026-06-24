import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, X, HelpCircle, Play, CheckCircle2, Bookmark, Target, Search, Sun, Moon } from 'lucide-react';

interface OnboardingTourProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
}

interface TourStep {
  id: string;
  title: string;
  text: string;
  selector?: string;
  targetView: string;
  icon: React.ReactNode;
}

export default function OnboardingTour({ currentView, onNavigate }: OnboardingTourProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  
  const steps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Calcfino',
      text: 'Take control of your financial future with 70+ high-precision premium calculators. Let’s take a quick 1-minute interactive tour of your member workspace!',
      targetView: 'home',
      icon: <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />,
    },
    {
      id: 'search',
      title: 'Instant Tool Search',
      text: 'Quickly find any calculator—from SIP and Loan to Taxes, Crypto, and Retirement planners—by typing just a few characters here.',
      selector: '#search-trigger-btn',
      targetView: 'home',
      icon: <Search className="w-6 h-6 text-blue-500" />,
    },
    {
      id: 'dashboard-btn',
      title: 'Your Dedicated Dashboard',
      text: 'This is your financial command center. Here, you track active goals, store calculation sessions, and bookmark favorite tools.',
      selector: '#nav-dashboard',
      targetView: 'home',
      icon: <CheckCircle2 className="w-6 h-6 text-indigo-500" />,
    },
    {
      id: 'saved-calcs',
      title: 'One-Click Saved Sessions',
      text: 'Your custom configurations (like SIP deposits, EMI tenures, or tax brackets) are pinned here. Reload and update any calculator session in an instant!',
      selector: '#saved-calculations-panel',
      targetView: 'dashboard',
      icon: <Bookmark className="w-6 h-6 text-violet-500" />,
    },
    {
      id: 'goal-meter',
      title: 'Financial Goal Projection',
      text: 'Configure your savings goals, set down-payment targets, and monitor your progress with an interactive projection meter and timeline.',
      selector: '#goal-progress-tracker',
      targetView: 'dashboard',
      icon: <Target className="w-6 h-6 text-cyan-500" />,
    },
    {
      id: 'theme-toggle',
      title: 'Aesthetic Comfort Settings',
      text: 'Switch between our premium Eye-Safe Slate Dark mode and our crisp Minimalist Light mode with a single tap.',
      selector: '#theme-toggle-btn',
      targetView: 'dashboard',
      icon: <Sun className="w-6 h-6 text-amber-500" />,
    },
    {
      id: 'complete',
      title: 'All Set & Ready!',
      text: 'You’re ready to start building wealth! Feel free to click the floating helper badge in the bottom-right corner of your screen at any time to replay this tour.',
      targetView: 'home',
      icon: <Sparkles className="w-6 h-6 text-emerald-500 animate-bounce" />,
    }
  ];

  // Start tour automatically for first-time visitors
  useEffect(() => {
    const isCompleted = localStorage.getItem('fh_tour_completed');
    if (!isCompleted) {
      // Small delay for smooth entry
      const timer = setTimeout(() => {
        setIsActive(true);
        setCurrentStep(0);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Update spotlight coordinate whenever current step, route, resize, or scroll happens
  useEffect(() => {
    if (!isActive) {
      setTargetRect(null);
      return;
    }

    const step = steps[currentStep];

    // Trigger programmatic navigation if we are not on the required view
    if (currentView !== step.targetView) {
      onNavigate(step.targetView);
      // Allow layout compilation delay before computing rect
      const navTimer = setTimeout(() => {
        updateSpotlight();
      }, 350);
      return () => clearTimeout(navTimer);
    }

    updateSpotlight();

    // Listen for resize and scroll to keep spotlight aligned
    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight, true);
    
    // Interval check for robust tracking in case of late renders or transitions
    const interval = setInterval(updateSpotlight, 500);

    return () => {
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight, true);
      clearInterval(interval);
    };

    function updateSpotlight() {
      const activeStep = steps[currentStep];
      if (!activeStep.selector) {
        setTargetRect(null);
        return;
      }

      const element = document.querySelector(activeStep.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Only set rect if element is visible and has dimension
        if (rect.width > 0 && rect.height > 0) {
          setTargetRect(rect);
          
          // Scroll element into view smoothly if it's off-screen
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else {
        setTargetRect(null);
      }
    }
  }, [isActive, currentStep, currentView]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsActive(false);
    localStorage.setItem('fh_tour_completed', 'true');
    onNavigate('home');
  };

  const handleRestartTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  // Compute smart tooltip positions relative to the current target rectangle
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 110,
        width: 'calc(100% - 32px)',
        maxWidth: '440px',
      };
    }

    const pad = 16;
    const tooltipWidth = 360;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontally center tooltip with the element, bounds-guarded
    let left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
    left = Math.max(16, Math.min(viewportWidth - tooltipWidth - 16, left));

    // Vertically position below target if space permits, otherwise above
    let top = targetRect.bottom + pad;
    let arrowDirection: 'up' | 'down' = 'up';

    if (top + 260 > viewportHeight) {
      top = targetRect.top - pad - 240; // Approx height
      arrowDirection = 'down';
    }

    return {
      position: 'fixed',
      top: `${Math.max(16, top)}px`,
      left: `${left}px`,
      zIndex: 110,
      width: `${tooltipWidth}px`,
    };
  };

  return (
    <>
      {/* Floating Interactive Badge in the bottom corner to replay the onboarding anytime */}
      <button
        onClick={handleRestartTour}
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group text-xs font-bold font-sans"
        title="Start Interactive Tour"
        aria-label="Start Interactive Onboarding Tour"
        id="tour-replay-trigger-badge"
      >
        <HelpCircle className="w-4 h-4 animate-bounce" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-24 transition-all duration-300 ease-out whitespace-nowrap">
          Interactive Tour
        </span>
      </button>

      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 z-[100] overflow-hidden">
            
            {/* SVG Dimming Spotlight Mask Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <mask id="spotlight-clipper">
                    {/* Fill entire mask with white (dimmed background) */}
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    {/* Cut out a black rounded rect (clear spotlight target) */}
                    {targetRect && (
                      <rect
                        x={targetRect.left - 8}
                        y={targetRect.top - 8}
                        width={targetRect.width + 16}
                        height={targetRect.height + 16}
                        rx="12"
                        ry="12"
                        fill="black"
                      />
                    )}
                  </mask>
                </defs>
                {/* Overlay layer rendering the mask cutout */}
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="rgba(8, 12, 23, 0.72)"
                  mask="url(#spotlight-clipper)"
                  className="pointer-events-auto cursor-default"
                />
              </svg>
            </motion.div>

            {/* Tour Dialog Card Wrapper */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.93, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={getTooltipStyle()}
              className="bg-white dark:bg-[#0E1527] border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-2xl shadow-slate-900/40 dark:shadow-black/75 relative flex flex-col justify-between"
              id="onboarding-tour-card"
            >
              {/* Close Button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                aria-label="Skip Tour"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon & Title */}
              <div className="flex gap-4 items-start pr-6">
                <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100/30 text-blue-600 dark:text-cyan-400 flex-shrink-0">
                  {steps[currentStep].icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                    {steps[currentStep].title}
                  </h3>
                </div>
              </div>

              {/* Description Body Text */}
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-4.5 pr-2">
                {steps[currentStep].text}
              </p>

              {/* Action Buttons Panel */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-6 pt-4">
                
                {/* Skip button for non-final steps */}
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={handleSkip}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    Skip Tour
                  </button>
                ) : (
                  <div className="w-1" />
                )}

                {/* Back / Next actions */}
                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <button
                      onClick={handleBack}
                      className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-xl transition-all flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className="px-4.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        Get Started
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
