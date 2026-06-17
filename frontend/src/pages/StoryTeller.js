// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Music, Clock, Landmark, Heart, Share2, BookOpen, Star, ChevronRight, Play, Pause } from "lucide-react";
// import { Link } from "react-router-dom";
// import stories from "../data/stories";
// import CulturalPlatformFooter from "../components/CulturalPlatformFooter.jsx";
// import Navbar from "../components/Navbar";

// const StoryTeller = () => {
//   const [category, setCategory] = useState("historical");
//   const [story, setStory] = useState(null);
//   const [lang, setLang] = useState("mr"); // default Marathi
//   const [favorites, setFavorites] = useState([]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [selectedVoice, setSelectedVoice] = useState("marathi");
//   const [showFullStory, setShowFullStory] = useState(false);
//   const [voices, setVoices] = useState([]);
//   const [speechSupported, setSpeechSupported] = useState(true);
//   const speechRef = useRef(null);

//   const canUseSpeech = typeof window !== "undefined" &&
//     !!window.speechSynthesis &&
//     typeof window.SpeechSynthesisUtterance !== "undefined";

//   const normalizeStoryText = (text) => {
//     if (!text) return "";
//     return text
//       .trim()
//       .replace(/\s*\n+\s*/g, " ")
//       .replace(/\s+/g, " ")
//       .trim();
//   };

//   const getCurrentStoryText = () => story ? normalizeStoryText(story.story[lang]) : "";

//   useEffect(() => {
//     if (!canUseSpeech) {
//       setSpeechSupported(false);
//       return;
//     }

//     const loadVoices = () => {
//       const availableVoices = window.speechSynthesis.getVoices() || [];
//       if (availableVoices.length) {
//         setVoices(availableVoices);
//       }
//     };

//     loadVoices();
//     const intervalId = window.setInterval(loadVoices, 500);
//     window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

//     return () => {
//       window.clearInterval(intervalId);
//       window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
//       window.speechSynthesis.cancel();
//     };
//   }, [canUseSpeech]);

//   useEffect(() => {
//     if (!story && isPlaying) {
//       window.speechSynthesis?.cancel();
//       setIsPlaying(false);
//     }
//   }, [story, isPlaying]);

//   const getVoiceBySelection = () => {
//     if (!voices.length) return null;

//     const locale = selectedVoice === "marathi" ? "mr" : "en";
//     return (
//       voices.find((voice) => voice.lang.toLowerCase().startsWith(locale)) ||
//       voices.find((voice) => voice.lang.toLowerCase().startsWith("hi")) ||
//       voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ||
//       voices[0]
//     );
//   };

//   const stopSpeech = () => {
//     if (window.speechSynthesis) {
//       window.speechSynthesis.cancel();
//     }
//     speechRef.current = null;
//     setIsPlaying(false);
//   };

//   const speakStory = () => {
//     if (!story) return;
//     if (!canUseSpeech) {
//       setSpeechSupported(false);
//       console.warn("Speech synthesis not supported in this browser.");
//       return;
//     }

//     const synth = window.speechSynthesis;
//     synth.cancel();

//     const text = getCurrentStoryText();
//     if (!text) {
//       console.warn("No story text is available for speech.");
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     const selected = getVoiceBySelection();

//     if (selected) {
//       utterance.voice = selected;
//       utterance.lang = selected.lang;
//     } else {
//       utterance.lang = selectedVoice === "marathi" ? "mr-IN" : "en-US";
//     }

//     utterance.volume = 1;
//     utterance.rate = 1;
//     utterance.pitch = 1;

//     utterance.onstart = () => {
//       setIsPlaying(true);
//     };
//     utterance.onend = () => {
//       setIsPlaying(false);
//     };
//     utterance.onerror = (event) => {
//       console.error("Speech synthesis error:", event);
//       setIsPlaying(false);
//     };

//     speechRef.current = utterance;
//     synth.speak(utterance);
//   };

//   const togglePlay = () => {
//     if (isPlaying) {
//       stopSpeech();
//     } else {
//       speakStory();
//     }
//   };

//   const toggleLang = () => setLang(lang === "mr" ? "en" : "mr");
//   const toggleFavorite = () => {
//     if (story && !favorites.includes(story.title[lang])) {
//       setFavorites([...favorites, story.title[lang]]);
//     } else if (story) {
//       setFavorites(favorites.filter(fav => fav !== story.title[lang]));
//     }
//   };

