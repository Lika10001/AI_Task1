import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

interface Expense {
  id: number;
  category: string;
  amount: number;
}

interface Calculations {
  totalAmount: number;
  averageDailyExpense: number;
  top3Expenses: { category: string; amount: number }[];
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [calculations, setCalculations] = useState<Calculations | null>(null);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });

  const fetchExpenses = async () => {
    const response = await axios.get('/api/expenses');
    setExpenses(response.data);
  };

  const fetchCalculations = async () => {
    const response = await axios.get('/api/expenses/calculations');
    setCalculations(response.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchCalculations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/expenses', {
      category: newExpense.category,
      amount: Number(newExpense.amount),
    });
    setNewExpense({ category: '', amount: '' });
    fetchExpenses();
    fetchCalculations();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Expense Calculator
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Add New Expense
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Category"
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Amount ($)"
                type="number"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Expense
              </Button>
            </form>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Expense List
            </Typography>
            <List>
              {expenses.map((expense) => (
                <ListItem key={expense.id}>
                  <ListItemText
                    primary={expense.category}
                    secondary={`$${expense.amount.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {calculations && (
            <Box>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Expenses
                  </Typography>
                  <Typography variant="h4" color="primary">
                    ${calculations.totalAmount.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Average Daily Expense
                  </Typography>
                  <Typography variant="h4" color="secondary">
                    ${calculations.averageDailyExpense.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top 3 Expenses
                  </Typography>
                  <List>
                    {calculations.top3Expenses.map((expense, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={expense.category}
                          secondary={`$${expense.amount.toFixed(2)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App; 