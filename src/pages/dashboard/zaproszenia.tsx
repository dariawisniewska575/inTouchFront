import dynamic from 'next/dynamic';
import { Layouts } from 'src/common/enums/Layouts';

const UserInvications = dynamic(
    () => import('src/components/pages/dashboard/dashboard-invitations/DashboardInvitations'),
    {
        ssr: false,
    },
);

UserInvications.defaultProps = { layout: Layouts.Dashboard };

export default UserInvications;
