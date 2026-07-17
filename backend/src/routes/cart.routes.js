import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => {
  res.json({ ok: true, route: 'cart' });
});

export default router;

