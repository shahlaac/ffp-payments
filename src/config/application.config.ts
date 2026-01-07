import { registerAs } from "@nestjs/config";

export default registerAs('application', () => ({
   name: "ADB",
   projectId: "sharp-sled-281514",
   keyFilename: "./serviceAccountKey.json",
   storageBucket: "v3_dev",
}));