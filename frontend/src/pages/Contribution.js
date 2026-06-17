// import React, { useEffect, useState } from "react";
// import { Heart, MessageCircle, Share2, Music, Clock, Landmark } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import CulturalPlatformFooter from "../components/CulturalPlatformFooter";
// import Navbar from "../components/Navbar";
// import { useAuth } from "../context/AuthContext";

// const Contribution = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [language, setLanguage] = useState("mr");
//   const [showComments, setShowComments] = useState({});
//   const [commentText, setCommentText] = useState({});
//   const [comments, setComments] = useState({});

//   const handleShareKnowledge = () => {
//     if (isLoggedIn) {
//       navigate('/communityform');
//     } else {
//       navigate('/login');
//     }
//   };

//   const handleLike = async (postId) => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(`http://localhost:5000/api/community/${postId}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setPosts(posts.map(post => 
//         post._id === postId ? { ...post, likes: res.data.likes } : post
//       ));
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleComment = async (postId) => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }
    
//     if (!commentText[postId]?.trim()) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(`http://localhost:5000/api/community/${postId}/comment`, {
//         text: commentText[postId]
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setComments({ ...comments, [postId]: res.data.comments });
//       setCommentText({ ...commentText, [postId]: "" });
      
//       setPosts(posts.map(post => 
//         post._id === postId ? { ...post, comments: res.data.comments.length } : post
//       ));
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const handleShare = async (postId) => {
//     try {
//       const res = await axios.post(`http://localhost:5000/api/community/${postId}/share`);
      
//       setPosts(posts.map(post => 
//         post._id === postId ? { ...post, shares: res.data.shares } : post
//       ));
      
//       const shareUrl = `${window.location.origin}/contribution/${postId}`;
//       if (navigator.share) {
//         await navigator.share({
//           title: 'Check out this contribution',
//           text: 'Amazing cultural content!',
//           url: shareUrl
//         });
//       } else {
//         navigator.clipboard.writeText(shareUrl);
//         alert('Link copied to clipboard!');
//       }
//     } catch (error) {
//       console.error("Error sharing post:", error);
//     }
//   };

//   const toggleComments = async (postId) => {
//     if (showComments[postId]) {
//       setShowComments({ ...showComments, [postId]: false });
//     } else {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/community/${postId}/comments`);
//         setComments({ ...comments, [postId]: res.data.comments });
//         setShowComments({ ...showComments, [postId]: true });
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     }
//   };

//   const marathi = {
//     title: "सामुदायिक ज्ञान केंद्र",
//    // subtitle: "Community Knowledge Hub",
//     description: "महाराष्ट्राची संस्कृती, परंपरा, पाकविधी आणि कथांचे तुमचे ज्ञान सामायिक करा. मिळून आपण आपला वारसा भविष्यासाठी जपूया.",
//     readEnglish: "Read in English",
//     contributeButton: "ज्ञान सामायिक करा +",
//     //loadMoreButton: "अधिक योगदान लोड करा",
//     categories: ["All", "कथा", "पाककृती", "कला", "हस्तकला"],
//     byText: "द्वारे",
//     likesText: "लाईक्स",
//     commentsText: "कमेंट्स",
//     shareText: "शेअर करा"
//   };

//   const english = {
//     title: "Community Knowledge Hub",
//    // subtitle: "सामुदायिक ज्ञान केंद्र",
//     description: "Share your knowledge of Maharashtra's culture, traditions, cuisine, and stories. Together, let's preserve our heritage for future.",
//     readEnglish: "मराठीत वाचा",
//     contributeButton: "Share Knowledge +",
//    // loadMoreButton: "Load More Contributions",
//     categories: ["All", "Story", "Recipe", "Art", "Handicraft"],
//     byText: "by",
//     likesText: "Likes",
//     commentsText: "Comments",
//     shareText: "Share"
//   };

//   const text = language === "mr" ? marathi : english;
//   const categories = text.categories;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/community/all");
//         setPosts(res.data);
//       } catch (err) {
//         console.log("Error fetching data");
//       }
//     };

