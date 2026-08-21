import { Project } from "./types";

// Helper to sanitize glob import keys across platforms and Vite query parameters
const cleanKey = (key: string) => {
  try {
    return decodeURIComponent(key.split("?")[0]);
  } catch {
    return key.split("?")[0];
  }
};

// 1. Full-resolution images
const imageModules = import.meta.glob([
  "../../../shared/assets/images/**/*.{jpg,jpeg,png,svg,webp,gif,JPG,PNG,JPEG,jfif,JFIF}",
  "../../../assets/images/**/*.{jpg,jpeg,png,svg,webp,gif,JPG,PNG,JPEG,jfif,JFIF}"
], {
  eager: true,
});

const imagePaths: { [key: string]: string } = {};
Object.entries(imageModules).forEach(([key, mod]) => {
  imagePaths[cleanKey(key)] = (mod as any).default || (mod as any);
});

// 2. Card preview thumbnail images (~400px width, WebP format, 80% quality)
const thumbnailModules = import.meta.glob([
  "../../../shared/assets/images/**/*.{jpg,jpeg,png,svg,webp,gif,JPG,PNG,JPEG,jfif,JFIF}",
  "../../../assets/images/**/*.{jpg,jpeg,png,svg,webp,gif,JPG,PNG,JPEG,jfif,JFIF}"
], {
  eager: true,
  query: {
    w: 400,
    format: "webp",
    q: 80,
  },
});

const thumbnailPaths: { [key: string]: string } = {};
Object.entries(thumbnailModules).forEach(([key, mod]) => {
  thumbnailPaths[cleanKey(key)] = (mod as any).default || (mod as any);
});

// 3. Lightbox bottom strip small thumbnail images (~120px width, WebP format, 75% quality)
const smallThumbnailModules = import.meta.glob([
  "../../../shared/assets/images/**/*.{jpg,jpeg,png,svg,webp,gif,JPG,PNG,JPEG,jfif,JFIF}",
  "../../../assets/images/**/*.{jpg,jpeg,png,svg,webp,gif,JPG,PNG,JPEG,jfif,JFIF}"
], {
  eager: true,
  query: {
    w: 120,
    format: "webp",
    q: 75,
  },
});

const smallThumbnailPaths: { [key: string]: string } = {};
Object.entries(smallThumbnailModules).forEach(([key, mod]) => {
  smallThumbnailPaths[cleanKey(key)] = (mod as any).default || (mod as any);
});

const getUnsplashResizedUrl = (url: string, width: number, quality: number) => {
  if (!url) return "";
  if (!url.includes("images.unsplash.com")) return url;
  let updated = url;
  if (/w=\d+/.test(updated)) {
    updated = updated.replace(/w=\d+/, `w=${width}`);
  } else {
    updated += `&w=${width}`;
  }
  if (/q=\d+/.test(updated)) {
    updated = updated.replace(/q=\d+/, `q=${quality}`);
  } else {
    updated += `&q=${quality}`;
  }
  return updated;
};

