import React, { useState, useEffect } from 'react';
import { Utensils, Clock, DollarSign, Plus, Trash2, MapPin, Heart, ArrowLeft, RefreshCw, Coffee, Sparkles, Search, Link as LinkIcon, Frown, RotateCcw, Copy, ExternalLink, Wine, AlertCircle } from 'lucide-react';

// --- 预设数据库 (包含您提供的所有餐厅) ---
const INITIAL_DATA = [
  // 西餐 / Brunch
  { id: 101, name: "Alfie’s Sandwiches", closeTime: "21:00", price: "$$", category: "西餐", cuisine: "Brunch/三明治", link: "https://www.xiaohongshu.com/discovery/item/...", notes: "开心果碎+truffle cream意式三明治，料很多" },
  { id: 104, name: "Buca Osteria & Bar", closeTime: "22:00", price: "$$$", category: "西餐", cuisine: "意大利菜", link: "https://www.xiaohongshu.com/discovery/item/68ed2bcc0000000004014a94", notes: "比卡戴珊人生还丰富的提拉米苏，龙虾意面" },
  { id: 106, name: "Eloise", closeTime: "22:00", price: "$$$", category: "西餐", cuisine: "法式/欧陆", link: "https://www.xiaohongshu.com/discovery/item/68dd30e900000000040137d9", notes: "漂亮饭，Oyster很惊艳，牛排满分" },
  { id: 108, name: "Quetzal", closeTime: "23:00", price: "$$$$", category: "西餐", cuisine: "墨西哥菜", link: "https://www.xiaohongshu.com/discovery/item/682b9c14000000000f0329dc", notes: "米其林一星，烟火气十足，开放式厨房" },
  { id: 110, name: "Osteria Mattarello", closeTime: "22:00", price: "$$", category: "西餐", cuisine: "意大利菜", link: "https://www.xiaohongshu.com/discovery/item/68d9ffb000000000130168c7", notes: "北边宝藏意面，黑松露披萨" },
  { id: 112, name: "Union", closeTime: "23:00", price: "$$", category: "甜品", cuisine: "Brunch", link: "https://www.xiaohongshu.com/discovery/item/68a2951d000000001d014c51", notes: "土豆丝芝士火腿三明治香晕，Burger爆汁" },
  { id: 113, name: "Le Paradis", closeTime: "22:00", price: "$$", category: "西餐", cuisine: "法餐", link: "https://www.xiaohongshu.com/discovery/item/669d9bed0000000025002791", notes: "老牌法餐，最好吃的油封鸭腿" },
  { id: 119, name: "White Lily Diner", closeTime: "15:00", price: "$$", category: "甜品", cuisine: "Brunch", link: "https://www.xiaohongshu.com/discovery/item/688f88c3000000000400489e", notes: "Steak n Eggs, 炸薯饼一绝" },
  { id: 122, name: "Cote de Boeuf", closeTime: "23:00", price: "$$$", category: "西餐", cuisine: "法餐", link: "https://www.xiaohongshu.com/discovery/item/688e839a00000000230230e2", notes: "超隐蔽法餐，干式熟成牛排，土豆千层" },
  { id: 127, name: "Donna’s", closeTime: "22:00", price: "$$$", category: "西餐", cuisine: "简餐/Bistro", link: "https://www.xiaohongshu.com/discovery/item/67451a3f000000000703b2bf", notes: "漂亮饭，环境像时髦跳蚤市场，本地精酿" },
  
  // 中餐 / 亚洲菜
  { id: 102, name: "东北人家铁锅炖", closeTime: "00:00", price: "$$", category: "中餐", cuisine: "东北菜", link: "", notes: "小鸡炖蘑菇，量大实惠，人均20+" },
  { id: 103, name: "Koh Lipe Thai", closeTime: "22:00", price: "$$", category: "中餐", cuisine: "泰国菜", link: "https://www.xiaohongshu.com/discovery/item/6906375f0000000004020625", notes: "冬阴功火山排骨，必比登推荐" },
  { id: 109, name: "The Lunch Lady", closeTime: "22:00", price: "$$", category: "中餐", cuisine: "越南菜", link: "https://www.xiaohongshu.com/discovery/item/68d08d1c000000000b03c1e4", notes: "Ossington流量王，虾饼好吃，牛排饭" },
  { id: 114, name: "Qin‘s Garden", closeTime: "21:30", price: "$$", category: "中餐", cuisine: "江浙沪", link: "https://www.xiaohongshu.com/discovery/item/68ab0e95000000001d008ba4", notes: "蟹粉小笼，无锡排骨，老字号" },
  { id: 116, name: "Agak Agak", closeTime: "21:00", price: "$$", category: "中餐", cuisine: "东南亚菜", link: "https://www.xiaohongshu.com/discovery/item/68a264e0000000001b0301e2", notes: "新加坡菜，海南鸡饭，一周只开三天" },
  { id: 123, name: "Muay Thai Bar", closeTime: "00:00", price: "$$", category: "中餐", cuisine: "泰国菜", link: "https://www.xiaohongshu.com/discovery/item/68883a380000000003026181", notes: "这里的牛排比西餐厅好吃，炒河粉" },
  { id: 125, name: "Wang Lang", closeTime: "22:00", price: "$$", category: "中餐", cuisine: "泰国菜", link: "https://www.xiaohongshu.com/discovery/item/687819590000000012016137", notes: "芒果糯米饭之王，紫薯冰淇淋" },
  { id: 128, name: "Mikaku Udon Bar", closeTime: "22:00", price: "$$", category: "中餐", cuisine: "日韩料理", link: "https://www.xiaohongshu.com/discovery/item/68b3af6b000000001d00591b", notes: "韩式乌冬No.1，海鲜辣奶油乌冬" },
  { id: 129, name: "皇后臻品", closeTime: "21:00", price: "$$", category: "中餐", cuisine: "粤菜/早茶", link: "https://www.xiaohongshu.com/discovery/item/68b763e0000000001d01b0ef", notes: "周末早茶，黑松露鹌鹑蛋烧卖" },
  { id: 130, name: "顺德干蒸排骨", closeTime: "21:00", price: "$$$", category: "中餐", cuisine: "粤菜/顺德菜", link: "https://www.xiaohongshu.com/discovery/item/689bdf63000000001c00407e", notes: "干蒸排骨，除了贵没毛病" },

  // 甜品 / Cafe / Bar
  { id: 105, name: "Mola Cafe", closeTime: "19:00", price: "$", category: "甜品", cuisine: "Cafe", link: "https://www.xiaohongshu.com/discovery/item/68cf59e8000000000b03f502", notes: "香蕉抹茶拿铁，环境温馨" },
  { id: 107, name: "Forno Cultura", closeTime: "18:00", price: "$", category: "甜品", cuisine: "Cafe", link: "https://www.xiaohongshu.com/discovery/item/68e7012f00000000050310a1", notes: "屋顶视野绝美，适合发呆" },
  { id: 111, name: "Budapest Bakery", closeTime: "20:00", price: "$", category: "甜品", cuisine: "烘焙", link: "https://www.xiaohongshu.com/discovery/item/689bbfa1000000001d01a111", notes: "大瀑布必吃烟囱面包" },
  { id: 115, name: "White Noise", closeTime: "02:00", price: "$$", category: "甜品", cuisine: "Bar/酒馆", link: "https://www.xiaohongshu.com/discovery/item/68b336f6000000001b021172", notes: "藏在冰淇淋店后的Speakeasy，苦瓜特调" },
  { id: 117, name: "Three Dots Coffee", closeTime: "18:00", price: "$$", category: "甜品", cuisine: "Cafe", link: "https://www.xiaohongshu.com/discovery/item/689e51d3000000001c00c557", notes: "爆米花特调拿铁" },
  { id: 118, name: "Tutto Belle Gelato", closeTime: "22:00", price: "$", category: "甜品", cuisine: "Gelato", link: "https://www.xiaohongshu.com/discovery/item/689982d400000000230232bf", notes: "玉米蛋挞口味很特别" },
  { id: 120, name: "Good Gang Ice Cream", closeTime: "22:00", price: "$", category: "甜品", cuisine: "Ice Cream", link: "https://www.xiaohongshu.com/discovery/item/6890004200000000030245c6", notes: "口感绵密，Toast口味推荐" },
  { id: 121, name: "Kati", closeTime: "22:00", price: "$", category: "甜品", cuisine: "Gelato", link: "https://www.xiaohongshu.com/discovery/item/688c0e7e000000002501c2c2", notes: "泰式口味Gelato，斑斓椰子" },
  { id: 124, name: "Vava Designer Cake", closeTime: "20:00", price: "$$", category: "甜品", cuisine: "甜点", link: "https://www.xiaohongshu.com/discovery/item/6876d842000000001703002d", notes: "芒果糯米饭杯，颜值高" },
  { id: 126, name: "Cong Caphe", closeTime: "22:00", price: "$", category: "甜品", cuisine: "Cafe", link: "https://www.xiaohongshu.com/discovery/item/6876dbf50000000010010f9e", notes: "椰子糯米冰，越南咖啡" },
  { id: 131, name: "Matcha Haus", closeTime: "21:00", price: "$", category: "甜品", cuisine: "甜点", link: "https://www.xiaohongshu.com/discovery/item/68990fb90000000025010e37", notes: "长崎抹茶店，斑斓椰子水" },
  { id: 132, name: "Archi Element", closeTime: "20:00", price: "$", category: "甜品", cuisine: "Cafe", link: "https://www.xiaohongshu.com/discovery/item/68718e880000000020018450", notes: "必打卡茶馆，荔枝茉莉" },
  { id: 133, name: "Misc Coffee", closeTime: "18:00", price: "$", category: "甜品", cuisine: "Cafe", link: "https://www.xiaohongshu.com/discovery/item/68b46062000000001c00c9b6", notes: "斑斓拿铁，环境calm" },
  { id: 134, name: "PowPow Gelato", closeTime: "21:00", price: "$", category: "甜品", cuisine: "Gelato", link: "https://www.xiaohongshu.com/discovery/item/68bdf534000000001b03c605", notes: "黑芝麻口味无敌，地球Gelato" },
  { id: 135, name: "Mochi Mochi", closeTime: "20:00", price: "$", category: "甜品", cuisine: "甜点", link: "https://www.xiaohongshu.com/discovery/item/68b4704b000000001b03686c", notes: "麻薯曲奇，Kinako brown butter" },
];

