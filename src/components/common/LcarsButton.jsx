import React from 'react';

const colorMap = {
  orange: {
    base: 'var(--lcars-orange)',
    hover: '#ffaa33',
  },
  gold: {
    base: 'var(--lcars-gold)',
    hover: '#dd7711',
  },
  lavender: {
    base: 'var(--lcars-lavender)',
    hover: '#ddaadd',
  },
  blue: {
    base: 'var(--lcars-blue)',
    hover: '#aaaaff',
  },
  red: {
    base: 'var(--lcars-red)',
    hover: '#dd7777',
  },
  green: {
    base: 'var(--lcars-green)',
    hover: '#aaddaa',
  },
};

function LcarsButton({ children, onClick, color = 'orange', disabled = false }) {
  const colors = colorMap[color] || colorMap.orange;
  const [isHovered, setIsHovered] = React.useState(false);

  const styles = {
    button: {
      backgroundColor: isHovered && !disabled ? colors.hover : colors.base,
      color: 'var(--lcars-bg)',
      border: 'none',
      borderRadius: '20px',
      padding: '10px 24px',
      fontSize: '0.85rem',
      fontFamily: 'Antonio, sans-serif',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 0.15s ease',
      whiteSpace: 'nowrap',
    },
  };

  return (
    <button
      style={styles.button}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default LcarsButton;
