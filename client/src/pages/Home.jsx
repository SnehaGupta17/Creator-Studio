// import { useState } from "react";

// function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");

//   const handleGenerate = async () => {
//     const res = await fetch("http://localhost:5000/api/auth/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt }),
//     });

//     const data = await res.json();

//     setResult(data.response);
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>AI Content Generator</h1>

//       <textarea
//         rows="6"
//         cols="50"
//         placeholder="Enter prompt..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={handleGenerate}>
//         Generate
//       </button>

//       <h3>Output:</h3>

//       <p>{result}</p>
//     </div>
//   );
// }

// export default Home;

import { useState } from "react";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [image, setImage] = useState(""); // New state for image
  const [loading, setLoading] = useState(false);

  // 1. Text Generation
  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/auth/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.response);
    setLoading(false);
  };

  // 2. Image Generation
  

    const handleGenerateImage = async () => {
    setLoading(true);
    try {
        const res = await fetch("http://localhost:5000/api/auth/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        });
        const data = await res.json();

        if (data.imageBase64) {
        setImage(`data:image/png;base64,${data.imageBase64}`);
        } else if (data.fallbackUrl) {
        setImage(data.fallbackUrl); // Shows the Unsplash placeholder
        console.log(data.message);
        }
    } catch (err) {
        setImage("https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800");
    }
    setLoading(false);
    };

  return (
    <div className="grid-container">
      <header style={{ gridColumn: '1 / -1', textAlign: 'center', marginBottom: '30px' }}>
        <h1>Creators Studio 🚀</h1>
        <p style={{ color: '#94a3b8' }}>Generate scripts and visuals in seconds</p>
      </header>

      {/* INPUT CARD */}
      <section className="creator-card">
        <h2>Content Lab</h2>
        <textarea
          className="custom-textarea"
          rows="4"
          placeholder="Enter your topic (e.g., Morning Coffee Vlog)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '100%', backgroundColor: '#0f172a', color: 'white', borderRadius: '12px', padding: '15px', border: '1px solid #334155' }}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button className="gen-button" onClick={handleGenerate} disabled={loading}>
            {loading ? "Thinking..." : "📜 Get Script"}
          </button>
          
          <button 
            className="gen-button" 
            onClick={handleGenerateImage} 
            disabled={loading}
            style={{ background: '#10b981' }}
          >
            {loading ? "Painting..." : "🎨 Get Thumbnail"}
          </button>
        </div>

        {/* IMAGE DISPLAY */}
        {image && (
          <div className="output-box" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '10px' }}>AI Generated Visual</h3>
            <img 
              src={`data:image/png;base64,${image}`} 
              alt="Generated Content" 
              style={{ width: '100%', borderRadius: '12px', border: '1px solid #6366f1' }} 
            />
          </div>
        )}
      </section>

      {/* SCRIPT DISPLAY */}
      <section className="creator-card">
        <h2>Final Script</h2>
        {result ? (
          <div className="output-box" style={{ whiteSpace: 'pre-wrap', textAlign: 'left', minHeight: '200px' }}>
            {result}
          </div>
        ) : (
          <div style={{ color: '#64748b', textAlign: 'center', marginTop: '50px' }}>
            Enter a prompt to see the magic happen.
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;