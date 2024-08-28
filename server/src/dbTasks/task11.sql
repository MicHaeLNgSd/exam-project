WITH top_rating_creatives AS (
  SELECT id
  FROM "Users" u
  WHERE u.role = 'creator'
  ORDER BY rating DESC
  LIMIT 3
)

UPDATE "Users" u
SET balance = balance + 10
FROM top_rating_creatives trc
WHERE u.id = trc.id;