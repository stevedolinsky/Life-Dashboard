import React from 'react';
import LcarsPanel from '../layout/LcarsPanel';
import LcarsText from '../common/LcarsText';
import styles from './WeatherWidget.module.css';

function WeatherWidget({ data, lastUpdated }) {
  if (!data) {
    return (
      <LcarsPanel title="WEATHER" color="blue" lastUpdated={lastUpdated}>
        <div className={styles.container}>
          <LcarsText size="lg" color="text">
            AWAITING DATA
          </LcarsText>
        </div>
      </LcarsPanel>
    );
  }

  const { current = {}, location = {} } = data;
  const { temp, condition, humidity } = current;
  const { city } = location;

  // Format lastUpdated for display if it's provided
  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : null;

  return (
    <LcarsPanel
      title="WEATHER"
      color="blue"
      lastUpdated={formattedTime}
    >
      <div className={styles.container}>
        {/* Temperature - Focal Point */}
        <div className={styles.temperatureSection}>
          <div className={styles.temperature}>
            <LcarsText size="xl" color="blue" as="div">
              {temp}
            </LcarsText>
            <LcarsText
              size="lg"
              color="blue"
              as="span"
              style={{ marginLeft: '4px' }}
            >
              °F
            </LcarsText>
          </div>
        </div>

        {/* Condition */}
        <div className={styles.infoRow}>
          <LcarsText size="md" color="blue" as="div">
            {condition ? condition.toUpperCase() : 'N/A'}
          </LcarsText>
        </div>

        {/* Humidity */}
        <div className={styles.infoRow}>
          <LcarsText size="sm" color="text" as="span">
            HUMIDITY:
          </LcarsText>
          <LcarsText
            size="sm"
            color="blue"
            as="span"
            style={{ marginLeft: '8px' }}
          >
            {humidity}%
          </LcarsText>
        </div>

        {/* City */}
        <div className={styles.infoRow}>
          <LcarsText size="sm" color="text" as="span">
            LOCATION:
          </LcarsText>
          <LcarsText
            size="sm"
            color="blue"
            as="span"
            style={{ marginLeft: '8px' }}
          >
            {city || 'UNKNOWN'}
          </LcarsText>
        </div>
      </div>
    </LcarsPanel>
  );
}

export default WeatherWidget;
