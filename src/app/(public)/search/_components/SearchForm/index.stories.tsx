import type { Meta, StoryObj } from '@storybook/nextjs';
import { SearchForm } from './index';
import type { Category } from '@/lib/types';

const meta: Meta<typeof SearchForm> = {
  title: 'Features/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSearchResults: { action: 'search results' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Frontend',
    slug: 'frontend',
    description: 'Frontend development topics',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: '2',
    name: 'Backend',
    slug: 'backend',
    description: 'Backend development topics',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: '3',
    name: 'DevOps',
    slug: 'devops',
    description: 'DevOps and infrastructure topics',
    color: 'bg-purple-100 text-purple-800',
  },
];

export const Default: Story = {
  args: {},
};

export const WithCategories: Story = {
  args: {
    categories: mockCategories,
  },
};

export const WithInitialValues: Story = {
  args: {
    categories: mockCategories,
    initialQuery: 'React hooks',
    initialCategory: 'frontend',
  },
};

export const CategoriesOnly: Story = {
  args: {
    categories: mockCategories,
  },
};
