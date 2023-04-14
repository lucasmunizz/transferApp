import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'
import { adminRepository } from '../repositories/adminRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AdminController {
	async create(req: Request, res: Response) {
		const { name, username, password } = req.body
		
		const adminExists = await adminRepository.findOneBy({ username })

		if (adminExists) {
			throw new BadRequestError('Usuário já existe')
		}

		const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if(!(passwordValidation.test(password))){
            return res.status(400).json({ message: 'A senha deve conter 8 dígitos, caracteres especiais, letras maiúsculas e minúsculas' })
        };

		const hashPassword = await bcrypt.hash(password, 10)

		const newAdmin = adminRepository.create({
			name,
			username,
			password: hashPassword,
		})

		console.log(name, username, password);

		await adminRepository.save(newAdmin)

		const { password: _, ...admin } = newAdmin

		return res.status(201).json(admin)
	}

	async login(req: Request, res: Response) {

		try {

		const { username, password } = req.body

		const admin = await adminRepository.findOneBy({ username })

		if (!admin) {
			return res.status(400).json({ message: 'Usuário ou senha inválidos'})
		}

		const verifyPass = await bcrypt.compare(password, admin.password)

		if (!verifyPass) {
			return res.status(400).json({ message: 'Usuário ou senha inválidos'})
		}

		const secret = 'my_secret'

		const token = jwt.sign({ id: admin.id }, secret, {
			expiresIn: '8h',
		})

		console.log(token)

		const { password: _, ...adminLogin } = admin

		return res.json({
			admin: adminLogin,
			token: token,
		})
		} catch (error) {
			console.log(error);
		}
		
	}
 }
