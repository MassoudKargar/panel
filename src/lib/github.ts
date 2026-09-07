import { Octokit } from '@octokit/rest'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'MassoudKargar'

if (!GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN not set - GitHub API will be rate limited to 60 req/hr')
}

export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  userAgent: 'masoudkargar.com portfolio sync',
})

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  languages_url: string
  topics: string[]
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  license: { key: string; name: string } | null
  created_at: string
  updated_at: string
  pushed_at: string | null
  default_branch: string
  archived: boolean
  fork: boolean
  visibility: string
  owner: {
    login: string
  }
}

export interface GitHubUser {
  id: number
  login: string
  name: string | null
  bio: string | null
  company: string | null
  location: string | null
  email: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  avatar_url: string
  html_url: string
}

export interface GitHubLanguages {
  [language: string]: number
}

function transformRepository(repo: any): GitHubRepository {
  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage ?? null,
    language: repo.language,
    languages_url: repo.languages_url,
    topics: repo.topics ?? [],
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    license: repo.license,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at ?? null,
    default_branch: repo.default_branch,
    archived: repo.archived,
    fork: repo.fork,
    visibility: repo.visibility ?? 'public',
    owner: repo.owner,
  }
}

function transformUser(user: any): GitHubUser {
  return {
    id: user.id,
    login: user.login,
    name: user.name ?? null,
    bio: user.bio ?? null,
    company: user.company ?? null,
    location: user.location ?? null,
    email: user.email ?? null,
    twitter_username: user.twitter_username ?? null,
    public_repos: user.public_repos,
    public_gists: user.public_gists,
    followers: user.followers,
    following: user.following,
    created_at: user.created_at,
    updated_at: user.updated_at,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
  }
}

export async function getAllRepositories(username: string = GITHUB_USERNAME): Promise<GitHubRepository[]> {
  const repos: GitHubRepository[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const { data } = await octokit.repos.listForUser({
      username,
      type: 'all',
      sort: 'updated',
      direction: 'desc',
      per_page: perPage,
      page,
    })

    if (data.length === 0) break
    
    // Filter to only public repos and transform
    const publicRepos = data
      .filter((repo: any) => repo.visibility === 'public')
      .map(transformRepository)
    
    repos.push(...publicRepos)
    
    if (data.length < perPage) break
    page++
    
    // Rate limit protection
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  return repos
}

export async function getRepositoryLanguages(owner: string, repo: string): Promise<GitHubLanguages> {
  try {
    const { data } = await octokit.repos.listLanguages({
      owner,
      repo,
    })
    return data
  } catch (error) {
    console.error(`Failed to fetch languages for ${owner}/${repo}:`, error)
    return {}
  }
}

export async function getRepositoryReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const { data } = await octokit.repos.getReadme({
      owner,
      repo,
    })
    
    if (data.encoding === 'base64' && data.content) {
      return Buffer.from(data.content, 'base64').toString('utf-8')
    }
    return data.content ?? null
  } catch (error) {
    // README not found or other error
    return null
  }
}

export async function getUserProfile(username: string = GITHUB_USERNAME): Promise<GitHubUser> {
  const { data } = await octokit.users.getByUsername({
    username,
  })
  
  return transformUser(data)
}

export async function getRepository(owner: string, repo: string): Promise<GitHubRepository | null> {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo,
    })
    
    return transformRepository(data)
  } catch (error) {
    return null
  }
}