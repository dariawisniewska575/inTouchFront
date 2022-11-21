import { useRouter } from 'next/router';
import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import SendResetPassword from './SendResetPassword';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const { resetPasswordToken, email } = router.query;

    const content = resetPasswordToken && email ? <ResetPasswordForm /> : <SendResetPassword />;

    return content;
};

export default ResetPassword;
