import { Project } from "./types";

// Helper to sanitize glob import keys across platforms and URL encodings
const cleanKey = (key: string) => {
  try {
    return decodeURIComponent(key.split("?")[0]);
  } catch {
    return key.split("?")[0];
  }
};

// 1. Full-resolution images
const imageModules = import.meta.glob(
  "../../../assets/images/**/*.{jpg,jpeg,png,svg,webp,gif,JPG,PNG,JPEG,jfif,JFIF}",
  { eager: true }
);

const imagePaths: { [key: string]: string } = {};
Object.entries(imageModules).forEach(([key, mod]) => {
  imagePaths[cleanKey(key)] = (mod as any).default || (mod as any);
});

// Helper to match images for a given folder name (case-insensitive)
const getProjectImages = (folder: string) => {
  const normalizedTarget = folder.toLowerCase();
  
  // Find all keys that belong to this folder
  const matchingKeys = Object.keys(imagePaths).filter((path) => {
    const normalizedPath = path.toLowerCase().replace(/\\/g, "/");
    return (
      normalizedPath.includes(`/assets/images/${normalizedTarget}/`) ||
      normalizedPath.includes(`/${normalizedTarget}/`)
    );
  });

  if (matchingKeys.length === 0) {
    return {
      image: "",
      thumbnail: "",
      drawings: [],
      drawingsThumbnails: [],
    };
  }

  // Sort keys naturally (e.g. 1.jpg, 2.jpg ... 11.jpg)
  const sortedKeys = [...matchingKeys].sort((a, b) => {
    const fileA = a.split("/").pop() || "";
    const fileB = b.split("/").pop() || "";
    return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: "base" });
  });

  // 1. Search for preview file (starts with "preview.")
  let previewKey = sortedKeys.find((k) => {
    const filename = (k.split("/").pop() || "").toLowerCase();
    return filename.startsWith("preview.");
  });

  // 2. If no preview.* found, find 1.jpg / 1_page / 1.* or pick first
  if (!previewKey) {
    previewKey = sortedKeys.find((k) => {
      const filename = (k.split("/").pop() || "").toLowerCase();
      return (
        filename === "1.jpg" ||
        filename === "1.jpeg" ||
        filename === "1.png" ||
        filename.startsWith("1_") ||
        filename.startsWith("1.")
      );
    }) || sortedKeys[0];
  }

  const previewUrl = previewKey ? imagePaths[previewKey] : "";

  // Drawings list: all sheets in order
  // If preview is a standalone cover and there are other numbered sheets, put all sheets in drawings
  const drawingUrls = sortedKeys.map((k) => imagePaths[k]);

  return {
    image: previewUrl,
    thumbnail: previewUrl,
    drawings: drawingUrls.length > 0 ? drawingUrls : (previewUrl ? [previewUrl] : []),
    drawingsThumbnails: drawingUrls.length > 0 ? drawingUrls : (previewUrl ? [previewUrl] : []),
  };
};