//     fetchPosts();
//   }, []);

//   const filteredPosts =
//     categoryFilter === "All"
//       ? posts
//       : posts.filter((p) => p.category.includes(categoryFilter));

//   return (
//     <div className="bg-[#fff7ef] min-h-screen flex flex-col">

//       {/* NAVBAR (Same as HomePage) */}
//       <Navbar language={language} />

//       {/* TOP TITLE */}
//       <header className="text-center py-10">
//         {/* Language Toggle */}
//         <button
//           onClick={() => setLanguage(language === "mr" ? "en" : "mr")}
//           className="bg-[#d32f2f] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#b71c1c] transition-colors"
//         >
//           {language === "mr" ? "English" : "मराठी"}
//         </button>
//         <header className="text-center py-2"></header>
//         <h1 className="text-4xl font-bold text-[#1a1a1a]">
//           <span className="text-[#e36414]">{text.title}</span>
//         </h1>
//         <p className="text-gray-600 mt-3 text-lg max-w-3xl mx-auto">
//           {text.description}
//         </p>

//         {/* BUTTONS */}
//         <div className="flex justify-center gap-3 mt-6">
//           <button className="px-5 py-2 rounded-full bg-white border shadow-sm flex items-center gap-2" disabled>
//             👤 {language === "mr" ? "योगदान पाहा" : "View Contributions"}
//           </button>
          
//           <button
//             onClick={handleShareKnowledge}
//             className="px-5 py-2 rounded-full bg-[#e36414] text-white shadow-sm flex items-center gap-2 hover:bg-[#d32f2f] transition"
//           >
//             📝 {language === "mr" ? "ज्ञान सामायिक करा +" : "Share Your Knowledge +"}
//           </button>
//         </div>
//       </header>

//       {/* FILTERS */}
//       <div className="flex justify-center flex-wrap gap-3 mt-4 mb-6">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategoryFilter(cat)}
//             className={`px-4 py-1 rounded-full text-sm border ${
//               categoryFilter === cat ? "bg-[#e36414] text-white" : "bg-white text-[#e36414]"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* CARDS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto p-5">
//         {filteredPosts.map((post) => (
//           <div
//             key={post._id}
//             className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200"
//           >
//             <div className="flex items-center gap-3">
//               <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
//                 {post.author?.charAt(0)}
//               </div>
//               <div>
//                 <h3 className="font-bold text-lg">{post.title}</h3>
//                 <p className="text-gray-600 text-sm">
//                   {text.byText} {post.author} • {post.location} • {post.time}
//                 </p>
//               </div>
//               <span className="ml-auto bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
//                 {post.category}
//               </span>
//             </div>

//             <p className="text-gray-700 mt-4 leading-relaxed">
//               {post.content.slice(0, 120)}...
//             </p>

//             {/* Display Images */}
//             {post.images && post.images.length > 0 && (
//               <div className="mt-4">
//                 <div className="flex flex-wrap gap-2">
//                   {post.images.map((image, index) => (
//                     <img
//                       key={index}
//                       src={`http://localhost:5000${image}`}
//                       alt=""
//                       className="h-24 w-24 object-cover rounded-md border cursor-pointer hover:opacity-80 transition"
//                       onClick={() => window.open(`http://localhost:5000${image}`, '_blank')}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-between items-center mt-5 pt-3 border-t">
//               <div className="flex gap-4 text-gray-600">
//                 <button 
//                   onClick={() => handleLike(post._id)}
//                   className="flex items-center gap-1 hover:text-red-500 transition"
//                 >
//                   <Heart size={18} /> {post.likes?.length || 0}
//                 </button>
//                 <button 
//                   onClick={() => toggleComments(post._id)}
//                   className="flex items-center gap-1 hover:text-blue-500 transition"
//                 >
//                   <MessageCircle size={18} /> {post.comments?.length || 0}
//                 </button>
//               </div>
//               <button 
//                 onClick={() => handleShare(post._id)}
//                 className="flex items-center gap-1 text-gray-700 hover:underline"
//               >
//                 <Share2 size={18} /> {text.shareText}
//               </button>
//             </div>

