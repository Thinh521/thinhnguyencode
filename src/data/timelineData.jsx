import { BarChart3, GraduationCap, QrCode, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { IMAGES } from "../../public/images/imgaes";

export const timelineData = [
  {
    id: "1",
    role: "Senior Frontend Developer",
    title: "Website giới thiệu nhà hàng",
    type: "Full-time",
    duration: "10.2024—Present",
    images: [
      IMAGES.project1,
      IMAGES.project1_2,
      IMAGES.project1_3,
      IMAGES.project1_4,
      IMAGES.project1_5,
    ],
    icon: UtensilsCrossed,
    responsibilities: [
      "Xây dựng website giới thiệu nhà hàng với HTML, CSS và JavaScript, tập trung vào giao diện trực quan và thân thiện với người dùng.",
      "Thiết kế giao diện responsive, đảm bảo trải nghiệm tốt trên cả máy tính và thiết bị di động.",
      "Quản lý và tối ưu mã nguồn, tuân thủ HTML semantic và CSS hiện đại.",
    ],
    skills: ["HTML, CSS", "JavaScript"],
    links: [
      {
        label: "Chi tiết",
        url: "/projects/1",
        internal: true,
      },
      {
        label: "Xem Github",
        url: "https://github.com/Thinh521/Decora_Frontend",
      },
      {
        label: "Xem Dự án",
        url: "https://thinh521.github.io/Restaurant_Frontend/",
      },
    ],
  },
  {
    id: "2",
    role: "Senior Frontend Developer",
    title: "Website giới thiệu các khóa học (TuHoc.CC Clone)",
    type: "Full-time",
    duration: "10.2022—Present",
    images: [IMAGES.project2, IMAGES.project2_2, IMAGES.project2_3],
    icon: GraduationCap,
    responsibilities: [
      "Xây dựng website giới thiệu các khóa học trực tuyến bằng HTML, CSS và JavaScript, giao diện dễ tiếp cận cho người học.",
      "Thiết kế responsive, hiển thị tốt trên máy tính và thiết bị di động.",
      "Quản lý và tối ưu mã nguồn, áp dụng HTML semantic và CSS hiện đại.",
    ],
    skills: ["HTML, CSS", "JavaScript", "Figma"],
    links: [
      {
        label: "Chi tiết",
        url: "/projects/2",
        internal: true,
      },
      {
        label: "Xem Github",
        url: "https://github.com/Thinh521/TuHoc_Clone",
      },
      { label: "Xem Dự án", url: "https://thinh521.github.io/TuHoc_Clone/" },
    ],
  },
  {
    id: "3",
    role: "Mobile App Developer (React Native)",
    title: "Ứng dụng thống kê, quản lý và cập nhật thị trường nông sản",
    type: "Full-time",
    duration: "03.2021—09.2022",
    images: [IMAGES.project3, IMAGES.project3, IMAGES.project3],
    icon: BarChart3,
    responsibilities: [
      "Phát triển ứng dụng di động thống kê và quản lý thị trường nông sản bằng React Native.",
      "Tích hợp AI phân tích dữ liệu thị trường, dự đoán xu hướng cung cầu và giá cả.",
      "Xây dựng hệ thống xử lý Big Data để quản lý lượng lớn dữ liệu sản xuất và tiêu thụ.",
      "Thiết kế dashboard trực quan theo vùng trồng trọt, mùa vụ và tình hình thị trường.",
      "Phát triển hệ thống cảnh báo biến động lớn về cung cầu hoặc giá cả.",
      "Phối hợp team Agile từ thu thập dữ liệu, xây dựng mô hình AI đến kiểm thử và triển khai.",
    ],
    skills: [
      "React Native",
      "JavaScript",
      "AI/ML",
      "Big Data",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    links: [
      {
        label: "Chi tiết",
        url: "/projects/3",
        internal: true,
      },
      {
        label: "Xem Github",
        url: "https://github.com/Thinh521/Pione_Farm",
      },
      { label: "Xem Dự án", url: "https://github.com/Thinh521/Pione_Farm" },
    ],
  },
  {
    id: "4",
    role: "Mobile App Developer (React Native)",
    title: "Ứng dụng truy xuất nguồn gốc nông sản",
    type: "Full-time",
    duration: "03.2021—09.2022",
    images: [IMAGES.project4, IMAGES.project4, IMAGES.project4],
    icon: QrCode,
    responsibilities: [
      "Phát triển ứng dụng di động truy xuất nguồn gốc nông sản bằng React Native.",
      "Tích hợp Blockchain để lưu trữ dữ liệu nguồn gốc, đảm bảo minh bạch và không thay đổi.",
      "Triển khai Smart Contracts để tự động hóa xác nhận nguồn gốc.",
      "Quét mã QR/nhập mã sản phẩm, hiển thị chi tiết quá trình trồng trọt và vận chuyển.",
      "Thiết kế cảnh báo khi phát hiện dấu hiệu giả mạo hoặc sai lệch thông tin.",
      "Phối hợp nhóm Agile từ thiết kế UI đến kiểm thử và triển khai bản beta.",
    ],
    skills: [
      "React Native",
      "JavaScript",
      "Blockchain",
      "Smart Contracts / Web3",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    links: [
      {
        label: "Chi tiết",
        url: "/projects/4",
        internal: true,
      },
      {
        label: "Xem Github",
        url: "https://github.com/Thinh521/Blockchain_Farm",
      },
      {
        label: "Xem Dự án",
        url: "https://github.com/Thinh521/Blockchain_Farm",
      },
    ],
  },
  {
    id: "5",
    role: "Mobile App Developer (React Native)",
    title: "Ứng dụng mua sắm quần áo",
    type: "Full-time",
    duration: "03.2021—09.2022",
    images: [IMAGES.project5, IMAGES.project5, IMAGES.project5],
    icon: ShoppingBag,
    responsibilities: [
      "Phát triển ứng dụng mua sắm quần áo bằng React Native, giao diện trực quan và thân thiện với người dùng.",
      "Xây dựng các tính năng: danh mục sản phẩm, tìm kiếm, giỏ hàng, thanh toán, quản lý đơn hàng.",
      "Tích hợp API backend để lấy dữ liệu sản phẩm, xử lý đăng nhập/đăng ký và quản lý người dùng.",
      "Thiết kế responsive, tối ưu trải nghiệm trên Android và iOS.",
      "Tối ưu hiệu năng, xử lý state management cho giỏ hàng và luồng đặt hàng.",
      "Làm việc theo mô hình Agile, phối hợp team trong suốt quá trình phát triển.",
    ],
    skills: [
      "React Native",
      "JavaScript",
      "REST API",
      "State Management",
      "UI/UX",
      "Figma",
    ],
    links: [
      {
        label: "Chi tiết",
        url: "/projects/5",
        internal: true,
      },
      {
        label: "Xem Github",
        url: "https://github.com/Thinh521/Fashion_Shop_App",
      },
      {
        label: "Xem Dự án",
        url: "https://github.com/Thinh521/Fashion_Shop_App",
      },
    ],
  },
];