//   const shareStory = () => {
//     if (story) {
//       navigator.share?.({
//         title: story.title[lang],
//         text: normalizeStoryText(story.story[lang]).substring(0, 100) + "...",
//         url: window.location.href
//       });
//     }
//   };

//   const generateStory = () => {
//     const list = stories[category] || stories[Object.keys(stories)[0]] || [];
//     if (!list.length) {
//       console.warn("No stories available for generation.");
//       return;
//     }

//     const randomStory = list[Math.floor(Math.random() * list.length)];
//     setStory(randomStory);
//     setShowFullStory(false);
//   };

//   const storyText = getCurrentStoryText();
//   const isLongStory = storyText.length > 300;

//   // Variants
//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: { staggerChildren: 0.2 },
//     },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   const emojiVariants = {
//     hover: { y: [0, -5, 0], transition: { duration: 0.4, repeat: Infinity } },
//   };

//   return (
//     <div className="bg-[#fff7ef] min-h-screen flex flex-col">
//       {/* Navbar */}
//       <Navbar language={lang} />

//       <motion.div
//         className="flex-1 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center p-4 md:p-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//       {/* TITLE SECTION */}
//       <motion.div
//         className="text-center mb-8 w-full max-w-4xl"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
//           📚 {lang === "mr" ? "कथा संग्रह" : "Story Collection"}
//         </h1>
//         <p className="text-gray-600 mb-6 text-lg">
//           {lang === "mr" 
//             ? "महाराष्ट्राच्या सांस्कृतिक वारशातील मोत्यांसारख्या कथा" 
//             : "Pearls from Maharashtra's Cultural Heritage"}
//         </p>

//         {/* CONTROLS */}
//         <div className="flex justify-center items-center gap-4 flex-wrap">
//           {/* LANGUAGE TOGGLE */}
//           <motion.button
//             onClick={toggleLang}
//             whileTap={{ scale: 0.95 }}
// className="bg-[#d32f2f] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#b71c1c] transition-colors"          >
//             {lang === "mr" ? "English" : "मराठी"}
//           </motion.button>

//           {/* VOICE SELECTION */}
//           <div className="flex flex-col items-start gap-2 bg-white px-4 py-2 rounded-full shadow border">
//             <div className="flex items-center gap-2">
//               <BookOpen size={16} className="text-orange-600" />
//               <select
//                 value={selectedVoice}
//                 onChange={(e) => setSelectedVoice(e.target.value)}
//                 className="outline-none bg-transparent text-sm"
//               >
//                 <option value="marathi">मराठी आवाज</option>
//                 <option value="english">English Voice</option>
//               </select>
//             </div>
//             {!speechSupported ? (
//               <span className="text-xs text-red-500">Audio not available in this browser.</span>
//             ) : voices.length === 0 ? (
//               <span className="text-xs text-gray-500">Loading voices... If the button stays disabled, refresh the page.</span>
//             ) : null}
//           </div>

//           {/* FAVORITES COUNT */}
//           {favorites.length > 0 && (
//             <motion.div
//               className="flex items-center gap-1 bg-white px-3 py-2 rounded-full shadow border"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//             >
//               <Heart size={16} className="text-red-500 fill-red-500" />
//               <span className="text-sm font-medium">{favorites.length}</span>
//             </motion.div>
//           )}
//         </div>
//       </motion.div>

//       {/* CATEGORY BUTTONS */}
//       <motion.div
//         className="flex flex-wrap gap-3 mb-8 justify-center"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {[
//           { key: "historical", icon: "⚔️", mr: "ऐतिहासिक", en: "Historical" },
//           { key: "folklore", icon: "🎭", mr: "लोककथा", en: "Folklore" },
//           { key: "spiritual", icon: "🙏", mr: "आध्यात्मिक", en: "Spiritual" },
//           { key: "mythological", icon: "🔱", mr: "पौराणिक", en: "Mythological" },
//           { key: "inspirational", icon: "🌟", mr: "प्रेरणादायी", en: "Inspirational" },
//           { key: "educational", icon: "📖", mr: "शैक्षणिक", en: "Educational" },
//         ].map((cat) => (
//           <motion.button
//             key={cat.key}
//             onClick={() => {
//               setCategory(cat.key);
//               setStory(null);
//             }}
//             whileTap={{ scale: 0.95 }}
//             whileHover={{ scale: 1.05 }}
//             variants={buttonVariants}
//             className={`px-4 py-3 rounded-xl font-semibold flex flex-col items-center w-32 transition-all ${
//               category === cat.key 
//                 ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" 
//                 : "bg-white border-2 border-orange-200 hover:border-orange-400"
//             }`}
//           >
//             <motion.span
//               className="text-2xl mb-1"
//               variants={emojiVariants}
//               whileHover="hover"
//             >
//               {cat.icon}
//             </motion.span>
//             <span className="text-sm">{lang === "mr" ? cat.mr : cat.en}</span>
//           </motion.button>
//         ))}
//       </motion.div>

