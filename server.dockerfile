FROM oven/bun:canary-alpine

# copy all files in the current directory to /app in the container
COPY . /app
WORKDIR /app
# install dependencies
RUN bun install

# expose port 4000
EXPOSE 4000

# run the bunjs server
CMD ["bun", "run", "start"]

# run in terminal:
# docker build -t bunjs-app .