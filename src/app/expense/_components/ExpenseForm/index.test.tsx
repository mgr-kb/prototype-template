import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import { ExpenseForm } from './index';

// useActionStateをモック
const mockUseActionState = vi.fn();
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: mockUseActionState,
  };
});

// Server Actionをモック
vi.mock('../../actions', () => ({
  submitExpenseForm: vi.fn(),
}));

describe('ExpenseForm', () => {
  const mockAction = vi.fn();

  beforeEach(() => {
    mockUseActionState.mockReturnValue([undefined, mockAction, false]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('費目入力フィールドが表示される', () => {
    render(<ExpenseForm />);

    expect(screen.getByLabelText('費目 *')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('例: 交通費、会議費、備品購入費など')
    ).toBeInTheDocument();
    expect(
      screen.getByText('経費の種類を入力してください')
    ).toBeInTheDocument();
  });

  test('申請ボタンが表示される', () => {
    render(<ExpenseForm />);

    expect(
      screen.getByRole('button', { name: '申請する' })
    ).toBeInTheDocument();
  });

  test('費目が未入力の場合、バリデーションエラーが表示される', () => {
    mockUseActionState.mockReturnValue([
      {
        status: 'error',
        error: { category: ['費目を入力してください'] },
      },
      mockAction,
      false,
    ]);

    render(<ExpenseForm />);

    expect(screen.getByText('費目を入力してください')).toBeInTheDocument();
  });

  test('送信中はローディング状態が表示される', () => {
    mockUseActionState.mockReturnValue([undefined, mockAction, true]);

    render(<ExpenseForm />);

    expect(screen.getByText('送信中...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('費目を入力してフォームを送信できる', () => {
    render(<ExpenseForm />);

    const categoryInput = screen.getByLabelText('費目 *');

    fireEvent.change(categoryInput, { target: { value: '交通費' } });

    expect(categoryInput).toHaveValue('交通費');
  });
});