const FALLBACK_IMAGES: { [key: string]: { image: string; drawings: string[] } } = {
  "grazhdanskaya": {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "sosnovka": {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "mnogokv1": {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "mnogokv2": {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "mnogokv3": {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "kukmory": {
    image: "https://images.unsplash.com/photo-1518623001395-125242310d0c?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "tula": {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "podolsk": {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "autosalon": {
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "autoservice": {
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  "khvoyninsky": {
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000",
    drawings: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200"
    ]
  }
};

const getProjectImages = (folder: string) => {
  const sharedPrefix = `../../../shared/assets/images/${folder}/`;
  const assetsPrefix = `../../../assets/images/${folder}/`;
  
  // Find all images belonging to this subfolder in either location
  const folderImages = Object.keys(imagePaths).filter((path) =>
    path.startsWith(sharedPrefix) || path.startsWith(assetsPrefix)
  );

  if (folderImages.length > 0) {
    const isShared = folderImages[0].startsWith(sharedPrefix);
    const prefix = isShared ? sharedPrefix : assetsPrefix;

    const previewPath = folderImages.find((path) => {
      const filename = path.replace(prefix, "").toLowerCase();
      return filename.startsWith("preview.");
    }) || folderImages.find((path) => {
      const filename = path.replace(prefix, "").toLowerCase();
      return filename.includes("убойный") || filename.includes("генплан") || filename.includes("фасад");
    }) || folderImages[0];

    const previewUrl = previewPath ? imagePaths[previewPath] : "";
    const previewThumbnailUrl = previewPath ? (thumbnailPaths[previewPath] || previewUrl) : "";

    const otherImages = folderImages
      .filter((path) => path !== previewPath)
      .sort((a, b) => {
        const fileA = a.replace(prefix, "");
        const fileB = b.replace(prefix, "");
        return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: "base" });
      });

    const drawingUrls = otherImages.length > 0 
      ? otherImages.map((path) => imagePaths[path]) 
      : (previewUrl ? [previewUrl] : []);

    const drawingThumbnails = otherImages.length > 0 
      ? otherImages.map((path) => smallThumbnailPaths[path] || thumbnailPaths[path] || imagePaths[path]) 
      : (previewThumbnailUrl ? [previewThumbnailUrl] : []);

    return {
      image: previewUrl,
      thumbnail: previewThumbnailUrl,
      drawings: drawingUrls,
      drawingsThumbnails: drawingThumbnails,
    };
  }

  // Fallback to beautiful curated Unsplash layouts if no local folder images are found
  const fallback = FALLBACK_IMAGES[folder];
  if (fallback) {
    return {
      image: fallback.image,
      thumbnail: getUnsplashResizedUrl(fallback.image, 400, 75),
      drawings: fallback.drawings,
      drawingsThumbnails: fallback.drawings.map((url) => getUnsplashResizedUrl(url, 120, 60)),
    };
  }

  return {
    image: "",
    thumbnail: "",
    drawings: [],
    drawingsThumbnails: [],
  };
};

const INITIAL_PROJECTS = [
  {
    id: "g-survey",
    title: "2-этажное помещение под магазин.",
    subtitle: "Обмерные чертежи и проект фасада",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Обмерный чертеж / Фасады",
    folder: "grazhdanskaya",
    description: "Точный архитектурный обмер существующих конструкций здания и детальный проект облицовки фасадов. Основа для современных планировочных и реконструкционных решений.",
    specs: { scale: "1:100", area: "482 м²", format: "AutoCAD DWG", sheets: "9 листов", software: "AutoCAD LT" }
  },
  {
    id: "s-house",
    title: "Дом в Сосновке",
    subtitle: "Индивидуальный жилой дом",
    category: "residential",
    categoryLabel: "Индивидуальное жилье",
    type: "Эскизный проект / Рабочие чертежи",
    folder: "sosnovka",
    description: "Проект загородного коттеджа из натуральных материалов. Архитектура гармонирует со зрелым сосновым лесом, соединяя панорамное остекление, экологичный дизайн и современные планировки.",
    specs: { scale: "1:50", area: "245 м²", format: "Revit RVT / DWG", sheets: "30 листов", software: "Autodesk Revit" }
  },
  {
    id: "m-house-1",
    title: "Многоквартирный жилой дом",
    subtitle: "Эскизный проект и планировочные решения",
    category: "residential",
    categoryLabel: "Жилые объекты",
    type: "Эскизный проект",
    folder: "mnogokv1",
    description: "Архитектурная концепция многоквартирного дома с продуманной квартирографией и развитой придомовой территорией. Комплекс содержит детальные планировочные чертежи.",
    specs: { scale: "1:150", area: "3,420 м²", format: "Revit RVT", sheets: "24 листа", software: "Autodesk Revit" }
  },
  {
    id: "m-house-2",
    title: "Многоквартирный жилой дом",
    subtitle: "Планировочные решения и экспликации",
    category: "residential",
    categoryLabel: "Жилые объекты",
    type: "Чертеж планировки",
    folder: "mnogokv2",
    description: "Развернутое архитектурное проектирование многоэтажного жилого дома. Поэтажные чертежи планировок, подробная экспликация зон и инженерные шахты.",
    specs: { scale: "1:200", area: "5,800 м²", format: "Revit RVT / DWG", sheets: "47 листов", software: "Autodesk Revit" }
  },
  {
    id: "m-house-3",
    title: "Многоквартирный жилой дом",
    subtitle: "Архитектурная концепция и планы секций",
    category: "residential",
    categoryLabel: "Жилые объекты",
    type: "Архитектурный концепт",
    folder: "mnogokv3",
    description: "Концептуальные эскизные и рабочие материалы многоквартирного жилого комплекса с подземной парковкой, кладовыми, фасадными решениями и разрезами.",
    specs: { scale: "1:200", area: "7,200 м²", format: "Revit RVT", sheets: "38 листов", software: "Autodesk Revit" }
  },
  {
    id: "industry-slaughterhouse-1",
    title: "Мясоперерабатывающий цех",
    subtitle: "Цех убоя и первичной переработке скота",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Рабочий проект / Технология",
    folder: "kukmory",
    description: "Рабочая документация технологических решений и планировки цеха убоя. Включает детальные эскизные разрезы, генеральный план участка и спецификации оборудования.",
    specs: { scale: "1:100", area: "1,250 м²", format: "PDF / DWG", sheets: "28 листов", software: "AutoCAD / SketchUp" }
  },
  {
    id: "industry-prod-complex",
    title: "Производственный комплекс",
    subtitle: "Производственно-складской корпус со встроенной АБК",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Проектная документация (Стадия П)",
    folder: "tula",
    description: "Полный комплект проектных планов и схем. Разработана схема планировочной организации земельного участка (генплан), поэтажные чертежи, сечения и визуализация фасадов.",
    specs: { scale: "1:200", area: "4,100 м²", format: "AutoCAD DWG", sheets: "35 листов", software: "AutoCAD" }
  },
  {
    id: "industry-warehouse-complex",
    title: "Складской комплекс",
    subtitle: "Логистический центр со складскими корпусами",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Архитектурно-строительные решения (АР/КР)",
    folder: "podolsk",
    description: "Проект крупного логистического склада высокого стеллажного хранения. Рабочая документация фундаментов, металлоконструкций и технологическая привязка.",
    specs: { scale: "1:250", area: "8,650 м²", format: "AutoCAD / PDF", sheets: "54 листа", software: "AutoCAD / Advance Steel" }
  },
  {
    id: "industry-slaughterhouse-2",
    title: "Цех убоя и переработки",
    subtitle: "Проект инженерных сетей и технологии ТХ",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Рабочая документация ТХ",
    folder: "khvoyninsky",
    description: "Технологические решения и планировка производственного цеха переработки. Генеральный план территории предприятия, трассировка внутренних сетей и спецификации.",
    specs: { scale: "1:150", area: "2,300 м²", format: "AutoCAD DWG", sheets: "30 листов", software: "AutoCAD" }
  },
  {
    id: "commercial-showroom",
    title: "Автосалон премиум-класса",
    subtitle: "Эскизный проект и планировочные решения",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Эскизный проект / Визуализация",
    folder: "autosalon",
    description: "Современный дилерский центр премиум-сегмента с выставочным залом, сервисными зонами и административным блоком. Стильный фасад из стекла и прочных металлоконструкций.",
    specs: { scale: "1:200", area: "1,850 м²", format: "AutoCAD / SketchUp", sheets: "15 листов", software: "AutoCAD / 3ds Max" }
  },
  {
    id: "commercial-autoservice",
    title: "Автосервисный комплекс",
    subtitle: "Рабочие чертежи и технологические решения",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Рабочий проект / Технология",
    folder: "autoservice",
    description: "Проект качественного многопостового автосервиса с постами ТО, шиномонтажа и диагностики. Полный комплект рабочих чертежей технологии ТХ и планировок.",
    specs: { scale: "1:100", area: "920 м²", format: "AutoCAD DWG", sheets: "12 листов", software: "AutoCAD" }
  }
];

export const ALL_PROJECTS: Project[] = INITIAL_PROJECTS.map((project) => {
  const images = getProjectImages(project.folder);
  return {
    ...project,
    image: images.image,
    thumbnail: images.thumbnail,
    drawings: images.drawings,
    drawingsThumbnails: images.drawingsThumbnails,
  };
});
