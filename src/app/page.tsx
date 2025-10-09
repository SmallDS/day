import ClientPage from '@/components/ClientPage';

export default function Home() {
  // 确保在生产环境中正确加载
  return <ClientPage />;
}

// 禁用Next.js默认的静态优化，确保始终渲染我们的组件
export const dynamic = 'force-dynamic';
