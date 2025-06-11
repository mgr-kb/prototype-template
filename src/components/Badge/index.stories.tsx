import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './index';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill', 'square'],
    },
    dot: {
      control: 'boolean',
    },
    outline: {
      control: 'boolean',
    },
    dismissible: {
      control: 'boolean',
    },
  },
  args: {
    onDismiss: () => console.log('Badge dismissed'),
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large',
  },
};

export const Pill: Story = {
  args: {
    shape: 'pill',
    children: 'Pill Shape',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    children: 'Square',
  },
};

export const WithDot: Story = {
  args: {
    dot: true,
    variant: 'success',
    children: 'Online',
  },
};

export const Outline: Story = {
  args: {
    outline: true,
    variant: 'primary',
    children: 'Outline',
  },
};

export const OutlineWithDot: Story = {
  args: {
    outline: true,
    dot: true,
    variant: 'warning',
    children: 'Warning',
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    variant: 'info',
    children: 'Dismissible',
  },
};

export const WithOnDismiss: Story = {
  args: {
    variant: 'error',
    children: 'Error Badge',
    onDismiss: () => alert('Badge dismissed!'),
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Sizes</h3>
        <div className="flex items-center gap-2">
          <Badge size="small">Small</Badge>
          <Badge size="medium">Medium</Badge>
          <Badge size="large">Large</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Shapes</h3>
        <div className="flex gap-2">
          <Badge shape="rounded">Rounded</Badge>
          <Badge shape="pill">Pill</Badge>
          <Badge shape="square">Square</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">With Dots</h3>
        <div className="flex gap-2">
          <Badge dot variant="success">
            Online
          </Badge>
          <Badge dot variant="warning">
            Away
          </Badge>
          <Badge dot variant="error">
            Offline
          </Badge>
          <Badge dot variant="info">
            Busy
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Outline Style</h3>
        <div className="flex gap-2">
          <Badge outline variant="primary">
            Primary
          </Badge>
          <Badge outline variant="success">
            Success
          </Badge>
          <Badge outline variant="warning">
            Warning
          </Badge>
          <Badge outline variant="error">
            Error
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Dismissible</h3>
        <div className="flex gap-2">
          <Badge dismissible variant="primary">
            Dismissible
          </Badge>
          <Badge onDismiss={() => console.log('Dismissed')} variant="success">
            With onDismiss
          </Badge>
          <Badge dismissible outline variant="warning">
            Outline Dismissible
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <Badge dot variant="success" shape="pill">
              Active
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>Notifications:</span>
            <Badge variant="error" shape="pill" size="small">
              3
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>Tags:</span>
            <Badge dismissible variant="primary" size="small">
              React
            </Badge>
            <Badge dismissible variant="primary" size="small">
              TypeScript
            </Badge>
            <Badge dismissible variant="primary" size="small">
              Tailwind
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>Priority:</span>
            <Badge variant="error" outline>
              High
            </Badge>
            <Badge variant="warning" outline>
              Medium
            </Badge>
            <Badge variant="success" outline>
              Low
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};
