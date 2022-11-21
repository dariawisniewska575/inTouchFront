import dynamic from 'next/dynamic';

const ResetPassword = dynamic(() => import('src/components/pages/reset-password/ResetPassword'), {
    ssr: false,
});

export default ResetPassword;
