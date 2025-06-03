import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Label, Select, Text, Card, H3, Separator } from 'tamagui';
import { ScrollView } from 'react-native';

const ExpenseList = ({ expenses = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const defaultExpenses = [
    { title: 'Groceries', amount: 50, date: '2023-10-01', category: 'Food' },
    { title: 'Rent', amount: 1200, date: '2023-10-02', category: 'Housing' },
    { title: 'Utilities', amount: 200, date: '2023-10-03', category: 'Bills' },
    { title: 'Dining Out', amount: 80, date: '2023-10-04', category: 'Food' },
    { title: 'Gym Membership', amount: 60, date: '2023-10-05', category: 'Health' },
    { title: 'Car Repair', amount: 300, date: '2023-10-06', category: 'Transport' },
  ];

  const expenseData = expenses.length > 0 ? expenses : defaultExpenses;
  
  const filteredExpenses = expenseData.filter((expense) => {
    if (filter === 'all') return true;
    if (filter === 'above100' && expense.amount > 100) return true;
    if (filter === 'below100' && expense.amount <= 100) return true;
    return false;
  }).filter((expense) =>
    expense.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <YStack flex={1} backgroundColor="#f5f5f5">
      {/* Header Section */}
      <YStack padding={20} paddingBottom={10}>
        <H3 textAlign="center" marginBottom={10} color="#333">Expense Tracker</H3>
        <Card padding={15} backgroundColor="#007bff" borderRadius={12}>
          <YStack alignItems="center">
            <Text color="white" fontSize={14}>Total Expenses</Text>
            <Text color="white" fontSize={24} fontWeight="bold">${totalAmount.toFixed(2)}</Text>
          </YStack>
        </Card>
      </YStack>

      {/* Search and Filter Section */}
      <YStack paddingHorizontal={20} paddingBottom={10}>
        <XStack space={10} alignItems="flex-end">
          <YStack flex={2} space={5}>
            <Label fontSize={14} fontWeight="600" color="#666">Search</Label>
            <Input
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search expenses..."
              backgroundColor="white"
              borderWidth={1}
              borderColor="#e0e0e0"
              borderRadius={10}
              paddingHorizontal={15}
              height={45}
              color="#333"
            />
          </YStack>

          <YStack flex={1} space={5}>
            <Label fontSize={14} fontWeight="600" color="#666">Filter</Label>
            <Select value={filter} onValueChange={setFilter} backgroundColor="white" borderRadius={10} height={45}>
              <Select.Item value="all" label="All" />
              <Select.Item value="above100" label="> $100" />
              <Select.Item value="below100" label="≤ $100" />
            </Select>
          </YStack>
        </XStack>
      </YStack>

      <Separator marginHorizontal={20} marginBottom={10} />

      {/* Expense List Section */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <YStack paddingHorizontal={20} space={12} paddingBottom={100}>
          {filteredExpenses.map((expense, index) => (
            <Card 
              key={index} 
              padding={16} 
              backgroundColor="white" 
              borderRadius={12} 
              borderWidth={1}
              borderColor="#e0e0e0"
              shadowColor="#000" 
              shadowRadius={8}
              shadowOpacity={0.1}
              elevation={3}
            >
              <XStack justifyContent="space-between" alignItems="center">
                <YStack flex={1} space={4}>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text fontWeight="700" fontSize={16} color="#333">{expense.title}</Text>
                    <Text fontWeight="bold" fontSize={18} color="#007bff">${expense.amount}</Text>
                  </XStack>
                  
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text fontSize={13} color="#666">
                      {expense.category && `${expense.category} • `}{expense.date}
                    </Text>
                    <XStack space={8} alignItems="center">
                      <YStack 
                        width={8} 
                        height={8} 
                        borderRadius={4} 
                        backgroundColor={expense.amount > 100 ? "#dc3545" : "#28a745"} 
                      />
                      <Text fontSize={12} color="#888">
                        {expense.amount > 100 ? "High" : "Low"}
                      </Text>
                    </XStack>
                  </XStack>
                </YStack>
              </XStack>
            </Card>
          ))}

          {filteredExpenses.length === 0 && (
            <YStack alignItems="center" paddingVertical={40}>
              <Text fontSize={16} color="#666" textAlign="center">
                No expenses found
              </Text>
              <Text fontSize={14} color="#999" textAlign="center" marginTop={8}>
                Try adjusting your search or filter criteria
              </Text>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default ExpenseList;
