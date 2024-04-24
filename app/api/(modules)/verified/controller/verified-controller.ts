export interface OtpInput {
    email?: string;
}

class VeryfiedController {
    // TODO: uncomment this when we implement thier functionality
    // forgetPasswordOtp = async (value: OtpInput) => {
    //     try {
    //         VerifiedValidator.emailValidator(value);
    //         return VerifiedRepository.sendOtp(EmailTypes.CHANGE_PASSWORD, value);
    //     } catch (err) {
    //         return baseResponse.returnResponse({
    //             statusCode: 400,
    //             message: String(err),
    //             data: null
    //         });
    //     }
    // };
    // changePasswordOTP = async () => {
    //     try {
    //         const session = await getSession();
    //         const email = session?.email;
    //         return VerifiedRepository.sendOtp(EmailTypes.CHANGE_PASSWORD, email);
    //     } catch (err) {
    //         return baseResponse.returnResponse({
    //             statusCode: 400,
    //             message: String(err),
    //             data: null
    //         });
    //     }
    // };
}

export default VeryfiedController;
