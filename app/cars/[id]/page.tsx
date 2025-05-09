"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CompanyCreateDto from "@/src/DTOParams/Company/CompanyCreateDto";
import HttpUtils from "@/src/Utils/HttpUtils";
import Company from "@/src/entities/Company";
import CompanyDetailDto from "@/src/DTOParams/Company/CompanyDetailDto";

export default function DetailCompanyPage() {

    const params = useParams(); // Lấy tất cả tham số route
    const id = params?.id as string;   // Chắc chắn là string từ params

    const [formData, setFormData] = useState<CompanyDetailDto>({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const router = useRouter();

    let HostUrl = process.env.NODE_ENV === 'development' 
                   ?  process.env.NEXT_PUBLIC_URL_DEV as string 
                   : process.env.NEXT_PUBLIC_URL_PRODUCTION as string;

    let apiUrl = HostUrl + "company"; // Xác định URL API

    // theo dõi sự thay đổi của text. cập nhật vào state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Sự kiện lưu tạo mới dữ liệu
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await HttpUtils.create<Company>(apiUrl, formData);
            if (response) {
                router.push("/cars"); // điều hướng sau khi tạo thành công
            } else {
                console.error("Tạo thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };

    // Hàm gọi API để lấy dữ liệu chi tiết
    const fetch_getById = async () => {
        if (!id) {
            console.error("ID không hợp lệ");
            return;
        }

        try {
            const result = await HttpUtils.getById<Company>(apiUrl, id);
            debugger
            if (result) {
                setFormData({
                    name: result.name || "",
                    email: result.email || "",
                    address: result.address || "",
                    phone: result.phone || "",
                });
            } else {
                console.error("Không tìm thấy dữ liệu cho ID: " + id);
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    // Fetch dữ liệu khi component mount
    useEffect(() => {
        if (id) {
            fetch_getById();
        }
    }, [id]); // Chạy lại khi `id` thay đổi

     useEffect(() => {
        console.log("formData" , formData);
    }, [formData]); 
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    name="name" 
                    value={formData.name || ""} 
                    onChange={handleChange} 
                    placeholder="Tên" 
                    required 
                />
            </div>
            <div>
                <input 
                    name="email" 
                    value={formData.email || ""} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                />
            </div>
            <div>
                <input 
                    name="address" 
                    value={formData.address || ""} 
                    onChange={handleChange} 
                    placeholder="Địa chỉ" 
                    required 
                />
            </div>
            <div>
                <input 
                    name="phone" 
                    value={formData.phone || ""} 
                    onChange={handleChange} 
                    placeholder="Số điện thoại" 
                    required 
                />
            </div>
            <div>
                <button type="submit">Tạo mới</button>
            </div>
        </form>
    );
}
