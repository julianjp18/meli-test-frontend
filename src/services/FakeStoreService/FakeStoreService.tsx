import { get } from "../../api/fetch";
import { ServiceI } from "./FakeStoreService.utils";

const MAIN_URL = import.meta.env.VITE_BACKEND_URL;

const FakeStoreService = {
    getProducts: async (queryParam = ':query'): Promise<ServiceI> => {
      try {
        const response = await get(`${MAIN_URL}items?q=${queryParam}`);
        return {
            data: response.items,
            statusCode: 200,
        };
      } catch (err: any) {
        return {
            data: null,
            statusCode: 500,
            error: err,
        };
      }
    },
    getProductById: async (productId: string): Promise<ServiceI> => {
        try {
          const response = await get(`${MAIN_URL}items/${productId}`);

          return {
              data: new Array(response.item),
              statusCode: 200,
          };
        } catch (err: any) {
          return {
              data: null,
              statusCode: 500,
              error: err,
          };
        }
      },
};

export default FakeStoreService;