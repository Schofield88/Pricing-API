# Tails Back-End Test

## Objective

Build a back-end with a single end point that returns a response object for a simulated customer order.

## Setup

As this is an Express.js app, you will need [Node.js installed](https://nodejs.org/en/download/) on your machine. Then, once the zip file has extracted, at the command line run:

```npm install```

to install project dependencies.

## Run

To start the server, type:

```npm run start```

at the command line. The server used is Nodemon, so if you wish to make any changes to the code you will not need to restart the server.

The server listens on port 3000, and the end point for the app is:

```http://localhost:3000/api/order```

Please see the [Testing](#testing) section below for details on how to interact with the app.


## Design choices and assumptions

The app was build using an Express.js skeleton, which permitted a fast set-up for the single end-point. Given the test's criteria that:

>The endpoint should return a data structure which includes:
>
>-   the total price for the order
>-   the total VAT for the order
>-   the price and VAT for each item in the order
>
>Data structure for the response is up to you.

it was decided that the response would be in .json format. The response would be structured as below:
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

Given that I'd decided to write this test in JavaScript, there were a number of issues here when attempting to write code with object-oriented design patterns. I made the decision to write the "classes" as factory functions, given that the classes introduced in JS ES6 do not currently implement any sort of encapsulation. Using Object.freeze creates a specified public interface while fully encapsulating any state and private methods.

The design flow implemented here is as such:

- The request (the order) is made to the end-point with .json
- The body of the request is passed to a controller function, Processor
- Processor creates a skeleton invoice response
- Processor passes the request body's items array, which is an array of objects, to the Items function/class
- Items passes that array to the Price function, that remaps the array to include the pricing information to each item.
- The return of Price is passed to SubTotal, which remaps the new array to include the sub-totals for each item.
- Items returns the fully-remapped items array
- Processor assigns that to the skeleton response, then passes the full response object to GrandTotal.
- GrandTotal calculates the order's totals, and returns the completed invoice
- Processor returns the invoice object, and the response to the client is sent

It was assumed for the test that front-end error handling would ensure that the request to the end point would always be correctly-formatted, and that it would contain at least one product in the items array.

With hindsight, the choice to complete this test in JavaScript was perhaps one I would not make again. I was tempted initially to take a (very basic) functional approach with the solution, but decided to attempt to keep to OO design patterns.

## Testing

The testing framework for this solution was Jest, chosen over Jasmine simply because I have a preference for the command line interface (similar to Rspec, which was the framework I was trained in). The Unit tests are fully isolated, whereas the Integration tests are coupled.

To run the tests, at the command line run:

```npm run tests```

to run the Jest script.

To interact with the app directly, [you will need to use something like Postman](https://www.getpostman.com/downloads/). Postman was used to manually test the API throughout development. Open Postman, click the orange "New" button in the top left, then "Request". Give the new request a name,  then save it.

Click "Get" and change the request type to "Post", and enter the following end-point into the address bar to the right:

```http://localhost:3000/api/order```

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

## Submission Questions

####  What command(s) do we run to install and start your server?

Please see the [Setup](#setup) and [Run](#run) sections above.

#### If you had more time, what improvements would you make if any?

Possibly re-attempt the task in Ruby or Python (anything that's a true object-oriented language). Build a basic front-end to assemble the post request json from form submission data to simulate a user's experience. Implement some sort of error handling for incorrectly formatted json or empty orders.

#### What bits did you find the toughest? What bit are you most proud of? In both cases, why?

It took me a lot of planning to discern the structure of the logic, with the first two attempts to model the app being thrown out of the window. The primary part that I'm not proud of are the two helper functions in Price, getUnitPrice() and getUnitVat(). This code needs DRYing out, and the class itself feels like it's doing a lot.

Perhaps the hardest part for me was getting started. There were a number of things I had to research to complete this solution that were daunting at the outset, and became full-on blockers. However, I've been coding long enough now to know that this a feature of software, and that solutions are always (at most) only hours away.

The part I was most proud of was seeing the correct response come back in Postman. A simple thing, I know.

####  What one thing could we do to improve this test?

Award a free dog on successful completion.
