'use client';
import { useState } from 'react';
import AuthCardComponent from '../components/auth-card';
import { RegisterFirstStep } from './register-first-step';
import { RegisterSecondStep } from './register-second-step';
import { RegisterThirdStep } from './register-third-step';
import { useMultistepForm } from './useMultistepForm';

function Register() {
    const [email, setCurrentEmail] = useState('');
    const [otp, setCurrentOtp] = useState('');

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm(
        [
            <RegisterFirstStep nextPageCallback={onSubmit} key={1} />,

            <RegisterSecondStep
                nextPageCallback={onSubmit}
                onBack={getBack}
                email={email}
                key={2}
            />,
            <RegisterThirdStep
                nextPageCallback={onSubmit}
                onBack={getBack}
                email={email}
                otp={otp}
                key={3}
            />
        ]
    );

    async function getBack() {
        back();
    }

    async function onSubmit(callback: Function) {
        try {
            var res = await callback();
            if (isFirstStep) {
                setCurrentEmail(res);
            }
            if (currentStepIndex === 1) {
                setCurrentOtp(res);
            }
            if (!isLastStep) return next();
        } catch (error) {}
    }

    return <AuthCardComponent>{step}</AuthCardComponent>;
}

export default Register;
