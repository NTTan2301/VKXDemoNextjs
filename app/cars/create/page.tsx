"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import CompanyCreateDto from "@/src/DTOParams/Company/CompanyCreateDto";
import HttpUtils from "@/src/Utils/HttpUtils";
import Company from "@/src/entities/Company";

export default function CreateCompanyPage() {
  const [formData, setFormData] = useState<CompanyCreateDto>({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  let HostUrl = process.env.NODE_ENV === 'development' 
                   ?  process.env.NEXT_PUBLIC_URL_DEV as string 
                   : process.env.NEXT_PUBLIC_URL_PRODUCTION as string;
  let apiUrl = HostUrl + "company";

  const router = useRouter();

    //theo dõi sự thay đổi của text. cập nhật vào state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

//   sự kiên lưu tạo mới dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await HttpUtils.create<Company>(apiUrl, formData );
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}Company`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData)
    //   });

      if (response) {
        router.push("/cars"); // điều hướng sau khi tạo thành công
      } else {
        console.error("Tạo thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Tên" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" />
      <button type="submit">Tạo mới</button>
    </form>
  );
}
