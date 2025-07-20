const authrole = async (req, res, next) => {
  try {
    // Log role for debugging
    console.log("User Role:", req.user.role);

    // Check if the user is not an admin
    if (req.user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // Allow access
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in admin auth middleware",
      error: error.message,
    });
  }
};

export default authrole;
