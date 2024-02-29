import express from 'express';
import Accounting from '../module/accounting/router/router';

const router = express.Router();

router.use('/accounting', Accounting);

export default router;
