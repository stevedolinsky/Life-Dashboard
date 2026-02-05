import React from 'react';
import LcarsPanel from '../layout/LcarsPanel';

function BillsWidget({ data = {} }) {
  const { bills = [], lastUpdated } = data;

  // Sort bills by daysUntilDue (soonest first) and take first 6
  const sortedBills = [...bills]
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
    .slice(0, 6);

  // Format date from ISO string to "MON DD"
  const formatBillDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}`;
  };

  // Get color based on days until due
  const getDaysColor = (daysUntilDue) => {
    if (daysUntilDue <= 3) {
      return 'var(--lcars-red)';
    } else if (daysUntilDue <= 7) {
      return 'var(--lcars-gold)';
    } else {
      return 'var(--lcars-green)';
    }
  };

  // Format lastUpdated for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      height: '100%',
    },
    billItem: {
      borderLeft: '3px solid var(--lcars-gold)',
      paddingLeft: '12px',
      paddingRight: '8px',
      paddingTop: '6px',
      paddingBottom: '6px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    billContent: {
      flex: 1,
      minWidth: 0,
    },
    vendor: {
      color: 'var(--lcars-text)',
      fontSize: '0.95rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
      marginBottom: '4px',
      fontFamily: 'Antonio, sans-serif',
      textTransform: 'uppercase',
    },
    dueDate: {
      color: 'var(--lcars-gold)',
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      fontFamily: 'Antonio, sans-serif',
      textTransform: 'uppercase',
      opacity: 0.8,
    },
    daysUntilDue: {
      paddingLeft: '16px',
      textAlign: 'right',
      whiteSpace: 'nowrap',
    },
    daysBadge: {
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      fontFamily: 'Antonio, sans-serif',
      textTransform: 'uppercase',
    },
    emptyState: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'var(--lcars-text)',
      fontSize: '0.9rem',
      letterSpacing: '0.1em',
      fontFamily: 'Antonio, sans-serif',
      textTransform: 'uppercase',
      opacity: 0.6,
    },
  };

  return (
    <LcarsPanel
      title="BILLS DUE"
      color="gold"
      lastUpdated={lastUpdated ? formatTimestamp(lastUpdated) : undefined}
    >
      <div style={styles.container}>
        {sortedBills.length === 0 ? (
          <div style={styles.emptyState}>NO UPCOMING BILLS</div>
        ) : (
          sortedBills.map((bill, index) => (
            <div key={index} style={styles.billItem}>
              <div style={styles.billContent}>
                <div style={styles.vendor}>{bill.vendor}</div>
                <div style={styles.dueDate}>{formatBillDate(bill.dueDate)}</div>
              </div>
              <div style={styles.daysUntilDue}>
                <div
                  style={{
                    ...styles.daysBadge,
                    color: getDaysColor(bill.daysUntilDue),
                  }}
                >
                  {bill.daysUntilDue} {bill.daysUntilDue === 1 ? 'DAY' : 'DAYS'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </LcarsPanel>
  );
}

export default BillsWidget;
