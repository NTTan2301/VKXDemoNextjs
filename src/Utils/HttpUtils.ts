import company from "@/src/Utils/HttpUtils";
import { PagedResponse } from "@/src/Interface/IPagedResponse"
import { CreateHeaders, handleApiError } from "../Helpers/Headers";
import { ResponseErrorAPI } from "../Interface/ResponseErrorAPI";

export default class HttpUtils {
    public static async get<T>(apiUrl: string, actionCode: string, bodyContent: string,
        includeToken: boolean = true, closeError: boolean = true) {

        return HttpUtils.fetch_api<T>(apiUrl);
    }

    public static async getById<T>(apiUrl: string, id: string) {

        return HttpUtils.fetch_apiById<T>(apiUrl,id);
    }

    public static async create<T>(apiUrl: string, data : any) {

        return HttpUtils.fetch_create<T>(apiUrl, data ,false);
    }

    public static async update<T>(apiUrl: string, data : any) {

        return HttpUtils.fetch_update<T>(apiUrl, data ,false);
    }

    public static async delete<T>(apiUrl: string, id : string) {

        return HttpUtils.fetch_delete<T>(apiUrl, id);
    }


    private static async fetch_api<T>(apiUrl: string,) 
    {
        const token = "your_token_here";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // hoặc `Token ${token}` tùy theo backend
        };
        const dto = {
            pageNumber: 1,
            pageSize: 10,
            filterName: ""
        };
        const query = new URLSearchParams(dto as any).toString();
        const apiUrlWithQuery = `${apiUrl}?${query}`;
        
        try{
            let response = await fetch(apiUrlWithQuery, {
                method: "GET",
                headers: headers,
            })

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const contentType = response.headers.get("Content-Type");
            
    
            if (contentType && contentType.includes("application/json")) {
                const responseData = await response.json() as PagedResponse<T>;
                return responseData;
            } else {
                console.error("Expected JSON, but received something else.");
                throw new Error("Expected JSON, but received something else.");
            }
        }
        catch (error){
            console.error("Error fetching data:", error);
        }
       
    }

    private static async fetch_apiById<T>(apiUrl: string, id: string) 
    {
        const token = "your_token_here";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // hoặc `Token ${token}` tùy theo backend
        };
    
        const apiUrlWithQuery = `${apiUrl}/${id}`;
        
        try{
            let response = await fetch(apiUrlWithQuery, {
                method: "GET",
                headers: headers,
            })

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get("Content-Type");
            
    
            if (contentType && contentType.includes("application/json")) {
                const responseData = await response.json() as T;
                return responseData;
            } else {
                console.error("Expected JSON, but received something else.");
                throw new Error("Expected JSON, but received something else.");
            }
        }
        catch (error){
            console.error("Error fetching data:", error);
        }
       
    }


    public static async fetch_create<T>(
        apiUrl: string,
        data: any,
        includeToken: boolean = true
      ): Promise<T | undefined> 
      {
        const token = "your_token_here";
        const headers = CreateHeaders(true);
      
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
          });

          await handleApiError(response);
      
          if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const contentType = response.headers.get("Content-Type");
      
          if (contentType && contentType.includes("application/json")) {
            const responseData = await response.json() as T;
            return responseData;
          } else {
            console.error("Expected JSON, but received something else.");
            throw new Error("Expected JSON, but received something else.");
          }
        } catch (error) {
          console.error("Error creating data:", error);
        }
    }

    public static async fetch_update<T>(
        apiUrl: string,
        data: any,
        includeToken: boolean = true
      ): Promise<T | undefined> 
      {
        const headers = CreateHeaders(true);
      
        try {
          const response = await fetch(apiUrl, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data),
          });

          await handleApiError(response);
      
          if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const contentType = response.headers.get("Content-Type");
      
          if (contentType && contentType.includes("application/json")) {
            const responseData = await response.json() as T;
            return responseData;
          } else {
            console.error("Expected JSON, but received something else.");
            throw new Error("Expected JSON, but received something else.");
          }
        } catch (error) {
          console.error("Error creating data:", error);
        }
    }

     public static async fetch_delete<T>(
        apiUrl: string,
        id : string
      ): Promise<T | undefined> 
      {
        const token = "your_token_here";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // hoặc `Token ${token}` tùy theo backend
        };
    
        const apiUrlWithQuery = `${apiUrl}/${id}`;
        
        try{
            let response = await fetch(apiUrlWithQuery, {
                method: "DELETE",
                headers: headers,
            })

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get("Content-Type");
            debugger
    
            if (contentType && contentType.includes("application/json")) {
               return ;
            } else {
                console.error("Expected JSON, but received something else.");
                throw new Error("Expected JSON, but received something else.");
            }
        }
        catch (error){
            console.error("Error fetching data:", error);
        }
       
    }
}