'use client';

import { useState } from 'react';
import AuthCardComponent from '../components/auth-card';
import { RegisterFirstStep } from './register-first-step';
import { RegisterSecondStep } from './register-second-step';
import { RegisterThirdStep } from './register-third-step';
import { useMultistepForm } from './useMultistepForm';

function Register() {
    const [email, setCurrentEmail] = useState('');

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm(
        [
            <RegisterFirstStep nextPageCallback={onSubmit} />,
            <RegisterSecondStep nextPageCallback={onSubmit} email={email} />,
            <RegisterThirdStep nextPageCallback={onSubmit} email={email} />
        ]
    );

    async function onSubmit(callback: Function) {
        try {
            var res = await callback();
            if (isFirstStep) {
                setCurrentEmail(res);
            }
            if (!isLastStep) return next();
        } catch (error) {}
    }

    return <AuthCardComponent>{step}</AuthCardComponent>;
}

export default Register;
