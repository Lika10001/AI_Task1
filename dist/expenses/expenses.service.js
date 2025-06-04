"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("./entities/expense.entity");
let ExpensesService = class ExpensesService {
    constructor(expensesRepository) {
        this.expensesRepository = expensesRepository;
    }
    create(createExpenseDto) {
        const expense = this.expensesRepository.create(createExpenseDto);
        return this.expensesRepository.save(expense);
    }
    findAll() {
        return this.expensesRepository.find();
    }
    async getCalculations() {
        const expenses = await this.expensesRepository.find();
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const dailyAverage = total / 30;
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
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map