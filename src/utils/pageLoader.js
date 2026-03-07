/**
 * Utility to ensure all resources are loaded before showing the page
 * Prevents FOUC (Flash of Unstyled Content)
 */

// Preload critical images
const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`);
          resolve(url); // Resolve anyway to not block loading
        };
        img.src = url;
      });
    })
  );
};

export const waitForResources = async () => {
  // Wait for fonts to load
  const fontPromises = [
    document.fonts.load('1em "Sloop Script"'),
    document.fonts.load('1em "Cormorant Garamond"'),
    document.fonts.load('1em Lato')
  ];

  try {
    await Promise.all(fontPromises);
    await document.fonts.ready;
  } catch (error) {
    console.warn('Font loading error:', error);
  }

  // Preload critical images (logo and main image)
  try {
    const criticalImages = [
      '/src/Assets/logo.png',
      '/src/Assets/main-image.jpeg'
    ];
    await preloadImages(criticalImages);
  } catch (error) {
    console.warn('Image preloading error:', error);
  }

  // Additional delay to ensure everything is rendered
  await new Promise(resolve => setTimeout(resolve, 100));
};

export const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');
  const root = document.getElementById('root');

  if (loadingScreen && root) {
    // Add loaded class to root
    root.classList.add('loaded');
    
    // Fade out loading screen
    loadingScreen.classList.add('fade-out');
    
    // Remove loading screen from DOM after animation
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.remove();
      }
    }, 500);
  }
};

export const initializePageLoader = async () => {
  try {
    await waitForResources();
    // Small delay before hiding to ensure smooth transition
    await new Promise(resolve => setTimeout(resolve, 200));
    hideLoadingScreen();
  } catch (error) {
    console.error('Error initializing page:', error);
    // Hide loading screen anyway after error
    hideLoadingScreen();
  }
};
