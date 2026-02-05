import express from 'express';
import auth from '../middleware/auth.js';
import dataStore from '../services/dataStore.js';

const router = express.Router();

const VALID_WIDGET_TYPES = ['calendar', 'weather', 'bills', 'recession'];

router.post('/:widgetType', auth, async (req, res) => {
  try {
    const { widgetType } = req.params;

    if (!VALID_WIDGET_TYPES.includes(widgetType)) {
      return res.status(400).json({
        error: 'Invalid widget type',
        validTypes: VALID_WIDGET_TYPES
      });
    }

    await dataStore.write(widgetType, req.body);

    res.json({ success: true, widgetType });
  } catch (error) {
    console.error(`Webhook error for ${req.params.widgetType}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
