import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Modal } from './index';
import { Button } from '../Button';

type ModalSize = 'small' | 'medium' | 'large' | 'full';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
    },
    showCloseButton: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

interface ModalWrapperProps {
  children: React.ReactNode;
  title?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
}

const defaultArgs = {
  open: true,
  title: 'AllSizes',
  onClose: () => console.log('Close attempted'),
  children: (
    <div>
      <p>This modal is always open for demonstration purposes.</p>
      <p>In Storybook, you can interact with it to test its features.</p>
      <div className="mt-4 flex gap-2">
        <Button variant="primary">Action 1</Button>
        <Button variant="secondary">Action 2</Button>
      </div>
    </div>
  ),
};

const ModalWrapper = ({ children, ...props }: ModalWrapperProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...props} open={open} onClose={() => setOpen(false)}>
        {children}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="Default Modal">
      <p>This is a default modal with a title and close button.</p>
      <p>
        You can close it by clicking the X button, pressing Escape, or clicking
        outside.
      </p>
    </ModalWrapper>
  ),
};

export const WithoutTitle: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper>
      <h2 className="text-lg font-semibold mb-4">Custom Title</h2>
      <p>
        This modal doesn&apos;t use the title prop, so you can create your own
        header.
      </p>
    </ModalWrapper>
  ),
};

export const NoCloseButton: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="No Close Button" showCloseButton={false}>
      <p>This modal has no close button in the header.</p>
      <p>You can still close it with Escape or by clicking outside.</p>
      <div className="mt-4 flex gap-2">
        <Button variant="primary">Confirm</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </ModalWrapper>
  ),
};

export const SmallSize: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="Small Modal" size="small">
      <p>This is a small modal.</p>
    </ModalWrapper>
  ),
};

export const LargeSize: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="Large Modal" size="large">
      <p>This is a large modal with more space for content.</p>
      <p>It can accommodate more text and complex layouts.</p>
      <div className="mt-4 space-y-2">
        <input className="w-full p-2 border rounded" placeholder="Name" />
        <input className="w-full p-2 border rounded" placeholder="Email" />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Message"
          rows={4}
        />
      </div>
    </ModalWrapper>
  ),
};

export const FullSize: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="Full Size Modal" size="full">
      <p>This modal takes up almost the full screen with small margins.</p>
      <p>
        Useful for complex forms or detailed content that needs maximum space.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h3 className="font-semibold mb-2">Column 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Column 2</h3>
          <p>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </ModalWrapper>
  ),
};

export const NoEscapeClose: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="No Escape Close" closeOnEscape={false}>
      <p>This modal cannot be closed with the Escape key.</p>
      <p>You must use the close button or click outside.</p>
    </ModalWrapper>
  ),
};

export const NoOverlayClose: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="No Overlay Close" closeOnOverlayClick={false}>
      <p>This modal cannot be closed by clicking outside.</p>
      <p>You must use the close button or press Escape.</p>
    </ModalWrapper>
  ),
};

export const ConfirmationDialog: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper
      title="Confirm Action"
      size="small"
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <p className="mb-4">Are you sure you want to delete this item?</p>
      <p className="text-sm text-gray-600 mb-6">
        This action cannot be undone.
      </p>
      <div className="flex gap-2 justify-end">
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </ModalWrapper>
  ),
};

export const FormModal: Story = {
  args: defaultArgs,
  render: () => (
    <ModalWrapper title="Create New User" size="medium">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end pt-4">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Create User</Button>
        </div>
      </form>
    </ModalWrapper>
  ),
};

export const AlwaysOpen: Story = {
  args: {
    open: true,
    title: 'Always Open Modal',
    onClose: () => console.log('Close attempted'),
    children: (
      <div>
        <p>This modal is always open for demonstration purposes.</p>
        <p>In Storybook, you can interact with it to test its features.</p>
        <div className="mt-4 flex gap-2">
          <Button variant="primary">Action 1</Button>
          <Button variant="secondary">Action 2</Button>
        </div>
      </div>
    ),
  },
};

export const AllSizes: Story = {
  args: defaultArgs,
  render: () => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

    const openModal = (modal: string) => {
      setOpenModals((prev) => ({ ...prev, [modal]: true }));
    };

    const closeModal = (modal: string) => {
      setOpenModals((prev) => ({ ...prev, [modal]: false }));
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Modal Sizes</h3>
        <div className="flex gap-2">
          <Button onClick={() => openModal('small')}>Small Modal</Button>
          <Button onClick={() => openModal('medium')}>Medium Modal</Button>
          <Button onClick={() => openModal('large')}>Large Modal</Button>
          <Button onClick={() => openModal('full')}>Full Modal</Button>
        </div>

        <Modal
          open={openModals.small || false}
          onClose={() => closeModal('small')}
          title="Small Modal"
          size="small"
        >
          <p>This is a small modal.</p>
        </Modal>

        <Modal
          open={openModals.medium || false}
          onClose={() => closeModal('medium')}
          title="Medium Modal"
          size="medium"
        >
          <p>This is a medium modal (default size).</p>
        </Modal>

        <Modal
          open={openModals.large || false}
          onClose={() => closeModal('large')}
          title="Large Modal"
          size="large"
        >
          <p>This is a large modal with more content space.</p>
          <p>Perfect for forms and detailed information.</p>
        </Modal>

        <Modal
          open={openModals.full || false}
          onClose={() => closeModal('full')}
          title="Full Size Modal"
          size="full"
        >
          <p>This modal takes up almost the entire screen.</p>
          <p>Great for complex interfaces that need maximum space.</p>
        </Modal>
      </div>
    );
  },
};
