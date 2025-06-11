import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './index';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only Input',
    value: 'Read-only value',
    readOnly: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small input',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large input',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const AllVariants: Story = {
  args: {
    onChange: () => {},
  },
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sizes</h3>
        <div className="space-y-2">
          <Input size="small" placeholder="Small input" onChange={() => {}} />
          <Input size="medium" placeholder="Medium input" onChange={() => {}} />
          <Input size="large" placeholder="Large input" onChange={() => {}} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">States</h3>
        <div className="space-y-2">
          <Input placeholder="Normal input" onChange={() => {}} />
          <Input
            placeholder="Error input"
            error
            errorMessage="This field has an error"
            onChange={() => {}}
          />
          <Input placeholder="Disabled input" disabled onChange={() => {}} />
          <Input value="Read-only input" readOnly onChange={() => {}} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">With Labels</h3>
        <div className="space-y-4">
          <Input
            label="Username"
            placeholder="Enter username"
            onChange={() => {}}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            required
            onChange={() => {}}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            helperText="Must be at least 8 characters"
            onChange={() => {}}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Input Types</h3>
        <div className="space-y-2">
          <Input type="text" placeholder="Text input" onChange={() => {}} />
          <Input type="email" placeholder="Email input" onChange={() => {}} />
          <Input
            type="password"
            placeholder="Password input"
            onChange={() => {}}
          />
          <Input type="number" placeholder="Number input" onChange={() => {}} />
          <Input type="tel" placeholder="Phone input" onChange={() => {}} />
          <Input type="url" placeholder="URL input" onChange={() => {}} />
          <Input type="search" placeholder="Search input" onChange={() => {}} />
        </div>
      </div>
    </div>
  ),
};
