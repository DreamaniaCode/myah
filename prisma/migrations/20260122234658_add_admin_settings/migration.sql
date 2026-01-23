-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "siteName" TEXT NOT NULL DEFAULT 'أعشاب MYAH',
    "logoUrl" TEXT NOT NULL DEFAULT '/images/logo.png',
    "heroTitle" TEXT NOT NULL DEFAULT 'طبيعة نقية، صحة مستدامة',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'اكتشف مجموعتنا المختارة من العسل الحر والأعشاب الطبيعية',
    "heroImage" TEXT NOT NULL DEFAULT '/images/hero_background_1769122439980.png',
    "contactPhone" TEXT NOT NULL DEFAULT '0600000000',
    "contactEmail" TEXT NOT NULL DEFAULT 'info@herbsmyah.com',
    "contactAddress" TEXT NOT NULL DEFAULT 'الدار البيضاء، المغرب',
    "bankName" TEXT NOT NULL DEFAULT 'CIH Bank',
    "bankAccount" TEXT NOT NULL DEFAULT '1234567890123456',
    "cashPlusInfo" TEXT NOT NULL DEFAULT 'اسم المستفيد: محمد فلان | رقم الهاتف: 0600000000',
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
