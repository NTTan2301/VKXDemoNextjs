import company from "@/src/Utils/HttpUtils";
import { PagedResponse } from "@/src/Interface/IPagedResponse"
import { CreateHeaders, handleApiError } from "../Helpers/HelpersAPI";
import { ResponseErrorAPI } from "../Interface/ResponseErrorAPI";
import { EnumErrorCode } from "../Enum/ErrorEnum";
import { mapErrorToResponseError } from "../Helpers/mapErrorToResponseError";

export default class HttpUtils {
    public static async get<T>(apiUrl: string, actionCode: string, bodyContent: string,
        includeToken: boolean = true, closeError: boolean = true) {

        return HttpUtils.Getall<T>(apiUrl);
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
    //get sử dụng post.
    //sử dụng builder hoắc factory.
    public static async fetchApi<T>(apiUrl: string, method: string, data: any, includeToken: boolean = true, filterHeader: any )
    {
        return HttpUtils.fetch_Api<T>(apiUrl, method, data, includeToken,filterHeader);
    }

    
    private static async fetch_Api<T>(apiUrl: string,method: string,data: any,includeToken: boolean,filterHeader: any): Promise<T> 
    {
      const headers = CreateHeaders(includeToken);

      const apiUrlWithQuery = filterHeader? `${apiUrl}?${new URLSearchParams(filterHeader).toString()}`: apiUrl;

      try {
      const options: RequestInit = {
        method,
        headers,
      };

        if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && data) {
          options.body = JSON.stringify(data);
        }

        const response = await fetch(apiUrlWithQuery, options);

        handleApiError(response);

        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
          const responseData = (await response.json()) as T;
          return responseData;
        } else {
          console.error("Expected JSON, but received something else.");
          throw new Error("Expected JSON, but received something else.");
        }
      } catch (error) {
        throw mapErrorToResponseError(error);
      }
    } 

    
    private static async Getall<T>(apiUrl: string) 
    {
        const headers = CreateHeaders(true);
        const dto = {
            pageNumber: 1,
            pageSize: 10,
            filterName: ""
        };
        const query = new URLSearchParams(dto as any).toString();
        const apiUrlWithQuery = `${apiUrl}?${query}`;
        
        try{
            debugger
            let response = await fetch(apiUrlWithQuery, {
                method: "GET",
                headers: headers,
            })

            handleApiError(response);
    
            const contentType = response.headers.get("Content-Type");
            
    
            if (contentType && contentType.includes("application/json")) {
                const responseData = await response.json() as PagedResponse<T>; // reponse trả về không cố định
                return responseData;
            } else {
                console.error("Expected JSON, but received something else.");
                throw new Error("Expected JSON, but received something else.");
            }
        }
        catch (error){
            throw mapErrorToResponseError(error);
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
            throw mapErrorToResponseError(error);
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
           throw mapErrorToResponseError(error);
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
      
          const contentType = response.headers.get("Content-Type");
      
          if (contentType && contentType.includes("application/json")) {
            const responseData = await response.json() as T;
            return responseData;
          } else {
            console.error("Expected JSON, but received something else.");
            throw new Error("Expected JSON, but received something else.");
          }
        } catch (error) {
           throw mapErrorToResponseError(error);
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

            await handleApiError(response);
            
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
            throw mapErrorToResponseError(error);
        }
       
    }



}