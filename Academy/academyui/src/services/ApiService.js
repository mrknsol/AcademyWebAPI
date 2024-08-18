import axios from 'axios';

class ApiService {
    static async apiRequest(apiData) {
        try {
            const response = await axios({
                url: apiData.Url,
                method: apiData.Method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...apiData.Headers
                },
                data: apiData.Data
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const apiRequest = ApiService.apiRequest;

export default ApiService;