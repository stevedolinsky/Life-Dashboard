import express from 'express';
import dataStore from '../services/dataStore.js';

const router = express.Router();

router.get('/:widgetType', async (req, res) => {
  try {
    const { widgetType } = req.params;
    const data = await dataStore.read(widgetType);

    if (data === null) {
      return res.status(404).json({ error: 'not found' });
    }

    res.json(data);
  } catch (error) {
    console.error(`Data read error for ${req.params.widgetType}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
