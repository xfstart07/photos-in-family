# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'photos'
set :repo_url, 'git@github.com:xfstart07/photos-in-family.git'

set :deploy_to, '/home/deployer/apps/photos'
set :scm, :git
set :branch, 'master'
set :pty, true

set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/upload')
set :keep_releases, 5

set :assets_roles, [:app]
set :assets_dependencies, %w[app/assets lib/assets vendor/assets Gemfile config/routes.rb]
namespace :deploy do
  after 'deploy:publishing', 'deploy:restart'
  task :restart do
    invoke 'unicorn:restart'
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end
end
