# Microsoft Office365 Graph Api

The [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) allows you to sent graph api requests as your current user.

## Getting a token

In order to get an oauth token that can be used to call the graph api, you need to create an Azure Active Directory Application. This can be done throught the web console, but here is the command line way:

```bash
az login --allow-no-subscriptions
az ad app create --display-name <application name>
az ad app credential reset --id <application id>
az ad sp create --id <application id>
```

You can view your apps with 

```bash
az ad app list
```