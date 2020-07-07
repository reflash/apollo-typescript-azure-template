# Apollo + TypeScript + Azure

## Deploy locally

```bash
yarn start
```

## Deploy to Azure

(see https://www.apollographql.com/docs/apollo-server/deployment/azure-functions/)

##### Create resource group

```bash
az group create --name apollo-ts-azure --location germanywestcentral
```

##### Create storage account

```bash
az storage account create \
    --name apollotsazure \
    --location germanywestcentral \
    --resource-group apollo-ts-azure \
    --sku Standard_LRS
```

##### Create function app

```bash
az functionapp create \
    --resource-group apollo-ts-azure \
    --name apollo-ts-azure \
    --consumption-plan-location germanywestcentral \
    --runtime node \
    --functions-version 3 \
    --storage-account apollotsazure
```

##### Publish

```bash
func azure functionapp publish apollo-ts-azure
```

If function app has changed - check package.json:publish script.
Then yarn cmd can be used for publishing

```bash
yarn publish
```

## NOTE

When GraphQL Playground starts, It won't have the correct URL containing the security code, and a message "Server cannot be reached" as shown at your browser.

We just need to put the full URL that includes the security code in the Playground url box. The background polling should refresh the screen momentarily. Click the Schema button to see if the docs are loaded correctly as the image below.


## Cleanup
```bash
az functionapp delete \
    --resource-group apollo-ts-azure \
    --name apollo-ts-azure

az storage account delete \
    --name apollotsazure \
    --resource-group apollo-ts-azure \
    --yes

az group delete \
    --name apollo-ts-azure \
    --yes
```


## Serverless

Install serverless cli
```bash
npm install -g serverless
```

To login to Azure (https://github.com/serverless/serverless-azure-functions#advanced-authentication)

Deploy locally
```bash
sls offline
```

Deploy
```bash
sls deploy
```

Cleanup
```bash
sls remove
```