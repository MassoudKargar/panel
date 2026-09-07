import { prisma } from '@/lib/prisma'
import { octokit, getAllRepositories, getRepositoryLanguages, getRepositoryReadme, getUserProfile, GitHubRepository, GitHubUser } from '@/lib/github'

interface SyncResult {
  success: boolean
  itemsSynced: number
  errorMessage?: string
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function syncRepositories(): Promise<SyncResult> {
  const startTime = new Date()
  let itemsSynced = 0
  let errorMessage: string | undefined

  try {
    console.log('🔄 Starting GitHub repositories sync...')
    
    const repos = await getAllRepositories()
    console.log(`📦 Found ${repos.length} public repositories`)

    for (const repo of repos) {
      try {
        // Fetch additional data
        const [languages, readme] = await Promise.all([
          getRepositoryLanguages(repo.owner.login, repo.name),
          getRepositoryReadme(repo.owner.login, repo.name),
        ])

        // Upsert repository
        await prisma.repository.upsert({
          where: { githubId: repo.id },
          update: {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            htmlUrl: repo.html_url,
            homepageUrl: repo.homepage,
            primaryLanguage: repo.language,
            languages,
            topics: repo.topics,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            openIssues: repo.open_issues_count,
            license: repo.license?.key || null,
            createdAt: new Date(repo.created_at),
            updatedAt: new Date(repo.updated_at),
            pushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
            defaultBranch: repo.default_branch,
            isArchived: repo.archived,
            isFork: repo.fork,
            visibility: repo.visibility,
            ownerLogin: repo.owner.login,
            readmeContent: readme,
            lastSyncedAt: new Date(),
          },
          create: {
            githubId: repo.id,
            slug: generateSlug(repo.name),
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            htmlUrl: repo.html_url,
            homepageUrl: repo.homepage,
            primaryLanguage: repo.language,
            languages,
            topics: repo.topics,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            openIssues: repo.open_issues_count,
            license: repo.license?.key || null,
            createdAt: new Date(repo.created_at),
            updatedAt: new Date(repo.updated_at),
            pushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
            defaultBranch: repo.default_branch,
            isArchived: repo.archived,
            isFork: repo.fork,
            visibility: repo.visibility,
            ownerLogin: repo.owner.login,
            readmeContent: readme,
            lastSyncedAt: new Date(),
            syncedAt: new Date(),
          },
        })

        itemsSynced++
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50))
      } catch (repoError) {
        console.error(`Failed to sync repository ${repo.full_name}:`, repoError)
        // Continue with other repos
      }
    }

    // Handle deleted/archived repos - mark as archived if not seen in sync
    const syncedGithubIds = repos.map(r => r.id)
    await prisma.repository.updateMany({
      where: {
        ownerLogin: 'MassoudKargar',
        githubId: { notIn: syncedGithubIds },
        isArchived: false,
      },
      data: {
        isArchived: true,
        lastSyncedAt: new Date(),
      },
    })

    console.log(`✅ Synced ${itemsSynced} repositories`)
    return { success: true, itemsSynced }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Repository sync failed:', errorMessage)
    return { success: false, itemsSynced, errorMessage }
  } finally {
    // Log sync
    await prisma.syncLog.create({
      data: {
        type: 'repositories',
        status: errorMessage ? 'error' : 'success',
        itemsSynced,
        errorMessage,
        startedAt: startTime,
        completedAt: new Date(),
      },
    })
  }
}

export async function syncUserProfile(): Promise<SyncResult> {
  const startTime = new Date()
  let itemsSynced = 0
  let errorMessage: string | undefined

  try {
    console.log('🔄 Starting GitHub user profile sync...')
    
    const user = await getUserProfile()
    console.log(`👤 Syncing profile for ${user.login}`)

    await prisma.gitHubUser.upsert({
      where: { githubId: user.id },
      update: {
        login: user.login,
        name: user.name,
        bio: user.bio,
        company: user.company,
        location: user.location,
        email: user.email,
        twitterUsername: user.twitter_username,
        publicRepos: user.public_repos,
        publicGists: user.public_gists,
        followers: user.followers,
        following: user.following,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at),
        lastSyncedAt: new Date(),
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
      },
      create: {
        githubId: user.id,
        login: user.login,
        name: user.name,
        bio: user.bio,
        company: user.company,
        location: user.location,
        email: user.email,
        twitterUsername: user.twitter_username,
        publicRepos: user.public_repos,
        publicGists: user.public_gists,
        followers: user.followers,
        following: user.following,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at),
        lastSyncedAt: new Date(),
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
      },
    })

    itemsSynced = 1
    console.log('✅ User profile synced')
    return { success: true, itemsSynced }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ User profile sync failed:', errorMessage)
    return { success: false, itemsSynced, errorMessage }
  } finally {
    await prisma.syncLog.create({
      data: {
        type: 'user',
        status: errorMessage ? 'error' : 'success',
        itemsSynced,
        errorMessage,
        startedAt: startTime,
        completedAt: new Date(),
      },
    })
  }
}

export async function fullSync(): Promise<{ repositories: SyncResult; user: SyncResult }> {
  console.log('🚀 Starting full GitHub sync...')
  
  const [repositories, user] = await Promise.all([
    syncRepositories(),
    syncUserProfile(),
  ])

  console.log('🏁 Full sync completed')
  return { repositories, user }
}