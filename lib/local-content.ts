export const officialSources: Record<string, { url: string; label: string }> = {
  'quang-ninh': { url: 'https://quangninh.gov.vn/', label: 'Cổng thông tin tỉnh Quảng Ninh' },
  'ninh-binh': { url: 'https://ninhbinh.gov.vn/', label: 'Cổng thông tin tỉnh Ninh Bình' },
  'da-nang': { url: 'https://danang.gov.vn/', label: 'Cổng thông tin thành phố Đà Nẵng' },
  'lao-cai': { url: 'https://laocai.gov.vn/', label: 'Cổng thông tin tỉnh Lào Cai' },
  'ha-noi': { url: 'https://hanoi.gov.vn/', label: 'Cổng thông tin thành phố Hà Nội' },
  'hue': { url: 'https://hue.gov.vn/', label: 'Cổng thông tin thành phố Huế' },
  'ho-chi-minh': { url: 'https://hochiminhcity.gov.vn/', label: 'Cổng thông tin TP. Hồ Chí Minh' },
  'can-tho': { url: 'https://cantho.gov.vn/', label: 'Cổng thông tin thành phố Cần Thơ' },
};
export const serviceGuides: Record<string, string[]> = {
  'Ẩm thực': ['Xác nhận thực đơn, mức giá và nhu cầu ăn uống với cơ sở trước khi ghé.', 'Hỏi trước về đặt bàn, số người và khả năng phục vụ theo khung giờ.'],
  'Lưu trú': ['Xác nhận loại phòng, tiện nghi và tổng chi phí theo ngày dự định lưu trú.', 'Trao đổi trực tiếp về giờ nhận phòng, trả phòng và điều kiện hủy.'],
  'Đặc sản địa phương': ['Hỏi rõ nguồn gốc, thành phần, hạn sử dụng và quy cách đóng gói.', 'Xác nhận giá, phí vận chuyển và chính sách đổi trả trước khi mua.'],
  'Trải nghiệm': ['Xác nhận lịch trình, thời lượng, phương tiện và những khoản đã bao gồm.', 'Trao đổi về thời tiết, trang bị an toàn và điều kiện thay đổi lịch trình.'],
  'Dịch vụ': ['Trao đổi rõ phạm vi phục vụ, thời gian và chi phí dự kiến.', 'Thống nhất nội dung hỗ trợ và điều kiện thay đổi trước khi sử dụng dịch vụ.'],
};
