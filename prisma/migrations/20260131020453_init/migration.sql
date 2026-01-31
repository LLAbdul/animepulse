-- CreateEnum
CREATE TYPE "ListStatus" AS ENUM ('WATCHING', 'COMPLETED', 'PLAN_TO_WATCH', 'ON_HOLD', 'DROPPED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "displayUsername" VARCHAR(32),
    "name" TEXT,
    "image" TEXT,
    "avatarUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL DEFAULT 'en',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifications" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_lists" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" INTEGER NOT NULL,
    "status" "ListStatus" NOT NULL,
    "rating" INTEGER,
    "episodesWatched" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anime_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_cache" (
    "id" SERIAL NOT NULL,
    "malId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "titleJapanese" TEXT,
    "imageUrl" TEXT NOT NULL,
    "synopsis" TEXT,
    "genres" TEXT[],
    "episodes" INTEGER,
    "status" TEXT,
    "score" DOUBLE PRECISION,
    "year" INTEGER,
    "season" TEXT,
    "streaming" JSONB,
    "cachedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anime_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_displayUsername_key" ON "users"("displayUsername");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE INDEX "verifications_identifier_idx" ON "verifications"("identifier");

-- CreateIndex
CREATE INDEX "anime_lists_userId_idx" ON "anime_lists"("userId");

-- CreateIndex
CREATE INDEX "anime_lists_animeId_idx" ON "anime_lists"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "anime_lists_userId_animeId_key" ON "anime_lists"("userId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "anime_cache_malId_key" ON "anime_cache"("malId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_lists" ADD CONSTRAINT "anime_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_lists" ADD CONSTRAINT "anime_lists_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime_cache"("malId") ON DELETE RESTRICT ON UPDATE CASCADE;
