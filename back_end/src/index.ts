import app from "./config/app.js";
import "./config/dotenvConfig.js";

const port = +process.env.PORT || 5000;

console.log(+process.env.PORT);
console.log(+process.env.JWT_TOKEN);

app.listen(port, () => {
    console.log(`Server up and listening on port ${port}`);
});
