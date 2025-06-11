import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';

// Server Actionをモック
vi.mock('../../actions', () => ({
  submitExpenseForm: vi.fn(),
}));

// useActionStateをモック
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: vi.fn(() => [undefined, vi.fn(), false]),
  };
});

// テスト対象コンポーネントを動的インポート
async function renderExpenseForm() {
  const { ExpenseForm } = await import('./index');
  return render(<ExpenseForm />);
}

describe('ExpenseForm', () => {
  test('初期状態で1つの費目入力フィールドが表示される', async () => {
    await renderExpenseForm();

    expect(
      screen.getByPlaceholderText('例: 交通費、会議費、備品購入費など')
    ).toBeInTheDocument();
    expect(screen.getByText('費目一覧')).toBeInTheDocument();
    expect(screen.getByText('費目 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('例: 1500')).toBeInTheDocument();
    expect(screen.getByText('領収書あり')).toBeInTheDocument();
  });

  test('申請ボタンが表示される', async () => {
    await renderExpenseForm();

    expect(
      screen.getByRole('button', { name: '申請する' })
    ).toBeInTheDocument();
  });

  test('行を追加ボタンが表示される', async () => {
    await renderExpenseForm();

    expect(screen.getByText('+ 行を追加')).toBeInTheDocument();
  });

  test('行を追加すると新しい費目フィールドが追加される', async () => {
    await renderExpenseForm();

    const addButton = screen.getByText('+ 行を追加');
    fireEvent.click(addButton);

    expect(screen.getByText('費目 1')).toBeInTheDocument();
    expect(screen.getByText('費目 2')).toBeInTheDocument();
  });

  test('複数行がある場合、削除ボタンが表示される', async () => {
    await renderExpenseForm();

    const addButton = screen.getByText('+ 行を追加');
    fireEvent.click(addButton);

    const deleteButtons = screen.getAllByText('削除');
    expect(deleteButtons).toHaveLength(2);
  });

  test('最後の1行の場合、削除ボタンが表示されない', async () => {
    await renderExpenseForm();

    expect(screen.queryByText('削除')).not.toBeInTheDocument();
  });

  test('費目を入力してフォームを送信できる', async () => {
    await renderExpenseForm();

    const categoryInput =
      screen.getByPlaceholderText('例: 交通費、会議費、備品購入費など');
    const amountInput = screen.getByPlaceholderText('例: 1500');

    fireEvent.change(categoryInput, { target: { value: '交通費' } });
    fireEvent.change(amountInput, { target: { value: '1500' } });

    expect(categoryInput).toHaveValue('交通費');
    expect(amountInput).toHaveValue(1500);
  });

  test('金額フィールドに数値を入力できる', async () => {
    await renderExpenseForm();

    const amountInput = screen.getByPlaceholderText('例: 1500');
    fireEvent.change(amountInput, { target: { value: '2000' } });

    expect(amountInput).toHaveValue(2000);
  });

  test('利用日付フィールドが表示される', async () => {
    await renderExpenseForm();

    const usageDateInput = document.querySelector(
      'input[name="items[0].usageDate"]'
    );

    expect(usageDateInput).toBeInTheDocument();
    expect(usageDateInput).toHaveAttribute('type', 'date');
    expect(usageDateInput).toHaveAttribute('name', 'items[0].usageDate');
  });

  test('領収書チェックボックスが表示される', async () => {
    await renderExpenseForm();

    const checkbox = screen.getByLabelText('領収書あり');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('初期状態では申請ボタンが非活性である', async () => {
    await renderExpenseForm();

    const submitButton = screen.getByRole('button', { name: '申請する' });
    expect(submitButton).toBeDisabled();
  });

  test('必須項目をすべて入力すると申請ボタンが活性化される', async () => {
    await renderExpenseForm();

    const categoryInput =
      screen.getByPlaceholderText('例: 交通費、会議費、備品購入費など');
    const amountInput = screen.getByPlaceholderText('例: 1500');
    const usageDateInput = document.querySelector(
      'input[name="items[0].usageDate"]'
    );
    const submitButton = screen.getByRole('button', { name: '申請する' });

    // 初期状態では非活性
    expect(submitButton).toBeDisabled();

    // 費目を入力
    fireEvent.change(categoryInput, { target: { value: '交通費' } });
    expect(submitButton).toBeDisabled();

    // 金額を入力
    fireEvent.change(amountInput, { target: { value: '1500' } });
    expect(submitButton).toBeDisabled();

    // 利用日付を入力
    fireEvent.change(usageDateInput!, { target: { value: '2024-06-01' } });
    expect(submitButton).toBeEnabled();
  });

  test('必須項目の一つでも空の場合は申請ボタンが非活性になる', async () => {
    await renderExpenseForm();

    const categoryInput =
      screen.getByPlaceholderText('例: 交通費、会議費、備品購入費など');
    const amountInput = screen.getByPlaceholderText('例: 1500');
    const usageDateInput = document.querySelector(
      'input[name="items[0].usageDate"]'
    );
    const submitButton = screen.getByRole('button', { name: '申請する' });

    // すべて入力して活性化
    fireEvent.change(categoryInput, { target: { value: '交通費' } });
    fireEvent.change(amountInput, { target: { value: '1500' } });
    fireEvent.change(usageDateInput!, { target: { value: '2024-06-01' } });
    expect(submitButton).toBeEnabled();

    // 費目を空にする
    fireEvent.change(categoryInput, { target: { value: '' } });
    expect(submitButton).toBeDisabled();
  });
});
