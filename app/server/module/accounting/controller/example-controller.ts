import baseResponse from '../../../core/base-response/base-response';
import accountingRepository from '../services/repository/accounting-repository';
const repository = new accountingRepository();
class ExampleController {
    register = async (req: Request, res: Response) => {
        try {
            await repository.register(req, res);
        } catch (err) {
            return baseResponse.returnResponse(
                {
                    statusCode: 400,
                    message: String(err),
                    data: null
                },
                res
            );
        }
    };
}
export default ExampleController;
