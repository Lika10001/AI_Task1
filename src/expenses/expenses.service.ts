import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto) {
    const expense = this.expensesRepository.create(createExpenseDto);
    return this.expensesRepository.save(expense);
  }

  findAll() {
    return this.expensesRepository.find();
  }

  async getCalculations() {
    const expenses = await this.expensesRepository.find();
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const dailyAverage = total / 30; // Assuming 30 days per month

    const top3Expenses = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3)
      .map(expense => ({
        category: expense.category,
        amount: expense.amount,
      }));

    return {
      totalAmount: total,
      averageDailyExpense: dailyAverage,
      top3Expenses,
    };
  }
} 