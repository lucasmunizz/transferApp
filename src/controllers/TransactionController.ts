import { Request, Response } from 'express';
import { transactionRepository } from '../repositories/transferRepository';
import { UnauthorizedError } from '../helpers/api-erros';
import { accountRepository } from '../repositories/accountRepository';

export class TransactionController {
  public async create(req: Request, res: Response){
  
    const { senderNumberAccount, receiverNumberAccount, type, amount } = req.body;

    console.log(senderNumberAccount, receiverNumberAccount, type, amount)
   
    try {

        const sender = await accountRepository.findOne({
            where: {
                numberAccount: senderNumberAccount 
            }
        })
        const receiver = await accountRepository.findOne({
            where: {
                numberAccount: receiverNumberAccount 
            }
        })
    
        if (!sender || !receiver) {
          return res.status(404).json({ message: 'User not found' });
        }

        if (sender.numberAccount === receiver.numberAccount){
            return res.status(400).json({ message: 'Não é possível enviar transferências para a mesma conta'})
        }
    
        switch (type) {
          case 'PIX':
            if (amount > 5000) {
              return res.status(400).json({ message: 'Limite de transferência PIX excedido' });
            }
            break;
          case 'TED':
            if (amount <= 5000 || amount > 10000) {
              return res.status(400).json({ message: 'Valor de transferência TED inválido' });
            }
            break;
          case 'DOC':
            if (amount <= 10000) {
              return res.status(400).json({ message: 'Valor de transferência DOC inválido' });
            }
            break;
          default:
            return res.status(400).json({ message: 'Tipo de transferência inválido' });
        }
    
        const newTransaction = await transactionRepository.create({
            type,
            amount,
         })
       

        sender.balance -= amount;
        receiver.balance += amount * 1;

        await transactionRepository.save(newTransaction);
        await accountRepository.save(sender);
        await accountRepository.save(receiver);

        const data = {
            senderBalance: sender.balance,
            receiverBalance: receiver.balance
        }

        return res.status(201).json(data);

    } catch (error) {
        
        console.log(error)
    }
  
  }

  public async index(req: Request, res: Response){
    const transactions = await transactionRepository.find();
    return res.status(200).json(transactions);
  }
}