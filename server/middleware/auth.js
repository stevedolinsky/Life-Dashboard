const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  if (!process.env.WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET environment variable not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (token !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};

export default auth;
