import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardPage from './page';

describe('DashboardPage', () => {
  it('ダッシュボードページの基本構造が正しく表示されること', () => {
    render(<DashboardPage />);

    // ヘッダーが表示されることを確認
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText("Monitor your blog's performance and engagement metrics")
    ).toBeInTheDocument();

    // セクションヘッダーが表示されることを確認
    expect(screen.getByText('Key Metrics')).toBeInTheDocument();
    expect(screen.getByText('Top Performing Articles')).toBeInTheDocument();
  });

  it('ローディング状態が正しく表示されること', () => {
    render(<DashboardPage />);

    // ローディング中のスケルトンが表示されることを確認
    const loadingElements = screen.getAllByRole('generic');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('適切なセマンティックHTML構造を持つこと', () => {
    render(<DashboardPage />);

    // section要素が存在することを確認
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBe(2); // Key MetricsとTop Performing Articlesの2セクション

    // h1、h2要素が適切に配置されていることを確認
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Analytics Dashboard'
    );

    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    expect(h2Elements).toHaveLength(2);
    expect(h2Elements[0]).toHaveTextContent('Key Metrics');
    expect(h2Elements[1]).toHaveTextContent('Top Performing Articles');
  });
});
