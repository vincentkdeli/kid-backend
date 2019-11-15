import { Router } from 'express'
import AccountController from '../controllers/AccountController'

const router = Router()

router.post('/register', AccountController.register)
router.post('/login', AccountController.login)

export default router
