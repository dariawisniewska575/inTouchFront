import dynamic from 'next/dynamic';

const CreateAccount = dynamic(() => import('src/components/pages/create-account/CreateAccount'), {
    ssr: false,
});

export default CreateAccount;
