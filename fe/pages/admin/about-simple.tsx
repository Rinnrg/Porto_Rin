export default function AdminAboutSimple() {
  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Admin About Me - Simple Version</h1>
      <p>Halaman admin about me berhasil dimuat!</p>
      <p>URL: http://localhost:3000/admin/about-simple</p>
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Status Check:</h2>
        <ul>
          <li>✅ Next.js Server: Running on port 3000</li>
          <li>✅ Page Routing: Working</li>
          <li>✅ File Structure: Correct</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/admin/about-me" style={{ 
          padding: '10px 20px', 
          background: '#0070f3', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}>
          Try Full About Me Page
        </a>
      </div>
    </div>
  );
}
