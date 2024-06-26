import { useState } from 'react';
import OtpInput from 'react-otp-input';

export function RegisterSecondStep({
    nextPageCallback,
    email,
    onBack
}: {
    nextPageCallback: (callback: () => Promise<string>) => Promise<void>;
    onBack: () => void;

    email: String;
}) {
    const [otp, setOtp] = useState('');

    return (
        <>
            <div className="m-auto flex flex-col justify-center gap-8 text-center">
                <div>
                    <p className="text-md font-thin	text-white">Verify your email</p>
                    <p className="text-xs font-thin	text-white">OTP has been sent to</p>
                    <p className="text-xs font-thin	text-white">{email}</p>
                </div>
                <div className="mx-auto">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<div className="w-2"></div>}
                        renderInput={props => (
                            <input
                                {...props}
                                style={{ padding: '12px' }}
                                className="input input-bordered h-9 w-9 border-white bg-transparent focus:border-primary	"
                            />
                        )}
                    />
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2">
                    <button
                        className="btn btn-primary btn-sm  "
                        onClick={async () => {
                            await nextPageCallback(async () => otp);
                        }}
                    >
                        Verify
                    </button>
                    <div className="btn btn-ghost btn-sm text-start" onClick={onBack}>
                        back
                    </div>
                </div>
            </div>
        </>
    );
}
