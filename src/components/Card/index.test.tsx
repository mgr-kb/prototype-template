import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './index';

describe('Card', () => {
  describe('基本機能', () => {
    it('children が正しくレンダリングされること', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('デフォルトで article 要素としてレンダリングされること', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('ARTICLE');
    });

    it('as プロパティで要素タイプを変更できること', () => {
      const { container } = render(<Card as="section">Content</Card>);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('SECTION');
    });
  });

  describe('ヘッダー・フッター', () => {
    it('header が正しくレンダリングされること', () => {
      render(<Card header="Card Header">Content</Card>);
      expect(screen.getByText('Card Header')).toBeInTheDocument();
    });

    it('header に ReactNode を渡せること', () => {
      render(<Card header={<h2>Custom Header</h2>}>Content</Card>);
      expect(
        screen.getByRole('heading', { name: 'Custom Header' })
      ).toBeInTheDocument();
    });

    it('footer が正しくレンダリングされること', () => {
      render(<Card footer="Card Footer">Content</Card>);
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });

    it('footer に ReactNode を渡せること', () => {
      render(<Card footer={<button>Action</button>}>Content</Card>);
      expect(
        screen.getByRole('button', { name: 'Action' })
      ).toBeInTheDocument();
    });
  });

  describe('バリアント', () => {
    it('デフォルトで elevated バリアントが適用されること', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-md');
    });

    it('outlined バリアントが正しく適用されること', () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border');
      expect(card).not.toHaveClass('shadow-md');
    });

    it('flat バリアントが正しく適用されること', () => {
      const { container } = render(<Card variant="flat">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('shadow-md');
      expect(card).not.toHaveClass('border');
    });
  });

  describe('パディング', () => {
    it('デフォルトで medium パディングが適用されること', () => {
      render(<Card>Content</Card>);
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('p-4');
    });

    it('small パディングが正しく適用されること', () => {
      render(<Card padding="small">Content</Card>);
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('p-2');
    });

    it('large パディングが正しく適用されること', () => {
      render(<Card padding="large">Content</Card>);
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('p-6');
    });

    it('none パディングでパディングが適用されないこと', () => {
      render(<Card padding="none">Content</Card>);
      const content = screen.getByTestId('card-content');
      expect(content).not.toHaveClass('p-');
    });

    it('noPadding プロパティでコンテンツのパディングが除去されること', () => {
      render(<Card noPadding>Content</Card>);
      const content = screen.getByTestId('card-content');
      expect(content).not.toHaveClass('p-');
    });
  });

  describe('インタラクティブ', () => {
    it('hoverable でホバースタイルが適用されること', () => {
      const { container } = render(<Card hoverable>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('hover:shadow-lg');
      expect(card).toHaveClass('transition-shadow');
    });

    it('onClick が設定されるとカーソルがポインターになること', () => {
      const handleClick = vi.fn();
      const { container } = render(<Card onClick={handleClick}>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('cursor-pointer');
    });

    it('onClick が呼ばれること', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      const { container } = render(<Card onClick={handleClick}>Content</Card>);
      const card = container.firstChild as HTMLElement;

      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('フルワイド・高さ', () => {
    it('fullWidth で幅100%になること', () => {
      const { container } = render(<Card fullWidth>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('w-full');
    });

    it('fullHeight で高さ100%になること', () => {
      const { container } = render(<Card fullHeight>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('h-full');
    });
  });

  describe('カスタムクラス', () => {
    it('className で追加のクラスが適用されること', () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切な ARIA 属性が設定されること', () => {
      const { container } = render(
        <Card role="region" aria-label="User information card">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('role', 'region');
      expect(card).toHaveAttribute('aria-label', 'User information card');
    });
  });
});
