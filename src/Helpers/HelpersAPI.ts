import { ResponseErrorAPI } from "../Interface/ResponseErrorAPI";

export function CreateHeaders(includeToken: boolean = true): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (includeToken) {
    const token = "your_token_here"; // Có thể lấy từ localStorage hoặc cookies
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function handleApiError(response: Response): Promise<void> {
  
  if (response.ok) return;

  let apiMessage = "Lỗi không xác định";
  try {
    const json = await response.json();
    apiMessage = json.message || JSON.stringify(json);
  } catch {
    apiMessage = await response.text();
  }

  
  let customMessage = "";
  
  switch (response.status) {
    // case 200: 
    //   customMessage = "Hợp lệ.";
    case 400:
      customMessage = "Yêu cầu không hợp lệ. Vui lòng kiểm tra dữ liệu.";
      break;
    case 401:
      customMessage = "Chưa đăng nhập hoặc token đã hết hạn.";
      break;
    case 403:
      customMessage = "Bạn không có quyền truy cập."; //
      break;
    case 404:
      customMessage = "Không tìm thấy tài nguyên.";
      break;
    case 500:
      customMessage = "Lỗi máy chủ. Vui lòng thử lại sau.";
      break;
    case 504:
      customMessage = "Yêu cầu quá thời gian xử lý(timeout).";
      break;
    default:
      customMessage = `Lỗi không xác định (status ${response.status})`;
  }

  var rs = new ResponseErrorAPI(); // extend error
  rs.statusCode = response.status,
  rs.apiErrorMessage = apiMessage,
  rs.message = customMessage

  throw rs;
}