import News from "../models/News";
import { Response } from "../models/Response";

class NewsService {

    private static readonly RESOURCE = "/news";

    private static readonly URL = 'http://localhost:8080';

    async getNews(page = 0, size = 10): Promise<Response<News>> {
        const response = await fetch(`${NewsService.URL}${NewsService.RESOURCE}?page=${page}&size=${size}`);
        const body = await response.json();
        return body;
    }
    
}
export default NewsService;