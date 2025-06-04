import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpensesService {
    private expensesRepository;
    constructor(expensesRepository: Repository<Expense>);
    create(createExpenseDto: CreateExpenseDto): Promise<Expense>;
    findAll(): Promise<Expense[]>;
    getCalculations(): Promise<{
        totalAmount: number;
        averageDailyExpense: number;
        top3Expenses: {
            category: string;
            amount: number;
        }[];
    }>;
}
