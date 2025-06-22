import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const router = express.Router();

// ✅ Path to store temporary code files
const CODE_DIR = path.resolve("C:/Users/gauri/Documents/master-project/Codeexe/code_storage");

// ✅ Ensure the directory exists
if (!fs.existsSync(CODE_DIR)) {
  fs.mkdirSync(CODE_DIR, { recursive: true });
}

// ✅ POST endpoint to run submitted code
router.post("/run", async (req, res) => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const extensions = {
    python: "py",
    cpp: "cpp",
    javascript: "js",
    c: "c",
    java: "java",
  };

  if (!extensions[language]) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  const uniqueId = Date.now();
  const filename = `code_${uniqueId}.${extensions[language]}`;
  const filepath = path.join(CODE_DIR, filename);

  try {
    fs.writeFileSync(filepath, code);
  } catch (err) {
    console.error("Error writing file:", err);
    return res.status(500).json({ error: "Failed to write code to file" });
  }

  // ✅ Handle input
  const inputFilename = `input_${uniqueId}.txt`;
  const inputPath = path.join(CODE_DIR, inputFilename);
  if (input?.trim()) {
    try {
      fs.writeFileSync(inputPath, input, "utf-8");
    } catch (err) {
      console.error("Error writing input file:", err);
      return res.status(500).json({ error: "Failed to write input to file" });
    }
  }

  let dockerCmd = "";

  // ✅ Docker command setup
  switch (language) {
    case "python":
      dockerCmd = input
        ? `docker run --rm -v "${CODE_DIR}:/code" python:3.9 bash -c "python /code/${filename} < /code/${inputFilename}"`
        : `docker run --rm -v "${CODE_DIR}:/code" python:3.9 python /code/${filename}`;
      break;

    case "cpp":
      dockerCmd = input
        ? `docker run --rm -v "${CODE_DIR}:/code" gcc:latest bash -c "g++ /code/${filename} -o /code/a.out && /code/a.out < /code/${inputFilename}"`
        : `docker run --rm -v "${CODE_DIR}:/code" gcc:latest bash -c "g++ /code/${filename} -o /code/a.out && /code/a.out"`;
      break;

    case "c":
      dockerCmd = input
        ? `docker run --rm -v "${CODE_DIR}:/code" gcc:latest bash -c "gcc /code/${filename} -o /code/a.out && /code/a.out < /code/${inputFilename}"`
        : `docker run --rm -v "${CODE_DIR}:/code" gcc:latest bash -c "gcc /code/${filename} -o /code/a.out && /code/a.out"`;
      break;

    case "javascript":
      dockerCmd = input
        ? `docker run --rm -v "${CODE_DIR}:/code" node:latest bash -c "node /code/${filename} < /code/${inputFilename}"`
        : `docker run --rm -v "${CODE_DIR}:/code" node:latest node /code/${filename}`;
      break;

    case "java":
      dockerCmd = input
        ? `docker run --rm -v "${CODE_DIR}:/code" openjdk:17 bash -c "javac /code/${filename} && java -cp /code Main < /code/${inputFilename}"`
        : `docker run --rm -v "${CODE_DIR}:/code" openjdk:17 bash -c "javac /code/${filename} && java -cp /code Main"`;
      break;
  }

  console.log("🔧 Docker command:", dockerCmd);

  exec(dockerCmd, (err, stdout, stderr) => {
    // 🧹 Clean up files
    try {
      fs.unlinkSync(filepath);
      if (input?.trim()) fs.unlinkSync(inputPath);
    } catch (cleanupErr) {
      console.warn("⚠️ Failed to delete temp files:", cleanupErr);
    }

    if (err) {
      console.error("❌ Execution error:", err);
      return res.status(500).json({ error: stderr || err.message });
    }

    return res.status(200).json({ output: stdout });
  });
});

export default router;
