import React from 'react';
import NextImage from 'next/image';

// Custom Image component wrapper to fix the fetchPriority warning
export function Image({ priority = true, ...props }) {
  return <NextImage priority={priority} {...props} />;
}

export default Image; 