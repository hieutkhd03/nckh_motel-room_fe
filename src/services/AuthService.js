import axios from "axios";

const API_URL = "http://localhost:8080/auth/"; // Cập nhật URL với prefix '/auth'

class AuthService {
  // Đăng nhập: Gửi email và password, nhận về token và thông tin người dùng
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data && response.data.data && response.data.data.token) {
          const userData = response.data.data; // Lấy dữ liệu từ backend
          localStorage.setItem("user", JSON.stringify(userData)); // Lưu dữ liệu vào localStorage
          return userData; // Trả về dữ liệu đã xử lý
        } else {
          // Nếu không có token, ném lỗi
          throw new Error("Không nhận được token từ server.");
        }
      })
      .catch((error) => {
        // Xử lý lỗi từ BE hoặc lỗi khác
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          "Đăng nhập thất bại. Vui lòng thử lại!";
        throw new Error(errorMessage);
      });
  }

  // Đăng ký: Gửi email, password, fullName, address và phone
  register(email, password, fullName, address, phone) {
    return axios
      .post(API_URL + "register", { email, password, fullName, address, phone }) // Gửi dữ liệu đăng ký
      .then((response) => {
        return response.data; // Trả về dữ liệu phản hồi từ server
      })
      .catch((error) => {
        console.error("Registration failed: ", error);
        throw error; // Bắt lỗi nếu có lỗi khi đăng ký
      });
  }

  // Đăng xuất: Xóa thông tin người dùng khỏi localStorage
  logout() {
    localStorage.removeItem("user"); // Xóa thông tin người dùng trong localStorage
  }

  // Lấy thông tin người dùng hiện tại từ localStorage
  getCurrentUser() {
    const user = localStorage.getItem("user"); // Lấy dữ liệu từ localStorage
    return user ? JSON.parse(user) : null; // Parse dữ liệu thành object
  }

  // Lấy vai trò người dùng hiện tại từ thông tin BE trả về
  getCurrentUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null; // Trả về role nếu tồn tại
  }

  // Tạo header Authorization (JWT token) để gửi cùng với yêu cầu API
  authHeader() {
    const user = this.getCurrentUser();
    return user && user.token ? { Authorization: "Bearer " + user.token } : {};
  }
}

export default new AuthService();
