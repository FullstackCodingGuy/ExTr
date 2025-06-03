import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Label } from 'tamagui';

const ExpenseTransactionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (title && amount && date) {
      onSubmit({ title, amount: parseFloat(amount), date });
      setTitle('');
      setAmount('');
      setDate('');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <YStack padding={20} space={15} backgroundColor="$background" borderRadius={10} shadowColor="$shadowColor" shadowRadius={4} elevation={2}>
      <YStack space={10}>
        <Label>Title</Label>
        <Input
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
      </YStack>

      <YStack space={10}>
        <Label>Amount</Label>
        <Input
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </YStack>

      <YStack space={10}>
        <Label>Date</Label>
        <Input
          value={date}
          onChangeText={setDate}
          placeholder="Enter date (YYYY-MM-DD)"
        />
      </YStack>

      <XStack justifyContent="center">
        <Button theme="primary" onPress={handleSubmit}>Add Transaction</Button>
      </XStack>
    </YStack>
  );
};

export default ExpenseTransactionForm;
