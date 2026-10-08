import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Check, Heart, MapPin, Utensils, ArrowRight, ArrowLeft, Star, Beef, Salad, Package, Sparkles, Search, Lightbulb, Bot, Loader2, BookOpen, Clock, Users, MessageCircle, CheckCircle, Send, ShoppingCart, CheckSquare, Square, Trash2, Plus, Globe } from 'lucide-react';
import './App.css';

// Fake recipe database
const recipesDB = [
  { id: 1, name: 'Mini Lavash', desc: 'Tez va oson tayyorlanadigan mazzali lavash.', ingredients: ['go\'sht', 'tovuq', 'lavash xamiri', 'pomidor', 'bodring', 'mayonez', 'ketchup'], icon: <Utensils size={32}/> },
  { id: 2, name: 'Cheeseburger', desc: 'Uy sharoitida to\'yimli cheeseburger.', ingredients: ['go\'sht', 'burger noni', 'pishloq', 'salat bargi', 'ketchup', 'tuz'], icon: <Utensils size={32}/> },
  { id: 3, name: 'Palov (Osh)', desc: 'O\'zbekona an\'anaviy to\'y oshi.', ingredients: ['go\'sht', 'guruch', 'sabzi', 'piyoz', 'yog\'', 'zira', 'mayiz'], icon: <ChefHat size={32}/> },
  { id: 4, name: 'Manti', desc: 'Sergo\'sht, bug\'da pishgan mazali manti.', ingredients: ['go\'sht', 'un', 'piyoz', 'tuxum', 'tuz', 'zira'], icon: <Beef size={32}/> },
  { id: 5, name: 'Bifsteks', desc: 'Kartoshka fri va qovurilgan go\'sht', ingredients: ['go\'sht', 'kartoshka', 'yog\'', 'tuz', 'murch'], icon: <Beef size={32}/> },
  { id: 6, name: 'Somsa', desc: 'Tandir yoki duxovkada pishirilgan somsa.', ingredients: ['go\'sht', 'tovuq', 'un', 'piyoz', 'margarin', 'sedana'], icon: <ChefHat size={32}/> },
];

const tutorialsDB = [
  {
    id: 1, 
    title: 'Haqiqiy O\'zbekcha Palov', 
    desc: 'Osh qilishni bilmaydiganlar uchun 0 dan boshlab qadam-ba-qadam darslik.',
    time: '1.5 soat',
    steps: [
      { title: 'Masalliqlarni tayyorlash', text: 'Eng avvalo guruchni iliq suvda ivitib qo\'yamiz (kamida 30 daqiqa). Sabzini somoncha, piyozni yarim halqa, go\'shtni esa o\'rtacha kubik shaklida to\'g\'raymiz.' },
      { title: 'Qozonni qizdirish va yog\'', text: 'Qozonni olovga qo\'yib, taxminan 200 ml yog\' quyamiz. Yog\' yaxshilab qizigach, go\'shtni solib qizartirib qovuramiz (10-15 daqiqa davomida o\'rta olovda).' },
      { title: 'Piyoz va Sabzi', text: 'Go\'sht ustiga piyoz solamiz va tilla rangga kirguncha qovuramiz (7-10 daqiqa). So\'ngra sabzini solib, sabzi ham biroz yumshaguncha olovda ushlaymiz (10-15 daqiqa).' },
      { title: 'Zirvak va qaynatish', text: 'Qozonga masalliqlarni ko\'mib turadigan darajada qaynagan suv quyamiz. Tuz, zira va ozgina mayiz solib, past olovda 40 daqiqa mildiratib qaynatamiz (buning nomi zirvak deyiladi).' },
      { title: 'Guruch solish va damlash', text: 'Ivitilgan guruchni yaxshilab yuvib qozonga bir tekisda solamiz. Suv guruchdan 1 sm tepada bo\'lishi kerak. Suvi tortilgach, qozon qopqog\'ini yopib past olovda 20 daqiqa damlaymiz. Osh tayyor!' }
    ]
  },
  {
    id: 2, 
    title: 'Uy sharoitida mazali Burger', 
    desc: 'Tezkor biznes yoki uy uchun to\'yimli cheeseburger sirlari.',
    time: '30 daqiqa',
    steps: [
      { title: 'Qiymani tayyorlash', text: 'Mol go\'shti qiymasiga faqat tuz va murch qo\'shamiz. Piyoz yoki non qo\'shilmaydi! Qalinligi 1.5 sm bo\'lgan dumaloq kotletlar yasaymiz va o\'rtasini ozgina bosib qo\'yamiz (pishganda ishib ketmasligi uchun).' },
      { title: 'Qovurish sirlari', text: 'Tovaga ozgina sariyog\' (yoki o\'simlik yog\'i) solib qizdiramiz. Kotletlarni har bir tomonini baland olovda 3-4 daqiqadan qovuramiz.' },
      { title: 'Pishloqni eritish', text: 'Kotletning ikkinchi tomoni pishayotganda, ustiga bir bo\'lak Cheddar pishlog\'i qo\'yamiz va tova qopqog\'ini 1 daqiqaga yopamiz (pishloq ajoyib erib ketadi).' },
      { title: 'Nonni qizartirish', text: 'Burger nonlarini o\'rtasidan kesib, quruq tovada yoki ozgina sariyog\'da ichki qismini qizartirib olamiz. Bu nonning sousni shimilmasligini ta\'minlaydi.' },
      { title: 'Yig\'ish', text: 'Nonga maxsus sous surtamiz, salat bargi, pomidor, bodring, pishloqli kotlet va yana sous. Burger tayyor! Buni 25-30 mingdan sotsangiz bo\'ladi.' }
    ]
  }
];

