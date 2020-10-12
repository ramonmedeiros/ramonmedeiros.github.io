---
layout: post
title: "How to create a mock REST API with ApiGateway"
description:  "It's easy and fast to specify an mock api throught OpenAPI and deploy it with ApiGateway on AWS"
date:   2020-10-09 15:00:15 +0200
keywords:
  - mock
  - aws
  - apigateway
  - lambda
---

# How to create by AWS CLI

Having to mock and api for a integration test can be easily solved when you are working with microservices, since you are already building something with [Flask][flask] or [Express][express], create a mock is just a matter of setup new endpoints and put your stub there.

But, in this case, I was working with a system based on [Lambda][lambda] and deploy a API in this case would take too much resources in AWS, so I saw this alternative with ApiGateway.

As the name self-explain, it's a resource on AWS that you can define your API and scale, redirect and so on. 


Let's look how to create one and put some mock. First, create it:

### [Create Api](#create-api)
{% highlight bash%}
$ aws apigateway create-rest-api --name test-mock
{
    "id": "API_ID",
    "name": "test-mock",
    "createdDate": 00000,
    "apiKeySource": "HEADER",
    "endpointConfiguration": {
        "types": [
            "EDGE"
        ]
    }
}
{% endhighlight %}



Next step is to create the endpoint, which is called Resource. First we get the id of the root resource:

{% highlight bash%}
$ aws apigateway get-resources --rest-api-id API_ID
{
    "items": [
        {
            "id": "ROOT_RESOURCE_ID",
            "path": "/"
        }
    ]
}
{% endhighlight %}


Now creating our resource

### [Create Resource](#create-resource)
{% highlight bash%}
$ aws apigateway create-resource --rest-api-id API_ID --parent-id ROOT_RESOURCE_ID --path-part hello
{
    "id": "ENDPOINT_ID",
    "parentId": "ROOT_RESOURCE_ID",
    "pathPart": "hello",
    "path": "/hello"
}
{% endhighlight %}

Set for which method this resource will answer (I'm using GET for this example):
Also, this will be public, without authentication

### [Create Method](#create-method)
{% highlight bash%}
$ aws apigateway put-method --rest-api-id API_ID --resource-id ENDPOINT_ID --http-method GET --authorization-type NONE
{
    "httpMethod": "GET",
    "authorizationType": "NONE",
    "apiKeyRequired": false
}
{% endhighlight %}


Set this method to work as a mock:

### [Create Integration](#create-integration)
{% highlight bash%}
$ aws apigateway put-integration --rest-api-id API_ID --resource-id ENDPOINT_ID --http-method GET --type MOCK --request-templates '{ "application/json": "{\"statusCode\": 200}" }'
{
    "type": "MOCK",
    "passthroughBehavior": "WHEN_NO_MATCH",
    "timeoutInMillis": 29000,
    "cacheNamespace": "ENDPOINT_ID",
    "cacheKeyParameters": []
}
{% endhighlight %}

We need to set a method response, in this case, will create for status code 200
{% highlight bash%}
$ aws apigateway put-method-response --rest-api-id=5uqyz3qfj5 --resource-id 1ej64s --http-method GET --status-code 200 --response-models  application/json=Empty
{
    "statusCode": "200"
}
{% endhighlight %}


Finally, the stub itself:
### [Create Stub](#create-stub)
{% highlight bash%}
$ aws apigateway put-integration-response --rest-api-id API_ID --resource-id ENDPOINT_ID --http-method GET --status-code 200 --response-templates '{"application/json": "{\"Hello\": \"World\"}"}'
{
    "statusCode": "200",
    "responseTemplates": {
        "application/json": "{\"Hello\": \"World\"}"
    }
}
{% endhighlight %}


Deploy your API:

### [Deploy API](#deploy-api)
{% highlight bash%}
$ aws apigateway create-deployment --rest-api-id API_ID --stage-name STAGE_NAME
{
    "id": "DEPLOYMENT_ID",
    "createdDate": 00000000
}
{% endhighlight %}

After this, your deployment will be available in the following link:

https://{API_ID}.execute-api.eu-west-1.amazonaws.com/STAGE_NAME

As we created the resource /hello, you will reach it at:

https://{API_ID}.execute-api.eu-west-1.amazonaws.com/STAGE_NAME/hello


# Export to JSON file

It's also possible to export a create API and only import it. Let's export the API above:
### [Export API](#export-api)
{% highlight bash%}
$ aws apigateway get-export --rest-api-id API_ID --stage-name stage --export-type oas30 --parameters extensions='integrations'  api_definition.json
{
    "contentType": "application/octet-stream",
    "contentDisposition": "attachment; filename=\"oas30_2020-10-09T13:47:37Z.json\""
}
{% endhighlight%}


# Generate API importing 

If you have the API file definitions and want to import it, just:
### [Import API](#import-api)
{% highlight bash%}
$ aws apigateway import-rest-api --body 'file:///path/to/API_Swagger_template.json'
{
    "id": "NEW_ID",
    "name": "test-mock",
    "createdDate": 00000000,
    "version": "0000-00-00T13:47:37Z",
    "apiKeySource": "HEADER",
    "endpointConfiguration": {
        "types": [
            "EDGE"
        ]
    }
}
{% endhighlight%}

And deploy it, as show in [Deploy API](#deploy-api)


[lambda]: https://aws.amazon.com/lambda/
[express]: https://expressjs.com/
[flask]: https://flask.palletsprojects.com/en/1.1.x/
