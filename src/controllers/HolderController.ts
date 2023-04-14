import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'
import { holderRepository } from '../repositories/holderRepository'
import { accountRepository } from '../repositories/accountRepository'

export class HolderController {

    async create(req: Request, res: Response) {

        const { name, email, cpf } = req.body;
    
        try {

            const emailExists = await holderRepository.findOneBy({ email });

            if (emailExists) {
                return res.status(400).json({ message: 'E-mail já existe'});
            }

            const cpfExists = await holderRepository.findOneBy({ cpf });

            if (cpfExists) {
                throw new BadRequestError('CPF já existe');
            }

            const newHolder = holderRepository.create({
                name,
                email,
                cpf
            })

            console.log(name, email, cpf);

            await holderRepository.save(newHolder);

            return res.status(201).json(newHolder);

        } catch (error) {

            console.log(error);
        }

    }

    async createAccount(req: Request, res: Response) {

        const { numberAccount } = req.body;
        const { id } = req.params;

        try {

            const holder = await holderRepository.findOneBy({ id: Number(id) });

            if (!holder) {
                return res.status(404).json({ message: 'Titular não existe'})
            }

            const newAccount = accountRepository.create({
                numberAccount,
                holder
            })


            await accountRepository.save(newAccount);

            return res.status(201).json(newAccount);

        } catch (error) {

            console.log(error)
        }

    }

    async indexAccounts(req: Request, res: Response){

        const accounts = await accountRepository.find();

        return res.status(201).json(accounts)
    }

    async indexHolders(req: Request, res: Response){

        const holders = await holderRepository.find();

        return res.status(201).json(holders)
    }
}