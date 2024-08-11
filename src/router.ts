import express from 'express';

//
import authRouter from './modules/auth/auth.router';
import eventRouter from './modules/event/event.router';
import categoryRouter from './modules/category/category.router';

//
const appRouter = express.Router();

//
appRouter.use('/auth', authRouter);
appRouter.use('/event', eventRouter);
appRouter.use('/category', categoryRouter);

/**
 * 404: not found
 */
appRouter.get('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: "This route doesn't exist on server",
  });
});

//
export default appRouter;
