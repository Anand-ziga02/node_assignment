-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "projectId" INTEGER,
    "categoryId" INTEGER,
    "dueDate" TIMESTAMP(3),
    "priority" TEXT,
    "estimatedTime" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "attachmentPath" TEXT,
    "recurrence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
