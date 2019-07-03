# Book Keeping

A simple book keeping application to keep track of transactions for businesses. The application is based on Ionic 4 (Angular) and is aimed to be a hybrid app available for desktop and mobile platforms using Capacitor.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to install Angular and Ionic globally.

```
npm i -g @angular/cli ionic
```

For Android builds, you will require Android Studio and Cocoapods for IOS.

// TODO: Environment

### Installing

After cloning the project locally, you will need to create a general ionic build.
```
ionic build
```
This will generate/update a www folder with all the files related to the project. After this, you can generate an application specific to a particular platform.

#### Browser

The project can be served on localhost.

```
ionic serve
```

The browser uses the generated www file and tracks for any changes.

#### Desktop

In order to run the application using electron, you can add or copy (update) the generated build.

```
ionic cap add electron
ionic cap copy // If already added
```

Then open the generated build.

```
ionic cap open electron
```
#### Mobile

For Android you can use:
```
ionic cap add android
ionic cap copy // If already added
```

For IOS:
```
ionic cap add ios
ionic cap copy // If already added
```

And to open in Android Studio or XCode:
```
ionic cap open android
ionic cap open ios
```
## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
