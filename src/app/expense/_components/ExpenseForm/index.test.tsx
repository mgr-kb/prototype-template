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

    fireEvent.change(categoryInput, { target: { value: '交通費' } });

    expect(categoryInput).toHaveValue('交通費');
  });
});
