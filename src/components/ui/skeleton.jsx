import { cn } from "@/lib/utils.js"

import React from 'react';

/**
 * Skeleton component for loading states
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-muted rounded ${className}`} />
  );
};