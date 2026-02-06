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
  const { temp, feelsLike, condition, humidity, windSpeed, visibility, uvi, sunrise, sunset } = current;
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
          <div className={styles.tempMain}>
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
            {feelsLike !== undefined && (
              <div className={styles.feelsLike}>
                <LcarsText size="sm" color="text" as="span">
                  FEELS LIKE {feelsLike}°F
                </LcarsText>
              </div>
            )}
          </div>
        </div>

        {/* Condition & Location */}
        <div className={styles.infoRow}>
          <LcarsText size="md" color="blue" as="span">
            {condition ? condition.toUpperCase() : 'N/A'}
          </LcarsText>
          <LcarsText size="sm" color="text" as="span" style={{ marginLeft: 'auto' }}>
            {city || 'UNKNOWN'}
          </LcarsText>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <LcarsText size="xs" color="text" as="div">HUMIDITY</LcarsText>
            <LcarsText size="sm" color="blue" as="div">{humidity}%</LcarsText>
          </div>
          <div className={styles.statItem}>
            <LcarsText size="xs" color="text" as="div">WIND</LcarsText>
            <LcarsText size="sm" color="blue" as="div">{windSpeed} mph</LcarsText>
          </div>
          <div className={styles.statItem}>
            <LcarsText size="xs" color="text" as="div">UV INDEX</LcarsText>
            <LcarsText size="sm" color="blue" as="div">{uvi}</LcarsText>
          </div>
          <div className={styles.statItem}>
            <LcarsText size="xs" color="text" as="div">VISIBILITY</LcarsText>
            <LcarsText size="sm" color="blue" as="div">{visibility} mi</LcarsText>
          </div>
        </div>

        {/* Sunrise/Sunset */}
        <div className={styles.sunTimes}>
          <div className={styles.sunItem}>
            <LcarsText size="xs" color="text" as="span">SUNRISE</LcarsText>
            <LcarsText size="sm" color="orange" as="span" style={{ marginLeft: '8px' }}>
              {sunrise || 'N/A'}
            </LcarsText>
          </div>
          <div className={styles.sunItem}>
            <LcarsText size="xs" color="text" as="span">SUNSET</LcarsText>
            <LcarsText size="sm" color="orange" as="span" style={{ marginLeft: '8px' }}>
              {sunset || 'N/A'}
            </LcarsText>
          </div>
        </div>
      </div>
    </LcarsPanel>
  );
}

export default WeatherWidget;
