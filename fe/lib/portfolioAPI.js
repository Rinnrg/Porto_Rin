// API Service for Portfolio Data
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class PortfolioAPI {
  async fetchWithErrorHandling(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Get complete portfolio data
  async getPortfolio() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio`);
  }

  // Get profile data
  async getProfile() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/profile`);
  }

  // Get work experiences
  async getExperiences() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/experiences`);
  }

  // Get education
  async getEducation() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/education`);
  }

  // Get skills
  async getSkills() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/skills`);
  }

  // Get projects
  async getProjects() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/projects`);
  }

  // Get single project
  async getProject(slug) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/projects/${slug}`);
  }

  // Get services
  async getServices() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/services`);
  }

  // Get testimonials
  async getTestimonials() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/portfolio/testimonials`);
  }

  // Submit contact form
  async submitContact(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }

      return data;
    } catch (error) {
      console.error('Contact Form Error:', error);
      throw error;
    }
  }

  // Test API connection
  async testConnection() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/test`);
  }

  // Test database connection
  async testDatabase() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/test-db`);
  }
}

// Create singleton instance
const portfolioAPI = new PortfolioAPI();

export default portfolioAPI;
