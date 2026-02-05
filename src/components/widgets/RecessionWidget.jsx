import React from 'react';
import LcarsPanel from '../layout/LcarsPanel';
import LcarsText from '../common/LcarsText';
import styles from './RecessionWidget.module.css';

function RecessionWidget({ data, lastUpdated }) {
  // Determine color based on scenario
  const getColorFromScenario = (scenario) => {
    switch (scenario) {
      case 'Soft Landing':
        return 'green';
      case 'Elevated Caution':
        return 'gold';
      case 'Recession Watch':
        return 'orange';
      case 'Recession Warning':
        return 'red';
      default:
        return 'orange';
    }
  };

  // Get color for indicator statuses
  const getStatusColor = (status, indicatorType) => {
    if (indicatorType === 'sos') {
      switch (status) {
        case 'INTACT':
          return 'var(--lcars-green)';
        case 'WEAKENING':
          return 'var(--lcars-gold)';
        case 'BREACHED':
          return 'var(--lcars-red)';
        default:
          return 'var(--lcars-text)';
      }
    } else if (indicatorType === 'yieldCurve') {
      switch (status) {
        case 'NORMAL':
          return 'var(--lcars-green)';
        case 'INVERTED':
          return 'var(--lcars-red)';
        case 'BULL_STEEPENER':
          return 'var(--lcars-blue)';
        default:
          return 'var(--lcars-text)';
      }
    } else if (indicatorType === 'leadingIndex') {
      switch (status) {
        case 'EXPANSION':
          return 'var(--lcars-green)';
        case 'NEUTRAL':
          return 'var(--lcars-gold)';
        case 'CONTRACTION':
          return 'var(--lcars-red)';
        default:
          return 'var(--lcars-text)';
      }
    } else if (indicatorType === 'creditSpread') {
      switch (status) {
        case 'TIGHT':
          return 'var(--lcars-green)';
        case 'NORMAL':
          return 'var(--lcars-blue)';
        case 'ELEVATED':
          return 'var(--lcars-orange)';
        case 'STRESSED':
          return 'var(--lcars-red)';
        default:
          return 'var(--lcars-text)';
      }
    }
    return 'var(--lcars-text)';
  };

  if (!data) {
    return (
      <LcarsPanel title="RECESSION RISK" color="orange" lastUpdated={lastUpdated}>
        <div className={styles.container}>
          <LcarsText size="lg" color="text">
            AWAITING DATA
          </LcarsText>
        </div>
      </LcarsPanel>
    );
  }

  const { probability, scenario, indicators = {}, lastUpdated: dataTimestamp } = data;
  const color = getColorFromScenario(scenario);

  // Format lastUpdated for display
  const formattedTime =
    lastUpdated || dataTimestamp
      ? new Date(lastUpdated || dataTimestamp).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : null;

  const {
    sos = {},
    yieldCurve = {},
    leadingIndex = {},
    creditSpread = {},
  } = indicators;

  return (
    <LcarsPanel title="RECESSION RISK" color={color} lastUpdated={formattedTime}>
      <div className={styles.container}>
        {/* Probability - Focal Point */}
        <div className={styles.probabilitySection}>
          <div className={styles.probability}>
            <LcarsText
              size="xl"
              color={color}
              as="span"
              style={{ fontSize: '3.5rem' }}
            >
              {probability}
            </LcarsText>
            <LcarsText
              size="lg"
              color={color}
              as="span"
              style={{ marginLeft: '8px', fontSize: '2rem' }}
            >
              %
            </LcarsText>
          </div>
        </div>

        {/* Scenario */}
        <div className={styles.scenarioSection}>
          <LcarsText size="md" color={color} as="div">
            {scenario || 'UNKNOWN'}
          </LcarsText>
        </div>

        {/* Indicators Summary */}
        <div className={styles.indicatorsSection}>
          {/* SOS Indicator */}
          <div className={styles.indicatorRow}>
            <LcarsText size="sm" color="text" as="span">
              SOS:
            </LcarsText>
            <LcarsText
              size="sm"
              as="span"
              color={getStatusColor(sos.status, 'sos')}
              style={{
                marginLeft: '8px',
                color: getStatusColor(sos.status, 'sos'),
              }}
            >
              {sos.status || 'N/A'}
            </LcarsText>
          </div>

          {/* Yield Curve Indicator */}
          <div className={styles.indicatorRow}>
            <LcarsText size="sm" color="text" as="span">
              YIELD CURVE:
            </LcarsText>
            <LcarsText
              size="sm"
              as="span"
              style={{
                marginLeft: '8px',
                color: getStatusColor(yieldCurve.status, 'yieldCurve'),
              }}
            >
              {yieldCurve.status || 'N/A'}
            </LcarsText>
          </div>

          {/* Leading Index Indicator */}
          <div className={styles.indicatorRow}>
            <LcarsText size="sm" color="text" as="span">
              LEADING INDEX:
            </LcarsText>
            <LcarsText
              size="sm"
              as="span"
              style={{
                marginLeft: '8px',
                color: getStatusColor(leadingIndex.trend, 'leadingIndex'),
              }}
            >
              {leadingIndex.trend || 'N/A'}
            </LcarsText>
          </div>

          {/* Credit Spread Indicator */}
          <div className={styles.indicatorRow}>
            <LcarsText size="sm" color="text" as="span">
              CREDIT SPREAD:
            </LcarsText>
            <LcarsText
              size="sm"
              as="span"
              style={{
                marginLeft: '8px',
                color: getStatusColor(creditSpread.status, 'creditSpread'),
              }}
            >
              {creditSpread.status || 'N/A'}
            </LcarsText>
          </div>
        </div>
      </div>
    </LcarsPanel>
  );
}

export default RecessionWidget;
