import React from 'react';
import LcarsPanel from '../layout/LcarsPanel';
import LcarsText from '../common/LcarsText';

function CalendarWidget({ data = {} }) {
  const { events = [], lastUpdated } = data;

  // Sort events by start time and take first 5
  const sortedEvents = [...events]
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5);

  // Format date and time from ISO string
  const formatEventDateTime = (startString) => {
    const date = new Date(startString);
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const day = dayNames[date.getDay()];
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${day} ${time}`;
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
    eventItem: {
      borderLeft: '3px solid var(--lcars-orange)',
      paddingLeft: '12px',
      paddingRight: '8px',
      paddingTop: '6px',
      paddingBottom: '6px',
    },
    eventTime: {
      color: 'var(--lcars-orange)',
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      marginBottom: '4px',
      fontFamily: 'Antonio, sans-serif',
      textTransform: 'uppercase',
    },
    eventTitle: {
      color: 'var(--lcars-text)',
      fontSize: '0.95rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
      marginBottom: '3px',
      fontFamily: 'Antonio, sans-serif',
      textTransform: 'uppercase',
    },
    eventLocation: {
      color: 'var(--lcars-lavender)',
      fontSize: '0.75rem',
      letterSpacing: '0.05em',
      fontFamily: 'Antonio, sans-serif',
      textTransform: 'uppercase',
      opacity: 0.8,
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
      title="CALENDAR"
      color="lavender"
      lastUpdated={lastUpdated ? formatTimestamp(lastUpdated) : undefined}
    >
      <div style={styles.container}>
        {sortedEvents.length === 0 ? (
          <div style={styles.emptyState}>NO UPCOMING EVENTS</div>
        ) : (
          sortedEvents.map((event) => (
            <div key={event.id} style={styles.eventItem}>
              <div style={styles.eventTime}>{formatEventDateTime(event.start)}</div>
              <div style={styles.eventTitle}>{event.title}</div>
              {event.location && <div style={styles.eventLocation}>{event.location}</div>}
            </div>
          ))
        )}
      </div>
    </LcarsPanel>
  );
}

export default CalendarWidget;