const translations = {
  uz: {
    nav: { calc: 'Kalkulyator', sug: 'Retsept qidiruv', ai: 'AI Yordamchi', learn: "O'rganamiz", partner: 'Sherik Topish', shop: 'Bozorlik' },
    titles: {
      calculator: "Taom Narxini Hisoblash",
      suggester: "Boridan Pishiramiz",
      ai: "Sun'iy Intelekt Yordamchisi",
      learn: "Bosqichma-bosqich o'rganamiz",
      partner: "Hamkorlikda pishiramiz",
      shopping: "Bozorlik ro'yxati"
    },
    desc: {
      calculator: "O'z mehnatingizni qadrlang. Aniq hisob — muvaffaqiyat garovi!",
      suggester: "Uyda bor masalliqlarni yozing va qanday taomlar pishirish mumkinligini bilib oling.",
      ai: "Taom nomini yozing va AI sizga qanday masalliqlar kerakligini darhol aytib beradi.",
      learn: "Ovqat qilishni umuman bilmaysizmi? Muammo emas! Biz bilan qadam-ba-qadam pishirishni o'rganing.",
      partner: "Boshqa pazandalar bilan bog'laning, maslahatlashing va birgalikda taom tayyorlang!",
      shopping: "Hech narsa yoddan ko'tarilmasligi uchun do'konga borishdan oldin ro'yxat tuzing."
    },
    welcome: {
      title: "{t.welcome.title}",
      subtitle: "{t.welcome.subtitle}",
      f1_t: "{t.welcome.f1_t}", f1_d: "{t.welcome.f1_d}",
      f2_t: "{t.welcome.f2_t}", f2_d: "{t.welcome.f2_d}",
      f3_t: "{t.welcome.f3_t}", f3_d: "{t.welcome.f3_d}",
      f4_t: "{t.welcome.f4_t}", f4_d: "{t.welcome.f4_d}",
      btn: "{t.welcome.btn}"
    },
    calc: {
      title: "Kalkulyator",
      ingName: "{t.calc.ingName}", ingPlaceholder: "{t.calc.ingPlaceholder}",
      weight: "{t.calc.weight}",
      price: "{t.calc.price}",
      addBtn: "{t.calc.addBtn}",
      pack: "{t.calc.pack}", packPlaceholder: "Masalan: 1500",
      markup: "{t.calc.markup}", markupPlaceholder: "Masalan: 20",
      saveBtn: "{t.calc.saveBtn}",
      result: "{t.calc.result}",
      historyTitle: "{t.calc.historyTitle}",
      historyEmpty: "{t.calc.historyEmpty}"
    },
    sugg: {
      title: "{t.sugg.title}",
      desc: "{t.sugg.desc}",
      placeholder: "{t.sugg.placeholder}",
      emptyTitle: "{t.sugg.emptyTitle}",
      emptyDesc: "{t.sugg.emptyDesc}"
    },
    ai: {
      title: "{t.ai.title}",
      desc: "{t.ai.desc}",
      placeholder: "{t.ai.placeholder}",
      btn: "So'rash",
      loading: "{t.ai.loading}",
      aiTitle: "{t.ai.aiTitle}",
      stepsTitle: "{t.ai.stepsTitle}",
      bottomText: "{t.ai.bottomText}",
      toCalc: "{t.ai.toCalc}"
    },
    learn: {
      title: "{t.learn.title}",
      desc: "{t.learn.desc}",
      btn: "{t.learn.btn}",
      completed: "Tayyorlandi",
      back: "{t.learn.back}",
      finishBtn: "{t.learn.finishBtn}"
    },
    partner: {
      title: "{t.partner.title}",
      desc: "{t.partner.desc}",
      chatTitle: "bilan suhbat",
      placeholder: "{t.partner.placeholder}",
      send: "{t.partner.send}"
    },
    shop: {
      title: "{t.shop.title}",
      desc: "{t.shop.desc}",
      placeholder: "{t.shop.placeholder}",
      addBtn: "{t.calc.addBtn}",
      empty: "{t.shop.empty}"
    },
    footer: {
      f1: "{t.footer.f1}", f2: "{t.footer.f2}", f3: "{t.footer.f3}",
      text: "{t.footer.text}"
    }
  },
  ru: {
    nav: { calc: 'Калькулятор', sug: 'Поиск рецепта', ai: 'ИИ Помощник', learn: 'Обучение', partner: 'Напарники', shop: 'Покупки' },
    titles: {
      calculator: "Расчет стоимости блюда",
      suggester: "Готовим из того, что есть",
      ai: "ИИ Помощник по кухне",
      learn: "Учимся готовить шаг за шагом",
      partner: "Готовим вместе",
      shopping: "Список покупок"
    },
    desc: {
      calculator: "Цените свой труд. Точный расчет — залог успеха!",
      suggester: "Напишите, что есть дома, и узнайте, какие блюда можно приготовить.",
      ai: "Напишите название блюда, и ИИ сразу скажет, какие ингредиенты нужны.",
      learn: "Совсем не умеете готовить? Не проблема! Учитесь готовить шаг за шагом вместе с нами.",
      partner: "Связывайтесь с другими поварами, советуйтесь и готовьте вместе!",
      shopping: "Составьте список перед походом в магазин, чтобы ничего не забыть."
    },
    welcome: {
      title: "Добро пожаловать в проект!",
      subtitle: "Как эта программа может помочь вам на кухне?",
      f1_t: "Точный расчет", f1_d: "Точно рассчитайте себестоимость и прибыль.",
      f2_t: "Готовим из того, что есть", f2_d: "Найдите блюда из ингредиентов дома.",
      f3_t: "Обучение с нуля", f3_d: "Учитесь через мастер-классы.",
      f4_t: "Найти напарника", f4_d: "Общайтесь с другими поварами.",
      btn: "Понятно, начнем!"
    },
    calc: {
      title: "Калькулятор",
      ingName: "Название ингредиента", ingPlaceholder: "Например: Мясо",
      weight: "Вес (г/мл)",
      price: "Цена за 1 кг/литр (сум)",
      addBtn: "Добавить",
      pack: "Стоимость упаковки (сум)", packPlaceholder: "Например: 1500",
      markup: "Наценка (%)", markupPlaceholder: "Например: 20",
      saveBtn: "Сохранить",
      result: "Рекомендуемая цена за порцию:",
      historyTitle: "Сохраненное меню",
      historyEmpty: "Меню пока не сохранено."
    },
    sugg: {
      title: "Какие продукты есть дома?",
      desc: "Напишите название продукта (например: мясо, мука) и найдите подходящие блюда.",
      placeholder: "Поиск ингредиентов...",
      emptyTitle: "К сожалению, блюдо с таким ингредиентом не найдено",
      emptyDesc: "Попробуйте ввести другой ингредиент"
    },
    ai: {
      title: "Напишите ИИ помощнику",
      desc: "Какое блюдо хотите приготовить? Напишите название или ингредиенты.",
      placeholder: "Например: Дайте мне рецепт диетического блюда из курицы...",
      btn: "Спросить",
      loading: "ИИ думает...",
      aiTitle: "Ответ ИИ",
      stepsTitle: "Этапы приготовления:",
      bottomText: "Узнали ингредиенты, теперь рассчитайте цену!",
      toCalc: "Перейти к калькулятору"
    },
    learn: {
      title: "Специальные мастер-классы для вас",
      desc: "Выберите блюдо, которое хотите приготовить, и начнем процесс.",
      btn: "Начать обучение",
      completed: "Готово",
      back: "Вернуться назад",
      finishBtn: "Я приготовил!"
    },
    partner: {
      title: "Напарники по кухне",
      desc: "Готовить вместе веселее! С кем хотите пообщаться?",
      chatTitle: "беседа с",
      placeholder: "Напишите ваше сообщение...",
      send: "Отправить"
    },
    shop: {
      title: "Мои покупки",
      desc: "Не забудьте нужные продукты при походе на рынок!",
      placeholder: "Напишите название нового продукта...",
      addBtn: "Добавить",
      empty: "Список пуст. Добавить что-нибудь?"
    },
    footer: {
      f1: "В вашем городе", f2: "В каждом блюде есть любовь", f3: "Хорошая еда - счастливый день!",
      text: "Ваш вкусовой друг!"
    }
  },
  en: {
    nav: { calc: 'Calculator', sug: 'Recipe Search', ai: 'AI Assistant', learn: 'Learning', partner: 'Find Partner', shop: 'Shopping' },
    titles: {
      calculator: "Calculate Dish Cost",
      suggester: "Cook with What You Have",
      ai: "AI Kitchen Assistant",
      learn: "Step-by-Step Learning",
      partner: "Cook Together",
      shopping: "Shopping List"
    },
    desc: {
      calculator: "Value your work. Accurate calculation is the key to success!",
      suggester: "Write down what ingredients you have at home to see what you can cook.",
      ai: "Write the name of a dish, and the AI will immediately tell you the required ingredients.",
      learn: "Don't know how to cook? No problem! Learn to cook step-by-step with us.",
      partner: "Connect with other cooks, ask for advice, and cook together!",
      shopping: "Make a list before going to the store so you don't forget anything."
    },
    welcome: {
      title: "Welcome to the Project!",
      subtitle: "How can this program help you in the kitchen?",
      f1_t: "Accurate Calculation", f1_d: "Accurately calculate cost and profit.",
      f2_t: "Cook with What You Have", f2_d: "Find dishes from ingredients at home.",
      f3_t: "Learn from Scratch", f3_d: "Learn through master classes.",
      f4_t: "Find a Partner", f4_d: "Chat with other cooks.",
      btn: "Got it, let's start!"
    },
    calc: {
      title: "Calculator",
      ingName: "Ingredient Name", ingPlaceholder: "E.g: Meat",
      weight: "Weight (g/ml)",
      price: "Price per 1 kg/liter",
      addBtn: "Add",
      pack: "Packaging cost", packPlaceholder: "E.g: 1500",
      markup: "Markup (%)", markupPlaceholder: "E.g: 20",
      saveBtn: "Save",
      result: "Recommended price per portion:",
      historyTitle: "Saved Menu",
      historyEmpty: "No menus saved yet."
    },
    sugg: {
      title: "What ingredients do you have?",
      desc: "Type an ingredient name (e.g. meat, flour) to find matching dishes.",
      placeholder: "Search ingredient...",
      emptyTitle: "Unfortunately no dish found with this ingredient",
      emptyDesc: "Try another ingredient"
    },
    ai: {
      title: "Ask the AI Assistant",
      desc: "What do you want to cook? Type a name or ingredients.",
      placeholder: "E.g: Give me a diet chicken recipe...",
      btn: "Ask",
      loading: "AI is thinking...",
      aiTitle: "AI Response",
      stepsTitle: "Preparation steps:",
      bottomText: "You got the ingredients, now calculate the cost!",
      toCalc: "Go to Calculator"
    },
    learn: {
      title: "Special masterclasses for you",
      desc: "Select the dish you want to cook and let's start.",
      btn: "Start learning",
      completed: "Completed",
      back: "Go back",
      finishBtn: "I cooked it!"
    },
    partner: {
      title: "Cooking Partners",
      desc: "Cooking together is more fun! Who do you want to talk to?",
      chatTitle: "chat with",
      placeholder: "Write your message...",
      send: "Send"
    },
    shop: {
      title: "My Shopping List",
      desc: "Don't forget the necessary products when you go to the market!",
      placeholder: "Type a new product name...",
      addBtn: "Add",
      empty: "List is empty. Add something?"
    },
    footer: {
      f1: "In your city", f2: "Love in every dish", f3: "Good food - happy day!",
      text: "Your taste friend!"
    }
  }
};

