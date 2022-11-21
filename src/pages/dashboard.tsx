import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('src/components/pages/dashboard/Dashboard'), {
    ssr: false,
});

export default Dashboard;
