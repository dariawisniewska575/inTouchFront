import dynamic from 'next/dynamic';

const ConfirmEmail = dynamic(() => import('src/components/pages/confirm-email/ConfirmEmail'), {
    ssr: false,
});

export default ConfirmEmail;
