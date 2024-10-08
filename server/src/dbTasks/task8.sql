CREATE TABLE "Catalogs" (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE,
  "catalogName" VARCHAR(255) NOT NULL
);

CREATE TABLE "Conversations" (
  id SERIAL PRIMARY KEY,
  participant1 INT NOT NULL REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE,
  participant2 INT NOT NULL REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE,
  "isBlackListed1" BOOLEAN NOT NULL,
  "isBlackListed2" BOOLEAN NOT NULL,
  "isFavorite1" BOOLEAN NOT NULL,
  "isFavorite2" BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Conversations_to_Catalogs" (
  "conversationId" INT NOT NULL REFERENCES "Conversations"(id) ON UPDATE CASCADE ON DELETE CASCADE,
  "catalogId" INT NOT NULL REFERENCES "Catalogs"(id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY ("catalogId", "conversationId")
);

CREATE TABLE "Messages" (
  id SERIAL PRIMARY KEY,
  sender INT NOT NULL REFERENCES "Users"(id),
  body TEXT NOT NULL,
  "conversation" INT NOT NULL REFERENCES "Conversations"(id),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--DROP TABLE "Catalogs", "Conversations", "Conversations_to_Catalogs", "Messages";