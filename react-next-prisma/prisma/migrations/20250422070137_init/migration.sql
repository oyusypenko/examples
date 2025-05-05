CREATE TYPE "class_type" AS ENUM ('Math', 'Science', 'History');

CREATE TABLE "numbers" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "numbers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "grades" (
    "id" SERIAL NOT NULL,
    "class" "class_type" NOT NULL,
    "grade" INTEGER NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);
