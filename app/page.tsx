'use client';

import PageContainer from './components/layout/page-container';
import useInput from './components/globals/form/input';
import { useEffect, useState } from 'react';

export default function Home() {
    const [email, emailInput] = useInput({ type: 'text', icon: 'solar:user-bold', placeholder: 'email' });
    const [password, passwordInput] = useInput({ type: 'password', icon: 'solar:lock-password-unlocked-bold', placeholder: 'password' });
    const [textField, textFieldInput] = useInput({ type: 'text', placeholder: 'textField' });
    const [form, setForm] = useState({ email: email, password: password, textField: textField });

    useEffect(() => {
        setForm({ email: email, password: password, textField: textField })
    }, [email, password, textField])

    const HandleClick = () => {
        console.log(form);
    };

    return <PageContainer >
        <div className='p-8 grid gap-4'>
            <div className='flex flex-col gap-4'>
                {emailInput} {passwordInput} {textFieldInput}
            </div>
        </div>

    </PageContainer>;
}
