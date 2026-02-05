import React from 'react';

const styles = {
  container: {
    display: 'grid',
    gridTemplateAreas: `
      "header header"
      "sidebar main"
    `,
    gridTemplateColumns: 'var(--lcars-sidebar-width) 1fr',
    gridTemplateRows: 'var(--lcars-header-height) 1fr',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'var(--lcars-bg)',
    padding: 'var(--lcars-spacing)',
    gap: 'var(--lcars-spacing)',
    overflow: 'hidden',
  },
  main: {
    gridArea: 'main',
    overflow: 'auto',
    padding: 'var(--lcars-spacing)',
  },
};

function LcarsFrame({ children }) {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
}

export default LcarsFrame;
