# Base image: Official Ruby image
FROM ruby:3.2.0-slim-bullseye

# Set the working directory inside the Docker container
WORKDIR /app

# Update and install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    libvips \
    sqlite3 \
    && curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists/*

# Copy Gemfile and Gemfile.lock to Docker container
COPY Gemfile Gemfile.lock ./

# Set up env
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

ARG SECRET_KEY_BASE
ENV SECRET_KEY_BASE=$SECRET_KEY_BASE

ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY=$RAILS_MASTER_KEY

# Install Bundler and the required gems
RUN bundle install

# Copy the entire Rails application into the container
COPY . .

# Install JavaScript dependencies
RUN yarn install

# Build JavaScript assets
RUN yarn build

# Precompile Rails assets
RUN bundle exec rake assets:precompile

# Expose the Rails default port 3001
EXPOSE 3001

# Command to run the Rails server
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "3001"]
