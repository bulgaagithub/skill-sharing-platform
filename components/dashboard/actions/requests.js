export const createUpdate = async (
  e,
  editorValue,
  session,
  type,
  loadFn,
  addToast,
  article,
  router
) => {
  let body = {};

  if (!editorValue) {
    addToast("Нийтлэлийн агуулга оруулна уу!", {
      appearance: "error",
      autoDismiss: 5000,
    });
    return;
  } else if (editorValue.length < 100) {
    addToast("Нийтлэлийн агуулга хамгийн багадаа 100 тэмдэгт", {
      appearance: "error",
      autoDismiss: 5000,
    });
    return;
  }

  if (type === "create") {
    body = {
      title: e.title,
      summary: e.summary,
      content: editorValue,
      category: e.category,
    };
  } else if (type === "review") {
    body = {
      title: e.title,
      summary: e.value,
      content: editorValue,
      category: e.category,
      articleId: article._id,
    };
  } else if (type === "delete") {
    body = {
      articleId: article._id,
    };
  }

  loadFn(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles`,
      {
        method:
          type === "create" ? "POST" : type === "review" ? "PUT" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (res.status === 200) {
      loadFn(false);
      addToast(type === "delete" ? "Устгагдлаа" : "Хадгалагдлаа.", {
        appearance: "success",
      });
      router.push("/dashboard");
    } else {
      loadFn(false);
      const result = await res.json();
      addToast(result.error.message + result.error.statusCode, {
        appearance: "error",
        autoDismiss: 6000,
      });
      return;
    }
  } catch (error) {
    loadFn(false);
    if (error.statusCode === 401) {
      addToast(error.message, { appearance: "error" });
      setTimeout(() => {
        signOut();
      }, 1000);
    }
  }
};

export const approveArticle = async (
  session,
  loadFn,
  addToast,
  article,
  router
) => {
  const body = {
    status: "approved",
    articleId: article._id,
    approvedAt: Date.now(),
  };

  loadFn(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/${article._id}/approve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 200) {
      loadFn(false);
      addToast("Нийтлэгдлээ.", {
        appearance: "success",
      });
      router.push("/dashboard");
    } else {
      loadFn(false);
      const result = await res.json();
      addToast(result.error.message + result.error.statusCode, {
        appearance: "error",
        autoDismiss: 6000,
      });
      return;
    }
  } catch (error) {
    loadFn(false);
    if (error.statusCode === 401) {
      addToast(error.message, { appearance: "error" });
      setTimeout(() => {
        signOut();
      }, 1000);
    }
  }
};

export const blockUser = async (
  type,
  session,
  loadFn,
  addToast,
  user,
  router
) => {
  const body = {
    active: type === "Active" ? "active" : "inactive",
  };

  loadFn(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 200) {
      loadFn(false);
      addToast(type + ' User', {
        appearance: "success",
      });
      router.push("/dashboard");
    } else {
      loadFn(false);
      const result = await res.json();
      addToast(result.error.message + result.error.statusCode, {
        appearance: "error",
        autoDismiss: 6000,
      });
      return;
    }
  } catch (error) {
    loadFn(false);
    if (error.statusCode === 401) {
      addToast(error.message, { appearance: "error" });
      setTimeout(() => {
        signOut();
      }, 1000);
    }
  }
};
