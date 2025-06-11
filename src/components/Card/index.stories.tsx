import type { Meta, StoryObj } from '@storybook/nextjs';
import { Card } from './index';
import { Button } from '../Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['article', 'section', 'div'],
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    noPadding: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    fullHeight: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a card with some content inside.',
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Card Title',
    children: 'This card has a header section.',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Card Title',
    footer: 'Card Footer',
    children: 'This card has both header and footer sections.',
  },
};

export const WithCustomHeader: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Custom Header</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    ),
    children: 'Card with a custom header component.',
  },
};

export const WithActionsFooter: Story = {
  args: {
    header: 'Confirm Action',
    footer: (
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" size="small">
          Cancel
        </Button>
        <Button variant="primary" size="small">
          Confirm
        </Button>
      </div>
    ),
    children: 'Are you sure you want to perform this action?',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card variant.',
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: 'This is a flat card variant with a subtle background.',
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: 'Hover over this card to see the shadow effect.',
  },
};

export const Clickable: Story = {
  args: {
    hoverable: true,
    onClick: () => alert('Card clicked!'),
    children: 'This card is clickable. Try clicking it!',
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'small',
    children: 'This card has small padding.',
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'large',
    children: 'This card has large padding.',
  },
};

export const NoPadding: Story = {
  args: {
    noPadding: true,
    children: (
      <img
        src="https://via.placeholder.com/300x200"
        alt="Placeholder"
        className="w-full h-full object-cover"
      />
    ),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'This card takes up the full width of its container.',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const ComplexExample: Story = {
  args: {
    header: (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          JD
        </div>
        <div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm text-gray-500">2 hours ago</p>
        </div>
      </div>
    ),
    footer: (
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-blue-500 flex items-center gap-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">Like</span>
          </button>
          <button className="text-gray-500 hover:text-blue-500 flex items-center gap-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm">Comment</span>
          </button>
        </div>
        <button className="text-gray-500 hover:text-blue-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 15.938 18 15.482 18 15c0-.482.114-.938.316-1.342m0 2.684a3 3 0 110-2.684M8.684 13.342C9.532 14.365 10.854 15 12.316 15c1.462 0 2.784-.635 3.632-1.658M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    ),
    children: (
      <div className="space-y-3">
        <p>
          Just finished building an amazing new feature! 🚀 Really excited to
          share it with the team.
        </p>
        <img
          src="https://via.placeholder.com/400x300"
          alt="Feature screenshot"
          className="rounded-lg w-full"
        />
      </div>
    ),
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Card Content',
  },
  render: () => (
    <div className="space-y-4 w-96">
      <h3 className="text-lg font-semibold">Variants</h3>
      <Card variant="elevated">Elevated Card</Card>
      <Card variant="outlined">Outlined Card</Card>
      <Card variant="flat">Flat Card</Card>

      <h3 className="text-lg font-semibold mt-6">With Headers & Footers</h3>
      <Card header="Card Header" footer="Card Footer">
        Card with header and footer
      </Card>

      <h3 className="text-lg font-semibold mt-6">Interactive</h3>
      <Card hoverable onClick={() => console.log('Clicked!')}>
        Hoverable and clickable card
      </Card>

      <h3 className="text-lg font-semibold mt-6">Padding Options</h3>
      <Card padding="small">Small padding</Card>
      <Card padding="medium">Medium padding (default)</Card>
      <Card padding="large">Large padding</Card>
    </div>
  ),
};
