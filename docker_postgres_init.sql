CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "groupId" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "group"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "task"
(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP,
    "dueTime" TIMESTAMP,
    "creatorId"
        INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "assigneeId" INTEGER,
    "followerId" INTEGER,
    "parentId" INTEGER,
    "groupId" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "taskFollow"
(
    "id" SERIAL PRIMARY KEY,
    "taskId" INTEGER REFERENCES "task"(id) NOT NULL,
    "userId" INTEGER REFERENCES "user"(id) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "taskLog"
(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER,
    "action" VARCHAR(255),
    "status" VARCHAR(255),
    "taskId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "user"
    ("name", "email", "password")
VALUES('Mark', 'mark@gmail.com', '$2b$10$FljRdZUMVPY/fopDx.iS2.mOOlE31b0SmkiciN5fi2bsPbx0vv2FC');
INSERT INTO "user"
    ("name", "email", "password")
VALUES('Jenny', 'jenny@gmail.com', '$2b$10$FljRdZUMVPY/fopDx.iS2.mOOlE31b0SmkiciN5fi2bsPbx0vv2FC');