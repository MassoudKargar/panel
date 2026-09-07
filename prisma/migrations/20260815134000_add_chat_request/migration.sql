-- Chat request audit log and application-level per-IP rate limiting
CREATE TABLE "ChatRequest" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ChatRequest_ip_createdAt_idx" ON "ChatRequest"("ip", "createdAt");
CREATE INDEX "ChatRequest_createdAt_idx" ON "ChatRequest"("createdAt");
