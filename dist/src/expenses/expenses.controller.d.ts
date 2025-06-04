import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(createExpenseDto: CreateExpenseDto): Promise<import("./entities/expense.entity").Expense>;
    findAll(): Promise<import("./entities/expense.entity").Expense[]>;
    getCalculations(): Promise<{
        totalAmount: number;
        averageDailyExpense: number;
        top3Expenses: {
            category: string;
            amount: number;
        }[];
    }>;
}
