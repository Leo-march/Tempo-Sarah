// app/page.tsx - Versão com debug
import fs from "fs";
import path from "path";
import DragScroller from "./components/DragScroller";

function listPublicImages() {
  try {
    const publicDir = path.join(process.cwd(), "public", "images");
    console.log("🔍 Procurando imagens em:", publicDir);
    
    const entries = fs.readdirSync(publicDir, { withFileTypes: true });
    console.log("📁 Arquivos encontrados:", entries.map(e => e.name));
    
    const exts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imgs = entries
      .filter((e) => e.isFile() && exts.includes(path.extname(e.name).toLowerCase()))
      .map((e) => `/images/${encodeURIComponent(e.name)}`);
    
    console.log("✅ Imagens válidas:", imgs);
    return imgs;
  } catch (err) {
    console.error("❌ Erro ao ler imagens:", err);
    return [];
  }
}

export default function Home() {
  const images = listPublicImages();
  
  console.log("🖼️ Total de imagens:", images.length);

  return (
    <div className="home-root">
      <DragScroller images={images} />
    </div>
  );
}