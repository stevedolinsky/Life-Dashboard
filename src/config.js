import CalendarWidget from './components/widgets/CalendarWidget';
import WeatherWidget from './components/widgets/WeatherWidget';
import BillsWidget from './components/widgets/BillsWidget';
import RecessionWidget from './components/widgets/RecessionWidget';

export const WIDGET_REGISTRY = {
  calendar: {
    component: CalendarWidget,
    title: 'Calendar',
    refreshInterval: 60000, // 1 minute
  },
  weather: {
    component: WeatherWidget,
    title: 'Weather',
    refreshInterval: 300000, // 5 minutes
  },
  bills: {
    component: BillsWidget,
    title: 'Bills',
    refreshInterval: 3600000, // 1 hour
  },
  recession: {
    component: RecessionWidget,
    title: 'Recession Risk',
    refreshInterval: null, // Only updates via webhook
  },
};

export const WIDGET_ORDER = ['weather', 'calendar', 'bills', 'recession'];
