import fs from "fs";
import path from "path";
import DragScroller from "./components/DragScroller";

function listPublicImages() {
  try {
    const publicDir = path.join(process.cwd(), "public", "images");
    const entries = fs.readdirSync(publicDir, { withFileTypes: true });
    const exts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imgs = entries
      .filter((e) => e.isFile() && exts.includes(path.extname(e.name).toLowerCase()))
      .map((e) => `/images/${e.name}`);
    return imgs;
  } catch (err) {
    return [];
  }
}

export default function Home() {
  const images = listPublicImages();

  return (
    <div className="home-root">
      {/* DragScroller is a client component; pass images as prop */}
      <DragScroller images={images} />
    </div>
  );
}