function App() {
  const [lang, setLang] = useState('uz');
  const t = translations[lang];

  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator', 'suggester', 'ai', 'stats', 'learn'

  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Tutorials state
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState([]);

  // Partner / Chat state
  const [activePartner, setActivePartner] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  // Shopping List
  const [shoppingList, setShoppingList] = useState([
    { id: 1, text: '2 kg Un (Oliy nav)', done: true },
    { id: 2, text: '1 litr O\'simlik yog\'i', done: false },
    { id: 3, text: '500g Lahm go\'sht', done: false }
  ]);
  const [newItemText, setNewItemText] = useState('');
  
  const partners = [
    { id: 1, name: 'Malika (Toshkent)', status: 'Online', isOnline: true },
    { id: 2, name: 'Zilola (Samarqand)', status: 'Online', isOnline: true },
    { id: 3, name: 'Muxlisa (Buxoro)', status: 'Oxirgi marta 2 soat oldin', isOnline: false }
  ];

  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Go\'sht yoki Tovuq', weight: '', price: '', icon: <Beef size={32} /> },
    { id: 2, name: 'Asosiy mahsulot', weight: '', price: '', icon: <Utensils size={32} /> },
    { id: 3, name: 'Qo\'shimcha sabzavot', weight: '', price: '', icon: <Salad size={32} /> },
    { id: 4, name: 'Ziravor & Sous', weight: '', price: '', icon: <Package size={32} /> },
  ]);
  
  const [packagingCost, setPackagingCost] = useState('');
  const [portions, setPortions] = useState('');
  const [markup, setMarkup] = useState('');
  
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    calculate();
  }, [ingredients, packagingCost, portions, markup]);

  const handleIngredientChange = (id, field, value) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const calculate = () => {
    const portionsNum = parseFloat(portions) || 0;
    
    if (portionsNum <= 0 && portions !== '') {
      setResults(null);
      return;
    }

    let totalIngredientCost = 0;
    ingredients.forEach(ing => {
      const weight = parseFloat(ing.weight) || 0;
      const price = parseFloat(ing.price) || 0;
      totalIngredientCost += (weight * price);
    });

    const packCostNum = parseFloat(packagingCost) || 0;
    const markupNum = parseFloat(markup) || 0;

    const totalCost = totalIngredientCost + packCostNum;
    
    if (portionsNum > 0 && totalCost > 0) {
      const profit = totalCost * (markupNum / 100);
      const recommendedTotalPrice = totalCost + profit;
      const sellingPricePerPortion = recommendedTotalPrice / portionsNum;

      setResults({
        totalCost,
        sellingPricePerPortion
      });
    } else {
      setResults(null);
    }
  };

  const handleSave = () => {
    if (!results) return;
    const newRecord = {
      id: Date.now(),
      date: 'Yangi hisob',
      portions: portions,
      sellingPrice: results.sellingPricePerPortion
    };
    setHistory([newRecord, ...history]);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('uz-UZ').format(Math.round(val));
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { text: chatInput, isMe: true };
    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');
    
    // Simulate partner reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: "Ajoyib fikr! Men ham shuni pishirmoqchi edim рџЉ", isMe: false }]);
    }, 1500);
  };

  const finishTutorial = (id) => {
    if (!completedTutorials.includes(id)) {
      setCompletedTutorials([...completedTutorials, id]);
    }
    setSelectedTutorial(null);
  };


  // Filter recipes based on search
  const filteredRecipes = recipesDB.filter(recipe => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    // Check if any ingredient matches the search
    return recipe.ingredients.some(ing => ing.toLowerCase().includes(query)) || recipe.name.toLowerCase().includes(query);
  });

  const handleAiSubmit = (overrideQuery) => {
    const q = overrideQuery || aiQuery;
    if (!q.trim()) return;
    
    if (overrideQuery) setAiQuery(overrideQuery);
    setIsAiThinking(true);
    setAiResponse(null);
    
    setTimeout(() => {
      const query = q.toLowerCase();
      const foundRecipe = recipesDB.find(r => r.name.toLowerCase().includes(query) || query.includes(r.name.toLowerCase()));
      
      if (foundRecipe) {
        setAiResponse({
          dish: foundRecipe.name,
          text: `Qoyilmaqom tanlov! Men sizga ${foundRecipe.name} taomini 0 dan boshlab tayyorlashni o'rgataman. Mana aniq grammlardagi masalliqlar va qadam-ba-qadam jarayon:`,
          ingredients: [
            ...foundRecipe.ingredients.map(i => `${i.charAt(0).toUpperCase() + i.slice(1)} - 200g (yoki ta'bga ko'ra)`),
            "Maxsus sous/ziravor - 20g"
          ],
          steps: [
            "1. Barcha masalliqlarni tozalab, kerakli shaklda (somoncha yoki kubik qilib) to'g'rab oling.",
            "2. Qizdirilgan tovaga yog' solib, go'sht va boshqa masalliqlarni asta-sekin qovuring.",
            "3. O'z me'yorida tuz va ziravorlar qo'shing. Olovni pastlab pishiring.",
            "4. Dasturxonga tortishdan oldin chiroyli qilib bezating! Yoqimli ishtaha!"
          ]
        });
      } else {
        setAiResponse({
          dish: q,
          text: `Ushbu "${q}" taomini tayyorlash uchun klassik retsept (0 dan o'rganish uchun):`,
          ingredients: [
            "Go'sht yoki asosiy mahsulot - 400g", 
            "Yog' (O'simlik/Sariyog') - 50g", 
            "Piyoz va Sarimsoq - 150g", 
            "Maxsus ziravorlar va tuz - 15g"
          ],
          steps: [
            "1. Masalliqlarni yuvib, bir xil kattalikda to'g'rang.",
            "2. Qozonga 50g yog' solib qizdiring va piyozni qizartirib qovuring.",
            "3. 400g asosiy mahsulotni qo'shing va baland olovda aylantiring.",
            "4. 15g ziravor qo'shib, biroz suv quyib dimlab qo'ying. 30 daqiqa kuting."
          ]
        });
      }
      setIsAiThinking(false);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div 
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="loader-logo"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChefHat size={64} />
          </motion.div>
          <motion.div 
            className="loader-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Uy Oshpazi
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="welcome-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="welcome-modal"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="w-header">
                <ChefHat size={48} color="var(--primary-main)" />
                <h2>{t.welcome.title}</h2>
                <p>{t.welcome.subtitle}</p>
              </div>

              <div className="w-features-grid">
                <div className="w-feature">
                  <div className="w-icon"><Utensils size={24}/></div>
                  <div>
                    <h4>{t.welcome.f1_t}</h4>
                    <p>{t.welcome.f1_d}</p>
                  </div>
                </div>
                <div className="w-feature">
                  <div className="w-icon" style={{color: '#f59e0b'}}><Search size={24}/></div>
                  <div>
                    <h4>{t.welcome.f2_t}</h4>
                    <p>{t.welcome.f2_d}</p>
                  </div>
                </div>
                <div className="w-feature">
                  <div className="w-icon" style={{color: '#3b82f6'}}><BookOpen size={24}/></div>
                  <div>
                    <h4>{t.welcome.f3_t}</h4>
                    <p>{t.welcome.f3_d}</p>
                  </div>
                </div>
                <div className="w-feature">
                  <div className="w-icon" style={{color: '#8b5cf6'}}><Users size={24}/></div>
                  <div>
                    <h4>{t.welcome.f4_t}</h4>
                    <p>{t.welcome.f4_d}</p>
                  </div>
                </div>
              </div>

              <button className="btn-welcome" onClick={() => setShowWelcome(false)}>
                {t.welcome.btn} <ArrowRight size={18}/>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="app-container"
        initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="header-nav" style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem', background: 'transparent', width: '100%'}}>
        <div className="language-selector" style={{display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'white', padding: '0.5rem 1rem', borderRadius: '100px', boxShadow: 'var(--glass-shadow)'}}>
          <Globe size={18} color="var(--primary-main)" />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            style={{border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.95rem'}}
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Р СѓСЃСЃРєРёР№</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <div 
          className={`nav-tab ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <Sparkles size={18} /> {t.nav.calc}
        </div>
        <div 
          className={`nav-tab ${activeTab === 'suggester' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggester')}
        >
          <Lightbulb size={18} /> {t.nav.sug}
        </div>
        <div 
          className={`nav-tab ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          <Bot size={18} /> {t.nav.ai}
        </div>
        <div 
          className={`nav-tab ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => {setActiveTab('learn'); setSelectedTutorial(null);}}
        >
          <BookOpen size={18} /> {t.nav.learn}
        </div>
        <div 
          className={`nav-tab ${activeTab === 'partner' ? 'active' : ''}`}
          onClick={() => {setActiveTab('partner'); setActivePartner(null);}}
        >
          <Users size={18} /> {t.nav.partner}
        </div>
        <div 
          className={`nav-tab ${activeTab === 'shopping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shopping')}
        >
          <ShoppingCart size={18} /> {t.nav.shop}
        </div>
      </div>

      {/* Top Banner */}
      <div className="top-banner">
        
        <div className="banner-left" style={{maxWidth: '100%'}}>
          <motion.div className="logo" initial={{x:-50, opacity:0}} animate={{x:0, opacity:1}} transition={{delay: 0.3}}>
            <div className="logo-icon">
              <ChefHat size={32} />
            </div>
            <div>
              <div className="logo-text">Uy Oshpazi</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-gray)'}}>Sizning oshxona siringiz</div>
            </div>
          </motion.div>
          
          <motion.div className="banner-text" initial={{y:30, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.5}}>
            <h1>
              {t.titles[activeTab]}
            </h1>
            <p>
              {t.desc[activeTab]}
            </p>
            <div className="features-row">
              <div className="feature-pill"><div className="check"><Check size={14}/></div> Sifatli mahsulot</div>
              <div className="feature-pill"><div className="check"><Check size={14}/></div> Tez yetkazib berish</div>
              <div className="feature-pill"><div className="check"><Check size={14}/></div> Toza & Gigiyenik</div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'calculator' ? (
          <motion.div 
            key="calculator"
            className="main-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Left Sidebar */}
            <motion.div className="sidebar-left" variants={itemVariants}>
              <div className="sidebar-title">
                <Utensils size={20} /> Saqlangan Menyu
              </div>
              
              <div className="history-list">
                <AnimatePresence>
                  {history.length === 0 ? (
                    <div style={{color: 'var(--text-gray)', textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', fontStyle: 'italic'}}>
                      Hali hech qanday menyu saqlanmagan
                    </div>
                  ) : (
                    history.map((item, idx) => (
                      <motion.div 
                        key={item.id} 
                        className="history-item"
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                      >
                        <div className="history-icon">
                          <Utensils size={18}/>
                        </div>
                        <div className="history-details">
                          <span className="h-title">{item.date}</span>
                          <span className="h-price">{formatCurrency(item.sellingPrice)} so'm/p</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
              <div className="handwritten" style={{marginTop: 'auto', textAlign: 'center'}}>
                Ta'm tanlash oson, mazani his qilish qiyin!
              </div>
            </motion.div>

            {/* Center Grid */}
            <motion.div className="center-grid" variants={itemVariants}>
              <div className="ingredients-grid">
                {ingredients.map((ing) => (
                  <motion.div key={ing.id} className="ingredient-card" whileHover={{scale: 1.02}}>
                    <div className="card-icon-container">
                      {ing.icon}
                    </div>
                    <div className="card-title">{ing.name}</div>
                    <div className="card-inputs">
                      <input 
                        type="number" 
                        placeholder="Miqdori (kg/L)" 
                        value={ing.weight}
                        onChange={(e) => handleIngredientChange(ing.id, 'weight', e.target.value)}
                      />
                      <input 
                        type="number" 
                        placeholder="1 kg narxi (so'm)" 
                        value={ing.price}
                        onChange={(e) => handleIngredientChange(ing.id, 'price', e.target.value)}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div className="sidebar-right" variants={itemVariants}>
              <div className="right-title">Xarajat parametrlari</div>
              
              <div className="param-group">
                <label><Check size={16} color="var(--primary-main)"/> Qadoqlash jami</label>
                <input 
                  type="number" 
                  placeholder="Masalan: 10000"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                />
              </div>
              
              <div className="param-group">
                <label><Check size={16} color="var(--primary-main)"/> Porsiya soni</label>
                <input 
                  type="number" 
                  placeholder="Masalan: 6"
                  value={portions}
                  onChange={(e) => setPortions(e.target.value)}
                />
              </div>
              
              <div className="param-group">
                <label><Check size={16} color="var(--primary-main)"/> {t.calc.markup}</label>
                <input 
                  type="number" 
                  placeholder="Masalan: 20"
                  value={markup}
                  onChange={(e) => setMarkup(e.target.value)}
                />
              </div>

              <motion.button 
                className="btn-order" 
                onClick={handleSave} 
                disabled={!results}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.calc.saveBtn} <ArrowRight size={18} />
              </motion.button>

              <AnimatePresence>
                {results && (
                  <motion.div 
                    className="delivery-pill"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                  >
                    <span>{t.calc.result}</span>
                    <strong>{formatCurrency(results.sellingPricePerPortion)} so'm</strong>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : activeTab === 'suggester' ? (
          <motion.div 
            key="suggester"
            className="suggester-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="search-box">
              <h2 style={{color: 'var(--primary-dark)', fontSize: '2rem', marginBottom: '0.5rem'}}>{t.sugg.title}</h2>
              <p style={{color: 'var(--text-gray)'}}>{t.sugg.desc}</p>
              
              <div className="search-input-wrapper">
                <Search color="var(--text-gray)" size={24} />
                <input 
                  type="text" 
                  placeholder="{t.sugg.placeholder}" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="recipe-cards-grid">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map(recipe => (
                  <div 
                    key={recipe.id} 
                    className="recipe-card-sugg" 
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                      setActiveTab('ai');
                      handleAiSubmit(recipe.name);
                    }}
                  >
                    <div className="rc-icon">
                      {recipe.icon}
                    </div>
                    <div className="rc-title">{recipe.name}</div>
                    <div className="rc-desc">{recipe.desc}</div>
                    <div className="rc-ing-list">
                      {recipe.ingredients.map((ing, i) => (
                        <span key={i} className="rc-ing-pill">{ing}</span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-gray)'}}>
                  <Search size={48} opacity={0.2} style={{margin: '0 auto 1rem auto'}} />
                  <h3>{t.sugg.emptyTitle}</h3>
                  <p>{t.sugg.emptyDesc}</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : activeTab === 'ai' ? (
          <motion.div 
            key="ai"
            className="suggester-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <div className="search-box" style={{maxWidth: '700px', width: '100%'}}>
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary-main)'}}>
                <Bot size={48} />
              </div>
              <h2 style={{color: 'var(--primary-dark)', fontSize: '2rem', marginBottom: '0.5rem'}}>AI Yordamchidan so'rang</h2>
              <p style={{color: 'var(--text-gray)', marginBottom: '2rem'}}>
                Qanday taom tayyorlamoqchisiz? Nomini yozing, AI darhol kerakli masalliqlarni aytib beradi.
              </p>
              
              <div style={{display: 'flex', gap: '1rem', width: '100%'}}>
                <div className="search-input-wrapper" style={{flex: 1, margin: 0}}>
                  <Bot color="var(--text-gray)" size={24} />
                  <input 
                    type="text" 
                    placeholder="Masalan: Gamburger, Somsa..." 
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                  />
                </div>
                <button 
                  className="btn-order" 
                  style={{marginTop: 0, padding: '0 2rem'}}
                  onClick={handleAiSubmit}
                  disabled={isAiThinking || !aiQuery.trim()}
                >
                  {isAiThinking ? <Loader2 size={24} className="spin-icon" /> : <ArrowRight size={24} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {aiResponse && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ai-response-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    boxShadow: '0 15px 35px rgba(55, 139, 102, 0.1)',
                    maxWidth: '700px',
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.6)',
                    position: 'relative'
                  }}
                >
                  <div style={{position: 'absolute', top: '-15px', left: '30px', background: 'var(--primary-main)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.9rem'}}>
                    {t.ai.aiTitle}
                  </div>
                  <h3 style={{fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '1rem', marginTop: '0.5rem', textTransform: 'capitalize'}}>
                    {aiResponse.dish}
                  </h3>
                  <p style={{color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6'}}>
                    {aiResponse.text}
                  </p>
                  
                  <div className="rc-ing-list">
                    {aiResponse.ingredients.map((ing, i) => (
                      <span key={i} className="rc-ing-pill" style={{background: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', padding: '0.5rem 1rem'}}>
                        <Check size={14} style={{display: 'inline', marginRight: '0.3rem', color: 'var(--primary-main)'}} />
                        {ing}
                      </span>
                    ))}
                  </div>

                  {aiResponse.steps && (
                    <div className="ai-steps-container" style={{marginTop: '2rem', textAlign: 'left'}}>
                      <h4 style={{color: 'var(--primary-dark)', marginBottom: '1rem', fontSize: '1.2rem'}}>{t.ai.stepsTitle}</h4>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        {aiResponse.steps.map((step, idx) => (
                          <div key={idx} style={{background: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: '12px', color: 'var(--text-dark)', fontSize: '1rem', borderLeft: '4px solid var(--primary-main)'}}>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div style={{marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{color: 'var(--text-dark)', fontSize: '0.9rem'}}>{t.ai.bottomText}</span>
                    <button 
                      onClick={() => setActiveTab('calculator')}
                      style={{background: 'none', border: 'none', color: 'var(--primary-dark)', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}
                    >
                      {t.ai.toCalc} <ArrowRight size={16}/>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : activeTab === 'partner' ? (
          <motion.div 
            key="partner"
            className="suggester-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {!activePartner ? (
              <>
                <div className="stats-header" style={{textAlign: 'center', marginBottom: '3rem'}}>
                  <h2 style={{color: 'var(--primary-dark)', fontSize: '2rem'}}>{t.partner.title}</h2>
                  <p style={{color: 'var(--text-gray)'}}>{t.partner.desc}</p>
                </div>
                
                <div className="partners-list">
                  {partners.map(p => (
                    <div 
                      key={p.id} 
                      className="partner-card"
                      onClick={() => {
                        setActivePartner(p);
                        setChatMessages([{ text: "Salom! Qandaysiz? Bugun nima pishiramiz?", isMe: false }]);
                      }}
                    >
                      <div className="p-avatar">{p.name.charAt(0)}</div>
                      <div className="p-info">
                        <h3>{p.name}</h3>
                        <div style={{color: p.isOnline ? 'var(--primary-main)' : 'var(--text-gray)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                          {p.isOnline && <div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-main)'}}></div>}
                          {p.status}
                        </div>
                      </div>
                      <MessageCircle color="var(--primary-main)" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="chat-container">
                <div className="chat-header">
                  <button onClick={() => setActivePartner(null)} className="btn-icon">
                    <ArrowLeft size={20} />
                  </button>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className="p-avatar" style={{width: 40, height: 40, fontSize: '1.2rem'}}>{activePartner.name.charAt(0)}</div>
                    <div>
                      <h3 style={{fontSize: '1.2rem', color: 'var(--primary-dark)'}}>{activePartner.name}</h3>
                      <div style={{fontSize: '0.8rem', color: activePartner.isOnline ? 'var(--primary-main)' : 'var(--text-gray)'}}>{activePartner.status}</div>
                    </div>
                  </div>
                </div>

                <div className="chat-messages">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`chat-bubble ${msg.isMe ? 'me' : 'them'}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>

                <div className="chat-input-area">
                  <input 
                    type="text" 
                    placeholder="Xabar yozing..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage} disabled={!chatInput.trim()}>
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : activeTab === 'learn' ? (
          <motion.div 
            key="learn"
            className="suggester-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {!selectedTutorial ? (
              <>
                <div className="stats-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--primary-dark)', fontSize: '2rem'}}>Master-Klass Darsliklari</h2>
                  <p style={{color: 'var(--text-gray)'}}>Siz tayyorlamoqchi bo'lgan taomni tanlang va qadam-ba-qadam o'rganing.</p>
                </div>

                <div className="tutorials-grid">
                  {tutorialsDB.map(tut => {
                    const isCompleted = completedTutorials.includes(tut.id);
                    return (
                      <div 
                        key={tut.id} 
                        className={`tutorial-card ${isCompleted ? 'completed-card' : ''}`}
                        onClick={() => { setSelectedTutorial(tut); setCurrentStep(0); }}
                      >
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                          <div style={{background: 'rgba(255, 255, 255, 0.8)', color: 'var(--primary-main)', padding: '1rem', borderRadius: '16px'}}>
                            <ChefHat size={32}/>
                          </div>
                          {isCompleted ? (
                            <div style={{color: 'var(--primary-main)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 800, background: 'rgba(255,255,255,0.8)', padding: '0.3rem 0.8rem', borderRadius: '100px'}}>
                              <CheckCircle size={16}/> Tayyorlandi
                            </div>
                          ) : (
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-dark)', fontSize: '0.85rem', fontWeight: 700}}>
                              <Clock size={14}/> {tut.time}
                            </div>
                          )}
                        </div>
                        <h3 style={{color: 'var(--primary-dark)', fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '0.5rem'}}>{tut.title}</h3>
                        <p style={{color: 'var(--text-dark)', lineHeight: '1.5', fontSize: '0.95rem', fontWeight: 600}}>{tut.desc}</p>
                        <div style={{marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-main)', fontWeight: 800}}>
                          {isCompleted ? "Yana o'rganish" : "Boshlash"} <ArrowRight size={16}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <motion.div 
                className="wizard-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <button className="btn-back" onClick={() => setSelectedTutorial(null)}>
                  <ArrowLeft size={18}/> Darsliklarga qaytish
                </button>
                
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--primary-dark)', fontSize: '2.2rem', marginBottom: '0.5rem'}}>{selectedTutorial.title}</h2>
                  <div style={{color: 'var(--text-gray)', fontWeight: 600}}>
                    Qadam {currentStep + 1} / {selectedTutorial.steps.length}
                  </div>
                </div>

                <div className="progress-dots">
                  {selectedTutorial.steps.map((_, idx) => (
                    <div key={idx} className={`p-dot ${idx === currentStep ? 'active' : ''}`}></div>
                  ))}
                </div>

                <motion.div 
                  key={currentStep}
                  className="step-card"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <h3>{currentStep + 1}. {selectedTutorial.steps[currentStep].title}</h3>
                  <p>{selectedTutorial.steps[currentStep].text}</p>
                </motion.div>

                <div className="wizard-controls">
                  <button 
                    className="btn-wiz" 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    <ArrowLeft size={18}/> Oldingi
                  </button>
                  {currentStep === selectedTutorial.steps.length - 1 ? (
                    <button 
                      className="btn-wiz" 
                      style={{background: '#10b981'}}
                      onClick={() => finishTutorial(selectedTutorial.id)}
                    >
                      <CheckCircle size={18}/> {t.learn.finishBtn}
                    </button>
                  ) : (
                    <button 
                      className="btn-wiz" 
                      onClick={() => setCurrentStep(prev => prev + 1)}
                    >
                      Keyingi qadam <ArrowRight size={18}/>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : activeTab === 'shopping' ? (
          <motion.div 
            key="shopping"
            className="suggester-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="stats-header" style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{color: 'var(--primary-dark)', fontSize: '2rem'}}>{t.shop.title}</h2>
              <p style={{color: 'var(--text-gray)'}}>{t.shop.desc}</p>
            </div>
            
            <div className="shopping-container">
              <div className="shopping-input-row">
                <input 
                  type="text" 
                  placeholder="{t.shop.placeholder}" 
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyPress={(e) => {
                    if(e.key === 'Enter' && newItemText.trim()) {
                      setShoppingList([{id: Date.now(), text: newItemText, done: false}, ...shoppingList]);
                      setNewItemText('');
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    if(newItemText.trim()) {
                      setShoppingList([{id: Date.now(), text: newItemText, done: false}, ...shoppingList]);
                      setNewItemText('');
                    }
                  }}
                >
                  <Plus size={20} /> {t.calc.addBtn}
                </button>
              </div>

              <div className="shopping-list-items">
                <AnimatePresence>
                  {shoppingList.length === 0 ? (
                    <motion.div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-gray)'}}>
                      {t.shop.empty}
                    </motion.div>
                  ) : (
                    shoppingList.map(item => (
                      <motion.div 
                        key={item.id}
                        className={`shop-item ${item.done ? 'done' : ''}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0, padding: 0 }}
                      >
                        <div 
                          className="shop-check" 
                          onClick={() => setShoppingList(shoppingList.map(i => i.id === item.id ? {...i, done: !i.done} : i))}
                        >
                          {item.done ? <CheckSquare size={24} color="var(--primary-main)"/> : <Square size={24} color="var(--text-gray)"/>}
                        </div>
                        <div className="shop-text" style={{textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text-gray)' : 'var(--text-dark)'}}>
                          {item.text}
                        </div>
                        <div 
                          className="shop-delete"
                          onClick={() => setShoppingList(shoppingList.filter(i => i.id !== item.id))}
                        >
                          <Trash2 size={20} />
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile Promo Section */}
      <motion.div 
        className="mobile-promo"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="promo-text">
          <h2 style={{color: 'var(--primary-dark)', fontSize: '2.5rem', marginBottom: '1rem'}}>Sizning oshxona yordamchingiz</h2>
          <p style={{color: 'var(--text-dark)', fontWeight: 500, fontSize: '1.2rem', maxWidth: '500px', lineHeight: '1.5'}}>
            Tez kunda "Uy Oshpazi"ning qulay mobil ilovasi ishga tushadi. Endi retseptlar va hisob-kitoblar qulayroq bo'ladi!
          </p>
        </div>
        
        <div className="phone-mockup" style={{transform: 'rotate(-5deg) translateY(20px)'}}>
          <div className="phone-notch"></div>
          <div className="phone-screen">
            <div className="phone-header" style={{gap: '0.3rem'}}>
              <ChefHat size={14} /> Uy Oshpazi
            </div>
            
            <div className="phone-card" style={{opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', height: 'auto'}}>
              <div style={{background: 'rgba(255,255,255,0.5)', padding: '0.3rem', borderRadius: '8px', color: 'var(--primary-main)'}}>
                <Beef size={14}/>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-dark)'}}>Go'sht yoki Tovuq</div>
                <div style={{fontSize: '0.5rem', color: 'var(--text-gray)'}}>1 kg = 80,000 so'm</div>
              </div>
            </div>

            <div className="phone-card" style={{opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', height: 'auto'}}>
              <div style={{background: 'rgba(255,255,255,0.5)', padding: '0.3rem', borderRadius: '8px', color: 'var(--primary-main)'}}>
                <Package size={14}/>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-dark)'}}>Parametrlar</div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem', color: 'var(--text-gray)'}}>
                  <span>Porsiya: 4 ta</span> <span>Ustama: 20%</span>
                </div>
              </div>
            </div>

            <div className="phone-card" style={{opacity: 0.95, background: 'var(--primary-dark)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0.5rem', height: 'auto', gap: '0.2rem', marginTop: '0.5rem'}}>
              <div style={{fontSize: '0.55rem', color: 'rgba(255,255,255,0.7)'}}>1 porsiya narxi</div>
              <div style={{fontSize: '0.8rem', fontWeight: 800}}>24,000 so'm</div>
            </div>

          </div>
          <div className="phone-badge" style={{left: 'auto', right: '-30px', transform: 'rotate(5deg)'}}>
            Tez kunda <br/>mobil ilova!
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <motion.div 
        className="bottom-banner"
      >
        <div className="footer-items">
          <div className="f-item">
            <div className="f-icon"><MapPin size={18}/></div> {t.footer.f1}
          </div>
          <div className="f-item">
            <div className="f-icon"><Heart size={18}/></div> {t.footer.f2}
          </div>
          <div className="f-item">
            <div className="f-icon"><Star size={18}/></div> {t.footer.f3}
          </div>
        </div>
        <div className="handwritten">
          {t.footer.text}
        </div>
      </motion.div>
    </motion.div>
    </>
  );
}

export default App;

