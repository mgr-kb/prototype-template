import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // PPRはcanary版でのみ利用可能
  experimental: {
    // ppr: 'incremental',
    useCache: true,
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
