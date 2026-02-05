import React from 'react';

const colorMap = {
  orange: 'var(--lcars-orange)',
  gold: 'var(--lcars-gold)',
  lavender: 'var(--lcars-lavender)',
  blue: 'var(--lcars-blue)',
  red: 'var(--lcars-red)',
  green: 'var(--lcars-green)',
};

function LcarsPanel({ title, children, color = 'orange', lastUpdated }) {
  const accentColor = colorMap[color] || colorMap.orange;

  const styles = {
    panel: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--lcars-spacing)',
      marginBottom: 'var(--lcars-spacing)',
    },
    titleBar: {
      backgroundColor: accentColor,
      color: 'var(--lcars-bg)',
      padding: '8px 20px',
      borderRadius: 'var(--lcars-radius)',
      fontSize: '0.9rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      whiteSpace: 'nowrap',
    },
    headerLine: {
      flex: 1,
      height: '4px',
      backgroundColor: accentColor,
      borderRadius: '2px',
    },
    content: {
      flex: 1,
      border: `2px solid ${accentColor}`,
      borderRadius: '0 var(--lcars-radius) var(--lcars-radius) var(--lcars-radius)',
      padding: 'var(--lcars-spacing)',
      overflow: 'auto',
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 'var(--lcars-spacing)',
    },
    timestamp: {
      fontSize: '0.7rem',
      color: accentColor,
      letterSpacing: '0.05em',
      opacity: 0.8,
    },
  };

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span style={styles.titleBar}>{title}</span>
        <div style={styles.headerLine} />
      </div>
      <div style={styles.content}>
        {children}
      </div>
      {lastUpdated && (
        <div style={styles.footer}>
          <span style={styles.timestamp}>LAST UPDATED: {lastUpdated}</span>
        </div>
      )}
    </div>
  );
}

export default LcarsPanel;
