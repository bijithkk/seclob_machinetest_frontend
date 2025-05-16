import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryMap, setSubCategoryMap] = useState({});
  const [allSubcategories, setAllSubcategories] = useState([]);

  const getProductsData = async (token) => {
    try {
      const response = await axios.get(backendUrl + "/user/product/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProducts(response.data.allProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("",);
    }
  };

  const getCategoryData = async (token) => {
    try {
      const response = await axios.get(backendUrl + "/user/category/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCategoryData(response.data.allCategories);
      }
    } catch (error) {
      console.log("",);
    }
  };

  const getSubCategories = async (categoryId) => {
    try {
      console.log("categoryId", categoryId);
      const response = await axios.get(backendUrl + "/user/subcategory/view", {
        params: { categoryId },
      });
      console.log("subcategory", response);
      setSubCategoryMap((prev) => ({
        ...prev,
        [categoryId]: response.data.data, // Adjust to your response
      }));
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const filterProductsBySubcategory = async (subcategoryId) => {
    try {
      const response = await axios.get(backendUrl + "/user/filter/", {
        params: { subcategoryId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Filtered Products:", response);
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (err) {
      console.error(
        "Error filtering products",
        err.response?.data || err.message
      );
    }
  };

  const getAllSubcategories = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/user/subcategory/subcategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("all subcateroies", response);
      if (response.status === 201) {
        setAllSubcategories(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProductById = async (id) => {
    try {
      const res = await axios.get(backendUrl + `/user/product/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  };

  const addCategory = async (categoryName) => {
    try {
      const response = await axios.post(
        backendUrl + "/user/category/add",
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("addCateg", response);

      if (response.status === 201) {
        setCategoryData((prev) => [...prev, response.data.category]);

        return response.data;
      }
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  const addSubCategory = async (categoryId, subCategoryName) => {
    try {
      console.log("categoryId", categoryId);
      console.log("subCategoryName", subCategoryName);
      const response = await axios.post(
        backendUrl + "/user/subcategory/add",
        {
          categoryId,
          name: subCategoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Subcategory added:", response);
      return response.data;
    } catch (error) {
      console.error("Error adding subcategory:", error);
      throw error;
    }
  };

  const searchProducts = async (searchQuery) => {
    try {
      console.log("searchQuery", searchQuery);
      const response = await axios.get(`${backendUrl}/user/search/search`, {
        params: { productName: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);

      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error during product search:", error.message);
      toast.error("Search failed. Try again.");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken); // This triggers the next effect below
    }
  }, []);

  useEffect(() => {
    if (token) {
      getProductsData(token);
      getCategoryData(token);
    }
  }, [token]);

  const value = {
    backendUrl,
    navigate,
    setToken,
    products,
    categoryData,
    getSubCategories,
    subCategoryMap,
    token,
    filterProductsBySubcategory,
    getProductsData,
    getAllSubcategories,
    allSubcategories,
    getProductById,
    addCategory,
    addSubCategory,
    searchProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
