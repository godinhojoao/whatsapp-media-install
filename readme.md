# not done yet

## Whatsapp media installer lambda
- This is a lambda that is triggered by a `Amazon SQS` receiving the object with youtube url and format to install the media correctly.
- Then it installs the media and stores it on `Amazon s3 bucket`.

## How to run tests of this lambda function
- Correct node version: `nvm i 18 && nvm use`
- Run tests: `npm run test`