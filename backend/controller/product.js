import PRODUTS from "../model/productModel.js";

export const getallProduct = async (req, res) => {
  try {
    const { page, pageSize, search } = req.query;

    let products;
    let totalProduct;

    if (search) {
      products = await PRODUTS.find({
        name: { $regex: search, $options: "i" },
      });
      totalProduct = products.length;

      products = products.slice((page - 1) * pageSize, page * pageSize); // Paginate filtered data
    } else {
      products = await PRODUTS.find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalProduct = await PRODUTS.countDocuments();
    }

    const totalPages = Math.ceil(totalProduct / pageSize);

    return res.status(200).json({
      message: "All product data",
      body: products,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
