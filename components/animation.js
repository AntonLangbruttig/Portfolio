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
  fullInfoText = 
  "Anton Langbruttig\n\n" +
  "Innovating at the intersection of web development, machine learning, " +
  "and automation. With a solid computer science foundation and a passion for discovery, " +
  "I create solutions that address today’s challenges and inspire tomorrow’s possibilities.",

totalImageLines = 50
) => {
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
};