import React from 'react';

const styles = {
  header: {
    gridArea: 'header',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--lcars-spacing)',
    height: 'var(--lcars-header-height)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--lcars-orange)',
    height: '100%',
    borderRadius: 'var(--lcars-radius) 0 0 var(--lcars-radius)',
    paddingLeft: 'calc(var(--lcars-radius) + 10px)',
    paddingRight: '20px',
    minWidth: '300px',
  },
  title: {
    color: 'var(--lcars-bg)',
    fontSize: '1.5rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    whiteSpace: 'nowrap',
  },
  middleSection: {
    flex: 1,
    backgroundColor: 'var(--lcars-gold)',
    height: '100%',
  },
  rightSection: {
    backgroundColor: 'var(--lcars-lavender)',
    height: '100%',
    borderRadius: '0 var(--lcars-radius) var(--lcars-radius) 0',
    minWidth: '150px',
  },
};

function LcarsHeader({ title = 'LIFE DASHBOARD' }) {
  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <span style={styles.title}>{title}</span>
      </div>
      <div style={styles.middleSection} />
      <div style={styles.rightSection} />
    </header>
  );
}

export default LcarsHeader;
