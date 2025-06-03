import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Label, Select, Text, Card } from 'tamagui';

const ExpenseList = ({  }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const expenses = [
    { title: 'Groceries', amount: 50, date: '2023-10-01' },
    { title: 'Rent', amount: 1200, date: '2023-10-02' },
    { title: 'Utilities', amount: 200, date: '2023-10-03' },
    { title: 'Dining Out', amount: 80, date: '2023-10-04' },
    { title: 'Gym Membership', amount: 60, date: '2023-10-05' },
    { title: 'Car Repair', amount: 300, date: '2023-10-06' },
  ];
  const filteredExpenses = expenses.filter((expense) => {
    if (filter === 'all') return true;
    if (filter === 'above100' && expense.amount > 100) return true;
    if (filter === 'below100' && expense.amount <= 100) return true;
    return false;
  }).filter((expense) =>
    expense.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <YStack padding={20} space={20}>
      {/* Search and Filter Section */}
      <XStack space={15} alignItems="center" justifyContent="space-between">
        <YStack flex={1} space={5}>
          <Label fontWeight="bold">Search</Label>
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search expenses"
            borderWidth={1}
            borderColor="$gray10"
            borderRadius={8}
            paddingHorizontal={10}
          />
        </YStack>

        <YStack space={5}>
          <Label fontWeight="bold">Filter</Label>
          <Select value={filter} onValueChange={setFilter} borderWidth={1} borderColor="$gray10" borderRadius={8}>
            <Select.Item value="all" label="All" />
            <Select.Item value="above100" label="Above $100" />
            <Select.Item value="below100" label="Below $100" />
          </Select>
        </YStack>
      </XStack>

      {/* Expense List Section */}
      <YStack space={15}>
        {filteredExpenses.map((expense, index) => (
          <Card key={index} padding={15} backgroundColor="$background" borderRadius={10} shadowColor="$shadowColor" shadowRadius={6}>
            <YStack space={5}>
              <Text fontWeight="bold" fontSize={16}>{expense.title}</Text>
              <Text color="$gray10">Amount: <Text fontWeight="bold">${expense.amount}</Text></Text>
              <Text color="$gray10">Date: {expense.date}</Text>
            </YStack>
          </Card>
        ))}

        {filteredExpenses.length === 0 && (
          <Text textAlign="center" color="$gray10">No expenses found</Text>
        )}
      </YStack>
    </YStack>
  );
};

export default ExpenseList;
