import type { Meta, StoryObj } from '@storybook/nextjs';
import { SearchResults } from './index';
import type { Article } from '@/lib/types';

const meta: Meta<typeof SearchResults> = {
  title: 'Features/SearchResults',
  component: SearchResults,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'react-hooks-guide',
    title: 'React Hooks Complete Guide',
    excerpt:
      'Learn everything about React Hooks including useState, useEffect, and custom hooks.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: {
      id: '1',
      name: 'John Doe',
      avatar: '/avatars/john-doe.jpg',
      bio: 'Frontend Developer at TechCorp',
      role: 'Senior Developer',
    },
    category: {
      id: '1',
      name: 'Frontend',
      slug: 'frontend',
      description: 'Frontend development topics',
      color: 'bg-blue-100 text-blue-800',
    },
    tags: ['react', 'hooks', 'javascript'],
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    viewCount: 1250,
    likeCount: 89,
    commentCount: 23,
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    slug: 'javascript-async-patterns',
    title: 'Modern JavaScript Async Patterns',
    excerpt:
      'Explore modern async patterns in JavaScript including Promise, async/await, and more.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: {
      id: '2',
      name: 'Jane Smith',
      avatar: '/avatars/jane-smith.jpg',
      bio: 'Full Stack Engineer',
      role: 'Tech Lead',
    },
    category: {
      id: '1',
      name: 'Frontend',
      slug: 'frontend',
      description: 'Frontend development topics',
      color: 'bg-blue-100 text-blue-800',
    },
    tags: ['javascript', 'async', 'promises'],
    publishedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    viewCount: 890,
    likeCount: 65,
    commentCount: 18,
    readingTime: 6,
    featured: false,
  },
];

export const WithResults: Story = {
  args: {
    articles: mockArticles,
    query: 'React',
    total: 2,
  },
};

export const WithCategoryFilter: Story = {
  args: {
    articles: mockArticles,
    query: 'JavaScript',
    category: 'frontend',
    total: 2,
  },
};

export const NoResults: Story = {
  args: {
    articles: [],
    query: 'nonexistent topic',
    total: 0,
  },
};

export const EmptyQuery: Story = {
  args: {
    articles: [],
    query: '',
    total: 0,
  },
};

export const Loading: Story = {
  args: {
    articles: [],
    query: 'React',
    total: 0,
    isLoading: true,
  },
};

export const ManyResults: Story = {
  args: {
    articles: [...mockArticles, ...mockArticles, ...mockArticles],
    query: 'JavaScript',
    total: 15,
  },
};
