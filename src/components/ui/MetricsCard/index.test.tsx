import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricsCard } from './index';

describe('MetricsCard', () => {
  it('メトリクスカードが正しく表示されること', () => {
    render(
      <MetricsCard
        title="Total Views"
        value={15420}
        icon="📊"
        change={12.5}
        changeType="increase"
      />
    );

    expect(screen.getByText('Total Views')).toBeInTheDocument();
    expect(screen.getByText('15,420')).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
  });

  it('値の減少を正しく表示すること', () => {
    render(
      <MetricsCard
        title="Bounce Rate"
        value={45.2}
        unit="%"
        icon="📉"
        change={-3.2}
        changeType="decrease"
      />
    );

    expect(screen.getByText('Bounce Rate')).toBeInTheDocument();
    expect(screen.getByText('45.2')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('-3.2%')).toBeInTheDocument();
  });

  it('変化なしの場合を正しく表示すること', () => {
    render(<MetricsCard title="Active Users" value={1234} icon="👥" />);

    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.queryByText(/[+-]\d+%/)).not.toBeInTheDocument();
  });

  it('大きな数値を適切にフォーマットすること', () => {
    render(<MetricsCard title="Page Views" value={1234567} icon="📈" />);

    expect(screen.getByText('1,234,567')).toBeInTheDocument();
  });

  it('少数点を含む値を正しく表示すること', () => {
    render(
      <MetricsCard title="Average Session" value={3.45} unit="min" icon="⏱️" />
    );

    expect(screen.getByText('3.45')).toBeInTheDocument();
    expect(screen.getByText('min')).toBeInTheDocument();
  });

  it('変化率の色が正しく適用されること', () => {
    const { rerender } = render(
      <MetricsCard
        title="Growth"
        value={100}
        icon="📊"
        change={15}
        changeType="increase"
      />
    );

    const increaseElement = screen.getByText('+15%');
    expect(increaseElement).toHaveClass('text-green-600');

    rerender(
      <MetricsCard
        title="Growth"
        value={100}
        icon="📊"
        change={-15}
        changeType="decrease"
      />
    );

    const decreaseElement = screen.getByText('-15%');
    expect(decreaseElement).toHaveClass('text-red-600');
  });
});
