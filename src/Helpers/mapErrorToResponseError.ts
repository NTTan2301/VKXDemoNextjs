import { EnumErrorCode } from "@/src/Enum/ErrorEnum";
import { ResponseErrorAPI } from "../Interface/ResponseErrorAPI";

export function mapErrorToResponseError(error: unknown): ResponseErrorAPI {
  const rs = new ResponseErrorAPI();

  if (error instanceof TypeError) {
    rs.statusCode = EnumErrorCode.FetchError;
    rs.apiErrorMessage = error.message;
    rs.message = "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng.";
    return rs;
  }

  if (error instanceof SyntaxError) {
    rs.statusCode = EnumErrorCode.AsJsonError;
    rs.apiErrorMessage = error.message;
    rs.message = "Lỗi phản hồi không hợp lệ. Vui lòng thông báo quản trị viên.";
    return rs;
  }

  // Nếu đã là ResponseErrorAPI thì ném lại
  if (error instanceof ResponseErrorAPI) {
    return error;
  }

  // Trường hợp lỗi khác không xác định
  rs.statusCode = EnumErrorCode.Unknown;
  rs.apiErrorMessage = error instanceof Error ? error.message : "Unknown error";
  rs.message = "Lỗi không xác định. Vui lòng thử lại hoặc báo quản trị viên.";
  return rs;
}