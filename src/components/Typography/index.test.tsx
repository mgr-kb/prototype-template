import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './index';

describe('Typography', () => {
  describe('基本機能', () => {
    it('children を正しくレンダリングすること', () => {
      render(<Typography>Hello World</Typography>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('デフォルトで p 要素としてレンダリングされること', () => {
      const { container } = render(<Typography>Text</Typography>);
      const element = container.firstChild;
      expect(element?.nodeName).toBe('P');
    });

    it('as プロパティで要素タイプを変更できること', () => {
      const { container } = render(<Typography as="span">Text</Typography>);
      const element = container.firstChild;
      expect(element?.nodeName).toBe('SPAN');
    });
  });

  describe('バリアント', () => {
    it('h1 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="h1">Heading 1</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element?.nodeName).toBe('H1');
      expect(element).toHaveClass('text-4xl');
      expect(element).toHaveClass('font-bold');
    });

    it('h2 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="h2">Heading 2</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element?.nodeName).toBe('H2');
      expect(element).toHaveClass('text-3xl');
    });

    it('h3 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="h3">Heading 3</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element?.nodeName).toBe('H3');
      expect(element).toHaveClass('text-2xl');
    });

    it('h4 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="h4">Heading 4</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element?.nodeName).toBe('H4');
      expect(element).toHaveClass('text-xl');
    });

    it('h5 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="h5">Heading 5</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element?.nodeName).toBe('H5');
      expect(element).toHaveClass('text-lg');
    });

    it('h6 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="h6">Heading 6</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element?.nodeName).toBe('H6');
      expect(element).toHaveClass('text-base');
    });

    it('body1 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="body1">Body text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-base');
    });

    it('body2 バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="body2">Small body text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-sm');
    });

    it('caption バリアントが正しく適用されること', () => {
      const { container } = render(
        <Typography variant="caption">Caption text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-xs');
      expect(element).toHaveClass('text-gray-600');
    });
  });

  describe('色', () => {
    it('primary 色が正しく適用されること', () => {
      const { container } = render(
        <Typography color="primary">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-blue-600');
    });

    it('secondary 色が正しく適用されること', () => {
      const { container } = render(
        <Typography color="secondary">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-gray-600');
    });

    it('error 色が正しく適用されること', () => {
      const { container } = render(<Typography color="error">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-red-600');
    });

    it('success 色が正しく適用されること', () => {
      const { container } = render(
        <Typography color="success">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-green-600');
    });

    it('warning 色が正しく適用されること', () => {
      const { container } = render(
        <Typography color="warning">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-yellow-600');
    });

    it('inherit 色が正しく適用されること', () => {
      const { container } = render(
        <Typography color="inherit">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-inherit');
    });
  });

  describe('テキストアライン', () => {
    it('center アライメントが正しく適用されること', () => {
      const { container } = render(
        <Typography align="center">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-center');
    });

    it('right アライメントが正しく適用されること', () => {
      const { container } = render(<Typography align="right">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-right');
    });

    it('justify アライメントが正しく適用されること', () => {
      const { container } = render(
        <Typography align="justify">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-justify');
    });
  });

  describe('切り詰め', () => {
    it('truncate が正しく適用されること', () => {
      const { container } = render(<Typography truncate>Long text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('truncate');
    });

    it('noWrap が正しく適用されること', () => {
      const { container } = render(
        <Typography noWrap>Text with no wrap</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('whitespace-nowrap');
    });
  });

  describe('カスタムクラス', () => {
    it('className で追加のクラスが適用されること', () => {
      const { container } = render(
        <Typography className="custom-class">Text</Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('アクセシビリティ', () => {
    it('適切な ARIA 属性が設定されること', () => {
      const { container } = render(
        <Typography role="heading" aria-level={2}>
          Accessible heading
        </Typography>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('role', 'heading');
      expect(element).toHaveAttribute('aria-level', '2');
    });
  });
});
