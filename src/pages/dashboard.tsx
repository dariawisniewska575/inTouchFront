import dynamic from 'next/dynamic';
import { Layouts } from 'src/common/enums/Layouts';

const Dashboard = dynamic(() => import('src/components/pages/dashboard/Dashboard'), {
    ssr: false,
});

Dashboard.defaultProps = { layout: Layouts.Dashboard };

export default Dashboard;
