import dynamic from 'next/dynamic';
import { Layouts } from 'src/common/enums/Layouts';

const UserSettings = dynamic(() => import('src/components/pages/user-settings/UserSettings'), {
    ssr: false,
});

UserSettings.defaultProps = { layout: Layouts.Dashboard };

export default UserSettings;
