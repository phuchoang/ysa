interface GitHubRepository {
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  topics: string[];
}

interface UnlockMethod {
  id: string;
  name: string;
  description: string;
  repository: string;
  brand: string;
  lastUpdated: string;
  stars: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isOfficial: boolean;
}

export class GitHubApiService {
  private static readonly API_BASE = 'https://api.github.com';
  
  static async fetchUnlockMethods(brand: string): Promise<UnlockMethod[]> {
    try {
      const queries = [
        `${brand} bootloader unlock`,
        `${brand} unlock tool`,
        `${brand} fastboot unlock`,
        `unlock ${brand}`,
      ];
      
      const allMethods: UnlockMethod[] = [];
      
      for (const query of queries) {
        const repos = await this.searchRepositories(query);
        const methods = this.parseRepositoriesToMethods(repos, brand);
        allMethods.push(...methods);
      }
      
      // Remove duplicates and sort by relevance
      const uniqueMethods = this.removeDuplicates(allMethods);
      return uniqueMethods.sort((a, b) => b.stars - a.stars);
      
    } catch (error) {
      console.error('Failed to fetch unlock methods:', error);
      return [];
    }
  }
  
  private static async searchRepositories(query: string): Promise<GitHubRepository[]> {
    try {
      const response = await fetch(
        `${this.API_BASE}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.items || [];
      
    } catch (error) {
      console.error('Failed to search repositories:', error);
      return [];
    }
  }
  
  private static parseRepositoriesToMethods(repos: GitHubRepository[], brand: string): UnlockMethod[] {
    return repos
      .filter(repo => this.isRelevantRepository(repo, brand))
      .map(repo => ({
        id: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: repo.name,
        description: repo.description || 'No description available',
        repository: repo.html_url,
        brand: brand.toLowerCase(),
        lastUpdated: repo.updated_at,
        stars: repo.stargazers_count,
        difficulty: this.assessDifficulty(repo),
        isOfficial: this.isOfficialRepository(repo, brand),
      }));
  }
  
  private static isRelevantRepository(repo: GitHubRepository, brand: string): boolean {
    const repoText = `${repo.name} ${repo.description || ''}`.toLowerCase();
    const brandLower = brand.toLowerCase();
    
    // Check if repository is related to bootloader unlocking for this brand
    const hasUnlockKeywords = ['unlock', 'bootloader', 'fastboot', 'oem'].some(keyword => 
      repoText.includes(keyword)
    );
    
    const hasBrandKeywords = [brandLower, brandLower.replace(/\s+/g, '')].some(keyword => 
      repoText.includes(keyword)
    );
    
    return hasUnlockKeywords && hasBrandKeywords;
  }
  
  private static assessDifficulty(repo: GitHubRepository): 'easy' | 'medium' | 'hard' {
    const repoText = `${repo.name} ${repo.description || ''}`.toLowerCase();
    
    if (repoText.includes('automatic') || repoText.includes('one-click') || repoText.includes('easy')) {
      return 'easy';
    }
    
    if (repoText.includes('manual') || repoText.includes('advanced') || repoText.includes('exploit')) {
      return 'hard';
    }
    
    return 'medium';
  }
  
  private static isOfficialRepository(repo: GitHubRepository, brand: string): boolean {
    const ownerName = repo.html_url.split('/')[3].toLowerCase();
    const brandLower = brand.toLowerCase();
    
    // Check if repository owner matches brand name or known official accounts
    const officialAccounts: Record<string, string[]> = {
      xiaomi: ['miui', 'xiaomi', 'mi-global'],
      huawei: ['huawei', 'huaweicloud'],
      oppo: ['oppo', 'oppomobile'],
      vivo: ['vivo', 'vivoglobal'],
      oneplus: ['oneplus', 'oneplusbbs'],
      samsung: ['samsung', 'samsunginternet'],
    };
    
    const knownOfficials = officialAccounts[brandLower] || [];
    return knownOfficials.includes(ownerName);
  }
  
  private static removeDuplicates(methods: UnlockMethod[]): UnlockMethod[] {
    const seen = new Set<string>();
    return methods.filter(method => {
      const key = `${method.name}-${method.repository}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
  
  static async fetchLatestRelease(repositoryUrl: string): Promise<any> {
    try {
      // Extract owner and repo from URL
      const urlParts = repositoryUrl.replace('https://github.com/', '').split('/');
      const owner = urlParts[0];
      const repo = urlParts[1];
      
      const response = await fetch(`${this.API_BASE}/repos/${owner}/${repo}/releases/latest`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch release: ${response.status}`);
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Failed to fetch latest release:', error);
      return null;
    }
  }
  
  static async checkRateLimit(): Promise<{
    limit: number;
    remaining: number;
    reset: number;
  }> {
    try {
      const response = await fetch(`${this.API_BASE}/rate_limit`);
      
      if (!response.ok) {
        throw new Error(`Rate limit check failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data.rate;
      
    } catch (error) {
      console.error('Failed to check rate limit:', error);
      return { limit: 60, remaining: 0, reset: Date.now() + 3600000 };
    }
  }
}
