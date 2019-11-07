const envVariables = {
  // DB configurations
  DB_USER: process.env.DB_USER || "asoicxnxhmmerb",
  DB_PASSWORD:process.env.DB_PASSWORD || "c584a7f9377b63bc2a3de9502ec30719560d0833392d10a3058f63f7de0a87cf",
  DB_HOST: process.env.DB_HOST || "ec2-54-204-37-92.compute-1.amazonaws.com",
  DB_NAME: process.env.DB_NAME || "dc0u5g03c1srp8",
  DB_SSL: process.env.DB_SSL || true,
  DB_PORT: process.env.DB_PORT || 5432,
  DB_MAX_POOL_SIZE: process.env.DB_MAX_POOL_SIZE || "5",
  //server configurations
  SERVER_PORT: process.env.SERVER_PORT || "8080",
  PORT: 8080,
	BODY_LIMIT: "100kb",
	CROS_HEADERS: ["Link"]
};
export default envVariables;
