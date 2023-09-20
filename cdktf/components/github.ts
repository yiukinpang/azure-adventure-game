import { ActionsSecret } from '../.gen/providers/github/actions-secret';
import { Repository } from '../.gen/providers/github/repository';
import { GithubProvider } from '../.gen/providers/github/provider';
import { Construct } from 'constructs';

export interface GitHubProps {
  apiToken: string;
  repository: string;
  clientID: string;
  clientSecret: string;
  githubProvider: GithubProvider;
}

export class GitHubConstruct extends Construct {
  constructor(scope: Construct, id: string, { apiToken, repository, clientID, clientSecret }: GitHubProps) {
    super(scope, id);

    const repo = new Repository(this, 'Repository', {
      name: repository,
      visibility: 'public',
      vulnerabilityAlerts: true,
      template: {
        repository: 'azure-adventure-game',
        owner: 'wongcyrus',
        includeAllBranches: true,
      },
    });

    new ActionsSecret(this, 'ClientIdActionsSecret', {
      repository: repo.name,
      secretName: 'AADB2C_PROVIDER_CLIENT_ID',
      plaintextValue: clientID,
      dependsOn: [repo],
    });

    new ActionsSecret(this, 'ClientSecretActionsSecret', {
      repository: repo.name,
      secretName: 'AADB2C_PROVIDER_CLIENT_SECRET',
      plaintextValue: clientSecret,
      dependsOn: [repo],
    });

    new ActionsSecret(this, 'DeploymentTokenActionsSecret', {
      repository: repo.name,
      secretName: 'AZURE_STATIC_WEB_APPS_API_TOKEN',
      plaintextValue: apiToken,
      dependsOn: [repo],
    });
  }
}