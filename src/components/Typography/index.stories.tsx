import type { Meta, StoryObj } from '@storybook/nextjs';
import { Typography } from './index';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
    },
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body1',
        'body2',
        'caption',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'success',
        'warning',
        'inherit',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    truncate: {
      control: 'boolean',
    },
    noWrap: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default typography text.',
  },
};

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading Level 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading Level 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading Level 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading Level 4',
  },
};

export const Heading5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading Level 5',
  },
};

export const Heading6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading Level 6',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children:
      'This is body text with default size. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children:
      'This is smaller body text. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children:
      'This is caption text, typically used for labels and descriptions.',
  },
};

export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    children: 'This text uses the primary color.',
  },
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'This text uses the secondary color.',
  },
};

export const ErrorColor: Story = {
  args: {
    color: 'error',
    children: 'This text indicates an error state.',
  },
};

export const SuccessColor: Story = {
  args: {
    color: 'success',
    children: 'This text indicates a success state.',
  },
};

export const WarningColor: Story = {
  args: {
    color: 'warning',
    children: 'This text indicates a warning state.',
  },
};

export const CenterAlign: Story = {
  args: {
    align: 'center',
    children: 'This text is center aligned.',
  },
};

export const RightAlign: Story = {
  args: {
    align: 'right',
    children: 'This text is right aligned.',
  },
};

export const JustifyAlign: Story = {
  args: {
    align: 'justify',
    children:
      'This text is justified. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  },
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      'This is a very long text that will be truncated with an ellipsis when it exceeds the container width.',
  },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
};

export const NoWrap: Story = {
  args: {
    noWrap: true,
    children:
      'This text will not wrap to the next line even if it is very long.',
  },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
};

export const CustomElement: Story = {
  args: {
    as: 'span',
    variant: 'h2',
    children: 'This is h2 styling but rendered as a span element',
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Typography',
  },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Typography Variants</h3>
        <div className="space-y-3">
          <Typography variant="h1">Heading 1 - Main page title</Typography>
          <Typography variant="h2">Heading 2 - Section title</Typography>
          <Typography variant="h3">Heading 3 - Subsection title</Typography>
          <Typography variant="h4">Heading 4 - Sub-subsection title</Typography>
          <Typography variant="h5">Heading 5 - Minor heading</Typography>
          <Typography variant="h6">Heading 6 - Smallest heading</Typography>
          <Typography variant="body1">
            Body 1 - Regular body text for main content. Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </Typography>
          <Typography variant="body2">
            Body 2 - Smaller body text for secondary content or captions.
          </Typography>
          <Typography variant="caption">
            Caption - Small text for labels and descriptions
          </Typography>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Colors</h3>
        <div className="space-y-2">
          <Typography color="primary">Primary color text</Typography>
          <Typography color="secondary">Secondary color text</Typography>
          <Typography color="error">Error color text</Typography>
          <Typography color="success">Success color text</Typography>
          <Typography color="warning">Warning color text</Typography>
          <Typography color="inherit">Inherit color text</Typography>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Text Alignment</h3>
        <div className="space-y-2">
          <Typography align="left">Left aligned text (default)</Typography>
          <Typography align="center">Center aligned text</Typography>
          <Typography align="right">Right aligned text</Typography>
          <Typography align="justify">
            Justified text that spreads evenly across the line width. Lorem
            ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Text Overflow</h3>
        <div className="space-y-2">
          <div className="w-64">
            <Typography truncate>
              Truncated text that gets cut off with ellipsis when it&apos;s too
              long for the container
            </Typography>
          </div>
          <div className="w-64 border">
            <Typography noWrap>
              No wrap text that will overflow the container instead of wrapping
            </Typography>
          </div>
        </div>
      </div>
    </div>
  ),
};
