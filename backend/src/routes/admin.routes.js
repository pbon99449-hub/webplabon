import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => {
  res.json({ ok: true, route: 'admin' });
});

export default router;

