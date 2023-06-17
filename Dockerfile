# 使用 Node.js 作為基本映像
FROM node:latest

# 設定工作目錄
WORKDIR /app

# 將 package.json 和 package-lock.json 複製到容器內
COPY package*.json ./

# 安裝相依套件
RUN npm install

# 將專案的所有檔案複製到容器內
COPY . .

# 建置 Vite.js 專案
RUN npm run build

# 定義容器啟動時的預設指令
CMD ["npm", "run", "dev"]