//       {/* STORY BOX */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={story ? story.title[lang] : "placeholder"}
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: -20, scale: 0.95 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white shadow-xl rounded-3xl p-6 md:p-8 w-full max-w-4xl border border-orange-100"
//         >
//           {story ? (
//             <div className="space-y-6">
//               {/* STORY HEADER */}
//               <div className="flex justify-between items-start gap-4">
//                 <div className="flex-1">
//                   <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-2">
//                     {story.title[lang]}
//                   </h2>
//                   <div className="flex items-center gap-3 text-sm text-gray-500">
//                     <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
//                       {lang === "mr" ? 
//                         (category === "historical" ? "ऐतिहासिक" :
//                          category === "folklore" ? "लोककथा" :
//                          category === "spiritual" ? "आध्यात्मिक" :
//                          category === "mythological" ? "पौराणिक" :
//                          category === "inspirational" ? "प्रेरणादायी" : "शैक्षणिक")
//                         : category.charAt(0).toUpperCase() + category.slice(1)
//                       }
//                     </span>
//                     <span>📖 {lang === "mr" ? "२ मिनिटे वाचन" : "2 min read"}</span>
//                   </div>
//                 </div>

//                 {/* ACTION BUTTONS */}
//                 <div className="flex gap-2">
//                   <motion.button
//                     onClick={toggleFavorite}
//                     whileTap={{ scale: 0.9 }}
//                     className={`p-2 rounded-full transition-colors ${
//                       favorites.includes(story.title[lang])
//                         ? "bg-red-100 text-red-500"
//                         : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
//                     }`}
//                   >
//                     <Heart size={20} className={favorites.includes(story.title[lang]) ? "fill-current" : ""} />
//                   </motion.button>
                  
//                   <motion.button
//                     onClick={shareStory}
//                     whileTap={{ scale: 0.9 }}
//                     className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
//                   >
//                     <Share2 size={20} />
//                   </motion.button>
                  
//                   <motion.button
//                     onClick={togglePlay}
//                     whileTap={{ scale: 0.9 }}
//                     className="p-2 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
//                   >
//                     {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//                   </motion.button>
//                 </div>
//               </div>

//               {/* STORY CONTENT */}
//               <div className="prose prose-lg max-w-none">
//                 <p className="text-gray-700 leading-relaxed text-lg">
//                   {showFullStory ? storyText : storyText.substring(0, 300) + "..."}
//                 </p>
                
//                 {isLongStory && (
//                   <motion.button
//                     onClick={() => setShowFullStory(!showFullStory)}
//                     whileTap={{ scale: 0.95 }}
//                     className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 mt-3"
//                   >
//                     {showFullStory ? 
//                       (lang === "mr" ? "कमी दाखवा" : "Show less") : 
//                       (lang === "mr" ? "पूर्ण कथा वाचा" : "Read full story")
//                     }
//                     <ChevronRight size={16} className={`transform transition-transform ${showFullStory ? "rotate-90" : ""}`} />
//                   </motion.button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">📖</div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 {lang === "mr" ? "कथा निवडा" : "Select a Story"}
//               </h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 {lang === "mr"
//                   ? "खालील बटणावर क्लिक करून एक कथा निवडा"
//                   : "Click the button below to generate a story"}
//               </p>
//             </div>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       {/* GENERATE BUTTON WITH PULSE */}
//       <motion.button
//         onClick={generateStory}
//         whileTap={{ scale: 0.95 }}
//         whileHover={{ scale: 1.05 }}
//         animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }}
//         className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
//       >
//         <span className="flex items-center gap-2">
//           <BookOpen size={20} />
//           {lang === "mr" ? "नवीन कथा तयार करा" : "Generate New Story"}
//         </span>
//       </motion.button>

//       </motion.div>


      

//       {/* FOOTER */}
//       <CulturalPlatformFooter />
//     </div>
//   );
// };


import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, BookOpen, ChevronRight, Play, Pause } from "lucide-react";
import stories from "../data/stories";
import CulturalPlatformFooter from "../components/CulturalPlatformFooter.jsx";
import Navbar from "../components/Navbar";

