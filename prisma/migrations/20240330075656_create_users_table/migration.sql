-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_Name" TEXT NOT NULL,
    "last_Name" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
