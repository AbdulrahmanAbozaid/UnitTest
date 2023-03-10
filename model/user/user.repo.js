const User = require("./user.model");

exports.isExist = async (filter) => {
  let user = await User.findOne(filter);
  if (user) {
    return {
      code: 200,
      record: user,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "user is not found",
    };
  }
};

exports.list = async (filter) => {
  let records = await User.find(filter).select("-password");
  return {
    code: 200,
    records,
    success: true,
  };
};

exports.create = async (form) => {
  let user = await this.isExist({ email: form.email });
  if (!user.success) {
    const newUser = new User(form);
    await newUser.save();
    return {
      success: true,
      code: 200,
      record: newUser,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "User already exists",
    };
  }
};

exports.update = async (id, form) => {
  await User.findByIdAndUpdate(id, form);
  let user = await this.isExist({ id });
  if (user.success) {
    return {
      code: 200,
      success: true,
      record: user,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "User doesn't exist",
    };
  }
};

exports.get = async (filter) => {
  if (filter) {
    let record = await User.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "User not found",
    };
  }
};

exports.remove = async (id) => {
  const user = await this.isExist({ _id: id });
  if (id && user.success) {
    await User.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "user doesn't exist",
    };
  }
};
