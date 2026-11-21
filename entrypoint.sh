#!/bin/sh
set -e

echo "==> Application des migrations Prisma vers PostgreSQL..."
node ./node_modules/prisma/build/index.js migrate deploy

echo "==> Démarrage du serveur Next.js..."
exec node server.js
