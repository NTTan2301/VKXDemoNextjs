"use client"; 

import Company from "@/src/entities/Company";
import { useRouter } from 'next/navigation';
import HttpUtils from "@/src/Utils/HttpUtils";
import { useEffect, useState } from "react";

  

  export default function CarListPage() {
    const [Companys, setCompany] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    let HostUrl = process.env.NODE_ENV === 'development' 
                   ?  process.env.NEXT_PUBLIC_URL_DEV as string 
                   : process.env.NEXT_PUBLIC_URL_PRODUCTION as string;
   
    const fetchData = async () => {
      
      const apiUrl = HostUrl + "Company";
      const actionCode = "SomeAction";
      const bodyContent = JSON.stringify({
        someField: "someValue",
      });
    
      try {
        const result = await HttpUtils.get<Company>(apiUrl, actionCode, bodyContent);
        if(result && result.items)
        {
          setCompany(result.items as Company[]);
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    }

    const handleCreateNew = () => {
      // chuyển về màn hình create
      router.push('/cars/create');
    };

    const navigateToDetail = (id: number) => {
      // Dùng router.push() để chuyển hướng đến trang chi tiết
      router.push(`/cars/${id}`);
    };

    const deleteById = async(id: number) => {
        try {
               let apiUrl = HostUrl + "company"; // Xác định URL API
               const result = await HttpUtils.delete<Company>(apiUrl, id.toString());
               fetchData();
               localStorage.setItem("IDDelete",id.toString());
           } catch (error) {
               console.error("Error calling API:", error);
           }
    };

    // chạy 1 lần môi khi load trang và sau khi load xong trang tĩnh trên client
    useEffect(() => {
      fetchData();
      alert("vừa có bản cập nhật với id: " + localStorage.getItem("IDSua"));
    }, []);

    // chạy 1 lần mỗi khi Companys Thay đổi
    useEffect(() => {
      console.log("kết quả trả về: ", Companys);
    }, [Companys]);
    
    

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Danh sách đơn vị</h1>

        <button
          onClick={handleCreateNew}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Tạo mới
        </button>

        <table className="w-full table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Địa chỉ</th>
              <th className="border px-4 py-2">Số điện thoại</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Companys.map((company) => (
              <tr key={company.id}>
                <td className="border px-4 py-2">{company.id}</td>
                <td className="border px-4 py-2">{company.name}</td>
                <td className="border px-4 py-2">{company.email}</td>
                <td className="border px-4 py-2">{company.address}</td>
                <td className="border px-4 py-2">{company.phone}</td>
                <td className="border px-4 py-2">
                    <button
                      onClick={() => navigateToDetail(company.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Xem chi tiết
                    </button>

                    <button
                      onClick={() => deleteById(company.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      - XÓA
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }