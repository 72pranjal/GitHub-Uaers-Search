
export default function ({ $axios }) {
    // Set GitHub API base URL
    $axios.defaults.baseURL = 'https://api.github.com';
  
    // Add authentication token to request headers
    $axios.onRequest(config => {
      console.log("process.env.GITHUB_ACCESS_TOKEN", process.env.GITHUB_ACCESS_TOKEN);
      const token = process.env.GITHUB_ACCESS_TOKEN; // Retrieve token from environment variable
      if (token) {
        config.headers.Authorization = `token ${token}`;
      }
      return config;
    });
  }
  