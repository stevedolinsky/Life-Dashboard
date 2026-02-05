import React from 'react';

const styles = {
  sidebar: {
    gridArea: 'sidebar',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--lcars-spacing)',
    width: 'var(--lcars-sidebar-width)',
  },
  topBlock: {
    backgroundColor: 'var(--lcars-orange)',
    height: '120px',
    borderRadius: 'var(--lcars-radius) var(--lcars-radius) 0 0',
  },
  bar: {
    height: 'var(--lcars-bar-height)',
    width: '100%',
  },
  goldBar: {
    backgroundColor: 'var(--lcars-gold)',
  },
  lavenderBar: {
    backgroundColor: 'var(--lcars-lavender)',
  },
  blueBar: {
    backgroundColor: 'var(--lcars-blue)',
  },
  elbowContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100px',
  },
  elbowTop: {
    backgroundColor: 'var(--lcars-orange)',
    flex: 1,
    borderRadius: '0 0 0 var(--lcars-radius)',
  },
  elbowCorner: {
    display: 'flex',
    height: '60px',
  },
  elbowVertical: {
    backgroundColor: 'var(--lcars-orange)',
    width: '60%',
    borderRadius: '0 0 var(--lcars-radius) 0',
  },
  elbowHorizontal: {
    backgroundColor: 'var(--lcars-bg)',
    flex: 1,
  },
};

function LcarsSidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.topBlock} />
      <div style={{ ...styles.bar, ...styles.goldBar }} />
      <div style={{ ...styles.bar, ...styles.lavenderBar }} />
      <div style={{ ...styles.bar, ...styles.blueBar }} />
      <div style={{ ...styles.bar, ...styles.goldBar }} />
      <div style={styles.elbowContainer}>
        <div style={styles.elbowTop} />
        <div style={styles.elbowCorner}>
          <div style={styles.elbowVertical} />
          <div style={styles.elbowHorizontal} />
        </div>
      </div>
    </aside>
  );
}

export default LcarsSidebar;
