import { Router } from 'express'
import { AdminController } from './controllers/AdminController'
import { authMiddleware } from './middlewares/authMiddleware'
import { TransactionController } from './controllers/TransactionController'
import cors from 'cors'
import { HolderController } from './controllers/HolderController'

const routes = Router()

routes.use(cors());

routes.post('/admin', new AdminController().create);
routes.post('/login', new AdminController().login);

routes.post('/holder', new HolderController().create)
routes.post('/holder/:id/create-account', new HolderController().createAccount)
routes.get('/holder/accounts', new HolderController().indexAccounts)
routes.get('/holder/holders', new HolderController().indexHolders)

routes.post('/transaction', new TransactionController().create);
routes.get('/transaction/index', new TransactionController().index);

routes.use(authMiddleware)

export default routes