//             {/* Comments Section */}
//             {showComments[post._id] && (
//               <div className="mt-4 pt-4 border-t">
//                 <div className="space-y-3 max-h-60 overflow-y-auto">
//                   {comments[post._id]?.map((comment, index) => (
//                     <div key={index} className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center gap-2 mb-1">
//                         <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
//                           {comment.author?.charAt(0)}
//                         </div>
//                         <span className="font-medium text-sm">{comment.author}</span>
//                         <span className="text-xs text-gray-500">
//                           {new Date(comment.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-700">{comment.text}</p>
//                     </div>
//                   ))}
//                 </div>
                
//                 {isLoggedIn && (
//                   <div className="mt-3 flex gap-2">
//                     <input
//                       type="text"
//                       value={commentText[post._id] || ""}
//                       onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
//                       placeholder={language === "mr" ? "टिप्पणी लिहा..." : "Write a comment..."}
//                       className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//                       onKeyPress={(e) => e.key === 'Enter' && handleComment(post._id)}
//                     />
//                     <button
//                       onClick={() => handleComment(post._id)}
//                       className="px-4 py-2 bg-[#e36414] text-white rounded-lg text-sm hover:bg-[#d32f2f] transition"
//                     >
//                       {language === "mr" ? "पोस्ट" : "Post"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

      
//          {/* ------------------ FOOTER ------------------ */}
//             <CulturalPlatformFooter />
//     </div>
//   );
// };

// export default Contribution;


