// UnifiedAboutAPI service untuk AboutMe (adaptasi dari pola api.ts)
export interface UnifiedSection {
  id: string;
  sectionTitle: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  imageCaption?: string;
  type?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const getHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (includeAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const unifiedAboutAPI = {
  async uploadLogo(file: File) {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await fetch(`${API_BASE_URL}/unified-about/upload-logo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload logo');
    const data = await response.json();
    return data.url || data.logo || data.path;
  },
  async getAllSections() {
    const response = await fetch(`${API_BASE_URL}/unified-about`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch sections');
    return response.json();
  },
  async createSection(data: Partial<UnifiedSection>) {
    const response = await fetch(`${API_BASE_URL}/unified-about`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create section');
    return response.json();
  },
  async updateSection(id: string, data: Partial<UnifiedSection>) {
    // Map frontend fields to backend fields
    const payload: any = {
      section_title: data.sectionTitle || data.section_title,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      image: data.image,
      image_caption: data.imageCaption,
      type: data.type,
    };
    // Remove undefined fields
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);
    const response = await fetch(`${API_BASE_URL}/unified-about/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to update section');
    return response.json();
  },
  async deleteSection(id: string) {
    const response = await fetch(`${API_BASE_URL}/unified-about/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete section');
    return response.json();
  },
};

export default unifiedAboutAPI;
