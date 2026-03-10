import { IMAGES } from "../../public/images/imgaes";

const PhotoData = [
  {
    id: 1,
    title: "Ảnh bảnh",
    category: ["Chân dung"],
    images: [
      IMAGES.photo1_1,
      IMAGES.photo1_2,
      IMAGES.photo1_3,
      IMAGES.photo1_4,
      IMAGES.photo1_5,
      IMAGES.photo1_6,
    ],
    date: "Tiền Giang, ngày 04-03-2025",
    description: "Ảnh chân dung bảnh bao.",
  },
  {
    id: 2,
    title: "Sài Gòn",
    category: ["Đời thường"],
    images: [
      IMAGES.photo2_1,
      IMAGES.photo2_2,
      IMAGES.photo2_3,
      IMAGES.photo2_4,
    ],
    date: "Tiền Giang, ngày 04-03-2025",
    description: "Lúc này là lúc tớ đi ăn cưới em gái :>",
  },
  {
    id: 3,
    title: "Ăm uống",
    category: ["Ẩm thực"],
    images: [
      IMAGES.photo3_1,
      IMAGES.photo3_2,
      IMAGES.photo3_3,
      IMAGES.photo3_4,
      IMAGES.photo3_5,
      IMAGES.photo3_6,
      IMAGES.photo3_7,
      IMAGES.photo3_8,
      IMAGES.photo3_9,
      IMAGES.photo3_10,
    ],
    date: "TP.HCM, ngày 04-03-2025",
    description: "Một chuyến đi Sài Gòn đầy kỷ niệm.",
  },
  {
    id: 4,
    title: "Linh tinh",
    category: ["Đời thường"],
    images: [
      IMAGES.photo4_1,
      IMAGES.photo4_2,
      IMAGES.photo4_3,
      IMAGES.photo4_4,
    ],
    date: "Tiền Giang, ngày 04-03-2025",
    description: "Tạo ảnh theo phong cách snoopy.",
  },
  {
    id: 5,
    title: "Công việc",
    category: ["Công việc", "Đời thường"],
    images: [IMAGES.photo5_1, IMAGES.photo5_2],
    date: "TP.HCM, ngày 04-03-2025",
    description: "Khoảnh khắc tại nơi làm việc.",
  },
];

export default PhotoData;
