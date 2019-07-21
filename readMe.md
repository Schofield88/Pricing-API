# Pricing Data API

## Objective

Build a back-end with a single end point that returns a response object for a simulated customer order.

## Setup

As this is an Express.js app, you will need [Node.js installed](https://nodejs.org/en/download/) on your machine. Then, once the zip file has extracted, at the command line run:

`npm install`

to install project dependencies.

## Run

To start the server, type:

`npm start`

at the command line. As Nodemon is used as a project dependency, if you wish to make any changes to the code you will not need to restart the server.

The server listens on port 3000, and the end point for the app is:

`http://localhost:3000/api/order`

Please see the [Testing](#testing) section below for details on how to interact with the app.

## Design choices and assumptions

The app was build using an Express.js skeleton, which permitted a fast set-up for the single end-point. The acceptance criteria for this API are:

> The endpoint should return a data structure which includes:
>
> - the total price for the order
> - the total VAT for the order
> - the price and VAT for each item in the order

It was decided that the response would be in .json format. The response would be structured as below:

```
{
  "invoice" : {
    "order_net": [value_in_pennies],
    "order_vat": [value_in_pennies],
    "order_gross": [value_in_pennies],
    "items": [
          {
            "product_id": [number],
            "quantity": [number],
            "unit_price": [value_in_pennies],
            "unit_vat": [value_in_pennies],
            "sub_total": [value_in_pennies],
            "sub_vat": [value_in_pennies],
          },
          {
	          "product_id": [a_different_id]
	          ...
          }
    ],
  }
}
```

The items array would be populated by as many objects as there were items in the json request sent to the end-point.

The design flow implemented here is as such:

- The request (the order) is made to the end-point with JSON data
- The request is passed to a route controller, orderController
- The process() controller function instantiates classes responsible for handling the processing logic and creates a skeleton invoice response
- The Items instance is used to create and populate a remapped items array returns the fully-remapped items array
- The customer object is passed to GrandTotal.calculate(), which returns the completed invoice
- The process function sends the full invoice object to the client

It was assumed initially that front-end error handling would ensure that the request to the end point would always be correctly-formatted, and that it would contain at least one product in the items array.

## Testing

The testing framework for this solution was Jest, chosen over Jasmine simply because I have a preference for the command line interface (similar to Rspec, which was the framework I was trained in). The Unit tests are fully isolated, while the Integration test is properly mocked out.

To run the tests, at the command line type:

`npm tests`

to run the Jest script. Please note that this will start Jest in Watch mode; press 'q' to exit.

To interact with the app directly, [you will need to use something like Postman](https://www.getpostman.com/downloads/). Postman was used to manually test the API throughout development. Open Postman, click the orange "New" button in the top left, then "Request". Give the new request a name, then save it.

Click "Get" and change the request type to "Post", and enter the following end-point into the address bar to the right:

`http://localhost:3000/api/order`

The Post request requires a json body, samples of which are provided below:

```
{
    "order": {
        "id": 12345,
        "customer": {},
        "items": [
            {
                "product_id": 1,
                "quantity": 1
            },
            {
                "product_id": 3,
                "quantity": 1
            }
        ]
    }
}
```

```
{
    "order": {
        "id": 1337,
        "customer": {},
        "items": [
            {
                "product_id": 1,
                "quantity": 1
            },
            {
                "product_id": 2,
                "quantity": 10
            },
            {
                "product_id": 4,
                "quantity": 8
            }
        ]
    }
}
```

Paste one of these, or any json following this structure, into body of the request, click the "raw" radio button, and ensure the drop-down menu at the end is set to "JSON (application/json)".

Press the blue Send button, and the response will appear in the window at the bottom.
