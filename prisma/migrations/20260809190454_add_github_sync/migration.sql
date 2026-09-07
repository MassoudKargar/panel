-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "description" TEXT,
    "htmlUrl" TEXT NOT NULL,
    "homepageUrl" TEXT,
    "primaryLanguage" TEXT,
    "languages" JSONB,
    "topics" TEXT[],
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "openIssues" INTEGER NOT NULL DEFAULT 0,
    "license" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pushedAt" TIMESTAMP(3),
    "defaultBranch" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isFork" BOOLEAN NOT NULL DEFAULT false,
    "visibility" TEXT NOT NULL,
    "ownerLogin" TEXT NOT NULL,
    "readmeContent" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT,
    "customDescription" TEXT,
    "customTechnologies" TEXT[],
    "whyIBuiltIt" TEXT,
    "architecture" TEXT,
    "challenges" TEXT,
    "whatILearned" TEXT,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitHubUser" (
    "id" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "company" TEXT,
    "location" TEXT,
    "email" TEXT,
    "twitterUsername" TEXT,
    "publicRepos" INTEGER NOT NULL DEFAULT 0,
    "publicGists" INTEGER NOT NULL DEFAULT 0,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatarUrl" TEXT,
    "htmlUrl" TEXT NOT NULL,

    CONSTRAINT "GitHubUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "itemsSynced" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repository_githubId_key" ON "Repository"("githubId");

-- CreateIndex
CREATE INDEX "Repository_featured_idx" ON "Repository"("featured");

-- CreateIndex
CREATE INDEX "Repository_primaryLanguage_idx" ON "Repository"("primaryLanguage");

-- CreateIndex
CREATE INDEX "Repository_updatedAt_idx" ON "Repository"("updatedAt");

-- CreateIndex
CREATE INDEX "Repository_pushedAt_idx" ON "Repository"("pushedAt");

-- CreateIndex
CREATE INDEX "Repository_stars_idx" ON "Repository"("stars");

-- CreateIndex
CREATE INDEX "Repository_ownerLogin_idx" ON "Repository"("ownerLogin");

-- CreateIndex
CREATE UNIQUE INDEX "GitHubUser_githubId_key" ON "GitHubUser"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "GitHubUser_login_key" ON "GitHubUser"("login");

-- CreateIndex
CREATE INDEX "SyncLog_type_status_idx" ON "SyncLog"("type", "status");

-- CreateIndex
CREATE INDEX "SyncLog_startedAt_idx" ON "SyncLog"("startedAt");
