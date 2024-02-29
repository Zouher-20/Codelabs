class BaseResponse {
    static returnResponse(
        {
            statusCode,
            message,
            data
        }: { statusCode: number; message: string; data?: any },
        res: any
    ): void {
        res.status(statusCode).send({
            status: statusCode,
            message: message,
            data: data
        });
    }
}

export default BaseResponse;
