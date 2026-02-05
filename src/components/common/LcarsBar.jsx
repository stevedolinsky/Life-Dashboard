import React from 'react';

const colorMap = {
  orange: 'var(--lcars-orange)',
  gold: 'var(--lcars-gold)',
  lavender: 'var(--lcars-lavender)',
  blue: 'var(--lcars-blue)',
  red: 'var(--lcars-red)',
  green: 'var(--lcars-green)',
};

function LcarsBar({
  color = 'orange',
  height = 'var(--lcars-bar-height)',
  width = '100%',
  rounded = 'none'
}) {
  const backgroundColor = colorMap[color] || colorMap.orange;

  const getBorderRadius = () => {
    const radius = 'var(--lcars-radius)';
    switch (rounded) {
      case 'left':
        return `${radius} 0 0 ${radius}`;
      case 'right':
        return `0 ${radius} ${radius} 0`;
      case 'both':
        return radius;
      case 'none':
      default:
        return '0';
    }
  };

  const styles = {
    bar: {
      backgroundColor,
      height,
      width,
      borderRadius: getBorderRadius(),
    },
  };

  return <div style={styles.bar} />;
}

export default LcarsBar;
