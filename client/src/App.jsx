import Home from "./pages/Home";

function App() {
  return <Home />;
}

export default App;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [formData, setFormData] = useState({ topic: '', niche: '', platform: 'Instagram Reel', style: 'Energetic' });
//   const [scripts, setScripts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   // 1. Fetch Dashboard Data
//   const fetchScripts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/my-scripts');
//       setScripts(res.data);
//     } catch (err) { console.error("Fetch error", err); }
//   };

//   useEffect(() => { fetchScripts(); }, []);

//   // 2. Handle Generation
//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/generate-script', formData);
//       setResult(res.data.output);
//       fetchScripts(); // Update dashboard automatically
//     } catch (err) {
//       alert("AI Generation failed. Check if server is running!");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <header>
//         <h1><span>Creator Studio</span></h1>
//       </header>

//       <main className="grid">
//         {/* SECTION 1: THE GENERATOR */}
//         <section className="card">
//           <h2>Create Viral Content</h2>
//           <form onSubmit={handleGenerate}>
//             <input type="text" placeholder="Topic (e.g. AI Coding)" onChange={(e) => setFormData({...formData, topic: e.target.value})} required />
//             <input type="text" placeholder="Niche (e.g. Tech)" onChange={(e) => setFormData({...formData, niche: e.target.value})} />
//             <select onChange={(e) => setFormData({...formData, platform: e.target.value})}>
//               <option>Instagram Reel</option>
//               <option>TikTok</option>
//               <option>YouTube Short</option>
//             </select>
//             <button type="submit" disabled={loading}>
//               {loading ? "Magic in progress..." : "Generate Script"}
//             </button>
//           </form>

//           {result && (
//             <div className="result-area">
//               <h3>{result.title}</h3>
//               <div className="hook-box"><strong>Hook:</strong> {result.hook}</div>
//               <p><strong>Script:</strong> {result.scriptBody}</p>
//               <div className="tags">{result.hashtags?.map(t => `#${t} `)}</div>
//             </div>
//           )}
//         </section>

//         {/* SECTION 2: THE DASHBOARD */}
//         <section className="card dashboard">
//           <h2>Recent Projects</h2>
//           <div className="script-list">
//             {scripts.map((s, i) => (
//               <div key={i} className="list-item">
//                 <p><strong>{s.topic}</strong> - {s.platform}</p>
//                 <span>{new Date(s.createdAt).toLocaleDateString()}</span>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;