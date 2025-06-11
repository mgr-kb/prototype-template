import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './index';

describe('Badge', () => {
  describe('基本機能', () => {
    it('children を正しくレンダリングすること', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('デフォルトで span 要素としてレンダリングされること', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild;
      expect(badge?.nodeName).toBe('SPAN');
    });
  });

  describe('バリアント', () => {
    it('デフォルトで default バリアントが適用されること', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-gray-100');
      expect(badge).toHaveClass('text-gray-800');
    });

    it('primary バリアントが正しく適用されること', () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-blue-100');
      expect(badge).toHaveClass('text-blue-800');
    });

    it('secondary バリアントが正しく適用されること', () => {
      const { container } = render(
        <Badge variant="secondary">Secondary</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-gray-100');
      expect(badge).toHaveClass('text-gray-800');
    });

    it('success バリアントが正しく適用されること', () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-green-100');
      expect(badge).toHaveClass('text-green-800');
    });

    it('warning バリアントが正しく適用されること', () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-yellow-100');
      expect(badge).toHaveClass('text-yellow-800');
    });

    it('error バリアントが正しく適用されること', () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-red-100');
      expect(badge).toHaveClass('text-red-800');
    });

    it('info バリアントが正しく適用されること', () => {
      const { container } = render(<Badge variant="info">Info</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-cyan-100');
      expect(badge).toHaveClass('text-cyan-800');
    });
  });

  describe('サイズ', () => {
    it('デフォルトで medium サイズが適用されること', () => {
      const { container } = render(<Badge>Medium</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-2');
      expect(badge).toHaveClass('py-1');
      expect(badge).toHaveClass('text-xs');
    });

    it('small サイズが正しく適用されること', () => {
      const { container } = render(<Badge size="small">Small</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-1.5');
      expect(badge).toHaveClass('py-0.5');
      expect(badge).toHaveClass('text-xs');
    });

    it('large サイズが正しく適用されること', () => {
      const { container } = render(<Badge size="large">Large</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-3');
      expect(badge).toHaveClass('py-1.5');
      expect(badge).toHaveClass('text-sm');
    });
  });

  describe('形状', () => {
    it('デフォルトで rounded が適用されること', () => {
      const { container } = render(<Badge>Rounded</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('rounded');
    });

    it('pill 形状が正しく適用されること', () => {
      const { container } = render(<Badge shape="pill">Pill</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('rounded-full');
    });

    it('square 形状が正しく適用されること', () => {
      const { container } = render(<Badge shape="square">Square</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).not.toHaveClass('rounded');
      expect(badge).not.toHaveClass('rounded-full');
    });
  });

  describe('ドット', () => {
    it('dot プロパティでドットが表示されること', () => {
      render(<Badge dot>With dot</Badge>);
      const dot = screen.getByTestId('badge-dot');
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveClass('w-2');
      expect(dot).toHaveClass('h-2');
      expect(dot).toHaveClass('rounded-full');
    });

    it('ドットの色がバリアントに対応すること', () => {
      render(
        <Badge variant="success" dot>
          Success with dot
        </Badge>
      );
      const dot = screen.getByTestId('badge-dot');
      expect(dot).toHaveClass('bg-green-600');
    });
  });

  describe('アウトライン', () => {
    it('outline プロパティでアウトラインスタイルが適用されること', () => {
      const { container } = render(<Badge outline>Outline</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('border');
      expect(badge).toHaveClass('bg-transparent');
    });

    it('outline でバリアント色がボーダーに適用されること', () => {
      const { container } = render(
        <Badge variant="primary" outline>
          Primary Outline
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('border-blue-600');
      expect(badge).toHaveClass('text-blue-600');
    });
  });

  describe('削除可能', () => {
    it('dismissible プロパティで削除ボタンが表示されること', () => {
      render(<Badge dismissible>Dismissible</Badge>);
      const deleteButton = screen.getByRole('button');
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveAttribute('aria-label', 'Remove badge');
    });

    it('onDismiss が設定されるとボタンが表示されること', () => {
      const handleDismiss = () => {};
      render(<Badge onDismiss={handleDismiss}>With dismiss</Badge>);
      const deleteButton = screen.getByRole('button');
      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe('カスタムクラス', () => {
    it('className で追加のクラスが適用されること', () => {
      const { container } = render(
        <Badge className="custom-class">Custom</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切な ARIA 属性が設定されること', () => {
      const { container } = render(
        <Badge role="status" aria-label="New notification">
          New
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveAttribute('role', 'status');
      expect(badge).toHaveAttribute('aria-label', 'New notification');
    });
  });
});
