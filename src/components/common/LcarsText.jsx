import React from 'react';

const colorMap = {
  orange: 'var(--lcars-orange)',
  gold: 'var(--lcars-gold)',
  lavender: 'var(--lcars-lavender)',
  blue: 'var(--lcars-blue)',
  red: 'var(--lcars-red)',
  green: 'var(--lcars-green)',
  text: 'var(--lcars-text)',
};

const sizeMap = {
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

function LcarsText({
  children,
  size = 'md',
  color = 'text',
  as: Component = 'span',
  style = {},
}) {
  const textColor = colorMap[color] || colorMap.text;
  const fontSize = sizeMap[size] || sizeMap.md;

  const styles = {
    text: {
      color: textColor,
      fontSize,
      fontFamily: 'Antonio, sans-serif',
      fontWeight: 400,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      ...style,
    },
  };

  return <Component style={styles.text}>{children}</Component>;
}

export default LcarsText;
