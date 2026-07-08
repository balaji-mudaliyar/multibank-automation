FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

# Install dependencies first for better layer caching.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the test framework.
COPY . .

ENV CI=true

# Default command runs the full Playwright suite.
CMD ["npx", "playwright", "test"]