import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CulturalPlatformFooter from "../components/CulturalPlatformFooter";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Contribution = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [posts, setPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [language, setLanguage] = useState("mr");
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});

  const handleShareKnowledge = () => {
    if (isLoggedIn) {
      navigate("/communityform");
    } else {
      navigate("/login");
    }
  };

  const handleLike = async (postId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.REACT_APP_NODE_API}/api/community/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!commentText[postId]?.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.REACT_APP_NODE_API}/api/community/${postId}/comment`,
        {
          text: commentText[postId],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments({ ...comments, [postId]: res.data.comments });
      setCommentText({ ...commentText, [postId]: "" });

      setPosts(
        posts.map((post) =>
          post._id === postId
            ? { ...post, comments: res.data.comments.length }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleShare = async (postId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_NODE_API}/api/community/${postId}/share`
      );

      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, shares: res.data.shares } : post
        )
      );

      const shareUrl = `${window.location.origin}/contribution/${postId}`;

      if (navigator.share) {
        await navigator.share({
          title: "Check out this contribution",
          text: "Amazing cultural content!",
          url: shareUrl,
        });
      } else {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const toggleComments = async (postId) => {
    if (showComments[postId]) {
      setShowComments({ ...showComments, [postId]: false });
    } else {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_NODE_API}/api/community/${postId}/comments`
        );

        setComments({ ...comments, [postId]: res.data.comments });
        setShowComments({ ...showComments, [postId]: true });
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  const marathi = {
    title: "सामुदायिक ज्ञान केंद्र",
    description:
      "महाराष्ट्राची संस्कृती, परंपरा, पाकविधी आणि कथांचे तुमचे ज्ञान सामायिक करा. मिळून आपण आपला वारसा भविष्यासाठी जपूया.",
    categories: ["All", "कथा", "पाककृती", "कला", "हस्तकला"],
    byText: "द्वारे",
    shareText: "शेअर करा",
  };

  const english = {
    title: "Community Knowledge Hub",
    description:
      "Share your knowledge of Maharashtra's culture, traditions, cuisine, and stories. Together, let's preserve our heritage for future.",
    categories: ["All", "Story", "Recipe", "Art", "Handicraft"],
    byText: "by",
    shareText: "Share",
  };

  const text = language === "mr" ? marathi : english;
  const categories = text.categories;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_NODE_API}/api/community/all`
        );
        setPosts(res.data);
      } catch (err) {
        console.log("Error fetching data");
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    categoryFilter === "All"
      ? posts
      : posts.filter((p) => p.category.includes(categoryFilter));

  return (
    <div className="bg-[#fff7ef] min-h-screen flex flex-col">
      <Navbar language={language} />

      <header className="text-center py-10">
        <button
          onClick={() => setLanguage(language === "mr" ? "en" : "mr")}
          className="bg-[#d32f2f] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#b71c1c] transition-colors"
        >
          {language === "mr" ? "English" : "मराठी"}
        </button>

        <header className="text-center py-2"></header>

        <h1 className="text-4xl font-bold text-[#1a1a1a]">
          <span className="text-[#e36414]">{text.title}</span>
        </h1>

        <p className="text-gray-600 mt-3 text-lg max-w-3xl mx-auto">
          {text.description}
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            className="px-5 py-2 rounded-full bg-white border shadow-sm flex items-center gap-2"
            disabled
          >
            👤 {language === "mr" ? "योगदान पाहा" : "View Contributions"}
          </button>

          <button
            onClick={handleShareKnowledge}
            className="px-5 py-2 rounded-full bg-[#e36414] text-white shadow-sm flex items-center gap-2 hover:bg-[#d32f2f] transition"
          >
            📝{" "}
            {language === "mr"
              ? "ज्ञान सामायिक करा +"
              : "Share Your Knowledge +"}
          </button>
        </div>
      </header>

      <div className="flex justify-center flex-wrap gap-3 mt-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-1 rounded-full text-sm border ${
              categoryFilter === cat
                ? "bg-[#e36414] text-white"
                : "bg-white text-[#e36414]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto p-5">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                {post.author?.charAt(0)}
              </div>

              <div>
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-gray-600 text-sm">
                  {text.byText} {post.author} • {post.location} • {post.time}
                </p>
              </div>

              <span className="ml-auto bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                {post.category}
              </span>
            </div>

            <p className="text-gray-700 mt-4 leading-relaxed">
              {post.content.slice(0, 120)}...
            </p>

            {post.images && post.images.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${process.env.REACT_APP_NODE_API}${image}`}
                      alt=""
                      className="h-24 w-24 object-cover rounded-md border cursor-pointer hover:opacity-80 transition"
                      onClick={() =>
                        window.open(
                          `${process.env.REACT_APP_NODE_API}${image}`,
                          "_blank"
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-5 pt-3 border-t">
              <div className="flex gap-4 text-gray-600">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center gap-1 hover:text-red-500 transition"
                >
                  <Heart size={18} /> {post.likes?.length || 0}
                </button>

                <button
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center gap-1 hover:text-blue-500 transition"
                >
                  <MessageCircle size={18} /> {post.comments?.length || 0}
                </button>
              </div>

              <button
                onClick={() => handleShare(post._id)}
                className="flex items-center gap-1 text-gray-700 hover:underline"
              >
                <Share2 size={18} /> {text.shareText}
              </button>
            </div>

            {showComments[post._id] && (
              <div className="mt-4 pt-4 border-t">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {comments[post._id]?.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                          {comment.author?.charAt(0)}
                        </div>

                        <span className="font-medium text-sm">
                          {comment.author}
                        </span>

                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>

                {isLoggedIn && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={commentText[post._id] || ""}
                      onChange={(e) =>
                        setCommentText({
                          ...commentText,
                          [post._id]: e.target.value,
                        })
                      }
                      placeholder={
                        language === "mr"
                          ? "टिप्पणी लिहा..."
                          : "Write a comment..."
                      }
                      className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleComment(post._id)
                      }
                    />

                    <button
                      onClick={() => handleComment(post._id)}
                      className="px-4 py-2 bg-[#e36414] text-white rounded-lg text-sm hover:bg-[#d32f2f] transition"
                    >
                      {language === "mr" ? "पोस्ट" : "Post"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <CulturalPlatformFooter />
    </div>
  );
};

export default Contribution;
