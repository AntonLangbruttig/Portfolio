let hasAnimationRun = false; // Flag to track if the animation has run

export const animationSequence = async (
  setShowLine,
  setAnimationState,
  setShowBackground,
  setInfoText,
  setImageLines,
  initialDelay = 1000,
  lineAnimationDuration = 3000,
  staticDuration = 2000,
  flickerDuration = 1000,
  contentDelay = 500,
  fullInfoText = "I'm passionate about building elegant, intuitive software that is visually stunning." + "\n\n\n           Anton Langbruttig",
  totalImageLines = 50
) => {
  // Check if the animation has already run
  if (hasAnimationRun) {
    setShowLine(true);
    setAnimationState('content');
    setShowBackground(true);
    setInfoText(fullInfoText);
    setImageLines(totalImageLines);
    return;
  }

  // Initial delay
  await new Promise(resolve => setTimeout(resolve, initialDelay));

  // Show and animate line
  setShowLine(true);
  setAnimationState('line');
  await new Promise(resolve => setTimeout(resolve, lineAnimationDuration));

  // Show background and static
  setShowBackground(true);
  setAnimationState('static');
  await new Promise(resolve => setTimeout(resolve, staticDuration));

  // Screen on and flicker
  setAnimationState('screenOn');
  await new Promise(resolve => setTimeout(resolve, flickerDuration));

  // Content
  setAnimationState('content');
  await new Promise(resolve => setTimeout(resolve, contentDelay));

  let infoIndex = 0;
  let currentImageLines = 0;

  const infoIntervalId = setInterval(() => {
    if (infoIndex < fullInfoText.length) {
      infoIndex++;
      setInfoText(fullInfoText.slice(0, infoIndex));
    } else {
      clearInterval(infoIntervalId);
    }
  }, 50);

  const imageIntervalId = setInterval(() => {
    if (currentImageLines < totalImageLines) {
      currentImageLines++;
      setImageLines(currentImageLines);
    } else {
      clearInterval(imageIntervalId);
    }
  }, 100);

  // Set the flag to true after the animation completes
  hasAnimationRun = true;
};