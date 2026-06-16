
import React, { useState } from "react";
import { Music, Landmark, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CulturalPlatformFooter from "../components/CulturalPlatformFooter";

const HomePage = () => {
  const [isEnglish, setIsEnglish] = useState(false);

  const marathi = {
    title: "🎵 गीतसंस्कृती मंच",
    subtitle: "Cultural AI Platform for Maharashtra",
    aiTag: "🎶 बुद्धिमत्ता आणि लोककलेचा संगम",
    heading: "महाराष्ट्राच्या संस्कृतीचा आनंद अनुभवाआ",
    paragraph:
      "मराठी लोककथा, सण, कला आणि स्वाद यांना एआयच्या सहकार्याने एका ठिकाणी आणा. आपल्या वारशाची साक्ष सांभाळण्यासाठी आमच्या समुदायात सहभागी व्हा.",
    readEnglish: "Read in English",
    // exploreSongs: "लोकगीत शोधा 🎵",
    // exploreCulture: "संस्कृतीचा प्रवास 🌸",
    // StoryTeller: "कथा प्रवाह 🧠",
    stat1: "लोकगीते",
    stat2: "संस्कृती परंपरा",
    stat3: "समुदाय सदस्य",
    featuredSongs: "प्रसिद्ध लोकगीते",
    whyJoinUs: "आमच्यात का सामील व्हा?",
    whyJoinSubtitle: "मराठी लोकपरंपरेचा प्रवास एकत्र करू या.",
    whyJoinDescription: "लोकसंग्रह, कला आणि कथेच्या माध्यमातून आपली ओळख आणि वारसा जतन करा.",
    learnCulture: "खरी संस्कृती शिका",
    learnCultureDesc: "संपूर्ण महाराष्ट्रातील लोककला आणि सणांची खरी ओळख मिळवा.",
    communityConnect: "समुदायाशी जुडा",
    communityConnectDesc: "सांस्कृतिक उत्सव आणि कथा सांगणार्‍या लोकांशी घनिष्ठ संबंध निर्माण करा.",
    preserveHeritage: "वारसा जतन करा",
    preserveHeritageDesc: "परंपरा, गाणी आणि कला पुढील पिढ्यांसाठी राखून ठेवा.",
    shareKnowledge: "ज्ञान शेअर करा",
    shareKnowledgeDesc: "आपले अनुभव शेअर करा आणि समुदायाला नवसंजीवनी द्या.",
    featuredTitle: "विशेष अनुभव",
    featuredSubtitle: "AI साधनांद्वारे महाराष्ट्र अनुभव करा",
    feat1Title: "AI लोकगीत ओळख",
    feat1Desc: "लिरिक्स अपलोड करा आणि मराठी लोकगीत शैली तत्काळ ओळखा.",
    feat2Title: "सांस्कृतिक ज्ञान",
    feat2Desc: "सण, परंपरा आणि क्षेत्रीय परंपरा शोधा.",
    feat3Title: "AI कथा सांगणारा",
    feat3Desc: "परंपरागत कथा आणि ऐतिहासिक बातम्या ऐका.",
    feat4Title: "ऐतिहासिक कालरेषा",
    feat4Desc: "महाराष्ट्राच्या समृद्ध सांस्कृतिक इतिहासात प्रवास करा.",
  };

  const english = {
    title: "🎵 Maharashtra Cultural Platform",
    subtitle: "Cultural AI Platform for Maharashtra",
    aiTag: "🎶 A bridge between AI and folk culture",
    heading: "Experience Maharashtra’s living heritage",
    paragraph:
      "Uncover Marathi folk songs, festivals, traditions, and cuisine with AI guidance. Join the community preserving Maharashtra’s rich cultural tapestry.",
    readEnglish: " Read in Marathi",
    // exploreSongs: "Discover Folk Songs 🎵",
    // exploreCulture: "Journey through Culture 🌸",
    // StoryTeller: "Story Teller🧠",
    whyJoinUs: "Why Join Us?",
    whyJoinDescription: "Preserve stories, art, and traditions through a shared cultural community.",
    stat1: "Folk Songs",
    stat2: "Cultural Traditions",
    stat3: "Community Members",
    learnCulture: "Learn Authentic Culture",
    learnCultureDesc: "Discover the real folk art, festivals and traditions of Maharashtra.",
    communityConnect: "Connect with Community",
    communityConnectDesc: "Build meaningful ties with storytellers, artists and heritage keepers.",
    preserveHeritage: "Preserve Heritage",
    preserveHeritageDesc: "Keep songs, rituals and cultural wisdom alive for future generations.",
    shareKnowledge: "Share Knowledge",
    shareKnowledgeDesc: "Share your heritage and inspire others with your cultural story.",
    featuredTitle: "Featured Experiences",
    featuredSubtitle: "Experience Maharashtra through modern AI tools blended with rich cultural traditions.",
    feat1Title: "AI Folk Song Recognition",
    feat1Desc: "Upload lyrics and identify Marathi folk song genres instantly.",
    feat2Title: "Cultural Knowledge",
    feat2Desc: "Explore festivals, rituals, costumes, and regional traditions.",
    feat3Title: "AI Story Teller",
    feat3Desc: "Listen to traditional stories and historical narratives.",
    feat4Title: "Historical Timeline",
    feat4Desc: "Travel through Maharashtra’s rich cultural history.",
  };

  const text = isEnglish ? english : marathi;

  return (
    <div className="bg-[#fff7ef] min-h-screen font-[Poppins,'Noto Sans Devanagari',sans-serif] flex flex-col">
      {/* Navbar */}
      <header className="bg-[#d32f2f] text-white flex flex-col md:flex-row justify-between items-center px-6 md:px-14 py-5 shadow-lg text-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide">{text.title}</h1>
          <p className="text-sm md:text-base font-light">{text.subtitle}</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-5 mt-3 md:mt-0 text-base md:text-lg font-medium">
          <Link to="/predict" className="hover:underline flex items-center gap-1">
            <Music size={18} /> लोकगीते / Folk Songs
          </Link>

          <Link to="/timeline" className="hover:underline flex items-center gap-1">
            <Clock size={18} /> कालरेषा / Timeline
          </Link>

          <Link to="/cultureexplorer" className="hover:underline flex items-center gap-1">
            <Landmark size={18} /> संस्कृती अन्वेषक / Culture Explorer
          </Link>

          <Link
            to="/contribution"
            className="bg-white text-[#d32f2f] font-semibold px-5 py-2 rounded-lg hover:bg-[#ffe1e1] transition shadow-md"
          >
            योगदान द्या / Contribute
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-12 flex-1">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <p className="text-[#d32f2f] font-semibold text-base md:text-lg">{text.aiTag}</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            {text.heading}
          </h1>
          <div className="w-36 h-3 bg-[#ffc107] mx-auto md:mx-0 rounded"></div>
          <p className="text-lg text-gray-700 leading-relaxed mt-3">{text.paragraph}</p>

          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="text-[#d32f2f] font-semibold hover:underline block text-base md:text-lg"
          >
            {text.readEnglish}
          </button>

          {/* <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-5">
            <Link
              to="/predict"
              className="bg-[#d32f2f] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#b71c1c] transition text-base md:text-lg"
            >
              {text.exploreSongs}
            </Link>
            <Link
              to="/cultureexplorer"
              className="bg-[#ffcc80] text-gray-900 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#ffb74d] transition text-base md:text-lg"
            >
              {text.exploreCulture}
            </Link>
             <Link
              to="/storytelling"
              className="bg-[#507d2a] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#3e5d1f] transition text-lg"
            >
              {text.StoryTeller}
            </Link>

          </div> */}

        </div>

        {/* Enlarged & Animated Image Section */}
        <motion.div
          className="flex-1 mt-10 md:mt-0 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffcc80]">
            <img
              src="/images/Festive1.jpeg"
              alt="Marathi cultural celebration"
              className="w-full max-w-2xl h-[450px] md:h-[550px] object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm md:text-base p-3 rounded-lg">
              पारंपरिक ताळविणी उत्सव <br />
              महाराष्ट्राची जीवनशैली आणि कला
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#d32f2f]">{text.featuredTitle}</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">{text.featuredSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {[
            { icon: "🎵", title: text.feat1Title, desc: text.feat1Desc, to: "/predict" },
            { icon: "📚", title: text.feat2Title, desc: text.feat2Desc, to: "/cultureexplorer" },
            { icon: "🎙️", title: text.feat3Title, desc: text.feat3Desc, to: "/storytelling" },
            { icon: "⏳", title: text.feat4Title, desc: text.feat4Desc, to: "/timeline" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#fff7ef] p-8 rounded-2xl shadow-lg border border-[#ffe0b2] flex flex-col justify-between"
              whileHover={{ y: -6 }}
            >
              <div>
                <div className="bg-[#fff7ef] inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-2xl">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#d32f2f] mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
              </div>
              <div>
                <Link to={item.to} className="text-[#d32f2f] font-semibold">Explore <span className="text-xl">›</span></Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#fff3e0] py-10 px-6 flex flex-wrap justify-center gap-6">
        <div className="bg-white w-40 p-5 rounded-2xl shadow text-center">
          <div className="text-3xl">🎶</div>
          <h2 className="text-[#d32f2f] text-2xl font-bold mt-1">500+</h2>
          <p className="text-gray-600">{text.stat1}</p>
        </div>

        <div className="bg-white w-40 p-5 rounded-2xl shadow text-center">
          <div className="text-3xl">👑</div>
          <h2 className="text-[#d32f2f] text-2xl font-bold mt-1">200+</h2>
          <p className="text-gray-600">{text.stat2}</p>
        </div>

        <div className="bg-white w-40 p-5 rounded-2xl shadow text-center">
          <div className="text-3xl">🧑‍🤝‍🧑</div>
          <h2 className="text-[#d32f2f] text-2xl font-bold mt-1">100+</h2>
          <p className="text-gray-600">{text.stat3}</p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="text-center mb-12">
          <p className="text-[#d32f2f] font-bold text-xl md:text-2xl">{text.whyJoinUs}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">
            {text.whyJoinSubtitle}
          </h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            {text.whyJoinDescription}
          </p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "📚", title: text.learnCulture, desc: text.learnCultureDesc },
            { icon: "🤝", title: text.communityConnect, desc: text.communityConnectDesc },
            { icon: "🏛️", title: text.preserveHeritage, desc: text.preserveHeritageDesc },
            { icon: "💡", title: text.shareKnowledge, desc: text.shareKnowledgeDesc },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="bg-[#fff7ef] p-8 rounded-3xl shadow-lg border border-[#ffe0b2] hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300"
              whileHover={{ y: -6 }}
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h3 className="text-2xl font-bold text-[#d32f2f] mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
        {/* Footer */}
      <CulturalPlatformFooter />
    </div>
  );
};

export default HomePage;