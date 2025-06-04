"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
function App() {
    const [expenses, setExpenses] = (0, react_1.useState)([]);
    const [calculations, setCalculations] = (0, react_1.useState)(null);
    const [newExpense, setNewExpense] = (0, react_1.useState)({ category: '', amount: '' });
    const fetchExpenses = async () => {
        const response = await axios_1.default.get('/api/expenses');
        setExpenses(response.data);
    };
    const fetchCalculations = async () => {
        const response = await axios_1.default.get('/api/expenses/calculations');
        setCalculations(response.data);
    };
    (0, react_1.useEffect)(() => {
        fetchExpenses();
        fetchCalculations();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios_1.default.post('/api/expenses', {
            category: newExpense.category,
            amount: Number(newExpense.amount),
        });
        setNewExpense({ category: '', amount: '' });
        fetchExpenses();
        fetchCalculations();
    };
    return (<material_1.Container maxWidth="lg" sx={{ py: 4 }}>
      <material_1.Typography variant="h3" gutterBottom align="center">
        Expense Calculator
      </material_1.Typography>

      <material_1.Grid container spacing={3}>
        <material_1.Grid item xs={12} md={6}>
          <material_1.Paper sx={{ p: 3, mb: 3 }}>
            <material_1.Typography variant="h5" gutterBottom>
              Add New Expense
            </material_1.Typography>
            <form onSubmit={handleSubmit}>
              <material_1.TextField fullWidth label="Category" value={newExpense.category} onChange={(e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { category: e.target.value }))} margin="normal" required/>
              <material_1.TextField fullWidth label="Amount ($)" type="number" value={newExpense.amount} onChange={(e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { amount: e.target.value }))} margin="normal" required/>
              <material_1.Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Add Expense
              </material_1.Button>
            </form>
          </material_1.Paper>

          <material_1.Paper sx={{ p: 3 }}>
            <material_1.Typography variant="h5" gutterBottom>
              Expense List
            </material_1.Typography>
            <material_1.List>
              {expenses.map((expense) => (<material_1.ListItem key={expense.id}>
                  <material_1.ListItemText primary={expense.category} secondary={`$${expense.amount.toFixed(2)}`}/>
                </material_1.ListItem>))}
            </material_1.List>
          </material_1.Paper>
        </material_1.Grid>

        <material_1.Grid item xs={12} md={6}>
          {calculations && (<material_1.Box>
              <material_1.Card sx={{ mb: 2 }}>
                <material_1.CardContent>
                  <material_1.Typography variant="h6" gutterBottom>
                    Total Expenses
                  </material_1.Typography>
                  <material_1.Typography variant="h4" color="primary">
                    ${calculations.totalAmount.toFixed(2)}
                  </material_1.Typography>
                </material_1.CardContent>
              </material_1.Card>

              <material_1.Card sx={{ mb: 2 }}>
                <material_1.CardContent>
                  <material_1.Typography variant="h6" gutterBottom>
                    Average Daily Expense
                  </material_1.Typography>
                  <material_1.Typography variant="h4" color="secondary">
                    ${calculations.averageDailyExpense.toFixed(2)}
                  </material_1.Typography>
                </material_1.CardContent>
              </material_1.Card>

              <material_1.Card>
                <material_1.CardContent>
                  <material_1.Typography variant="h6" gutterBottom>
                    Top 3 Expenses
                  </material_1.Typography>
                  <material_1.List>
                    {calculations.top3Expenses.map((expense, index) => (<material_1.ListItem key={index}>
                        <material_1.ListItemText primary={expense.category} secondary={`$${expense.amount.toFixed(2)}`}/>
                      </material_1.ListItem>))}
                  </material_1.List>
                </material_1.CardContent>
              </material_1.Card>
            </material_1.Box>)}
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Container>);
}
exports.default = App;
//# sourceMappingURL=App.js.map