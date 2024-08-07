
# Chord Voicing Generator 
Application to find every possible way to voice a chord on a string instrument and generate diagram visualizations. Supports any tuning and anywhere between 2 strings and 9 strings.

## Description
Enter any group of notes and discover every possible way to play them simultaneously on your instrument. 
While other chord-finding applications simply return common voicings of common chords in standard tunings, this program generates every possible diagram of any chord you can imagine in any tuning you can imagine.

If you:
  - want to explore alternate tunings, but find that none of youur old chord shapes work
  - need a clever voicing for your chord melody arrangment and are starting to think its impossible to fit all those notes at once
  - play a 5 string bass, a 4 string cello, or an 8-course Renaissance lute and are tired of only seeing guitar focused chord diagrams

then I hope you find this app helpful!

    
### To Run:

- Make sure you have Node.js and npm installed
- Clone this repository
- create a .env file with the line `REACT_APP_IP=<your-local-ip-address>` in the server folder
- From the root directory:
  - Install the dependencies with `npm install`
  - `npm run build` to build latest app
- From the server directory:
  - `npm start` to serve latest build from localhost:8000

### To make changes to the source code
- Make sure you have Node.js and npm installed
- Clone this repository
- create a .env file with the line `REACT_APP_IP=<your-local-ip-address>` in the server folder
- From the root directory:
  - Install the dependencies with `npm install`
  - `npm start` to start the React development server on localhost:3000
- From the server directory in different terminal:
  - `npm start` to enable backend to do calculations
  - `npm run dev` to start a nodemon development server

Feel free to reach out to ryanwilliammichaud@gmail.com with any additional questions!

