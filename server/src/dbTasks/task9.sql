SELECT u.role, COUNT(*)
FROM "Users" u
GROUP BY u.role;
