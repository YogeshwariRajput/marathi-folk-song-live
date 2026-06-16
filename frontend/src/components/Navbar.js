import React from "react";
import { Link } from "react-router-dom";
import { Music, Clock, Landmark } from "lucide-react";

export default function Navbar({ language = "mr" }) {
  const marathi = {
    title: "🎵 गीतसंस्कृती मंच",
    subtitle: "Cultural AI Platform for Maharashtra",
    folkSongs: "लोकगीते / Folk Songs",
    timeline: "कालरेषा / Timeline",
    cultureExplorer: "संस्कृती अन्वेषक / Culture Explorer",
    contribute: "योगदान द्या / Contribute"
  };

  const english = {
    title: "🎵 Maharashtra Cultural Platform",
    subtitle: "Cultural AI Platform for Maharashtra",
    folkSongs: "लोकगीते / Folk Songs",
    timeline: "कालरेषा / Timeline",
    cultureExplorer: "संस्कृती अन्वेषक / Culture Explorer",
    contribute: "योगदान द्या / Contribute"
  };

  const isEnglish = language === "en" || language === true;
  const text = isEnglish ? english : marathi;

  return (
    <header className="bg-[#d32f2f] text-white flex flex-col md:flex-row justify-between items-center px-6 md:px-14 py-5 shadow-lg text-center">
      <div>
        <h1 className="text-2xl font-extrabold tracking-wide">{text.title}</h1>
        <p className="text-sm md:text-base font-light">{text.subtitle}</p>
      </div>

      <nav className="flex flex-wrap justify-center gap-5 mt-3 md:mt-0 text-base md:text-lg font-medium">
        <Link to="/predict" className="hover:underline flex items-center gap-1">
          <Music size={18} /> {text.folkSongs}
        </Link>

        <Link to="/timeline" className="hover:underline flex items-center gap-1">
          <Clock size={18} /> {text.timeline}
        </Link>

        <Link to="/cultureexplorer" className="hover:underline flex items-center gap-1">
          <Landmark size={18} /> {text.cultureExplorer}
        </Link>

        <Link
          to="/contribution"
          className="bg-white text-[#d32f2f] font-semibold px-5 py-2 rounded-lg hover:bg-[#ffe1e1] transition shadow-md"
        >
          {text.contribute}
        </Link>
      </nav>
    </header>
  );
}
