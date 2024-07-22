WITH holidays_balance_sum AS (
  SELECT u.id, SUM(t.amount) AS total_amount
  FROM "Users" u
  JOIN "Transactions" t ON u.id = t."userId"
  WHERE u.role = 'customer'
    AND t."operationType" = 'EXPENSE'
    AND t."createdAt" BETWEEN '2023-12-25' AND '2024-01-15'
  GROUP BY u.id
)

UPDATE "Users" u 
SET balance = balance + hbs.total_amount * 0.1
FROM holidays_balance_sum hbs
WHERE u.id = hbs.id;