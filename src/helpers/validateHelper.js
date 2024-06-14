export const handleNotFound = (res, model) => {
  const modelName = model.modelName || "Resource";
  return res.status(404).json({ message: `No ${modelName} found` });
};

export const sendResponse = (res, statusCode, data, propertyName = "data") => {
  const errorMessage =
    statusCode === 404 ? "Recurso no encontrado" : "Error interno del servidor";

  const responseObject = {
    ...(statusCode === 404 && { message: errorMessage }),
    ...(statusCode === 500 && { message: errorMessage, error: data }),
    [propertyName]: data,
  };

  return res.status(statusCode).json(responseObject);
};
