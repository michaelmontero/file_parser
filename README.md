# Michael Montero's GoDaddy challenge 

## Functional requirements

| Requirement   |        Status | How to use it? |
| ------------- | ------------- | -------------- |
| Takes a CSV file destination as an input.  | :white_check_mark:  |  It's the default implementation. If need to change the csv file, change it in the [line 58](https://github.com/michaelmontero/gd_michael/blob/main/index.ts#L58)   
| The input can be a URL or file on machine.  | :white_check_mark:  |  The readed file is already in the project. To use the local file implementation, uncomment from line [line 68 to 78](https://github.com/michaelmontero/gd_michael/blob/main/index.ts#L68)      |
| Allows the consumer to pass a transformer function that will run for each row of the CSV. |:white_check_mark: | To create a valid transformer, create a class that implements `Transformable`.  Pass the created instance as `tranform`  in the second argument object in the main function|
|Add ability to run a hook before the file is read.|:white_check_mark:| To create a valid `beforeHook`, create a class that implements `BeforeAllHook`.  Pass the created instance as `beforeAllHook`  in the second argument object in the main function|
|Add ability to run a hook after the file is processed.|:white_check_mark:|To create a valid `afterAllHook`, create as many class as you need that implements `AfterAllHook`.  Pass the created instance as an array `afterAll`  in the second argument object in the main function|
|Capture the time it takes for the file to get processed.|:white_check_mark:| An abstract class called `TimeTracker` has the implementation. Just extends that class and call the `startTimeTrack` and `endTimeTrack` methods when needed and the variable time will have the lapse in `msà between those call. 

### Extra requirements 

| Requirement   | Status                    
| ------------- | -------------            |  
| Docker    | :white_check_mark:       | - 
| Allow to run multiple `after all` hooks  | :white_check_mark:  |  
## How to run the project? 


- Running on [StackBlitz ⚡️](https://stackblitz.com/edit/node-vwjnsr) ?

```
npx tsc 
node ./dist/index.js
```

- Running locally? **(*Needs to have docker installed*)**
```
docker build -t gd_michael . 
docker run gd_michael
```
 

> Repeat again if changes are made...


## Approach

### Props? 
  1. I'm using docker so you don't need to have any specific nodejs version installed in your machine.
  2. You can implements many others transformers without the need to modify the codebase. 
  3. You can execute as many after all hooks as you want. (ex. in the code i ran 3)
  
###  Const? 
1. After all hooks does not receive the transformed data. Could be fixed forcing all transformers to return the data and modifiying the `AfterAllHook` to 
stop inheriting from `Hook` and receive the transformed data as arguments in the run method.

## Included libraries
- `csv-parse`: I chose to use it to have the flexibility to parse the csv file from text into array or object. The reason i pick this one and not other that made a similar job is because of the maintance, this library has active support and the documentation is great because many people uses it.

- `nodejs`: I chose it because i had to have a backend languaje in order to interact with local files. 

