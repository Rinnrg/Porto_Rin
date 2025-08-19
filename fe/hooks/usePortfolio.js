import { useState, useEffect } from 'react';
import portfolioAPI from '@/lib/portfolioAPI';

// Hook for complete portfolio data
export function usePortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getPortfolio();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Hook for profile data
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getProfile();
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading, error };
}

// Hook for experiences
export function useExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getExperiences();
        setExperiences(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return { experiences, loading, error };
}

// Hook for education
export function useEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEducation() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getEducation();
        setEducation(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setEducation([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  return { education, loading, error };
}

// Hook for skills
export function useSkills() {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getSkills();
        setSkills(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSkills(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, loading, error };
}

// Hook for projects
export function useProjects() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getProjects();
        setProjects(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProjects(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

// Hook for single project
export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchProject() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getProject(slug);
        setProject(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  return { project, loading, error };
}

// Hook for services
export function useServices() {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getServices();
        setServices(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setServices(null);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}

// Hook for testimonials
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const response = await portfolioAPI.getTestimonials();
        setTestimonials(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTestimonials(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}

// Hook for contact form submission
export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitContact = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await portfolioAPI.submitContact(formData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return { submitContact, loading, error, success, resetForm };
}