export default function App() {
  const [restaurants, setRestaurants] = useState(() => {
    try {
      const saved = localStorage.getItem('dateNightRestaurants_v5');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      return INITIAL_DATA;
    }
  });

  const [view, setView] = useState('home'); 
  const [wizardStep, setWizardStep] = useState(0); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [seenIds, setSeenIds] = useState([]);
  const [manageTab, setManageTab] = useState('main'); 
  const [importText, setImportText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [importCandidates, setImportCandidates] = useState([]); 
  
  const [newRepo, setNewRepo] = useState({
    name: '', closeTime: '', price: '', category: '中餐', cuisine: '', notes: '', link: ''
  });

  useEffect(() => {
    localStorage.setItem('dateNightRestaurants_v5', JSON.stringify(restaurants));
  }, [restaurants]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => alert("链接已复制！"));
  };

  const checkDuplicate = (name) => restaurants.some(r => r.name.toLowerCase() === name.toLowerCase());

  const getAvailableCuisines = () => {
    const filtered = restaurants.filter(r => r.category === selectedCategory);
    return [...new Set(filtered.map(r => r.cuisine))];
  };

  const spinTheWheel = (categoryFilter, cuisineFilter = null) => {
    let pool = restaurants.filter(r => r.category === categoryFilter);
    if (cuisineFilter) pool = pool.filter(r => r.cuisine === cuisineFilter);
    const unseenPool = pool.filter(r => !seenIds.includes(r.id));

    if (unseenPool.length === 0) {
      if (pool.length === 0) {
         alert("这个分类下还没有餐厅哦，快去添加几个！");
         return;
      }
      setSelectedResult(null); 
      setView('result'); 
      return;
    }
    const randomPick = unseenPool[Math.floor(Math.random() * unseenPool.length)];
    setSeenIds([...seenIds, randomPick.id]);
    setSelectedResult(randomPick);
    setView('result');
  };

  const resetSeenHistory = () => {
    setSeenIds([]);
    const nextCuisine = (selectedCategory !== '其他' && wizardStep === 1 && selectedResult) ? selectedResult.cuisine : null;
    spinTheWheel(selectedCategory, nextCuisine);
  };

  // --- 智能识别逻辑 ---
  const handleSmartAnalyze = () => {
    if (!importText) return;
    setIsAnalyzing(true);
    setImportCandidates([]);

    setTimeout(() => {
      const candidates = [];
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const allUrls = importText.match(urlRegex) || [];
      const globalLink = allUrls.length > 0 ? allUrls[0] : '';

      let chunks = [];
      if ((importText.match(/📍/g) || []).length > 1) {
         chunks = importText.split('📍').filter(c => c.trim().length > 10).map(c => '📍' + c);
      } else if ((importText.match(/【.*?】/g) || []).length > 1) {
         chunks = importText.split(/(?=【.*?】)/).filter(c => c.trim().length > 10);
      } else {
         chunks = [importText];
      }

      chunks.forEach((chunk, index) => {
         const chunkLines = chunk.split('\n').filter(l => l.trim() !== '');
         let dName = '';
         let dCategory = '中餐';
         let dCuisine = '';
         let dPrice = '';
         let dLink = '';

         if (chunk.includes('📍')) {
            const locLine = chunkLines.find(l => l.includes('📍'));
            if (locLine) dName = locLine.replace('📍', '').split(/[，,]/)[0].trim();
         }
         if (!dName) {
            const bracketMatch = chunk.match(/【(.*?)】/);
            if (bracketMatch) dName = bracketMatch[1];
         }
         if (!dName) dName = chunkLines[0].substring(0, 15);
         dName = dName.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s'&]/g, '').trim();

         const chunkLinkMatch = chunk.match(urlRegex);
         dLink = chunkLinkMatch ? chunkLinkMatch[0] : (index === 0 ? globalLink : '');

         const textLower = chunk.toLowerCase();
         const westernKeywords = ['意式', 'italian', 'pasta', 'pizza', 'burger', 'steak', 'bistro', 'french', '法式', 'mexican'];
         const dessertKeywords = ['cake', 'coffee', 'cafe', 'tea', 'gelato', 'ice cream', 'bakery', '甜品', '蛋糕', '糖水'];
         const barKeywords = ['bar', 'cocktail', 'wine', 'beer', 'pub', '酒', 'speakeasy', 'gin', 'whisky'];
         const brunchKeywords = ['brunch', 'benedict', 'pancake', '早午餐', 'egg', 'toast', 'scramble'];
         
         const dongbei = ['东北', '铁锅炖', '锅包肉'];
         const thai = ['thai', '泰式', '冬阴功'];

         if (brunchKeywords.some(k => textLower.includes(k))) {
            dCategory = '甜品'; 
            dCuisine = 'Brunch'; 
         } else if (barKeywords.some(k => textLower.includes(k))) {
            dCategory = '甜品'; 
            dCuisine = 'Bar/酒馆';
         } else if (westernKeywords.some(k => textLower.includes(k))) {
            dCategory = '西餐';
            if (textLower.includes('french')) dCuisine = '法餐';
            else if (textLower.includes('italian')) dCuisine = '意大利菜';
            else dCuisine = '西式简餐';
         } else if (dessertKeywords.some(k => textLower.includes(k))) {
            dCategory = '甜品';
            if (textLower.includes('gelato')) dCuisine = 'Gelato';
            else if (textLower.includes('cafe')) dCuisine = 'Cafe';
            else dCuisine = '甜点饮品';
         } else {
             dCategory = '中餐';
             if (dongbei.some(k => textLower.includes(k))) dCuisine = '东北菜';
             else if (thai.some(k => textLower.includes(k))) dCuisine = '泰国菜';
             else dCuisine = '中式菜肴';
         }

         if (textLower.match(/\$ ?\d{2,}/) || textLower.includes('fine dining')) dPrice = '$$$';
         else if (textLower.includes('人均') && textLower.match(/\d{2}/)) {
             const p = parseInt(textLower.match(/(\d{2})/)[0]);
             dPrice = p > 50 ? '$$$' : (p > 20 ? '$$' : '$');
         }

         candidates.push({
            name: dName, category: dCategory, cuisine: dCuisine, price: dPrice, closeTime: '', link: dLink,
            notes: chunk.substring(0, 50).replace(/\n/g, ' ') + '...',
            isDuplicate: checkDuplicate(dName)
         });
      });

      setImportCandidates(candidates);
      setIsAnalyzing(false);
    }, 1000);
  };

  const confirmCandidate = (candidate) => {
      setNewRepo({ ...candidate, link: candidate.link || '' });
      setImportCandidates(importCandidates.filter(c => c !== candidate));
      setView('add');
  };

  const handleAddRestaurant = (e) => {
    e.preventDefault();
    if (!newRepo.name || !newRepo.cuisine) { alert("请填写名字和菜系"); return; }
    if (checkDuplicate(newRepo.name) && !window.confirm(`${newRepo.name} 已存在，确定添加？`)) return;

    const newId = Date.now();
    setRestaurants([...restaurants, { ...newRepo, id: newId }]);
    if (importCandidates.length > 0) setView('import');
    else {
        setNewRepo({ name: '', closeTime: '', price: '', category: '中餐', cuisine: '', notes: '', link: '' });
        setView('manage');
    }
  };

  // --- 视图 ---

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-6 animate-fadeIn">
      <div className="text-center space-y-2 mb-4">
        <Heart className="w-16 h-16 text-rose-500 mx-auto animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-800">周五吃什么？</h1>
        <p className="text-gray-500">美食决策助手 v5.2</p>
      </div>

      <button 
        onClick={() => { setView('wizard'); setWizardStep(0); setSelectedCategory(null); setSeenIds([]); }}
        className="w-full max-w-xs bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 text-xl"
      >
        <Utensils />
        开始选正餐
      </button>

      <button 
        onClick={() => { 
          setSelectedCategory('甜品'); 
          setWizardStep(1); 
          setView('wizard'); 
          setSeenIds([]);
        }}
        className="w-full max-w-xs bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2 text-lg"
      >
        <div className="flex gap-1 items-center">
            <Coffee size={20} />
            <Wine size={20} />
        </div>
        Brunch, 甜品 & 酒
      </button>

      <div className="w-full max-w-xs grid grid-cols-2 gap-3 mt-4">
        <button 
          onClick={() => { setView('manage'); setManageTab('main'); }}
          className="bg-white border-2 border-gray-200 text-gray-600 font-semibold py-3 px-2 rounded-2xl shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 text-sm"
        >
          <MapPin size={16} />
          餐厅列表
        </button>
        <button 
          onClick={() => setView('import')}
          className="bg-indigo-50 border-2 border-indigo-100 text-indigo-600 font-semibold py-3 px-2 rounded-2xl shadow-sm hover:bg-indigo-100 flex items-center justify-center gap-2 text-sm"
        >
          <Sparkles size={16} />
          智能导入
        </button>
      </div>
    </div>
  );

  const renderImport = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-4 bg-white shadow-sm flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => setView('home')} className="text-gray-600"><ArrowLeft /></button>
        <h2 className="font-bold text-lg text-indigo-900 flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-500"/>
          智能导入
        </h2>
      </div>
      <div className="p-4 flex-1 flex flex-col overflow-y-auto">
        {importCandidates.length > 0 ? (
            <div className="space-y-4">
                <div className="bg-indigo-50 p-3 rounded-lg text-indigo-800 text-sm mb-2">
                    🎉 识别到 {importCandidates.length} 个候选
                </div>
                {importCandidates.map((c, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800 text-lg">{c.name}</h3>
                            {c.isDuplicate && <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded-full">已存在</span>}
                        </div>
                        <div className="flex gap-2 text-xs mb-3">
                            <span className="bg-gray-100 px-2 py-1 rounded">{c.category}</span>
                            <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded">{c.cuisine}</span>
                            {c.link && <LinkIcon size={14} className="text-blue-500"/>}
                        </div>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{c.notes}</p>
                        <button onClick={() => confirmCandidate(c)} className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold">编辑添加</button>
                    </div>
                ))}
                <button onClick={() => setImportCandidates([])} className="w-full text-gray-400 text-sm mt-4">清除</button>
            </div>
        ) : (
            <>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 mb-4">
                <textarea className="w-full h-40 p-3 bg-gray-50 rounded-xl outline-none text-sm" placeholder="粘贴文案自动识别..." value={importText} onChange={(e) => setImportText(e.target.value)}></textarea>
                </div>
                <button onClick={handleSmartAnalyze} disabled={!importText || isAnalyzing} className="w-full py-4 rounded-xl font-bold bg-indigo-600 text-white shadow-lg">
                {isAnalyzing ? '分析中...' : '开始识别'}
                </button>
            </>
        )}
      </div>
    </div>
  );

  const renderResult = () => {
    if (!selectedResult) {
       return (
        <div className="p-6 h-full flex flex-col items-center justify-center bg-gray-50 text-center">
          <Frown className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">没店可选了</h2>
          <button onClick={resetSeenHistory} className="mt-4 px-6 py-3 bg-rose-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"><RotateCcw size={18}/> 重置</button>
        </div>
       )
    }
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className={`${selectedCategory === '甜品' ? 'bg-pink-400' : (selectedCategory === '其他' ? 'bg-purple-500' : 'bg-rose-500')} p-4 text-center`}>
            <h3 className="text-white font-medium opacity-90">{selectedCategory === '甜品' ? '甜蜜/微醺时刻！' : '今晚去这里！'}</h3>
          </div>
          <div className="p-8 text-center space-y-4">
            <h1 className="text-3xl font-extrabold text-gray-800">{selectedResult.name}</h1>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">{selectedResult.category}</span>
              <span className="px-3 py-1 bg-rose-100 rounded-full text-sm text-rose-600 font-medium">{selectedResult.cuisine}</span>
            </div>
            <div className="flex items-center justify-center gap-4 py-2">
                 {selectedResult.link ? (
                    <div className="flex gap-2">
                        <button onClick={() => copyToClipboard(selectedResult.link)} className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1.5 rounded-full"><Copy size={14}/> 复制链接</button>
                        <a href={selectedResult.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full"><ExternalLink size={14}/> 查看原帖</a>
                    </div>
                 ) : <span className="text-xs text-gray-400">暂无链接</span>}
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100 mt-4">
              <div className="flex flex-col items-center gap-1"><Clock className="text-gray-400" size={20}/><span className="text-sm font-bold text-gray-700">{selectedResult.closeTime || '-- : --'}</span></div>
              <div className="flex flex-col items-center gap-1"><DollarSign className="text-gray-400" size={20}/><span className="text-sm font-bold text-gray-700">{selectedResult.price || '---'}</span></div>
            </div>
            {selectedResult.notes && <div className="bg-yellow-50 p-4 rounded-xl text-yellow-800 text-sm italic text-left">" {selectedResult.notes} "</div>}
          </div>
          <div className="p-4 bg-gray-50 flex gap-3">
            <button onClick={() => setView('home')} className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-200 rounded-xl">回首页</button>
            <button onClick={() => spinTheWheel(selectedCategory, (selectedCategory !== '其他' && wizardStep === 1) ? selectedResult.cuisine : null)} className={`flex-1 text-white font-bold py-3 rounded-xl shadow-md ${selectedCategory === '甜品' ? 'bg-pink-400' : 'bg-rose-500'}`}>换一家</button>
          </div>
        </div>
      </div>
    );
  };

  const renderForm = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-4 bg-white shadow-sm flex items-center gap-3 sticky top-0">
        <button onClick={() => importCandidates.length > 0 ? setView('import') : setView('manage')} className="text-gray-600"><ArrowLeft /></button>
        <h2 className="font-bold text-lg">添加/编辑</h2>
      </div>
      <form onSubmit={handleAddRestaurant} className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div><label className="block text-sm font-medium mb-1">店名</label><input type="text" className="w-full p-3 border rounded-xl" value={newRepo.name} onChange={e => setNewRepo({...newRepo, name: e.target.value})}/></div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">大类</label>
            <select className="w-full p-3 border rounded-xl bg-white" value={newRepo.category} onChange={e => setNewRepo({...newRepo, category: e.target.value})}>
              <option value="中餐">中餐</option><option value="西餐">西餐</option><option value="甜品">甜品/Brunch/酒</option><option value="其他">其他</option>
            </select>
          </div>
          <div><label className="block text-sm font-medium mb-1">具体菜式</label><input type="text" className="w-full p-3 border rounded-xl" placeholder="如: Brunch, Bar" value={newRepo.cuisine} onChange={e => setNewRepo({...newRepo, cuisine: e.target.value})}/></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">链接</label><div className="relative"><input type="text" className="w-full p-3 pl-10 border rounded-xl text-sm text-blue-600" value={newRepo.link} onChange={e => setNewRepo({...newRepo, link: e.target.value})}/><LinkIcon size={16} className="absolute left-3 top-3.5 text-gray-400"/></div></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">关门时间</label><input type="time" className="w-full p-3 border rounded-xl" value={newRepo.closeTime} onChange={e => setNewRepo({...newRepo, closeTime: e.target.value})}/></div>
          <div><label className="block text-sm font-medium mb-1">价格</label><select className="w-full p-3 border rounded-xl bg-white" value={newRepo.price} onChange={e => setNewRepo({...newRepo, price: e.target.value})}><option value="">未知</option><option value="$">$</option><option value="$$">$$</option><option value="$$$">$$$</option><option value="$$$$">$$$$</option></select></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">备注</label><textarea className="w-full p-3 border rounded-xl" rows="3" value={newRepo.notes} onChange={e => setNewRepo({...newRepo, notes: e.target.value})}></textarea></div>
        <button type="submit" className="w-full bg-rose-500 text-white font-bold py-4 rounded-xl shadow-lg mt-4">保存</button>
      </form>
    </div>
  );

  const renderManage = () => {
    const filteredRestaurants = restaurants.filter(r => {
      if (manageTab === 'main') return r.category !== '甜品';
      if (manageTab === 'dessert') return r.category === '甜品';
      return true;
    });
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
             <button onClick={() => setView('home')} className="text-gray-600"><ArrowLeft /></button>
             <h2 className="font-bold text-lg">餐厅列表</h2>
             <button onClick={() => { setNewRepo({ name: '', closeTime: '', price: '', category: manageTab === 'dessert' ? '甜品' : '中餐', cuisine: '', notes: '', link: '' }); setView('add'); }} className="text-rose-500 font-bold flex items-center gap-1"><Plus size={18}/> 添加</button>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
             <button onClick={() => setManageTab('main')} className={`flex-1 py-2 text-sm font-bold rounded-lg ${manageTab === 'main' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400'}`}>正餐</button>
             <button onClick={() => setManageTab('dessert')} className={`flex-1 py-2 text-sm font-bold rounded-lg ${manageTab === 'dessert' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}>Brunch/甜品/酒</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredRestaurants.length === 0 ? <div className="text-center text-gray-400 mt-20">暂无相关店铺</div> : filteredRestaurants.map(r => (
              <div key={r.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-gray-800">{r.name}</h3>{r.price && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{r.price}</span>}{r.link && <LinkIcon size={12} className="text-blue-400"/>}</div>
                  <div className="text-sm text-gray-500 flex gap-2"><span className={r.category === '甜品' ? "text-pink-500" : "text-rose-500"}>{r.cuisine}</span><span>•</span><span>{r.closeTime || '时间未知'}</span></div>
                </div>
                <button onClick={() => { if(window.confirm("删除?")) setRestaurants(restaurants.filter(x => x.id !== r.id)) }} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={18} /></button>
              </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWizard = () => {
    if (wizardStep === 0) {
      return (
        <div className="p-6 h-full flex flex-col">
          <button onClick={() => setView('home')} className="mb-6 text-gray-400 hover:text-gray-600 flex items-center gap-1"><ArrowLeft size={20}/> 返回</button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">今天想吃哪种风格？</h2>
          <div className="grid grid-cols-1 gap-4">
            <button onClick={() => { setSelectedCategory('中餐'); setWizardStep(1); }} className="bg-orange-100 hover:bg-orange-200 text-orange-800 p-8 rounded-2xl flex flex-col items-center gap-3 transition"><span className="text-4xl">🥢</span><span className="text-xl font-bold">中餐 / 亚洲菜</span></button>
            <button onClick={() => { setSelectedCategory('西餐'); setWizardStep(1); }} className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-8 rounded-2xl flex flex-col items-center gap-3 transition"><span className="text-4xl">🍔</span><span className="text-xl font-bold">西餐 / 异国菜</span></button>
            <button onClick={() => { setSelectedCategory('其他'); spinTheWheel('其他'); }} className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-6 rounded-2xl flex flex-row items-center justify-center gap-3 transition mt-2"><Frown size={24} /><span className="text-lg font-bold">都不想... (混合/创意)</span></button>
          </div>
        </div>
      );
    }
    if (wizardStep === 1) {
      const cuisines = getAvailableCuisines();
      return (
        <div className="p-6 h-full flex flex-col">
          <button onClick={() => { selectedCategory === '甜品' ? setView('home') : setWizardStep(0)}} className="mb-6 text-gray-400 hover:text-gray-600 flex items-center gap-1"><ArrowLeft size={20}/> 上一步</button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCategory === '甜品' ? '想吃点什么？' : '具体想吃点啥？'}</h2>
          <p className="text-gray-500 mb-6">已选: {selectedCategory}</p>
          {cuisines.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {cuisines.map(c => <button key={c} onClick={() => spinTheWheel(selectedCategory, c)} className="bg-white border border-gray-200 hover:border-rose-500 hover:text-rose-600 text-gray-700 py-4 px-2 rounded-xl font-medium shadow-sm transition">{c}</button>)}
            </div>
          ) : <div className="bg-gray-100 p-6 rounded-xl text-center text-gray-500 mb-6">暂无店铺</div>}
          <div className="mt-auto"><button onClick={() => spinTheWheel(selectedCategory)} className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"><RefreshCw />{selectedCategory === '甜品' ? '随便推荐个甜品/酒/Brunch' : '随便，帮我选一家！'}</button></div>
        </div>
      );
    }
  };

  return (
    <div className="font-sans bg-gray-100 h-screen w-full flex items-center justify-center">
      <div className="w-full h-full md:max-w-md md:h-[800px] md:rounded-3xl bg-white shadow-2xl overflow-hidden relative flex flex-col">
        {view === 'home' && renderHome()}
        {view === 'wizard' && renderWizard()}
        {view === 'result' && renderResult()}
        {view === 'manage' && renderManage()}
        {view === 'add' && renderForm()} 
        {view === 'import' && renderImport()}
      </div>
    </div>
  );
}