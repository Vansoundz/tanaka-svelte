import productApi from "../api/product.api";
import type { Category, Product } from "../models/product.model";

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

const getCategories = async (): Promise<{ categories: Category[] }> => {
  try {
    let data = (await productApi.getCategories()).data;
    return data;
  } catch (error) {
    console.log(error);
    return {
      categories: [],
    };
  }
};

const getProductsByCategory = async (
  id: string
): Promise<{ products: Product[] }> => {
  try {
    let data = (await productApi.getProductsBycategory(id)).data;
    return data;
  } catch (error) {
    console.log(error);
    return {
      products: [],
    };
  }
};

const createProduct = async (product: FormData) => {
  try {
    let data = (await productApi.createProduct(product)).data;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.errors;
    }
    throw `Error creating product`;
  }
};

const editProduct = async (id: string, product: FormData) => {
  try {
    let data = (await productApi.editProduct(id, product)).data;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.errors;
    }
    throw `Error editing product`;
  }
};

const deleteProduct = async (id: string) => {
  try {
    let data = (await productApi.deleteProduct(id)).data;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.errors;
    }
    throw `Error deleting product`;
  }
};
const deleteCategory = async (id: string) => {
  try {
    let data = (await productApi.deleteCategory(id)).data;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.errors;
    }
    throw `Error deleting product`;
  }
};

const createCategory = async (name: string) => {
  try {
    let data = (await productApi.createCategory(name)).data;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.errors[0].msg;
    }
    throw `Error deleting product`;
  }
};

const editCategory = async (id: string, name: string) => {
  try {
    let data = (await productApi.editCategory(id, name)).data;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.errors[0].msg;
    }
    throw `Error deleting product`;
  }
};

export {
  getProducts,
  getProduct,
  getCategories,
  getProductsByCategory,
  createProduct,
  deleteProduct,
  editProduct,
  createCategory,
  editCategory,
  deleteCategory,
};
