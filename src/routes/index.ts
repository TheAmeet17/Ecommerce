import userRoutes from './user.route'
import authRoutes from './auth.router'
import profileRoutes from './profile.route'
import categoryRoutes from './category.route'
import productRoutes from './product.route'
import { Router } from 'express'

const router = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         is_admin:
 *           type: boolean
 *           description: Whether the user is an admin
 *       example:
 *         id: 12
 *         email: test@gmail.com
 *         password: smile123@@
 *         is_admin: false
 */
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/profile/me', profileRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)

export default router