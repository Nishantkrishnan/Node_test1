const envVariables = {
  // DB configurations
  DB_USER: process.env.DB_USER || "rvlktqmnyjkvml",
  DB_PASSWORD:process.env.DB_PASSWORD || "6f1a3f53682e2b3de0be4fc45c71faa7343f207f4cc25d2f13998f13990f1b89",
  DB_HOST: process.env.DB_HOST || "ec2-174-129-253-180.compute-1.amazonaws.com",
  DB_NAME: process.env.DB_NAME || "d6nu8ge7ppk98e",
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
