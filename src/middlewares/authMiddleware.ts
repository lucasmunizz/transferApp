import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import { adminRepository } from '../repositories/adminRepository'
import jwt from 'jsonwebtoken'

type JwtPayload = {
	id: number
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError('Não autorizado')
	}

	const token = authorization.split(' ')[1]

	const secret = 'my_secret'

	const { id } = jwt.verify(token, secret) as JwtPayload

	const admin = await adminRepository.findOneBy({ id })

	if (!admin) {
		throw new UnauthorizedError('Não autorizado')
	}

	const { password: _, ...loggedAdmin } = admin

	req.admin = loggedAdmin

	next()
}
