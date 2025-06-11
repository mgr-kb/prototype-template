import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './index';

describe('Modal', () => {
  describe('基本機能', () => {
    it('open が true の場合にモーダルが表示されること', () => {
      render(
        <Modal open onClose={() => {}}>
          <div>Modal content</div>
        </Modal>
      );
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('open が false の場合にモーダルが表示されないこと', () => {
      render(
        <Modal open={false} onClose={() => {}}>
          <div>Modal content</div>
        </Modal>
      );
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('children が正しくレンダリングされること', () => {
      render(
        <Modal open onClose={() => {}}>
          <h2>Modal Title</h2>
          <p>Modal description</p>
        </Modal>
      );
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
      expect(screen.getByText('Modal description')).toBeInTheDocument();
    });
  });

  describe('タイトルとヘッダー', () => {
    it('title プロパティでタイトルが表示されること', () => {
      render(
        <Modal open title="Test Modal" onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('title があるときにヘッダーが表示されること', () => {
      render(
        <Modal open title="Test Modal" onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    });

    it('showCloseButton が true の場合に閉じるボタンが表示されること', () => {
      render(
        <Modal open title="Test Modal" showCloseButton onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      expect(
        screen.getByRole('button', { name: 'Close modal' })
      ).toBeInTheDocument();
    });

    it('showCloseButton が false の場合に閉じるボタンが表示されないこと', () => {
      render(
        <Modal
          open
          title="Test Modal"
          showCloseButton={false}
          onClose={() => {}}
        >
          <div>Content</div>
        </Modal>
      );
      expect(
        screen.queryByRole('button', { name: 'Close modal' })
      ).not.toBeInTheDocument();
    });
  });

  describe('サイズ', () => {
    it('デフォルトで medium サイズが適用されること', () => {
      render(
        <Modal open onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      const modal = screen.getByTestId('modal-content');
      expect(modal).toHaveClass('max-w-md');
    });

    it('small サイズが正しく適用されること', () => {
      render(
        <Modal open size="small" onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      const modal = screen.getByTestId('modal-content');
      expect(modal).toHaveClass('max-w-sm');
    });

    it('large サイズが正しく適用されること', () => {
      render(
        <Modal open size="large" onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      const modal = screen.getByTestId('modal-content');
      expect(modal).toHaveClass('max-w-2xl');
    });

    it('full サイズが正しく適用されること', () => {
      render(
        <Modal open size="full" onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      const modal = screen.getByTestId('modal-content');
      expect(modal).toHaveClass('max-w-full');
      expect(modal).toHaveClass('m-4');
    });
  });

  describe('閉じる操作', () => {
    it('閉じるボタンをクリックすると onClose が呼ばれること', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Modal open title="Test Modal" showCloseButton onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      await user.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('Escape キーで onClose が呼ばれること', async () => {
      const handleClose = vi.fn();

      render(
        <Modal open onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      await userEvent.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('closeOnEscape が false の場合は Escape キーで閉じられないこと', () => {
      const handleClose = vi.fn();

      render(
        <Modal open closeOnEscape={false} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('オーバーレイをクリックすると onClose が呼ばれること', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Modal open onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('closeOnOverlayClick が false の場合はオーバーレイクリックで閉じられないこと', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Modal open closeOnOverlayClick={false} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('モーダルコンテンツをクリックしても onClose が呼ばれないこと', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Modal open onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const content = screen.getByText('Content');
      await user.click(content);
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('アクセシビリティ', () => {
    it('適切な ARIA 属性が設定されること', () => {
      render(
        <Modal open title="Test Modal" onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby');
    });

    it('タイトルがない場合でも dialog role が設定されること', () => {
      render(
        <Modal open onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });

    it('フォーカストラップが動作すること', () => {
      render(
        <Modal open title="Test Modal" showCloseButton onClose={() => {}}>
          <button>Button 1</button>
          <button>Button 2</button>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      expect(closeButton).toHaveFocus();
    });
  });

  describe('カスタムクラス', () => {
    it('className で追加のクラスが適用されること', () => {
      render(
        <Modal open className="custom-class" onClose={() => {}}>
          <div>Content</div>
        </Modal>
      );
      const modal = screen.getByTestId('modal-content');
      expect(modal).toHaveClass('custom-class');
    });
  });
});
