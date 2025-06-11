import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './index';

describe('Input', () => {
  describe('基本機能', () => {
    it('value が正しくレンダリングされること', () => {
      render(<Input value="test value" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test value');
    });

    it('placeholder が正しく表示されること', () => {
      render(<Input placeholder="Enter text..." onChange={() => {}} />);
      const input = screen.getByPlaceholderText('Enter text...');
      expect(input).toBeInTheDocument();
    });

    it('onChange が入力時に呼ばれること', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('disabled の場合は入力できないこと', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      expect(input).toBeDisabled();
      await user.type(input, 'test');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('readOnly の場合は入力できないが見た目は通常通りなこと', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input readOnly value="read only" onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('readonly');
      await user.type(input, 'test');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('タイプ', () => {
    it('type="text" がデフォルトで設定されること', () => {
      render(<Input onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('type="email" が正しく設定されること', () => {
      render(<Input type="email" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('type="password" が正しく設定されること', () => {
      render(<Input type="password" onChange={() => {}} />);
      // password inputはrole="textbox"ではないので、data-testidを使用
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('type="number" が正しく設定されること', () => {
      render(<Input type="number" onChange={() => {}} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('サイズ', () => {
    it('デフォルトで medium サイズが適用されること', () => {
      render(<Input onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-3 py-2 text-base');
    });

    it('small サイズが正しく適用されること', () => {
      render(<Input size="small" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-2 py-1 text-sm');
    });

    it('large サイズが正しく適用されること', () => {
      render(<Input size="large" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-4 py-3 text-lg');
    });
  });

  describe('バリデーション状態', () => {
    it('error 状態でエラースタイルが適用されること', () => {
      render(<Input error onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('error と errorMessage でエラーメッセージが表示されること', () => {
      render(
        <Input error errorMessage="入力値が不正です" onChange={() => {}} />
      );
      expect(screen.getByText('入力値が不正です')).toBeInTheDocument();
    });
  });

  describe('ラベル', () => {
    it('label が正しく表示されること', () => {
      render(<Input label="ユーザー名" onChange={() => {}} />);
      expect(screen.getByText('ユーザー名')).toBeInTheDocument();
    });

    it('required でラベルに必須マークが表示されること', () => {
      render(<Input label="メールアドレス" required onChange={() => {}} />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('label がクリックされたときinputにフォーカスされること', async () => {
      const user = userEvent.setup();
      render(<Input label="パスワード" onChange={() => {}} />);

      const label = screen.getByText('パスワード');
      await user.click(label);

      const input = screen.getByRole('textbox');
      expect(input).toHaveFocus();
    });
  });

  describe('ヘルパーテキスト', () => {
    it('helperText が表示されること', () => {
      render(
        <Input helperText="8文字以上で入力してください" onChange={() => {}} />
      );
      expect(
        screen.getByText('8文字以上で入力してください')
      ).toBeInTheDocument();
    });

    it('error 状態でも helperText より errorMessage が優先されること', () => {
      render(
        <Input
          error
          errorMessage="エラーです"
          helperText="ヘルプテキスト"
          onChange={() => {}}
        />
      );
      expect(screen.getByText('エラーです')).toBeInTheDocument();
      expect(screen.queryByText('ヘルプテキスト')).not.toBeInTheDocument();
    });
  });

  describe('フルワイド', () => {
    it('fullWidth で幅100%になること', () => {
      render(<Input fullWidth onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('w-full');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切な ARIA 属性が設定されること', () => {
      render(
        <Input
          aria-label="Search"
          aria-describedby="search-help"
          onChange={() => {}}
        />
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search');
      expect(input).toHaveAttribute('aria-describedby', 'search-help');
    });

    it('error 状態で aria-invalid が設定されること', () => {
      render(<Input error onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('required で aria-required が設定されること', () => {
      render(<Input required onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('カスタムクラス', () => {
    it('className で追加のクラスが適用されること', () => {
      render(<Input className="custom-class" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });
});
