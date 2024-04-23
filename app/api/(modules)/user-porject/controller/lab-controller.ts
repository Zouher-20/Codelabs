export interface OtpInput {
    email?: string;
}

class UserProject {
    forgetPasswordOtp = async (value: OtpInput) => {
        try {
            await VerifiedValidator.emailValidator(value);
            return repository.sendOtp(EmailTypes.CHANGE_PASSWORD, value);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 400,
                message: String(err),
                data: null
            });
        }
    };
}