const INITIAL_PROJECTS = [
  {
    id: "church-complex",
    title: "Храмовый комплекс",
    subtitle: "Индивидуальный архитектурно-строительный проект",
    category: "religious_public",
    categoryLabel: "Культовые и общественные здания",
    type: "Архитектурный проект (АР)",
    folder: "церквь",
    description: "Индивидуальный проект православного храма с традиционными сводчатыми конструкциями, колокольней, алтарной частью, трапезной и комплексом приходских помещений.",
    specs: { scale: "1:100", area: "680 м²", format: "AutoCAD / PDF", sheets: "9 листов", software: "AutoCAD / Revit" }
  },
  {
    id: "commercial-showroom",
    title: "Автосалон",
    subtitle: "Эскизный проект и планировочные решения",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Эскизный проект / Визуализация",
    folder: "автосалон",
    description: "Современный дилерский центр с просторным выставочным залом (шоурумом), зонами клиентского сервиса, административным блоком и витражным остеклением фасада.",
    specs: { scale: "1:200", area: "1,850 м²", format: "AutoCAD / SketchUp", sheets: "5 листов", software: "AutoCAD / 3ds Max" }
  },
  {
    id: "commercial-autoservice",
    title: "Автосервисный комплекс",
    subtitle: "Рабочие чертежи и технологические решения",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Рабочий проект / Технология",
    folder: "автосервис",
    description: "Проект многопостового автосервиса с постами ТО, шиномонтажа, стендом сход-развала и диагностической линией. Полный комплект технологии ТХ и планировок.",
    specs: { scale: "1:100", area: "920 м²", format: "AutoCAD DWG", sheets: "5 листов", software: "AutoCAD" }
  },
  {
    id: "industry-prod-complex",
    title: "Производственный комплекс",
    subtitle: "Производственно-складской корпус с АБК (г. Тула)",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Проектная документация (Стадия П)",
    folder: "Тула",
    description: "Комплект проектных планов и схем производственно-складского здания. Схема планировочной организации земельного участка (генплан), поэтажные планы, разрезы и фасады.",
    specs: { scale: "1:200", area: "4,100 м²", format: "AutoCAD DWG", sheets: "6 листов", software: "AutoCAD" }
  },
  {
    id: "industry-warehouse-complex",
    title: "Складской комплекс",
    subtitle: "Логистический центр со складскими корпусами (г. Подольск)",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Архитектурно-строительные решения (АР/КР)",
    folder: "подольск",
    description: "Проект крупного логистического склада высокого стеллажного хранения. Рабочая документация конструкций, технологическая привязка и планировочные схемы.",
    specs: { scale: "1:250", area: "8,650 м²", format: "AutoCAD / PDF", sheets: "9 листов", software: "AutoCAD / Advance Steel" }
  },
  {
    id: "industry-slaughterhouse-1",
    title: "Мясоперерабатывающий цех",
    subtitle: "Цех убоя и первичной переработки скота (Кукмор)",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Рабочий проект / Технология",
    folder: "кукморы",
    description: "Рабочая документация технологических решений и планировки цеха убоя. Включает детальные эскизные разрезы, генеральный план участка и спецификации оборудования.",
    specs: { scale: "1:100", area: "1,250 м²", format: "PDF / DWG", sheets: "7 листов", software: "AutoCAD" }
  },
  {
    id: "industry-slaughterhouse-2",
    title: "Цех убоя и переработки",
    subtitle: "Проект инженерных сетей и технологии ТХ (п. Хвойнинский)",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Рабочая документация ТХ",
    folder: "хвойнинский",
    description: "Технологические решения и планировка производственного цеха переработки. Генеральный план предприятия, трассировка внутренних технологических потоков и спецификации.",
    specs: { scale: "1:150", area: "2,300 м²", format: "AutoCAD DWG", sheets: "7 листов", software: "AutoCAD" }
  },
  {
    id: "g-survey",
    title: "2-этажное помещение под магазин",
    subtitle: "Обмерные чертежи и проект фасада (ул. Гражданская)",
    category: "commercial",
    categoryLabel: "Коммерческая недвижимость",
    type: "Обмерный чертеж / Фасады",
    folder: "гражданская",
    description: "Точный архитектурный обмер существующих конструкций здания и детальный проект облицовки фасадов. Основа для современных планировочных решений.",
    specs: { scale: "1:100", area: "482 м²", format: "AutoCAD DWG", sheets: "2 листа", software: "AutoCAD LT" }
  },
  {
    id: "s-house",
    title: "Дом в Сосновке",
    subtitle: "Индивидуальный жилой дом",
    category: "residential_private",
    categoryLabel: "Индивидуальное жилье",
    type: "Эскизный проект / Планы",
    folder: "сосновка",
    description: "Проект загородного коттеджа из натуральных материалов. Архитектура гармонирует со зрелым сосновым лесом, панорамным остеклением и удобной планировкой.",
    specs: { scale: "1:50", area: "245 м²", format: "Revit RVT / DWG", sheets: "2 листа", software: "Autodesk Revit" }
  },
  {
    id: "m-house-1",
    title: "Многоквартирный жилой дом №1",
    subtitle: "Эскизный проект и планировочные решения",
    category: "residential_multi",
    categoryLabel: "Жилые объекты",
    type: "Эскизный проект",
    folder: "многокв1",
    description: "Архитектурная концепция многоквартирного дома с продуманной квартирографией и развитой придомовой территорией. Комплект поэтажных планировок и фасадов.",
    specs: { scale: "1:150", area: "3,420 м²", format: "Revit RVT", sheets: "8 листов", software: "Autodesk Revit" }
  },
  {
    id: "m-house-2",
    title: "Многоквартирный жилой дом №2",
    subtitle: "Планировочные решения и экспликации",
    category: "residential_multi",
    categoryLabel: "Жилые объекты",
    type: "Чертеж планировки",
    folder: "многокв2",
    description: "Развернутое архитектурное проектирование многоэтажного жилого дома. Поэтажные чертежи секций, подробная экспликация зон и расположение инженерных шахт.",
    specs: { scale: "1:200", area: "5,800 м²", format: "Revit RVT / DWG", sheets: "3 листа", software: "Autodesk Revit" }
  },
  {
    id: "m-house-3",
    title: "Многоквартирный жилой дом №3",
    subtitle: "Архитектурная концепция и планы секций",
    category: "residential_multi",
    categoryLabel: "Жилые объекты",
    type: "Архитектурный концепт",
    folder: "многокв3",
    description: "Концептуальные эскизные материалы многоквартирного жилого дома с подземным уровнем, кладовыми, фасадными решениями и разрезами.",
    specs: { scale: "1:200", area: "7,200 м²", format: "Revit RVT", sheets: "3 листа", software: "Autodesk Revit" }
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

