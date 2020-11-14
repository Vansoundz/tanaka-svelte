import productApi from "../api/product.api";
import type { Product } from "../models/product.model";

const getProducts = async (): Promise<{ products: Product[] }> => {
  try {
    let data = (await productApi.getProducts()).data;
    return data;
  } catch (error) {
    console.log(error);
    return {
      products: [],
    };
    // if (error.response) {
    //   throw new Error(error.response.data.errors[0].msg);
    // }
    // throw `Error getting products`;
  }
};

const getProduct = async (id: string): Promise<{ product: Product }> => {
  try {
    let data = (await productApi.getProduct(id)).data;
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors[0].msg);
    }
    throw `Error getting product`;
  }
};

export { getProducts, getProduct };
