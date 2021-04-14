 const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Нийтлэлийн гарчиг оруулна уу!";
  }

  if (!values.summary) {
    errors.summary = "Хураангуй мэдээлэл оруулна уу!";
  } else if (values.summary.length > 300) {
    errors.summary = "Хураангуй хамгийн ихдээ 300 тэмдэгт";
  }

  return errors;
};

export default validate;
