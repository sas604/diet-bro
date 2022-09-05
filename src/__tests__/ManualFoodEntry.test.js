/**
 * @jest-environment jsdom
 */
import { expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import ManualFoodEntry from '../components/ManualFoodEntry';
describe('Manual Food Entry componet', () => {
  const mockSubmit = jest.fn();
  beforeEach(() => {
    render(<ManualFoodEntry handleSubmit={mockSubmit} />);
  });
  test('Can type to name input', async () => {
    const nameInput = screen.getByLabelText('Food name');
    fireEvent.change(nameInput, { target: { value: 'Burrito' } });
    expect(nameInput.value).toBe('Burrito');
  });
  test('Can type in number input', async () => {
    const energyInput = screen.getByLabelText('energy');
    fireEvent.change(energyInput, { target: { value: 300 } });
    expect(energyInput.value).toBe('300');
  });
  test("Can't type negative number ", async () => {
    const energyInput = screen.getByLabelText('energy');
    fireEvent.change(energyInput, { target: { value: -1 } });
    expect(energyInput.value).toBe('');
  });
  test('Button displays calories count', async () => {
    const energyInput = screen.getByLabelText('energy');
    fireEvent.change(energyInput, { target: { value: 100 } });
    screen.getByText('Add 100 Cal');
  });
  test('Button is disabled if 0 calories', async () => {
    const energyInput = screen.getByLabelText('energy');
    fireEvent.change(energyInput, { target: { value: 0 } });
    expect(screen.getByTestId('addbtn')).toHaveAttribute('disabled');
  });
  test('Clicing button submits form', async () => {
    const nameInput = screen.getByLabelText('Food name');
    fireEvent.change(nameInput, { target: { value: 'Burrito' } });
    const energyInput = screen.getByLabelText('energy');
    fireEvent.change(energyInput, { target: { value: 300 } });
    const btn = screen.getByTestId('addbtn');
    fireEvent.click(btn);
    expect(mockSubmit).toBeCalledWith({
      kcal: 300,
      name: 'Burrito',
    });
  });
});