const StoryTeller = () => {
  const [category, setCategory] = useState("historical");
  const [story, setStory] = useState(null);
  const [lang, setLang] = useState("mr"); // default Marathi
  const [favorites, setFavorites] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("marathi");
  const [showFullStory, setShowFullStory] = useState(false);
  const [voices, setVoices] = useState([]);
  const [speechSupported, setSpeechSupported] = useState(true);
  const speechRef = useRef(null);

  const canUseSpeech = typeof window !== "undefined" &&
    !!window.speechSynthesis &&
    typeof window.SpeechSynthesisUtterance !== "undefined";

  const normalizeStoryText = (text) => {
    if (!text) return "";
    return text
      .trim()
      .replace(/\s*\n+\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getCurrentStoryText = () => story ? normalizeStoryText(story.story[lang]) : "";

  useEffect(() => {
    if (!canUseSpeech) {
      setSpeechSupported(false);
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices() || [];
      if (availableVoices.length) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    const intervalId = window.setInterval(loadVoices, 500);
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.clearInterval(intervalId);
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [canUseSpeech]);

  useEffect(() => {
    if (!story && isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    }
  }, [story, isPlaying]);

  const getVoiceBySelection = () => {
    if (!voices.length) return null;

    const locale = selectedVoice === "marathi" ? "mr" : "en";
    return (
      voices.find((voice) => voice.lang.toLowerCase().startsWith(locale)) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("hi")) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ||
      voices[0]
    );
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    speechRef.current = null;
    setIsPlaying(false);
  };

  const speakStory = () => {
    if (!story) return;
    if (!canUseSpeech) {
      setSpeechSupported(false);
      console.warn("Speech synthesis not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const text = getCurrentStoryText();
    if (!text) {
      console.warn("No story text is available for speech.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selected = getVoiceBySelection();

    if (selected) {
      utterance.voice = selected;
      utterance.lang = selected.lang;
    } else {
      utterance.lang = selectedVoice === "marathi" ? "mr-IN" : "en-US";
    }

    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
    };
    utterance.onend = () => {
      setIsPlaying(false);
    };
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsPlaying(false);
    };

    speechRef.current = utterance;
    synth.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      speakStory();
    }
  };

  const toggleLang = () => setLang(lang === "mr" ? "en" : "mr");
  const toggleFavorite = () => {
    if (story && !favorites.includes(story.title[lang])) {
      setFavorites([...favorites, story.title[lang]]);
    } else if (story) {
      setFavorites(favorites.filter(fav => fav !== story.title[lang]));
    }
  };

  const shareStory = () => {
    if (story) {
      navigator.share?.({
        title: story.title[lang],
        text: normalizeStoryText(story.story[lang]).substring(0, 100) + "...",
        url: window.location.href
      });
    }
  };

  const generateStory = () => {
    const list = stories[category] || stories[Object.keys(stories)[0]] || [];
    if (!list.length) {
      console.warn("No stories available for generation.");
      return;
    }

    const randomStory = list[Math.floor(Math.random() * list.length)];
    setStory(randomStory);
    setShowFullStory(false);
  };

  const storyText = getCurrentStoryText();
  const isLongStory = storyText.length > 300;

  // Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const emojiVariants = {
    hover: { y: [0, -5, 0], transition: { duration: 0.4, repeat: Infinity } },
  };

  return (
    <div className="bg-[#fff7ef] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar language={lang} />

      <motion.div
        className="flex-1 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
      {/* TITLE SECTION */}
      <motion.div
        className="text-center mb-8 w-full max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
          📚 {lang === "mr" ? "कथा संग्रह" : "Story Collection"}
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          {lang === "mr" 
            ? "महाराष्ट्राच्या सांस्कृतिक वारशातील मोत्यांसारख्या कथा" 
            : "Pearls from Maharashtra's Cultural Heritage"}
        </p>

        {/* CONTROLS */}
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {/* LANGUAGE TOGGLE */}
          <motion.button
            onClick={toggleLang}
            whileTap={{ scale: 0.95 }}
className="bg-[#d32f2f] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#b71c1c] transition-colors"          >
            {lang === "mr" ? "English" : "मराठी"}
          </motion.button>

          {/* VOICE SELECTION */}
          <div className="flex flex-col items-start gap-2 bg-white px-4 py-2 rounded-full shadow border">
            <div className="flex items-center gap-2">
               <BookOpen size={16} className="text-orange-600" />
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="outline-none bg-transparent text-sm"
              >
                <option value="marathi">मराठी आवाज</option>
                <option value="english">English Voice</option>
              </select>
            </div>
            {!speechSupported ? (
              <span className="text-xs text-red-500">Audio not available in this browser.</span>
            ) : voices.length === 0 ? (
              <span className="text-xs text-gray-500">Loading voices... If the button stays disabled, refresh the page.</span>
            ) : null}
          </div>

          {/* FAVORITES COUNT */}
          {favorites.length > 0 && (
            <motion.div
              className="flex items-center gap-1 bg-white px-3 py-2 rounded-full shadow border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span className="text-sm font-medium">{favorites.length}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* CATEGORY BUTTONS */}
      <motion.div
        className="flex flex-wrap gap-3 mb-8 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { key: "historical", icon: "⚔️", mr: "ऐतिहासिक", en: "Historical" },
          { key: "folklore", icon: "🎭", mr: "लोककथा", en: "Folklore" },
          { key: "spiritual", icon: "🙏", mr: "आध्यात्मिक", en: "Spiritual" },
          { key: "mythological", icon: "🔱", mr: "पौराणिक", en: "Mythological" },
          { key: "inspirational", icon: "🌟", mr: "प्रेरणादायी", en: "Inspirational" },
          { key: "educational", icon: "📖", mr: "शैक्षणिक", en: "Educational" },
        ].map((cat) => (
          <motion.button
            key={cat.key}
            onClick={() => {
              setCategory(cat.key);
              setStory(null);
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            variants={buttonVariants}
            className={`px-4 py-3 rounded-xl font-semibold flex flex-col items-center w-32 transition-all ${
              category === cat.key 
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" 
                : "bg-white border-2 border-orange-200 hover:border-orange-400"
            }`}
          >
            <motion.span
              className="text-2xl mb-1"
              variants={emojiVariants}
              whileHover="hover"
            >
              {cat.icon}
            </motion.span>
            <span className="text-sm">{lang === "mr" ? cat.mr : cat.en}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* STORY BOX */}
      <AnimatePresence mode="wait">
        <motion.div
          key={story ? story.title[lang] : "placeholder"}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-3xl p-6 md:p-8 w-full max-w-4xl border border-orange-100"
        >
          {story ? (
            <div className="space-y-6">
              {/* STORY HEADER */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-2">
                    {story.title[lang]}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {lang === "mr" ? 
                        (category === "historical" ? "ऐतिहासिक" :
                         category === "folklore" ? "लोककथा" :
                         category === "spiritual" ? "आध्यात्मिक" :
                         category === "mythological" ? "पौराणिक" :
                         category === "inspirational" ? "प्रेरणादायी" : "शैक्षणिक")
                        : category.charAt(0).toUpperCase() + category.slice(1)
                      }
                    </span>
                    <span>📖 {lang === "mr" ? "२ मिनिटे वाचन" : "2 min read"}</span>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={toggleFavorite}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.includes(story.title[lang])
                        ? "bg-red-100 text-red-500"
                        : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    }`}
                  >
                    <Heart size={20} className={favorites.includes(story.title[lang]) ? "fill-current" : ""} />
                  </motion.button>
                  
                  <motion.button
                    onClick={shareStory}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  
                  <motion.button
                    onClick={togglePlay}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </motion.button>
                </div>
              </div>

              {/* STORY CONTENT */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {showFullStory ? storyText : storyText.substring(0, 300) + "..."}
                </p>
                
                {isLongStory && (
                  <motion.button
                    onClick={() => setShowFullStory(!showFullStory)}
                    whileTap={{ scale: 0.95 }}
                    className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 mt-3"
                  >
                    {showFullStory ? 
                      (lang === "mr" ? "कमी दाखवा" : "Show less") : 
                      (lang === "mr" ? "पूर्ण कथा वाचा" : "Read full story")
                    }
                    <ChevronRight size={16} className={`transform transition-transform ${showFullStory ? "rotate-90" : ""}`} />
                  </motion.button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {lang === "mr" ? "कथा निवडा" : "Select a Story"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {lang === "mr"
                  ? "खालील बटणावर क्लिक करून एक कथा निवडा"
                  : "Click the button below to generate a story"}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* GENERATE BUTTON WITH PULSE */}
      <motion.button
        onClick={generateStory}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }}
        className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <span className="flex items-center gap-2">
          <BookOpen size={20} />
          {lang === "mr" ? "नवीन कथा तयार करा" : "Generate New Story"}
        </span>
      </motion.button>

      </motion.div>


      

      {/* FOOTER */}
      <CulturalPlatformFooter />
    </div>
  );
};

export default StoryTeller;

// export default StoryTeller;
