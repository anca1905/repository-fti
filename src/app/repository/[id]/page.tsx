import { mockRepositories } from '@/data/mockData';
import DetailClient from './DetailClient';

export function generateStaticParams() {
  return mockRepositories.map((repo) => ({
    id: repo.id,
  }));
}

export default function RepositoryDetailPage() {
  return <DetailClient />;
}
