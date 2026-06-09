import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT} in ${env.NODE_ENV} mode`);
});
