import './styles/lcars-variables.css';
import './styles/lcars-base.css';

import { LcarsFrame, LcarsHeader, LcarsSidebar } from './components/layout';
import { WIDGET_REGISTRY, WIDGET_ORDER } from './config';
import { useWidgetData } from './hooks/useWidgetData';

const widgetGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gap: 'var(--lcars-spacing)',
  flex: 1,
  minHeight: 0,
};

const mainAreaStyles = {
  gridArea: 'main',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: 'var(--lcars-spacing)',
};

const loadingStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: 'var(--lcars-text)',
  fontSize: '1.2rem',
  letterSpacing: '0.1em',
};

const errorStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: 'var(--lcars-red)',
  fontSize: '1rem',
  letterSpacing: '0.1em',
};

function WidgetContainer({ widgetType }) {
  const registry = WIDGET_REGISTRY[widgetType];
  const { data, loading, error } = useWidgetData(
    widgetType,
    registry.refreshInterval
  );

  if (!registry) {
    return (
      <div style={errorStyles}>
        UNKNOWN WIDGET: {widgetType.toUpperCase()}
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div style={loadingStyles}>
        LOADING {registry.title.toUpperCase()}...
      </div>
    );
  }

  if (error && !data) {
    return (
      <div style={errorStyles}>
        ERROR: {error.toUpperCase()}
      </div>
    );
  }

  const WidgetComponent = registry.component;
  return <WidgetComponent data={data} />;
}

function App() {
  return (
    <LcarsFrame>
      <LcarsHeader title="LIFE DASHBOARD" />
      <LcarsSidebar />
      <main style={mainAreaStyles}>
        <div style={widgetGridStyles}>
          {WIDGET_ORDER.map((widgetType) => (
            <WidgetContainer key={widgetType} widgetType={widgetType} />
          ))}
        </div>
      </main>
    </LcarsFrame>
  );
}

export default App;
