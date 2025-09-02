import {
  create,
  deleteCat,
  getById,
  getByName,
  update,
} from "../services/categoryService.js";

export const createCategory = async (req, res) => {
  const input = req.body;

  try {
    const data = await create(req.params.id, input);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = await update(req.params.id, req.body, req.user);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const data = await deleteCat(req.params.id, req.user);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const findCategoryById = async (req, res) => {
  try {
    const data = await getById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const findCategoryByName = async (req, res) => {
  try {
    const data = getByName(req.body.title);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};