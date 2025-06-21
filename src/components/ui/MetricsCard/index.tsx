interface MetricsCardProps {
  title: string;
  value: number;
  unit?: string;
  icon: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export function MetricsCard({
  title,
  value,
  unit = '',
  icon,
  change,
  changeType,
}: MetricsCardProps) {
  const formatValue = (val: number): string => {
    return val.toLocaleString();
  };

  const formatChange = (changeValue: number): string => {
    const sign = changeValue >= 0 ? '+' : '';
    return `${sign}${changeValue}%`;
  };

  const getChangeColor = (type?: 'increase' | 'decrease'): string => {
    if (!type) return '';
    return type === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatValue(value)}
            {unit && <span className="text-lg font-normal"> {unit}</span>}
          </p>
          {change !== undefined && changeType && (
            <p className={`text-sm mt-1 ${getChangeColor(changeType)}`}>
              {formatChange(change)}
            </p>
          )}
        </div>
        <div className="text-2xl" role="img" aria-label={title}>
          {icon}
        </div>
      </div>
    </div>
  );
}
