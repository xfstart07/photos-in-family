server '120.27.124.99', user: 'deployer', roles: %w[app db]

role :app, %w[deployer@120.27.124.99]
role :db,  %w[deployer@120.27.124.99]
set :ssh_options, forward_agent: true,
                  auth_methods: %w[publickey]

set :branch, 'master'
set :unicorn_config_path, "#{fetch(:deploy_to)}/current/config/unicorn.rb"
