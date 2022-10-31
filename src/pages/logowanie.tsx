import dynamic from 'next/dynamic';

const SignIn = dynamic(() => import('src/components/pages/sign-in/SignIn'), {
    ssr: false,
});

export default SignIn;
